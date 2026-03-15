import prisma from '@/lib/prisma';

/**
 * Checks if the company is allowed to send an email based on their plan limits.
 * If allowed, it automatically increments the `emailsSent` counter.
 * It also handles the automatic reset of the billing cycle metric if the current cycle has expired.
 * 
 * @param companyId The ID of the company sending the email
 * @returns boolean True if allowed, False if the limit has been reached
 */
export async function checkAndIncrementEmailUsage(companyId: string): Promise<boolean> {
    const company = await prisma.company.findUnique({
        where: { id: companyId },
        include: { plan: true, usage: true }
    });

    if (!company) return false;

    // If no plan is assigned, we could block or allow. Let's assume an empty global default for safety.
    const maxEmails = company.plan?.maxEmailsPerMonth ?? 500;
    const now = new Date();

    let usage = company.usage;

    // 1. Initialize usage if it doesn't exist for this company
    if (!usage) {
        const nextMonth = new Date(now);
        nextMonth.setMonth(nextMonth.getMonth() + 1);

        usage = await prisma.companyUsage.create({
            data: {
                companyId,
                emailsSent: 0,
                currentCycleStart: now,
                currentCycleEnd: nextMonth,
            }
        });
    }

    // 2. Billing Cycle Reset Logic
    if (now >= usage.currentCycleEnd) {
        // The cycle has ended, reset the metrics for the new month
        const nextMonth = new Date(now);
        nextMonth.setMonth(nextMonth.getMonth() + 1);

        usage = await prisma.companyUsage.update({
            where: { companyId },
            data: {
                emailsSent: 0,
                currentCycleStart: now,
                currentCycleEnd: nextMonth,
            }
        });
    }

    // 3. Validation: Are we over the limit?
    if (maxEmails !== -1 && usage.emailsSent >= maxEmails) {
        console.warn(`[RATE LIMIT] Company ${companyId} exceeded email limit (${maxEmails}).`);
        return false;
    }

    // 4. Increment the usage counter
    await prisma.companyUsage.update({
        where: { companyId },
        data: { emailsSent: { increment: 1 } }
    });

    return true;
}

/**
 * Checks if the company is allowed to process a new sale based on their plan limits.
 * If allowed, it automatically increments the `salesCount` counter.
 * 
 * @param companyId The ID of the company processing the sale
 * @returns boolean True if allowed, False if the limit has been reached
 */
export async function checkAndIncrementSalesUsage(companyId: string): Promise<boolean> {
    const company = await prisma.company.findUnique({
        where: { id: companyId },
        include: { plan: true, usage: true }
    });

    if (!company) return false;

    const maxSales = company.plan?.maxVentasMensuales ?? -1;
    const now = new Date();

    let usage = company.usage;

    // 1. Initialize usage if it doesn't exist
    if (!usage) {
        const nextMonth = new Date(now);
        nextMonth.setMonth(nextMonth.getMonth() + 1);

        usage = await prisma.companyUsage.create({
            data: {
                companyId,
                salesCount: 0,
                currentCycleStart: now,
                currentCycleEnd: nextMonth,
            }
        });
    }

    // 2. Billing Cycle Reset Logic
    if (now >= usage.currentCycleEnd) {
        const nextMonth = new Date(now);
        nextMonth.setMonth(nextMonth.getMonth() + 1);

        usage = await prisma.companyUsage.update({
            where: { companyId },
            data: {
                emailsSent: 0,
                salesCount: 0,
                currentCycleStart: now,
                currentCycleEnd: nextMonth,
            }
        });
    }

    // 3. Validation
    if (maxSales !== -1 && usage.salesCount >= maxSales) {
        console.warn(`[RATE LIMIT] Company ${companyId} exceeded sales limit (${maxSales}).`);
        return false;
    }

    // 4. Increment
    await prisma.companyUsage.update({
        where: { companyId },
        data: { salesCount: { increment: 1 } }
    });

    return true;
}
