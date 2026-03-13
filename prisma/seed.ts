import { PrismaClient, CompanyStatus, SystemRole } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
    console.log('--- Iniciando Seeding SaaS Premium con Productos ---');

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

    // 2. Create Global Role
    const superAdminRole = await prisma.role.upsert({
        where: { name_companyId: { name: 'Super Administrador SaaS', companyId: 'GLOBAL' } },
        update: {},
        create: {
            name: 'Super Administrador SaaS',
            description: 'Acceso total',
            companyId: 'GLOBAL',
            permissions: {
                connect: permissions.filter(p => p.resource === 'SAAS_PANEL').map(p => ({ action_resource: { action: p.action, resource: p.resource } })),
            },
        },
    });

    // 3. System Modules
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

    // 4. Plans
    const plans = [
        { name: 'Plan Básico', price: 29.90, modules: ['POS_BASIC', 'INVENTORY'] },
        { name: 'Plan Profesional', price: 59.90, modules: ['POS_BASIC', 'INVENTORY', 'REPORTS_PRO'] },
        { name: 'Plan Enterprise', price: 99.90, modules: ['POS_BASIC', 'INVENTORY', 'REPORTS_PRO', 'WORKSHOP'] },
    ];

    for (const p of plans) {
        await prisma.subscriptionPlan.upsert({
            where: { name: p.name },
            update: {},
            create: {
                name: p.name,
                price: p.price,
                duration: 30,
                modules: { connect: p.modules.map(code => ({ code })) }
            }
        });
    }

    // 5. Farmacia Salud y Vida
    const proPlan = await prisma.subscriptionPlan.findUnique({ where: { name: 'Plan Profesional' }, include: { modules: true } });
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

        // Modules
        for (const mod of proPlan.modules) {
            await prisma.companyModule.upsert({
                where: { companyId_moduleId: { companyId: company.id, moduleId: mod.id } },
                update: { enabled: true },
                create: { companyId: company.id, moduleId: mod.id, enabled: true },
            });
        }

        // Branch
        const mainBranch = await prisma.branch.upsert({
            where: { id: 'branch-master-1' },
            update: {},
            create: {
                id: 'branch-master-1',
                name: 'Farmacia Salud y Vida - Central',
                address: 'Av. Larco 456, Miraflores',
                companyId: company.id
            }
        });

        // Admin
        await prisma.user.upsert({
            where: { email: 'admin@saludvida.com' },
            update: { companyId: company.id },
            create: {
                email: 'admin@saludvida.com',
                password: 'secure',
                name: 'Admin Farmacia',
                systemRole: SystemRole.COMPANY_ADMIN,
                companyId: company.id
            }
        });

        // 6. CATEGORIES & PRODUCTS
        const categories = ['Medicamentos', 'Higiene', 'Cuidado Personal'];
        for (const catName of categories) {
            const category = await prisma.category.upsert({
                where: { name_companyId: { name: catName, companyId: company.id } },
                update: {},
                create: { name: catName, companyId: company.id }
            });

            const products = catName === 'Medicamentos'
                ? [
                    { name: 'Paracetamol 500mg', price: 0.50, cost: 0.20 },
                    { name: 'Ibuprofeno 400mg', price: 1.20, cost: 0.50 },
                    { name: 'Amoxicilina 500mg', price: 2.50, cost: 1.00 }
                ]
                : catName === 'Higiene'
                    ? [
                        { name: 'Jabón Líquido', price: 8.50, cost: 4.00 },
                        { name: 'Pasta Dental', price: 5.90, cost: 2.50 }
                    ]
                    : [
                        { name: 'Bloqueador Solar', price: 45.00, cost: 20.00 },
                        { name: 'Crema Hidratante', price: 32.00, cost: 15.00 }
                    ];

            for (const p of products) {
                const product = await prisma.product.upsert({
                    where: { barcode_companyId: { barcode: `BC-${p.name.substring(0, 3).toUpperCase()}`, companyId: company.id } },
                    update: {},
                    create: {
                        name: p.name,
                        barcode: `BC-${p.name.substring(0, 3).toUpperCase()}`,
                        salePrice: p.price,
                        costPrice: p.cost,
                        categoryId: category.id,
                        companyId: company.id
                    }
                });

                // Initial Inventory
                await prisma.inventory.upsert({
                    where: { productId_branchId: { productId: product.id, branchId: mainBranch.id } },
                    update: {},
                    create: {
                        productId: product.id,
                        branchId: mainBranch.id,
                        stock: 500
                    }
                });
            }
        }

        console.log('✅ Datos maestros (Categorías, Productos e Inventario) creados');
    }

    console.log('--- Seeding Finalizado ---');
}

main().catch(console.error).finally(() => prisma.$disconnect());
