import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import Stripe from 'stripe';

const prisma = new PrismaClient();
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
    // apiVersion: '2024-06-20',
});

export async function POST(req: Request) {
    try {
        const { sessionId, userId } = await req.json();

        if (!sessionId || !userId) {
            return NextResponse.json({ error: 'Missing sessionId or userId' }, { status: 400 });
        }

        // 1. Verify Stripe Session
        const session = await stripe.checkout.sessions.retrieve(sessionId);
        if (session.payment_status !== 'paid') {
            return NextResponse.json({ error: 'Payment not paid' }, { status: 400 });
        }

        // 2. Get Cart Items
        const cartItems = await prisma.cartItem.findMany({
            where: { userId: Number(userId) },
            include: { product: true },
        });

        if (cartItems.length === 0) {
            return NextResponse.json({ error: 'Cart is empty' }, { status: 400 });
        }

        const totalAmount = cartItems.reduce((sum, item) => sum + item.quantity * item.product.price, 0);

        // 3. Create Order (Transaction)
        const order = await prisma.$transaction(async (tx) => {
            // Create Order
            const newOrder = await tx.order.create({
                data: {
                    userId: Number(userId),
                    totalAmount,
                    stripeSessionId: sessionId,
                    status: 'paid',
                    orderItems: {
                        create: cartItems.map(item => ({
                            productId: item.productId,
                            quantity: item.quantity,
                            price: item.product.price,
                        })),
                    },
                },
            });

            // Clear Cart
            await tx.cartItem.deleteMany({
                where: { userId: Number(userId) },
            });

            return newOrder;
        });

        return NextResponse.json({ success: true, orderId: order.id });
    } catch (err: any) {
        console.error('Error confirming order:', err);
        return NextResponse.json({ error: err.message }, { status: 500 });
    }
}
