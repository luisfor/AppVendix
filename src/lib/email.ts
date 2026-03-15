export interface EmailOptions {
    to: string;
    subject: string;
    html: string;
    companyId?: string; // Optional: Used for rate limiting the tenant
}

import { checkAndIncrementEmailUsage } from './usage';

/**
 * Mock Email Service.
 * In the future, you can replace the internals of this function with 
 * Resend, Nodemailer, AWS SES, or SendGrid logic.
 */
export async function sendMail({ to, subject, html, companyId }: EmailOptions) {
    if (companyId) {
        const allowed = await checkAndIncrementEmailUsage(companyId);
        if (!allowed) {
            console.warn(`[EMAIL BLOCKED] Company ${companyId} hit their monthly email limit. Mail dropped.`);
            return { success: false, error: 'Monthly email limit exceeded for this plan.' };
        }
    }

    if (process.env.NODE_ENV === 'production' && process.env.EMAIL_API_KEY) {
        // Example implementation with Resend:
        // const resend = new Resend(process.env.EMAIL_API_KEY);
        // await resend.emails.send({ from: 'no-reply@pos-saas.com', to, subject, html });
        console.log(`[EMAIL SENDING...] To: ${to} | Subject: ${subject}`);
    } else {
        // Development / Mocking Behavior
        console.log(`\n================= MOCK EMAIL =================`);
        console.log(`TO:      ${to}`);
        console.log(`SUBJECT: ${subject}`);
        console.log(`CONTENT: ${html.substring(0, 100)}...`);
        console.log(`==============================================\n`);
    }

    return { success: true };
}
