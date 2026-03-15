'use server';

import prisma from '@/lib/prisma';
import { processManualPayment, createPendingInvoice } from '@/lib/billing';
import { CompanyStatus, InvoiceStatus, SubscriptionState } from '@prisma/client';
import { revalidatePath } from 'next/cache';

/**
 * Fetches all invoices. Intended for the Super Admin panel.
 */
export async function getAllInvoices() {
    try {
        const invoices = await prisma.invoice.findMany({
            include: { company: { select: { name: true, email: true } } },
            orderBy: { createdAt: 'desc' }
        });
        return { success: true, invoices };
    } catch (error: any) {
        return { success: false, error: error.message };
    }
}

/**
 * Fetches invoices for a specific tenant.
 */
export async function getCompanyInvoices(companyId: string) {
    try {
        const invoices = await prisma.invoice.findMany({
            where: { companyId },
            orderBy: { dueDate: 'desc' }
        });
        return { success: true, invoices };
    } catch (error: any) {
        return { success: false, error: error.message };
    }
}

/**
 * Marks an invoice as PAID via the SaaS Admin manual override.
 * Internally runs the `processManualPayment` engine.
 */
export async function markInvoiceAsPaidAction(invoiceId: string, reference: string) {
    try {
        const result = await processManualPayment(invoiceId, reference);
        revalidatePath('/saas-admin/billing');
        revalidatePath('/saas-admin/companies');
        return result;
    } catch (error: any) {
        return { success: false, error: error.message };
    }
}

/**
 * Forces the creation of a manual pending invoice.
 */
export async function createManualInvoiceAction(
    companyId: string,
    planId: string,
    amount: number,
    billingStart: Date,
    billingEnd: Date
) {
    try {
        const inv = await createPendingInvoice(companyId, planId, amount, billingStart, billingEnd, billingEnd);
        revalidatePath('/saas-admin/billing');
        return { success: true, invoice: inv };
    } catch (error: any) {
        return { success: false, error: error.message };
    }
}
