import { NextResponse } from 'next/server';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
    // apiVersion: '2024-06-20', // Use a recent API version
});

export async function POST(req: Request) {
    try {
        const { cartItems, userId } = await req.json();

        if (!cartItems || cartItems.length === 0) {
            return NextResponse.json({ error: 'No items in cart' }, { status: 400 });
        }

        // Map cart items to Stripe line items
        const lineItems = cartItems.map((item: any) => ({
            price_data: {
                currency: 'usd',
                product_data: {
                    name: item.product.name,
                    images: item.product.imageUrl ? [item.product.imageUrl] : [],
                },
                unit_amount: Math.round(item.product.price * 100), // Stripe expects amounts in cents
            },
            quantity: item.quantity,
        }));

        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            line_items: lineItems,
            mode: 'payment',
            success_url: `${req.headers.get('origin')}/success?session_id={CHECKOUT_SESSION_ID}`,
            cancel_url: `${req.headers.get('origin')}/cancel`,
            metadata: {
                userId: userId.toString(),
            },
        });

        return NextResponse.json({ url: session.url });
    } catch (err: any) {
        console.error('Error creating checkout session:', err);
        return NextResponse.json({ error: err.message }, { status: 500 });
    }
}
