import { PrismaClient, CompanyStatus, SystemRole } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
    console.log('--- Iniciando Seeding SaaS ---');

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
            password: 'admin_password_securo', // In real life, hash this
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
            modules: ['POS_BASIC', 'INVENTORY'],
        },
        {
            name: 'Plan Profesional',
            description: 'Para empresas en crecimiento',
            price: 59.90,
            duration: 30,
            modules: ['POS_BASIC', 'INVENTORY', 'REPORTS_PRO'],
        },
        {
            name: 'Plan Enterprise',
            description: 'Acceso total y soporte prioritario',
            price: 99.90,
            duration: 30,
            modules: ['POS_BASIC', 'INVENTORY', 'REPORTS_PRO', 'WORKSHOP'],
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
                    connect: p.modules.map(code => ({ code })),
                },
            },
        });
    }
    console.log('✅ Planes de suscripción creados');

    console.log('--- Seeding Completado ---');
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
