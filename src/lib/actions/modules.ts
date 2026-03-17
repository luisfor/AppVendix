'use server';

import prisma from '@/lib/prisma';
import { ModuleStatus } from '@prisma/client';
import { revalidatePath } from 'next/cache';

export async function getModules(params: {
    page?: number;
    pageSize?: number;
    search?: string;
    status?: ModuleStatus;
} = {}) {
    const { page = 1, pageSize = 10, search, status } = params;
    const skip = (page - 1) * pageSize;

    const where: any = {};
    if (search) {
        where.OR = [
            { name: { contains: search, mode: 'insensitive' } },
            { code: { contains: search, mode: 'insensitive' } },
        ];
    }
    if (status) {
        where.status = status;
    }

    const [modules, totalCount] = await Promise.all([
        prisma.systemModule.findMany({
            where,
            include: {
                plans: {
                    select: { id: true, name: true }
                }
            },
            orderBy: { createdAt: 'desc' },
            skip,
            take: pageSize,
        }),
        prisma.systemModule.count({ where }),
    ]);

    return {
        modules: JSON.parse(JSON.stringify(modules)),
        totalCount,
        page,
        pageSize,
        totalPages: Math.ceil(totalCount / pageSize),
    };
}

export async function createModule(data: {
    code: string;
    name: string;
    description?: string;
    status: ModuleStatus;
    planIds?: string[];
}) {
    const { planIds, ...moduleData } = data;

    const module = await prisma.systemModule.create({
        data: {
            ...moduleData,
            plans: {
                connect: planIds?.map(id => ({ id }))
            }
        }
    });

    revalidatePath('/saas-admin/modules');
    return { success: true, module: JSON.parse(JSON.stringify(module)) };
}

export async function updateModule(id: string, data: {
    code?: string;
    name?: string;
    description?: string;
    status?: ModuleStatus;
    planIds?: string[];
}) {
    const { planIds, ...moduleData } = data;

    const module = await prisma.systemModule.update({
        where: { id },
        data: {
            ...moduleData,
            plans: {
                set: planIds?.map(id => ({ id }))
            }
        }
    });

    revalidatePath('/saas-admin/modules');
    return { success: true, module: JSON.parse(JSON.stringify(module)) };
}

export async function toggleModuleStatus(id: string, currentStatus: ModuleStatus) {
    const newStatus = currentStatus === ModuleStatus.ACTIVE ? ModuleStatus.INACTIVE : ModuleStatus.ACTIVE;

    await prisma.systemModule.update({
        where: { id },
        data: { status: newStatus }
    });

    revalidatePath('/saas-admin/modules');
    return { success: true };
}

export async function deleteModule(id: string) {
    // Check if any company is using it
    const usageCount = await prisma.companyModule.count({
        where: { moduleId: id }
    });

    if (usageCount > 0) {
        return { success: false, error: 'Cannot delete module while it is being used by companies.' };
    }

    await prisma.systemModule.delete({
        where: { id }
    });

    revalidatePath('/saas-admin/modules');
    return { success: true };
}
