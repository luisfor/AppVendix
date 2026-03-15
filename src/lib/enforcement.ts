import prisma from '@/lib/prisma';
import { CompanyStatus, SubscriptionState } from '@prisma/client';

export type EnforcementResult = {
    allowed: boolean;
    reason?: string;
};

/**
 * Validates if the company has an active subscription.
 */
export async function enforceActiveSubscription(companyId: string): Promise<EnforcementResult> {
    const company = await prisma.company.findUnique({
        where: { id: companyId }
    });

    if (!company) return { allowed: false, reason: 'Company not found' };
    if (company.status === CompanyStatus.SUSPENDED) {
        return { allowed: false, reason: 'La suscripción está suspendida. Regulariza tu pago para continuar.' };
    }

    if (company.subscriptionState === SubscriptionState.OVER_LIMIT) {
        return { allowed: false, reason: 'Has superado los límites de tu plan actual tras el último cambio. Debes eliminar recursos o mejorar tu plan para crear nuevos datos.' };
    }

    return { allowed: true };
}

/**
 * Validates if a company can create a new user.
 */
export async function canCreateUser(companyId: string): Promise<EnforcementResult> {
    const activeCheck = await enforceActiveSubscription(companyId);
    if (!activeCheck.allowed) return activeCheck;

    const company = await prisma.company.findUnique({
        where: { id: companyId },
        include: { plan: true, _count: { select: { users: true } } }
    });

    const maxUsers = company?.plan?.maxUsers ?? -1;
    if (maxUsers !== -1 && (company?._count.users ?? 0) >= maxUsers) {
        return { allowed: false, reason: `Has alcanzado el límite de ${maxUsers} usuarios para tu plan actual. Mejora tu plan para agregar más.` };
    }

    return { allowed: true };
}

/**
 * Validates if a company can create a new branch.
 */
export async function canCreateBranch(companyId: string): Promise<EnforcementResult> {
    const activeCheck = await enforceActiveSubscription(companyId);
    if (!activeCheck.allowed) return activeCheck;

    const company = await prisma.company.findUnique({
        where: { id: companyId },
        include: { plan: true, _count: { select: { branches: true } } }
    });

    const maxBranches = company?.plan?.maxBranches ?? -1;
    if (maxBranches !== -1 && (company?._count.branches ?? 0) >= maxBranches) {
        return { allowed: false, reason: `Has alcanzado el límite de ${maxBranches} sucursales para tu plan actual. Mejora tu plan para expandirte.` };
    }

    return { allowed: true };
}

/**
 * Validates if a company can create a new product.
 */
export async function canCreateProduct(companyId: string): Promise<EnforcementResult> {
    const activeCheck = await enforceActiveSubscription(companyId);
    if (!activeCheck.allowed) return activeCheck;

    const company = await prisma.company.findUnique({
        where: { id: companyId },
        include: { plan: true, _count: { select: { products: true } } }
    });

    const maxProducts = company?.plan?.maxProducts ?? -1;
    if (maxProducts !== -1 && (company?._count.products ?? 0) >= maxProducts) {
        return { allowed: false, reason: `Has alcanzado el límite de catálago de ${maxProducts} productos. Mejora tu plan para registrar más.` };
    }

    return { allowed: true };
}

/**
 * Validates if a company has access to a specific premium module (e.g., MULTI_BRANCH, REPORTS).
 */
export async function canAccessModule(companyId: string, moduleCode: string): Promise<EnforcementResult> {
    const activeCheck = await enforceActiveSubscription(companyId);
    if (!activeCheck.allowed) return activeCheck;

    const company = await prisma.company.findUnique({
        where: { id: companyId },
        include: {
            plan: {
                include: {
                    modules: true
                }
            }
        }
    });

    if (!company?.plan) return { allowed: false, reason: 'No plan assigned.' };

    const hasModule = company.plan.modules.some(m => m.code === moduleCode);
    if (!hasModule) {
        return { allowed: false, reason: `Tu plan actual no incluye acceder al módulo: ${moduleCode}. Por favor sube de plan.` };
    }

    return { allowed: true };
}
