import prisma from './prisma';

async function verify() {
    const salesCount = await prisma.sale.count();
    const revenueSummary = await prisma.sale.aggregate({
        _sum: { total: true },
        _avg: { total: true },
        _count: { id: true }
    });

    const topBranchOrder = await prisma.sale.groupBy({
        by: ['branchId'],
        _count: { id: true },
        orderBy: { _count: { id: 'desc' } },
        take: 1
    });

    const branches = await prisma.branch.findMany();
    const topBranchName = branches.find(b => b.id === topBranchOrder[0]?.branchId)?.name || 'N/A';

    console.log('--- RESULTADOS DE SIMULACIÓN (6 MESES) ---');
    console.log(`📊 Total de Ventas: ${salesCount}`);
    console.log(`💰 Ingresos Totales: $${revenueSummary._sum.total?.toFixed(2)}`);
    console.log(`📈 Promedio de Venta: $${revenueSummary._avg.total?.toFixed(2)}`);
    console.log(`🏢 Sucursal con mayor actividad: ${topBranchName}`);
    console.log('------------------------------------------');
}

verify().catch(console.error).finally(() => prisma.$disconnect());
