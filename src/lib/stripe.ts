import Stripe from 'stripe';

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || 'sk_test_mock_secret', {
    appInfo: {
        name: 'POS SaaS Platform',
        version: '1.0.0',
    },
});

export async function createCheckoutSession(
    companyId: string,
    stripeCustomerId: string,
    priceId: string,
    successUrl: string,
    cancelUrl: string
) {
    const session = await stripe.checkout.sessions.create({
        customer: stripeCustomerId,
        mode: 'subscription',
        payment_method_types: ['card'],
        line_items: [
            {
                price: priceId,
                quantity: 1,
            },
        ],
        success_url: successUrl,
        cancel_url: cancelUrl,
        client_reference_id: companyId,
    });

    return session;
}

export async function createCustomerPortal(stripeCustomerId: string, returnUrl: string) {
    const portalSession = await stripe.billingPortal.sessions.create({
        customer: stripeCustomerId,
        return_url: returnUrl,
    });

    return portalSession;
}
