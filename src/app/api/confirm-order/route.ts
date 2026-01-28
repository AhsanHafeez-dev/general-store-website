import { NextRequest, NextResponse } from 'next/server';
import { Stripe } from 'stripe';
import { PrismaClient } from '@prisma/client';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
  apiVersion: '2024-06-20',
});

const prisma = new PrismaClient();

export async function POST(req: NextRequest) {
  const { sessionId, userId } = await req.json();

  if (!sessionId || !userId) {
    return NextResponse.json({ error: 'Session ID or User ID missing' }, { status: 400 });
  }

  try {
    const stripeSession = await stripe.checkout.sessions.retrieve(sessionId);

    if (stripeSession.payment_status === 'paid') {
      // Create a new order
      const newOrder = await prisma.order.create({
        data: {
          userId: userId,
          totalAmount: stripeSession.amount_total ? stripeSession.amount_total / 100 : 0,
          orderDate: new Date(),
        },
      });

      // Get cart items for the user
      const cartItems = await prisma.cartItem.findMany({
        where: { userId: userId },
        include: { product: true },
      });

      // Create order items from cart items
      await prisma.orderItem.createMany({
        data: cartItems.map((item) => ({
          orderId: newOrder.id,
          productId: item.productId,
          quantity: item.quantity,
          price: item.product.price,
        })),
      });

      // Clear the user's cart
      await prisma.cartItem.deleteMany({
        where: { userId: userId },
      });

      return NextResponse.json({ message: 'Order confirmed and cart cleared' });
    } else {
      return NextResponse.json({ error: 'Payment not successful' }, { status: 400 });
    }
  } catch (error) {
    console.error('Error confirming order:', error);
    return NextResponse.json({ error: 'Failed to confirm order' }, { status: 500 });
  }
}
