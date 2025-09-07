import Stripe from 'stripe';
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
const createSubscription = async (req, res) => {
    try {
        const { email, paymentMethodId, priceId } = req.body;

        // Create a new customer in Stripe
        const customer = await stripe.customers.create({
            email,
            payment_method: paymentMethodId,
            invoice_settings: { default_payment_method: paymentMethodId },
        });

        // Create a subscription
        const subscription = await stripe.subscriptions.create({
            customer: customer.id,
            items: [{ price: priceId }],
            expand: ['latest_invoice.payment_intent'],
        });

        res.json({
            subscriptionId: subscription.id,
            clientSecret: subscription.latest_invoice.payment_intent.client_secret,
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

module.exports = {createSubscription};