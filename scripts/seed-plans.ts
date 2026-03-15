import { PrismaClient, PlanStatus } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
    console.log("Seeding Subscription Plans and Modules...");

    // 1. Create Base Modules
    const modules = await Promise.all([
        prisma.systemModule.upsert({
            where: { code: 'INVENTORY' },
            update: {},
            create: { code: 'INVENTORY', name: 'Gestión de Inventario', description: 'Control de stock y almacenes' }
        }),
        prisma.systemModule.upsert({
            where: { code: 'REPORTS' },
            update: {},
            create: { code: 'REPORTS', name: 'Reportes Avanzados', description: 'Métricas y gráficos detallados' }
        }),
        prisma.systemModule.upsert({
            where: { code: 'MULTI_BRANCH' },
            update: {},
            create: { code: 'MULTI_BRANCH', name: 'Multisucursal', description: 'Gestión de múltiples sedes' }
        }),
        prisma.systemModule.upsert({
            where: { code: 'API_ACCESS' },
            update: {},
            create: { code: 'API_ACCESS', name: 'Acceso API', description: 'Integraciones externas' }
        })
    ]);

    console.log("Modules ready.");

    // 2. Clear existing plans (Optional, but good for a fresh start)
    // Be careful with this if there are existing active subscriptions!
    // Since this is a test environment, we'll try to create/upsert.

    const plans = [
        {
            code: 'BASIC_V1',
            name: 'Plan Básico',
            description: 'Ideal para negocios pequeños que están empezando.',
            monthlyPrice: 29.00,
            yearlyPrice: 290.00,
            duration: 30,
            status: PlanStatus.ACTIVE,
            maxUsers: 2,
            maxBranches: 1,
            maxProducts: 500,
            maxEmailsPerMonth: 500,
            isTrialEligible: true,
            allowCourtesy: false,
            modules: {
                connect: [{ id: modules[0].id }] // Only Inventory
            }
        },
        {
            code: 'PRO_V1',
            name: 'Plan Profesional',
            description: 'Para negocios en crecimiento que necesitan más control.',
            monthlyPrice: 59.00,
            yearlyPrice: 590.00,
            duration: 30,
            status: PlanStatus.ACTIVE,
            maxUsers: 5,
            maxBranches: 3,
            maxProducts: 5000,
            maxEmailsPerMonth: 2500,
            isTrialEligible: true,
            allowCourtesy: true,
            modules: {
                connect: [{ id: modules[0].id }, { id: modules[1].id }, { id: modules[2].id }] // Inv, Reports, Multi-branch
            }
        },
        {
            code: 'ENTERPRISE_V1',
            name: 'Plan Empresarial',
            description: 'La solución definitiva sin límites para grandes empresas.',
            monthlyPrice: 99.00,
            yearlyPrice: 990.00,
            duration: 30,
            status: PlanStatus.ACTIVE,
            maxUsers: -1,
            maxBranches: -1,
            maxProducts: -1,
            maxEmailsPerMonth: 10000,
            isTrialEligible: false,
            allowCourtesy: true,
            modules: {
                connect: modules.map(m => ({ id: m.id })) // All modules
            }
        }
    ];

    for (const planData of plans) {
        const existingPlan = await prisma.subscriptionPlan.findUnique({
            where: { name: planData.name }
        });

        if (!existingPlan) {
            await prisma.subscriptionPlan.create({
                data: planData
            });
            console.log(`Created plan: ${planData.name}`);
        } else {
            await prisma.subscriptionPlan.update({
                where: { id: existingPlan.id },
                data: planData
            });
            console.log(`Plan ${planData.name} already exists. Updated to reflect new limits.`);
        }
    }

    console.log("Seeding completed successfully.");
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
