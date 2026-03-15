'use server';

import prisma from '@/lib/prisma';
import { PlanStatus } from '@prisma/client';
import { requireSaaSAdmin } from './auth';

export async function getPlans(includeArchived = false) {
    await requireSaaSAdmin();

    const where = includeArchived ? {} : {
        status: { in: [PlanStatus.ACTIVE, PlanStatus.INACTIVE] }
    };

    const plans = await prisma.subscriptionPlan.findMany({
        where,
        include: {
            modules: true,
            _count: {
                select: { companies: true }
            }
        },
        orderBy: { monthlyPrice: 'asc' }
    });

    return plans;
}

export async function getPlanById(id: string) {
    await requireSaaSAdmin();
    return prisma.subscriptionPlan.findUnique({
        where: { id },
        include: { modules: true, priceHistory: { orderBy: { effectiveDate: 'desc' } } }
    });
}

export async function createPlan(data: {
    code?: string,
    name: string,
    description?: string,
    monthlyPrice: number,
    yearlyPrice: number,
    maxUsers: number,
    maxBranches: number,
    maxProducts: number,
    isTrialEligible: boolean,
    allowCourtesy: boolean,
    moduleIds: string[]
}) {
    await requireSaaSAdmin();

    const newPlan = await prisma.subscriptionPlan.create({
        data: {
            code: data.code || `PLAN-${Date.now()}`,
            name: data.name,
            description: data.description,
            monthlyPrice: data.monthlyPrice,
            yearlyPrice: data.yearlyPrice,
            duration: 30, // Legacy support
            maxUsers: data.maxUsers,
            maxBranches: data.maxBranches,
            maxProducts: data.maxProducts,
            isTrialEligible: data.isTrialEligible,
            allowCourtesy: data.allowCourtesy,
            version: 1,
            modules: {
                connect: data.moduleIds.map(id => ({ id }))
            },
            priceHistory: {
                create: {
                    monthlyPrice: data.monthlyPrice,
                    yearlyPrice: data.yearlyPrice,
                }
            }
        }
    });

    return { success: true, plan: newPlan };
}

export async function duplicatePlan(id: string) {
    await requireSaaSAdmin();

    const original = await prisma.subscriptionPlan.findUnique({
        where: { id },
        include: { modules: true }
    });

    if (!original) throw new Error("Plan not found");

    const duplicate = await prisma.subscriptionPlan.create({
        data: {
            ...original,
            id: undefined, // Let db handle
            name: `${original.name} (Copy)`,
            code: `${original.code || 'PLAN'}-COPY-${Date.now()}`,
            createdAt: undefined,
            updatedAt: undefined,
            modules: { connect: original.modules.map(m => ({ id: m.id })) },
            priceHistory: {
                create: { monthlyPrice: original.monthlyPrice, yearlyPrice: original.yearlyPrice }
            }
        }
    });

    return { success: true, plan: duplicate };
}

export async function togglePlanStatus(id: string, currentStatus: PlanStatus) {
    await requireSaaSAdmin();

    const newStatus = currentStatus === PlanStatus.ACTIVE ? PlanStatus.INACTIVE : PlanStatus.ACTIVE;

    const plan = await prisma.subscriptionPlan.update({
        where: { id },
        data: { status: newStatus }
    });

    return { success: true, plan };
}

export async function softDeletePlan(id: string) {
    await requireSaaSAdmin();

    const plan = await prisma.subscriptionPlan.findUnique({
        where: { id },
        include: { _count: { select: { companies: true } } }
    });

    if (!plan) throw new Error("Plan not found");

    if (plan._count.companies > 0) {
        throw new Error("Cannot delete plan with active subscriptions. Archive it instead.");
    }

    await prisma.subscriptionPlan.update({
        where: { id },
        data: { status: PlanStatus.ARCHIVED }
    });

    return { success: true };
}

export async function updatePlan(id: string, data: {
    name: string,
    description?: string,
    monthlyPrice: number,
    yearlyPrice: number,
    maxUsers: number,
    maxBranches: number,
    maxProducts: number,
    isTrialEligible: boolean,
    allowCourtesy: boolean,
    moduleIds: string[]
}) {
    await requireSaaSAdmin();

    return await prisma.$transaction(async (tx) => {
        const original = await tx.subscriptionPlan.findUnique({
            where: { id },
            include: { modules: true, _count: { select: { companies: true } } }
        });

        if (!original) throw new Error("Plan not found");

        // 1. Determine if we need a new version
        const samePrice = Number(original.monthlyPrice) === data.monthlyPrice && Number(original.yearlyPrice) === data.yearlyPrice;
        const sameLimits = original.maxUsers === data.maxUsers && original.maxBranches === data.maxBranches && original.maxProducts === data.maxProducts;

        // If there are NO active companies, we can just update in place regardless
        const hasSubscribers = original._count.companies > 0;

        if (hasSubscribers && (!samePrice || !sameLimits)) {
            // WE MUST VERSION TO PROTECT EXISTING CUSTOMERS

            // Step A: Archive old plan
            await tx.subscriptionPlan.update({
                where: { id },
                data: { status: PlanStatus.ARCHIVED }
            });

            // Step B: Create New Version
            const newVersion = await tx.subscriptionPlan.create({
                data: {
                    code: original.code, // Keep same code to group them logically later
                    version: original.version + 1,
                    name: data.name,
                    description: data.description,
                    monthlyPrice: data.monthlyPrice,
                    yearlyPrice: data.yearlyPrice,
                    duration: 30,
                    maxUsers: data.maxUsers,
                    maxBranches: data.maxBranches,
                    maxProducts: data.maxProducts,
                    isTrialEligible: data.isTrialEligible,
                    allowCourtesy: data.allowCourtesy,
                    status: PlanStatus.ACTIVE,
                    modules: {
                        connect: data.moduleIds.map(mid => ({ id: mid }))
                    },
                    priceHistory: {
                        create: { monthlyPrice: data.monthlyPrice, yearlyPrice: data.yearlyPrice }
                    }
                }
            });
            return { success: true, plan: newVersion, versioned: true };
        } else {
            // WE CAN IN-PLACE UPDATE (No subscribers yet, or just changing name/description/modules/flags)

            // Check if price changed (only relevant if hasSubscribers is false, otherwise caught above)
            if (!samePrice) {
                await tx.planPriceHistory.create({
                    data: { planId: id, monthlyPrice: data.monthlyPrice, yearlyPrice: data.yearlyPrice }
                });
            }

            // Update modules: Disconnect all, connect new
            await tx.subscriptionPlan.update({
                where: { id },
                data: { modules: { set: [] } }
            });

            const updated = await tx.subscriptionPlan.update({
                where: { id },
                data: {
                    name: data.name,
                    description: data.description,
                    monthlyPrice: data.monthlyPrice,
                    yearlyPrice: data.yearlyPrice,
                    maxUsers: data.maxUsers,
                    maxBranches: data.maxBranches,
                    maxProducts: data.maxProducts,
                    isTrialEligible: data.isTrialEligible,
                    allowCourtesy: data.allowCourtesy,
                    modules: { connect: data.moduleIds.map(mid => ({ id: mid })) }
                }
            });

            return { success: true, plan: updated, versioned: false };
        }
    });
}
