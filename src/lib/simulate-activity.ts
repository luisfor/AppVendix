import { PrismaClient } from '@prisma/client';
import { addDays, subMonths, format, startOfDay } from 'date-fns';

const prisma = new PrismaClient();

async function simulate() {
    console.log('🚀 Iniciando simulación de 6 meses de actividad...');

    // 1. Obtener la empresa y sus datos
    const company = await prisma.company.findFirst({
        where: { name: 'Farmacia Salud y Vida' },
        include: {
            branches: true,
            users: { where: { systemRole: 'COMPANY_USER' } },
            products: true,
        }
    });

    if (!company || company.branches.length === 0 || company.products.length === 0) {
        console.error('❌ Error: No se encontró la empresa de prueba o datos suficientes para simular.');
        return;
    }

    // Si no hay usuarios operativos, creamos algunos
    let operativeUsers = company.users;
    if (operativeUsers.length === 0) {
        console.log('⚠️ No hay usuarios operativos, creando cajeros...');
        const cashier1 = await prisma.user.create({
            data: {
                email: 'cajero1@saludvida.com',
                password: 'password_cajero',
                name: 'Carlos Cajero',
                systemRole: 'COMPANY_USER',
                companyId: company.id
            }
        });
        const cashier2 = await prisma.user.create({
            data: {
                email: 'cajero2@saludvida.com',
                password: 'password_cajero',
                name: 'Maria Venta',
                systemRole: 'COMPANY_USER',
                companyId: company.id
            }
        });
        operativeUsers = [cashier1, cashier2];
    }

    const startDate = subMonths(new Date(), 6);
    const totalDays = 180;

    // Parámetros de simulación
    let baseSalesPerDay = 15; // Empezamos con 15 ventas al día
    const monthlyGrowth = 0.15; // 15% de crecimiento mensual
    const weekendMultiplier = 1.4; // Más ventas los fines de semana

    console.log(`📅 Período: ${format(startDate, 'yyyy-MM-dd')} al hoy`);

    for (let dayOffset = 0; dayOffset < totalDays; dayOffset++) {
        const currentDate = addDays(startDate, dayOffset);
        const monthIndex = Math.floor(dayOffset / 30);
        const isWeekend = currentDate.getDay() === 0 || currentDate.getDay() === 6;

        // Calcular volumen de ventas para hoy
        let dailyTarget = baseSalesPerDay * Math.pow(1 + monthlyGrowth, monthIndex);
        if (isWeekend) dailyTarget *= weekendMultiplier;

        // Variación aleatoria +/- 20%
        const actualSalesCount = Math.floor(dailyTarget * (0.8 + Math.random() * 0.4));

        console.log(`[${format(currentDate, 'yyyy-MM-dd')}] Generando ${actualSalesCount} ventas...`);

        for (let s = 0; s < actualSalesCount; s++) {
            const branch = company.branches[Math.floor(Math.random() * company.branches.length)];
            const user = operativeUsers[Math.floor(Math.random() * operativeUsers.length)];

            // Seleccionar 1-4 productos aleatorios
            const itemsCount = 1 + Math.floor(Math.random() * 4);
            const selectedProducts = [...company.products].sort(() => 0.5 - Math.random()).slice(0, itemsCount);

            let totalSale = 0;
            let totalTax = 0;

            const saleItemsData = selectedProducts.map(p => {
                const qty = 1 + Math.floor(Math.random() * 3);
                const subtotal = Number(p.salePrice) * qty;
                const tax = subtotal * (Number(p.taxRate) / 100);
                totalSale += subtotal;
                totalTax += tax;

                return {
                    productId: p.id,
                    quantity: qty,
                    unitPrice: p.salePrice,
                    totalPrice: subtotal
                };
            });

            // Crear la venta
            await prisma.sale.create({
                data: {
                    total: totalSale,
                    taxAmount: totalTax,
                    paymentMethod: Math.random() > 0.3 ? 'CASH' : 'CARD',
                    status: 'COMPLETED',
                    branchId: branch.id,
                    companyId: company.id,
                    createdAt: currentDate,
                    items: {
                        create: saleItemsData
                    }
                }
            });

            // Rotación de stock: Reducir inventario
            for (const item of saleItemsData) {
                await prisma.inventory.updateMany({
                    where: {
                        productId: item.productId,
                        branchId: branch.id
                    },
                    data: {
                        stock: { decrement: item.quantity },
                        updatedAt: currentDate
                    }
                });
            }
        }

        // Reposición de Inventario Semanal (cada lunes)
        if (currentDate.getDay() === 1) {
            console.log(`📦 [${format(currentDate, 'yyyy-MM-dd')}] Ejecutando reposición semanal de inventario...`);
            for (const product of company.products) {
                for (const branch of company.branches) {
                    await prisma.inventory.updateMany({
                        where: {
                            productId: product.id,
                            branchId: branch.id,
                            stock: { lt: 50 } // Si baja de 50 unidades
                        },
                        data: {
                            stock: { increment: 100 }, // Reponer 100 unidades
                            updatedAt: currentDate
                        }
                    });
                }
            }
        }
    }

    console.log('✅ Simulación completada con éxito.');
}

simulate()
    .catch(e => {
        console.error('❌ Error fatal en la simulación:', e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
