import prisma from '@/lib/prisma';
import { CompanyStatus, InvoiceStatus, PaymentStatus, BillingEventType, SubscriptionState } from '@prisma/client';

/**
 * Creates a pending invoice for a company.
 * Useful for manual generation or automated start-of-cycle hooks.
 */
export async function createPendingInvoice(
    companyId: string,
    planId: string,
    amount: number,
    billingPeriodStart: Date,
    billingPeriodEnd: Date,
    dueDate: Date
) {
    return await prisma.invoice.create({
        data: {
            companyId,
            planId,
            amount,
            billingPeriodStart,
            billingPeriodEnd,
            dueDate,
            status: InvoiceStatus.PENDING,
        }
    });
}

/**
 * Validates and records a manual payment against a specific invoice.
 * Acts as a generic wrapper ready for Stripe/PayPal plugins in the future.
 */
export async function processManualPayment(invoiceId: string, adminReference?: string) {
    // 1. Fetch Invoice
    const invoice = await prisma.invoice.findUnique({
        where: { id: invoiceId },
        include: { company: true }
    });

    if (!invoice) throw new Error('Invoice not found');
    if (invoice.status === InvoiceStatus.PAID) throw new Error('Invoice is already paid');

    // 2. Perform Transaction
    const [updatedInvoice, payment] = await prisma.$transaction(async (tx) => {
        // 2a. Record the Payment
        const newPayment = await tx.payment.create({
            data: {
                invoiceId,
                companyId: invoice.companyId,
                amount: invoice.amount,
                paymentMethod: 'MANUAL',
                transactionReference: adminReference || `MANUAL-${Date.now()}`,
                status: PaymentStatus.SUCCESS
            }
        });

        // 2b. Mark Invoice as Paid
        const inv = await tx.invoice.update({
            where: { id: invoiceId },
            data: {
                status: InvoiceStatus.PAID,
                paidDate: new Date()
            }
        });

        // 2c. Reactivate Company if Suspended or gracefully exiting Grace Period
        const companyUpdates: any = {};
        if (invoice.company.status === CompanyStatus.SUSPENDED) {
            companyUpdates.status = CompanyStatus.ACTIVE;

            await tx.billingEvent.create({
                data: {
                    companyId: invoice.companyId,
                    eventType: BillingEventType.REACTIVATION,
                    description: 'Reactivated via manual payment'
                }
            });
        }

        if (invoice.company.subscriptionState === SubscriptionState.GRACE_PERIOD) {
            companyUpdates.subscriptionState = SubscriptionState.ACTIVE;
        }

        // Extend Subscription Date to the Invoice's Billing End (or relative +30 days)
        companyUpdates.subscriptionEndsAt = invoice.billingPeriodEnd;

        await tx.company.update({
            where: { id: invoice.companyId },
            data: companyUpdates
        });

        return [inv, newPayment];
    });

    return { success: true, invoice: updatedInvoice, payment };
}

/**
 * Background hook: Checks for Invoices that have bypassed their due date
 * Updates them to OVERDUE and moves the company to a GRACE_PERIOD state.
 */
export async function processOverdueInvoices() {
    const now = new Date();

    const overdueInvoices = await prisma.invoice.findMany({
        where: {
            status: InvoiceStatus.PENDING,
            dueDate: { lt: now }
        }
    });

    const processed = [];

    for (const invoice of overdueInvoices) {
        await prisma.$transaction(async (tx) => {
            // 1. Mark Invoice Overdue
            await tx.invoice.update({
                where: { id: invoice.id },
                data: { status: InvoiceStatus.OVERDUE }
            });

            // 2. Place Company in Grace Period
            await tx.company.update({
                where: { id: invoice.companyId },
                data: { subscriptionState: SubscriptionState.GRACE_PERIOD }
            });

            processed.push(invoice.id);
        });
    }

    return { success: true, count: processed.length, processedIds: processed };
}

/**
 * Background hook: Checks all ACTIVE companies and generates a PENDING invoice 
 * if they don't already have one covering their current billing cycle.
 */
export async function generateRenewalInvoices() {
    const now = new Date();

    // Find companies that are active and don't have a pending invoice
    const companiesToInvoice = await prisma.company.findMany({
        where: {
            status: CompanyStatus.ACTIVE,
            subscriptionState: SubscriptionState.ACTIVE,
        },
        include: {
            plan: true
        }
    });

    let generatedCount = 0;

    for (const company of companiesToInvoice) {
        if (!company.plan || company.plan.monthlyPrice.toNumber() === 0) continue; // Skip free plans

        // Determine current cycle dates based on subscriptionEndsAt
        // For simplicity, we assume the cycle ends at `subscriptionEndsAt` and started 1 month prior.
        const cycleEnd = company.subscriptionEndsAt || new Date(now.getFullYear(), now.getMonth() + 1, now.getDate());
        const cycleStart = new Date(cycleEnd);
        cycleStart.setMonth(cycleStart.getMonth() - 1);

        // Check if invoice already exists for this cycle
        const existingInvoice = await prisma.invoice.findFirst({
            where: {
                companyId: company.id,
                status: InvoiceStatus.PENDING,
                dueDate: { gte: now } // Rough proxy that it's active
            }
        });

        if (!existingInvoice) {
            await createPendingInvoice(
                company.id,
                company.planId,
                company.plan.monthlyPrice.toNumber(),
                cycleStart,
                cycleEnd,
                cycleEnd // Due exactly on cycle end date
            );
            generatedCount++;
        }
    }

    return { success: true, generatedCount };
}
