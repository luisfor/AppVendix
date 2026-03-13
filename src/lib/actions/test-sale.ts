import { createSale } from './sales';
import prisma from '../prisma';

export async function testSaleFlow() {
    console.log('--- Iniciando Prueba de Flujo de Venta ---');

    try {
        // 1. Setup Mock Data
        const company = await prisma.company.create({
            data: { name: 'Empresa Test', email: `test-${Date.now()}@test.com` }
        });

        const branch = await prisma.branch.create({
            data: { name: 'Sucursal Central', companyId: company.id }
        });

        const category = await prisma.category.create({
            data: { name: 'General', companyId: company.id }
        });

        const product = await prisma.product.create({
            data: {
                name: 'Producto Test',
                salePrice: 100,
                taxRate: 18,
                categoryId: category.id,
                companyId: company.id,
            }
        });

        await prisma.inventory.create({
            data: {
                productId: product.id,
                branchId: branch.id,
                stock: 10,
            }
        });

        console.log('✅ Datos de prueba creados');

        // 2. Perform Sale
        const sale = await createSale({
            companyId: company.id,
            branchId: branch.id,
            items: [{ productId: product.id, quantity: 2, unitPrice: 100 }],
            paymentMethod: 'EFECTIVO'
        });

        console.log('✅ Venta realizada:', sale.id);
        console.log('💰 Total:', sale.total.toString());

        // 3. Verify Inventory
        const updatedInventory = await prisma.inventory.findUnique({
            where: { productId_branchId: { productId: product.id, branchId: branch.id } }
        });

        console.log('📦 Stock restante:', updatedInventory?.stock.toString());

        if (updatedInventory?.stock.toString() === '8.000') {
            console.log('✨ PRUEBA EXITOSA: Inventario descontado correctamente');
        } else {
            console.error('❌ ERROR: Descuento de inventario incorrecto');
        }

    } catch (error) {
        console.error('❌ Error en la prueba:', error);
    }
}
