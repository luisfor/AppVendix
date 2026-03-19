'use server';

import prisma from '@/lib/prisma';
import { CompanyStatus, SystemRole } from '@prisma/client';
import { revalidatePath } from 'next/cache';
import { getSession } from '@/lib/auth-utils';
import bcrypt from 'bcryptjs';

export async function getSaaSMetrics() {
    const now = new Date();
    const firstDayOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);

    const [
        totalCompanies,
        activeCompanies,
        suspendedCompanies,
        newCompaniesThisMonth,
        totalPlatformUsers,
        activePlans
    ] = await Promise.all([
        prisma.company.count(),
        prisma.company.count({ where: { status: CompanyStatus.ACTIVE } }),
        prisma.company.count({ where: { status: CompanyStatus.SUSPENDED } }),
        prisma.company.count({ where: { createdAt: { gte: firstDayOfMonth } } }),
        prisma.user.count(),
        prisma.company.findMany({
            where: { status: CompanyStatus.ACTIVE },
            include: { plan: true }
        }),
    ]);

    const mrr = activePlans.reduce((acc, company) => acc + Number(company.plan?.monthlyPrice || 0), 0);

    const companiesPerPlanMap = activePlans.reduce((acc: any, company) => {
        if (!company.plan) return acc; // Skip companies without a plan assigned
        const planName = company.plan.name;
        if (!acc[planName]) acc[planName] = 0;
        acc[planName]++;
        return acc;
    }, {});

    const companiesPerPlan = Object.entries(companiesPerPlanMap).map(([name, count]) => ({
        name,
        count
    }));

    return JSON.parse(JSON.stringify({
        totalCompanies,
        activeCompanies,
        suspendedCompanies,
        mrr,
        newCompaniesThisMonth,
        estimatedYearlyRevenue: mrr * 12,
        totalPlatformUsers,
        companiesPerPlan,
    }));
}

export type CompanyFilter = {
    status?: CompanyStatus;
    planId?: string;
    createdMonth?: boolean;
};

export async function getCompanies(params: {
    page?: number;
    pageSize?: number;
    search?: string;
    filter?: CompanyFilter;
    sortBy?: string;
    sortOrder?: 'asc' | 'desc';
} = {}) {
    const {
        page = 1,
        pageSize = 10,
        search,
        filter,
        sortBy = 'createdAt',
        sortOrder = 'desc'
    } = params;

    const skip = (page - 1) * pageSize;
    const where: any = {};

    if (search) {
        where.OR = [
            { name: { contains: search, mode: 'insensitive' } },
            { email: { contains: search, mode: 'insensitive' } },
        ];
    }

    if (filter) {
        if (filter.status) where.status = filter.status;
        if (filter.planId) where.planId = filter.planId;
        if (filter.createdMonth) {
            const now = new Date();
            const firstDay = new Date(now.getFullYear(), now.getMonth(), 1);
            where.createdAt = { gte: firstDay };
        }
    }

    // Ensure sortBy is a valid field for Company model or handle it
    const allowedSortFields = ['name', 'email', 'createdAt', 'status'];
    const validSortBy = allowedSortFields.includes(sortBy) ? sortBy : 'createdAt';

    const [companies, totalCount] = await Promise.all([
        prisma.company.findMany({
            where,
            include: {
                plan: true,
                _count: {
                    select: {
                        branches: true,
                        users: true,
                        sales: true,
                    },
                },
            },
            orderBy: { [validSortBy]: sortOrder },
            skip,
            take: pageSize,
        }),
        prisma.company.count({ where }),
    ]);

    return {
        companies,
        totalCount,
        page,
        pageSize,
        totalPages: Math.ceil(totalCount / pageSize),
    };
}

export async function toggleCompanyStatus(companyId: string, currentStatus: CompanyStatus) {
    const newStatus = currentStatus === CompanyStatus.ACTIVE ? CompanyStatus.SUSPENDED : CompanyStatus.ACTIVE;

    await prisma.company.update({
        where: { id: companyId },
        data: { status: newStatus },
    });

    revalidatePath('/saas-admin');
    return { success: true };
}

export async function updateCompanyPlan(companyId: string, planId: string) {
    await prisma.company.update({
        where: { id: companyId },
        data: { planId },
    });

    revalidatePath('/saas-admin');
    revalidatePath(`/saas-admin/companies/${companyId}`);
    return { success: true };
}

export async function softDeleteCompany(companyId: string) {
    await prisma.company.update({
        where: { id: companyId },
        data: { deletedAt: new Date() },
    });

    revalidatePath('/saas-admin');
    return { success: true };
}

export async function getCompanyDetails(id: string) {
    const company = await prisma.company.findUnique({
        where: { id },
        include: {
            plan: { include: { modules: true } },
            _count: {
                select: {
                    branches: true,
                    users: true,
                    sales: true,
                    products: true,
                },
            },
            users: {
                orderBy: { createdAt: 'desc' },
            },
            branches: true,
        },
    });

    return JSON.parse(JSON.stringify(company));
}

// This will be replaced by the one at the end or I will just remove it here

export async function createCompany(data: {
    name: string;
    email: string;
    planId: string;
    adminName: string;
    adminEmail: string;
}) {
    const company = await prisma.company.create({
        data: {
            name: data.name,
            email: data.email,
            status: CompanyStatus.ACTIVE,
            planId: data.planId,
        },
    });

    // Create default admin for the new company
    const hashedPassword = await bcrypt.hash('temporary_password_change_me', 10);

    await prisma.user.create({
        data: {
            name: data.adminName,
            email: data.adminEmail,
            password: hashedPassword,
            systemRole: SystemRole.COMPANY_ADMIN,
            companyId: company.id,
        },
    });

    revalidatePath('/saas-admin');
    return { success: true, companyId: company.id };
}

// Keep only one version
export async function impersonateCompany(companyId: string) {
    const session = await getSession();
    if (!session || session.role !== SystemRole.SAAS_SUPER_ADMIN) {
        throw new Error('Unauthorized');
    }
    console.log(`[AUDIT] SaaS Admin ${session.userId} is impersonating Company: ${companyId}`);
    return { success: true, redirectUrl: '/' };
}

export async function updateCompanyDetails(data: {
    id: string;
    name: string;
    email: string;
    address: string;
    phone: string;
}) {
    const session = await getSession();
    if (!session || session.role !== SystemRole.SAAS_SUPER_ADMIN) {
        throw new Error('Unauthorized');
    }

    const updated = await prisma.company.update({
        where: { id: data.id },
        data: {
            name: data.name,
            email: data.email,
            address: data.address,
            phone: data.phone,
        }
    });

    revalidatePath(`/saas-admin/companies/${data.id}`);
    revalidatePath('/saas-admin/companies');
    
    return JSON.parse(JSON.stringify(updated));
}

export async function getPlans() {
    return await prisma.subscriptionPlan.findMany({
        include: { modules: true },
    });
}
