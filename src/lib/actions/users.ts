'use server';

import prisma from '@/lib/prisma';
import { getSession } from '@/lib/auth-utils';
import { SystemRole } from '@prisma/client';
import { revalidatePath } from 'next/cache';
import bcrypt from 'bcryptjs';

/**
 * Super Admin Level: Get all platform admins
 */
export async function getSaaSAdmins() {
    const session = await getSession();
    if (!session || session.role !== SystemRole.SAAS_SUPER_ADMIN) {
        throw new Error('Unauthorized');
    }

    const admins = await prisma.user.findMany({
        where: {
            systemRole: SystemRole.SAAS_SUPER_ADMIN
        },
        orderBy: {
            createdAt: 'desc'
        }
    });

    return JSON.parse(JSON.stringify(admins));
}

/**
 * Company Level: Get users for a specific company
 */
export async function getCompanyUsers(companyId: string) {
    const session = await getSession();

    // Safety: Super admin can see any company users, 
    // but a company admin can only see their own.
    if (!session || (session.role !== SystemRole.SAAS_SUPER_ADMIN && session.companyId !== companyId)) {
        throw new Error('Unauthorized');
    }

    const users = await prisma.user.findMany({
        where: {
            companyId: companyId
        },
        include: {
            role: true
        },
        orderBy: {
            createdAt: 'desc'
        }
    });

    return JSON.parse(JSON.stringify(users));
}

/**
 * Shared: Create or update a user (SaaS admin or Company user)
 */
export async function upsertUser(data: {
    id?: string;
    email: string;
    password?: string;
    name: string;
    systemRole: SystemRole;
    companyId?: string;
    image?: string;
    documentType?: string;
    documentNumber?: string;
    phone?: string;
    address?: string;
}) {
    const session = await getSession();
    if (!session) throw new Error('Unauthorized');

    // Security Rules:
    // 1. Only SuperAdmin can create other SuperAdmins.
    if (data.systemRole === SystemRole.SAAS_SUPER_ADMIN && session.role !== SystemRole.SAAS_SUPER_ADMIN) {
        throw new Error('Forbidden: Only platform owners can create admins');
    }

    // 2. Company admins can only create users for their own company.
    if (session.role !== SystemRole.SAAS_SUPER_ADMIN && data.companyId !== session.companyId) {
        throw new Error('Forbidden: Cannot create users for another company');
    }

    const { id, password, companyId, ...baseData } = data;

    const userData: any = {
        email: baseData.email,
        name: baseData.name,
        systemRole: baseData.systemRole,
        image: baseData.image || null,
        documentType: baseData.documentType || null,
        documentNumber: baseData.documentNumber || null,
        phone: baseData.phone || null,
        address: baseData.address || null,
    };

    if (password) {
        userData.password = await bcrypt.hash(password, 10);
    }

    // Relation mapping
    if (companyId) {
        userData.company = { connect: { id: companyId } };
    } else if (id) {
        userData.company = { disconnect: true };
    }

    if (id) {
        const user = await prisma.user.update({
            where: { id: id },
            data: userData,
        });
        revalidatePaths(companyId);
        return { success: true, user };
    } else {
        // Check if email already exists
        const existing = await prisma.user.findUnique({ where: { email: data.email } });
        if (existing) return { error: 'El email ya está registrado' };

        if (!password) throw new Error('Password is required for new users');

        const user = await prisma.user.create({
            data: {
                ...userData,
                password: userData.password // Added via hash above
            },
        });
        revalidatePaths(companyId);
        return { success: true, user };
    }
}

export async function deleteUser(id: string) {
    const session = await getSession();
    if (!session) throw new Error('No autorizado');

    if (session.userId === id) {
        return { error: 'Seguridad: No puedes eliminar tu propia cuenta mientras estás logueado.' };
    }

    const userToDelete = await prisma.user.findUnique({ 
        where: { id },
        include: {
            // Check for potential blockages (e.g. if we add sales link to user later)
            // For now, let's keep it check for existance
        }
    });
    
    if (!userToDelete) throw new Error('Usuario no encontrado');

    // SaaS Admin Security
    if (userToDelete.systemRole === SystemRole.SAAS_SUPER_ADMIN && session.role !== SystemRole.SAAS_SUPER_ADMIN) {
        throw new Error('Prohibido: Solo un Super Admin puede eliminar a otro.');
    }

    // Company Security
    if (session.role !== SystemRole.SAAS_SUPER_ADMIN && userToDelete.companyId !== session.companyId) {
        throw new Error('Prohibido: No tienes permisos sobre este recurso.');
    }

    try {
        await prisma.user.delete({ where: { id } });
        revalidatePaths(userToDelete.companyId);
        return { success: true };
    } catch (error: any) {
        if (error.code === 'P2003') {
            return { error: 'No se puede eliminar: El usuario tiene registros asociados en el sistema (ej. ventas, turnos).' };
        }
        return { error: 'Error inesperado al intentar eliminar el usuario.' };
    }
}

function revalidatePaths(companyId?: string | null) {
    revalidatePath('/saas-admin/admins');
    revalidatePath('/saas-admin/companies');
    revalidatePath('/usuarios');
    if (companyId) {
        revalidatePath(`/saas-admin/companies/${companyId}`);
    }
}
