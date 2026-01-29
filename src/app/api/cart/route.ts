import { PrismaClient } from '@prisma/client';
import { NextRequest, NextResponse } from 'next/server';

const prisma = new PrismaClient();

export async function GET(request: NextRequest) {
  const url = new URL(request.url);
  const userId = url.searchParams.get('userId');

  if (!userId) {
    return NextResponse.json({ error: 'User ID missing' }, { status: 400 });
  }

  try {
    const cartItems = await prisma.cartItem.findMany({
      where: { userId: Number(userId) },
      include: { product: true },
    });
    return NextResponse.json(cartItems);
  } catch (error) {
    console.error('Error fetching cart items:', error);
    return NextResponse.json({ error: 'Failed to fetch cart items' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  const { productId, quantity, userId } = await request.json();

  if (!productId || !quantity || quantity <= 0 || !userId) {
    return NextResponse.json({ error: 'Invalid product ID, quantity, or user ID' }, { status: 400 });
  }

  try {
    const existingCartItem = await prisma.cartItem.findUnique({
      where: {
        userId_productId: {
          userId: Number(userId),
          productId: productId,
        },
      },
    });

    let cartItem;
    if (existingCartItem) {
      // Update quantity if item already exists
      cartItem = await prisma.cartItem.update({
        where: { id: existingCartItem.id },
        data: { quantity: existingCartItem.quantity + quantity },
      });
    } else {
      // Create new cart item
      cartItem = await prisma.cartItem.create({
        data: {
          userId: Number(userId),
          productId: productId,
          quantity: quantity,
        },
      });
    }

    return NextResponse.json(cartItem);
  } catch (error) {
    console.error('Error adding/updating cart item:', error);
    return NextResponse.json({ error: 'Failed to add/update cart item' }, { status: 500 });
  }
}
