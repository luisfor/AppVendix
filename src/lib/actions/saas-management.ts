import prisma from '../prisma.ts';
import { CompanyStatus, SystemRole } from '@prisma/client';

/**
 * Servicio para el Super Administrador de la plataforma (SaaS Owner)
 */
export const SaaSManagementService = {
    // 1. Gestión de Empresas (Clientes)
    async createClientCompany(data: {
        name: string;
        email: string;
        planName: string;
        adminUser: { name: string; email: string; password: string };
    }) {
        return await prisma.$transaction(async (tx) => {
            // Obtener plan
            const plan = await tx.subscriptionPlan.findUnique({
                where: { name: data.planName },
                include: { modules: true },
            });

            if (!plan) throw new Error('Plan de suscripción no encontrado');

            // Crear Empresa
            const company = await tx.company.create({
                data: {
                    name: data.name,
                    email: data.email,
                    planId: plan.id,
                    status: CompanyStatus.ACTIVE,
                },
            });

            // Habilitar módulos iniciales según el plan
            const moduleAssignments = plan.modules.map((module) => ({
                companyId: company.id,
                moduleId: module.id,
                enabled: true,
            }));

            await tx.companyModule.createMany({
                data: moduleAssignments,
            });

            // Crear Rol de Administrador de Empresa por defecto
            const adminRole = await tx.role.create({
                data: {
                    name: 'Administrador de Empresa',
                    description: 'Acceso total dentro de su propia empresa',
                    companyId: company.id,
                    permissions: {
                        connect: [
                            { action_resource: { action: 'MANAGE_BRANCHES', resource: 'COMPANY' } },
                            { action_resource: { action: 'MANAGE_USERS', resource: 'COMPANY' } },
                            { action_resource: { action: 'MANAGE_INVENTORY', resource: 'INVENTORY' } },
                            { action_resource: { action: 'SELL_PRODUCTS', resource: 'POS' } },
                        ],
                    },
                },
            });

            // Crear Usuario Administrador Inicial
            const user = await tx.user.create({
                data: {
                    email: data.adminUser.email,
                    password: data.adminUser.password, // In real life, hash this
                    name: data.adminUser.name,
                    systemRole: SystemRole.COMPANY_ADMIN,
                    companyId: company.id,
                    roleId: adminRole.id,
                },
            });

            return { company, adminUser: user };
        });
    },

    async updateCompanyStatus(companyId: string, status: CompanyStatus) {
        return await prisma.company.update({
            where: { id: companyId },
            data: { status },
        });
    },

    async toggleModuleForCompany(companyId: string, moduleId: string, enabled: boolean) {
        return await prisma.companyModule.upsert({
            where: { companyId_moduleId: { companyId, moduleId } },
            update: { enabled },
            create: { companyId, moduleId, enabled },
        });
    },

    // 2. Métricas Globales
    async getGlobalUsageMetrics() {
        const totalCompanies = await prisma.company.count();
        const activeCompanies = await prisma.company.count({ where: { status: CompanyStatus.ACTIVE } });
        const totalSales = await prisma.sale.aggregate({ _sum: { total: true } });

        return {
            totalCompanies,
            activeCompanies,
            totalRevenue: totalSales._sum.total || 0,
        };
    }
};
