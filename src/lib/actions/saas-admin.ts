'use server';

import prisma from '@/lib/prisma';
import { CompanyStatus, SystemRole } from '@prisma/client';
import { revalidatePath } from 'next/cache';
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

    const mrr = activePlans.reduce((acc, company) => acc + Number(company.plan?.price || 0), 0);

    return {
        totalCompanies,
        activeCompanies,
        suspendedCompanies,
        mrr,
        newCompaniesThisMonth,
        estimatedYearlyRevenue: mrr * 12,
        totalPlatformUsers,
    };
}

export async function getCompanies() {
    return await prisma.company.findMany({
        where: {},
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
        orderBy: { createdAt: 'desc' },
    });
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
    return await prisma.company.findUnique({
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
                take: 10,
                orderBy: { createdAt: 'desc' },
            },
            branches: true,
        },
    });
}

export async function impersonateCompany(companyId: string) {
    // In a real app, this would set a special "impersonation" cookie or update the session
    // For this POC, we'll return a success and perhaps log it
    console.log(`[AUDIT] SaaS Admin is impersonating Company: ${companyId}`);
    return { success: true, redirectUrl: '/' };
}

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

export async function getPlans() {
    return await prisma.subscriptionPlan.findMany({
        include: { modules: true },
    });
}
