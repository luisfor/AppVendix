'use server';

import prisma from '@/lib/prisma';
import { CompanyStatus, SystemRole } from '@prisma/client';
import { revalidatePath } from 'next/cache';
import bcrypt from 'bcryptjs';

export async function getSaaSMetrics() {
    const [totalCompanies, activeCompanies, totalSales, totalRevenue] = await Promise.all([
        prisma.company.count(),
        prisma.company.count({ where: { status: CompanyStatus.ACTIVE } }),
        prisma.sale.count(),
        prisma.sale.aggregate({ _sum: { total: true } }),
    ]);

    return {
        totalCompanies,
        activeCompanies,
        totalSales,
        totalRevenue: Number(totalRevenue._sum.total || 0),
    };
}

export async function getCompanies() {
    return await prisma.company.findMany({
        include: {
            plan: true,
            _count: {
                select: {
                    branches: true,
                    users: true,
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
