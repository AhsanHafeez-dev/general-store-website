import { PrismaClient } from '@prisma/client';
import { NextResponse } from 'next/server';

const prisma = new PrismaClient();

export async function POST(request: Request) {
  const { userId, cartItems } = await request.json();

  if (!userId || !cartItems || cartItems.length === 0) {
    return NextResponse.json({ error: 'User ID and cart items are required' }, { status: 400 });
  }

  try {
    const totalAmount = cartItems.reduce((sum: number, item: any) => sum + item.quantity * item.product.price, 0);

    const newOrder = await prisma.order.create({
      data: {
        userId: Number(userId),
        totalAmount,
        orderDate: new Date(),
        orderItems: {
          create: cartItems.map((item: any) => ({
            productId: item.productId,
            quantity: item.quantity,
            price: item.product.price,
          })),
        },
      },
    });

    // Clear the user's cart
    await prisma.cartItem.deleteMany({
      where: { userId: Number(userId) },
    });

    return NextResponse.json({ message: 'Order placed successfully', order: newOrder });
  } catch (error) {
    console.error('Error creating order:', error);
    return NextResponse.json({ error: 'Failed to place order' }, { status: 500 });
  }
}
