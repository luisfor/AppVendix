import prisma from '@/lib/prisma';
import { Role, User, SystemRole } from '@prisma/client';

export const CompanyManagementService = {
    // 1. Gestión de Sucursales
    async getBranches(companyId: string) {
        return await prisma.branch.findMany({
            where: { companyId },
            include: {
                _count: {
                    select: { inventory: true, sales: true }
                }
            }
        });
    },

    async createBranch(companyId: string, data: { name: string; address?: string; phone?: string }) {
        return await prisma.branch.create({
            data: {
                ...data,
                companyId
            }
        });
    },

    // 2. Gestión de Usuarios y Roles
    async getCompanyUsers(companyId: string) {
        return await prisma.user.findMany({
            where: { companyId },
            include: { role: true }
        });
    },

    async createCompanyUser(companyId: string, data: {
        name: string;
        email: string;
        password: string;
        roleName: string;
    }) {
        const role = await prisma.role.findFirst({
            where: { name: data.roleName, companyId }
        });

        if (!role) throw new Error(`Rol ${data.roleName} no encontrado para esta empresa`);

        return await prisma.user.create({
            data: {
                name: data.name,
                email: data.email,
                password: data.password, // In real life, hash this
                systemRole: SystemRole.COMPANY_USER,
                companyId,
                roleId: role.id
            }
        });
    },

    async getAvailableRoles(companyId: string) {
        return await prisma.role.findMany({
            where: {
                OR: [
                    { companyId },
                    { companyId: 'GLOBAL' } // Posibilidad de roles base de la plataforma
                ]
            }
        });
    }
};
