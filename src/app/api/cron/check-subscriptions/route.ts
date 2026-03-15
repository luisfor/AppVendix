import prisma from '@/lib/prisma';
import { sendMail } from '@/lib/email';
import { CompanyStatus, SubscriptionState } from '@prisma/client';
import { NextResponse } from 'next/server';
import { processOverdueInvoices, generateRenewalInvoices } from '@/lib/billing';

export async function GET(request: Request) {
    // Only allow Vercel Cron or a specific API Key
    const authHeader = request.headers.get('authorization');
    if (process.env.CRON_SECRET && authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    try {
        const now = new Date();
        const threeDaysFromNow = new Date();
        threeDaysFromNow.setDate(now.getDate() + 3);

        const fourDaysFromNow = new Date();
        fourDaysFromNow.setDate(now.getDate() + 4);

        let suspendedCount = 0;
        let warnedCount = 0;

        // 0. Process Billing Engines
        const { generatedCount } = await generateRenewalInvoices();
        const { count: overdueCount } = await processOverdueInvoices();

        // 1. Suspend Expired Subscriptions
        const expiredCompanies = await prisma.company.findMany({
            where: {
                status: CompanyStatus.ACTIVE,
                subscriptionEndsAt: { lt: now }
            }
        });

        for (const company of expiredCompanies) {
            await prisma.company.update({
                where: { id: company.id },
                data: { status: CompanyStatus.SUSPENDED }
            });

            await sendMail({
                to: company.email,
                subject: 'Suscripción Suspendida - Acción Requerida',
                html: `<p>Hola ${company.name},</p><p>Tu periodo de suscripción ha expirado. El acceso a la plataforma POS SaaS ha sido suspendido.</p><p>Por favor, renueva tu suscripción para restaurar el servicio inmediatamente.</p>`
            });
            suspendedCount++;
        }

        // 2. Send Expiration Warnings (Expires in 3 days)
        const warningCompanies = await prisma.company.findMany({
            where: {
                status: CompanyStatus.ACTIVE,
                subscriptionEndsAt: {
                    gte: threeDaysFromNow,
                    lt: fourDaysFromNow
                }
            }
        });

        for (const company of warningCompanies) {
            await sendMail({
                to: company.email,
                subject: 'Tu suscripción expirará en 3 días',
                html: `<p>Hola ${company.name},</p><p>Este es un recordatorio de que tu plan actual vencerá en aproximadamente 3 días.</p><p>Asegúrate de que tu método de pago esté actualizado para evitar cualquier interrupción en tu servicio.</p>`
            });
            warnedCount++;
        }

        // 3. Process Pending Downgrades
        const downgradeCompanies = await prisma.company.findMany({
            where: {
                subscriptionState: SubscriptionState.PENDING_DOWNGRADE,
                subscriptionEndsAt: { lt: now },
                scheduledPlanId: { not: null }
            }
        });

        for (const company of downgradeCompanies) {
            const newPlanId = company.scheduledPlanId!;

            // Apply the new plan momentarily in DB to check limits using existing enforcement engine
            // Wait, directly asking enforcement engine requires the plan to be updated or mock evaluated.
            // Let's manually pull the new plan to compare.
            const newPlan = await prisma.subscriptionPlan.findUnique({ where: { id: newPlanId } });
            const counts = await prisma.company.findUnique({
                where: { id: company.id },
                select: {
                    _count: { select: { users: true, branches: true, products: true } }
                }
            });

            if (!newPlan || !counts) continue;

            const limits = [
                newPlan.maxUsers !== -1 && counts._count.users > newPlan.maxUsers,
                newPlan.maxBranches !== -1 && counts._count.branches > newPlan.maxBranches,
                newPlan.maxProducts !== -1 && counts._count.products > newPlan.maxProducts
            ];

            const isOverLimit = limits.some(isOver => isOver);

            await prisma.company.update({
                where: { id: company.id },
                data: {
                    planId: newPlanId,
                    scheduledPlanId: null,
                    subscriptionState: isOverLimit ? SubscriptionState.OVER_LIMIT : SubscriptionState.ACTIVE
                }
            });

            await sendMail({
                to: company.email,
                subject: 'Cambio de Plan Ejecutado',
                html: isOverLimit
                    ? `<p>Hola ${company.name},</p><p>Tu plan ha sido actualizado al final del ciclo.</p><p><strong>ATENCIÓN:</strong> Tienes más recursos de los permitidos por tu nuevo plan. Algunas funciones están bloqueadas hasta que elimines el excedente.</p>`
                    : `<p>Hola ${company.name},</p><p>Tu plan ha sido actualizado correctamente para tu nuevo ciclo.</p>`
            });
        }

        return NextResponse.json({
            success: true,
            invoicesGenerated: generatedCount,
            invoicesOverdueProcessed: overdueCount,
            suspendedCount,
            warnedCount,
            downgradedCount: downgradeCompanies.length,
            timestamp: new Date().toISOString()
        });

    } catch (error: any) {
        console.error('[CRON] Error:', error);
        return NextResponse.json({ error: 'Failed to process subscriptions' }, { status: 500 });
    }
}
