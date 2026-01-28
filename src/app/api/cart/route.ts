import { PrismaClient } from '@prisma/client';
import { NextResponse } from 'next/server';
import { auth } from '../../../../auth'; // Adjust path as needed

const prisma = new PrismaClient();

export async function GET() {
  const session = await auth();

  if (!session || !session.user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const cartItems = await prisma.cartItem.findMany({
      where: { userId: Number(session.user.id) },
      include: { product: true },
    });
    return NextResponse.json(cartItems);
  } catch (error) {
    console.error('Error fetching cart items:', error);
    return NextResponse.json({ error: 'Failed to fetch cart items' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  const session = await auth();

  if (!session || !session.user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { productId, quantity } = await request.json();

  if (!productId || !quantity || quantity <= 0) {
    return NextResponse.json({ error: 'Invalid product ID or quantity' }, { status: 400 });
  }

  try {
    const existingCartItem = await prisma.cartItem.findUnique({
      where: {
        userId_productId: {
          userId: Number(session.user.id),
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
          userId: Number(session.user.id),
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
