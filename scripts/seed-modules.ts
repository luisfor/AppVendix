import { PrismaClient, ModuleStatus } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
    console.log('Seeding system modules...');

    const modules = [
        {
            code: 'POS_BASIC',
            name: 'Terminal de Ventas',
            description: 'Punto de venta básico con gestión de boletas y facturas.',
            status: ModuleStatus.ACTIVE,
        },
        {
            code: 'INVENTORY_BASIC',
            name: 'Gestión de Inventario',
            description: 'Control de stock por sucursal y alertas de vencimiento.',
            status: ModuleStatus.ACTIVE,
        },
        {
            code: 'REPORTS_BASIC',
            name: 'Reportes Estándar',
            description: 'Estadísticas de ventas diarias y mensuales.',
            status: ModuleStatus.ACTIVE,
        },
        {
            code: 'MULTIBRANCH',
            name: 'Multisucursal',
            description: 'Gestión centralizada de múltiples sedes físicas.',
            status: ModuleStatus.BETA,
        },
        {
            code: 'EFLOW',
            name: 'Flujos de Efectivo',
            description: 'Control avanzado de caja y arqueos preventivos.',
            status: ModuleStatus.IN_DEVELOPMENT,
        },
    ];

    for (const moduleData of modules) {
        await prisma.systemModule.upsert({
            where: { code: moduleData.code },
            update: moduleData,
            create: moduleData,
        });
    }

    console.log('Modules seeded successfully.');
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
