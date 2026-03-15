import { NextRequest, NextResponse } from 'next/server';
import { stripe } from '@/lib/stripe';
import prisma from '@/lib/prisma';
import Stripe from 'stripe';
import { CompanyStatus } from '@prisma/client';

export async function POST(req: NextRequest) {
    const payload = await req.text();
    const signature = req.headers.get('Stripe-Signature');

    if (!signature) {
        return NextResponse.json({ error: 'Missing Stripe signature' }, { status: 400 });
    }

    let event: Stripe.Event;

    try {
        const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET || 'whsec_mock_secret';
        event = stripe.webhooks.constructEvent(payload, signature, webhookSecret);
    } catch (err: any) {
        console.error('Webhook signature verification failed:', err.message);
        return NextResponse.json({ error: 'Invalid signature' }, { status: 400 });
    }

    try {
        switch (event.type) {
            case 'checkout.session.completed': {
                const session = event.data.object as any;
                const companyId = session.client_reference_id;

                if (companyId && session.subscription) {
                    // Update company with stripe customer & subscription ID
                    // And extend their access
                    const subscription = await stripe.subscriptions.retrieve(session.subscription as string) as any;

                    await prisma.company.update({
                        where: { id: companyId },
                        data: {
                            stripeCustomerId: session.customer as string,
                            stripeSubscriptionId: subscription.id,
                            subscriptionEndsAt: new Date(subscription.current_period_end * 1000),
                            status: CompanyStatus.ACTIVE
                        }
                    });
                }
                break;
            }

            case 'invoice.payment_succeeded': {
                const invoice = event.data.object as any;

                if (invoice.subscription) {
                    const subscription = await stripe.subscriptions.retrieve(invoice.subscription as string) as any;

                    // Find company by subscription ID
                    const company = await prisma.company.findUnique({
                        where: { stripeSubscriptionId: subscription.id }
                    });

                    if (company) {
                        await prisma.$transaction([
                            prisma.subscriptionPayment.create({
                                data: {
                                    companyId: company.id,
                                    stripeInvoiceId: invoice.id,
                                    amount: invoice.amount_paid / 100,
                                    currency: invoice.currency.toUpperCase(),
                                    status: invoice.status || 'paid',
                                    billingReason: invoice.billing_reason
                                }
                            }),
                            prisma.company.update({
                                where: { id: company.id },
                                data: {
                                    subscriptionEndsAt: new Date(subscription.current_period_end * 1000),
                                    status: CompanyStatus.ACTIVE
                                }
                            })
                        ]);
                    }
                }
                break;
            }

            case 'invoice.payment_failed': {
                const invoice = event.data.object as any;

                if (invoice.subscription) {
                    const company = await prisma.company.findUnique({
                        where: { stripeSubscriptionId: invoice.subscription as string }
                    });

                    if (company) {
                        await prisma.$transaction([
                            prisma.subscriptionPayment.create({
                                data: {
                                    companyId: company.id,
                                    stripeInvoiceId: invoice.id,
                                    amount: invoice.amount_due / 100,
                                    currency: invoice.currency.toUpperCase(),
                                    status: 'failed',
                                    billingReason: invoice.billing_reason
                                }
                            }),
                            prisma.company.update({
                                where: { id: company.id },
                                data: {
                                    status: CompanyStatus.SUSPENDED
                                }
                            })
                        ]);
                    }
                }
                break;
            }

            case 'customer.subscription.deleted': {
                const subscription = event.data.object as any;

                await prisma.company.update({
                    where: { stripeSubscriptionId: subscription.id },
                    data: {
                        status: CompanyStatus.SUSPENDED,
                        stripeSubscriptionId: null // Clear so they can resubscribe
                    }
                });
                break;
            }

            default:
                console.log(`Unhandled event type ${event.type}`);
        }

        return NextResponse.json({ received: true });
    } catch (error: any) {
        console.error('Error handling webhook:', error);
        return NextResponse.json({ error: 'Webhook processing failed' }, { status: 500 });
    }
}
