import prisma from '@/lib/prisma';
import { Decimal } from '@prisma/client/runtime/library';

export async function createSale(data: {
    companyId: string;
    branchId: string;
    customerId?: string;
    items: { productId: string; quantity: number; unitPrice: number }[];
    paymentMethod: string;
}) {
    return await prisma.$transaction(async (tx) => {
        let total = new Decimal(0);
        let totalTax = new Decimal(0);

        const saleItems = [];

        for (const item of data.items) {
            const product = await tx.product.findUnique({
                where: { id: item.productId },
            });

            if (!product) throw new Error(`Producto ${item.productId} no encontrado`);

            const itemTotal = new Decimal(item.quantity).mul(new Decimal(item.unitPrice));
            const itemTax = itemTotal.mul(new Decimal(product.taxRate.toString()).div(100));

            total = total.add(itemTotal);
            totalTax = totalTax.add(itemTax);

            // Deduct inventory
            const inventory = await tx.inventory.findUnique({
                where: {
                    productId_branchId: {
                        productId: item.productId,
                        branchId: data.branchId,
                    },
                },
            });

            if (!inventory || new Decimal(inventory.stock.toString()).lt(item.quantity)) {
                throw new Error(`Stock insuficiente para el producto ${product.name}`);
            }

            await tx.inventory.update({
                where: { id: inventory.id },
                data: {
                    stock: { decrement: item.quantity },
                },
            });

            saleItems.push({
                productId: item.productId,
                quantity: item.quantity,
                unitPrice: item.unitPrice,
                totalPrice: itemTotal,
            });
        }

        const sale = await tx.sale.create({
            data: {
                companyId: data.companyId,
                branchId: data.branchId,
                customerId: data.customerId,
                total: total,
                taxAmount: totalTax,
                paymentMethod: data.paymentMethod,
                items: {
                    create: saleItems,
                },
            },
            include: {
                items: true,
            },
        });

        return sale;
    });
}
