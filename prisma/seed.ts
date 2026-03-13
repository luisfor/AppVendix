import { PrismaClient, CompanyStatus, SystemRole } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
    console.log('--- Iniciando Seeding SaaS Premium ---');

    // 1. Create Permissions
    const permissions = [
        { action: 'MANAGE_COMPANIES', resource: 'SAAS_PANEL' },
        { action: 'MANAGE_PLANS', resource: 'SAAS_PANEL' },
        { action: 'VIEW_GLOBAL_METRICS', resource: 'SAAS_PANEL' },
        { action: 'MANAGE_BRANCHES', resource: 'COMPANY' },
        { action: 'MANAGE_USERS', resource: 'COMPANY' },
        { action: 'SELL_PRODUCTS', resource: 'POS' },
        { action: 'MANAGE_INVENTORY', resource: 'INVENTORY' },
    ];

    for (const p of permissions) {
        await prisma.permission.upsert({
            where: { action_resource: { action: p.action, resource: p.resource } },
            update: {},
            create: p,
        });
    }
    console.log('✅ Permisos creados');

    // 2. Create Global Role (Super Admin)
    const superAdminRole = await prisma.role.upsert({
        where: { name_companyId: { name: 'Super Administrador SaaS', companyId: 'GLOBAL' } },
        update: {},
        create: {
            name: 'Super Administrador SaaS',
            description: 'Dueño del sistema con acceso total',
            companyId: 'GLOBAL',
            permissions: {
                connect: [
                    { action_resource: { action: 'MANAGE_COMPANIES', resource: 'SAAS_PANEL' } },
                    { action_resource: { action: 'MANAGE_PLANS', resource: 'SAAS_PANEL' } },
                    { action_resource: { action: 'VIEW_GLOBAL_METRICS', resource: 'SAAS_PANEL' } },
                ],
            },
        },
    });
    console.log('✅ Rol de Super Admin creado');

    // 3. Create SaaS Super Admin User
    await prisma.user.upsert({
        where: { email: 'admin@pos-saas.com' },
        update: {},
        create: {
            email: 'admin@pos-saas.com',
            password: 'admin_password_securo',
            name: 'SaaS Owner',
            systemRole: SystemRole.SAAS_SUPER_ADMIN,
            roleId: superAdminRole.id,
        },
    });
    console.log('✅ Usuario Super Admin creado');

    // 4. Create System Modules
    const modules = [
        { code: 'POS_BASIC', name: 'Punto de Venta Básico' },
        { code: 'INVENTORY', name: 'Gestión de Inventario' },
        { code: 'REPORTS_PRO', name: 'Reportes Avanzados' },
        { code: 'WORKSHOP', name: 'Módulo de Taller/Servicios' },
    ];

    for (const m of modules) {
        await prisma.systemModule.upsert({
            where: { code: m.code },
            update: {},
            create: m,
        });
    }
    console.log('✅ Módulos del sistema creados');

    // 5. Create Subscription Plans
    const plans = [
        {
            name: 'Plan Básico',
            description: 'Ideal para pequeños negocios',
            price: 29.90,
            duration: 30,
            moduleCodes: ['POS_BASIC', 'INVENTORY'],
        },
        {
            name: 'Plan Profesional',
            description: 'Para empresas en crecimiento',
            price: 59.90,
            duration: 30,
            moduleCodes: ['POS_BASIC', 'INVENTORY', 'REPORTS_PRO'],
        },
        {
            name: 'Plan Enterprise',
            description: 'Acceso total y soporte prioritario',
            price: 99.90,
            duration: 30,
            moduleCodes: ['POS_BASIC', 'INVENTORY', 'REPORTS_PRO', 'WORKSHOP'],
        },
    ];

    for (const p of plans) {
        await prisma.subscriptionPlan.upsert({
            where: { name: p.name },
            update: {},
            create: {
                name: p.name,
                description: p.description,
                price: p.price,
                duration: p.duration,
                modules: {
                    connect: p.moduleCodes.map(code => ({ code })),
                },
            },
        });
    }
    console.log('✅ Planes de suscripción creados');

    // 6. Create Test Company (Farmacia Salud y Vida)
    const proPlan = await prisma.subscriptionPlan.findUnique({
        where: { name: 'Plan Profesional' },
        include: { modules: true }
    });

    if (proPlan) {
        const company = await prisma.company.upsert({
            where: { email: 'contacto@saludvida.com' },
            update: { status: CompanyStatus.ACTIVE, planId: proPlan.id },
            create: {
                name: 'Farmacia Salud y Vida',
                email: 'contacto@saludvida.com',
                status: CompanyStatus.ACTIVE,
                planId: proPlan.id,
            },
        });

        // Enabled Modules for Company
        for (const mod of proPlan.modules) {
            await prisma.companyModule.upsert({
                where: { companyId_moduleId: { companyId: company.id, moduleId: mod.id } },
                update: { enabled: true },
                create: { companyId: company.id, moduleId: mod.id, enabled: true },
            });
        }

        // Default Company Admin Role
        const adminRole = await prisma.role.upsert({
            where: { name_companyId: { name: 'Administrador de Empresa', companyId: company.id } },
            update: {},
            create: {
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

        // Create Initial Admin User for Company
        await prisma.user.upsert({
            where: { email: 'admin@saludvida.com' },
            update: { companyId: company.id, roleId: adminRole.id },
            create: {
                email: 'admin@saludvida.com',
                password: 'secure_password_123',
                name: 'Administrador Farmacia',
                systemRole: SystemRole.COMPANY_ADMIN,
                companyId: company.id,
                roleId: adminRole.id,
            },
        });

        // Create a default branch
        await prisma.branch.upsert({
            where: { id: 'default-branch-1' }, // Specific ID for upsert in seed
            update: {},
            create: {
                id: 'default-branch-1',
                name: 'Sucursal Principal - Lima',
                address: 'Av. Universitaria 1234',
                phone: '01 456-7890',
                companyId: company.id,
            }
        });

        console.log('✅ Empresa de prueba "Farmacia Salud y Vida" creada con éxito');
    }

    console.log('--- Seeding Premium Completado ---');
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
