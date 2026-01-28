import { NextRequest, NextResponse } from 'next/server';
import { Stripe } from 'stripe';
import { PrismaClient } from '@prisma/client';
import { auth } from '../../../../auth';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
  apiVersion: '2024-06-20',
});

const prisma = new PrismaClient();

export async function POST(req: NextRequest) {
  const session = await auth();

  if (!session || !session.user || !session.user.id) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { cartItems } = await req.json();

  if (!cartItems || cartItems.length === 0) {
    return NextResponse.json({ error: 'No items in cart' }, { status: 400 });
  }

  const line_items = cartItems.map((item: any) => ({
    price_data: {
      currency: 'usd',
      product_data: {
        name: item.product.name,
        images: [item.product.imageUrl || 'https://via.placeholder.com/150'],
      },
      unit_amount: Math.round(item.product.price * 100), // Stripe expects amount in cents
    },
    quantity: item.quantity,
  }));

  try {
    const stripeSession = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items,
      mode: 'payment',
      success_url: `${process.env.NEXTAUTH_URL}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXTAUTH_URL}/cart`,
      metadata: {
        userId: session.user.id,
      },
    });

    return NextResponse.json({ url: stripeSession.url });
  } catch (error) {
    console.error('Error creating Stripe checkout session:', error);
    return NextResponse.json({ error: 'Failed to create checkout session' }, { status: 500 });
  }
}
