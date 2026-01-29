import { PrismaClient } from '@prisma/client';
import { NextRequest, NextResponse } from 'next/server';

const prisma = new PrismaClient();

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  const { id } = params;
  const cartItemId = Number(id);

  const { userId } = await request.json(); // Expect userId in the request body

  if (!cartItemId || isNaN(cartItemId)) {
    return NextResponse.json({ error: 'Invalid cart item ID' }, { status: 400 });
  }

  if (!userId || isNaN(Number(userId))) {
    return NextResponse.json({ error: 'User ID missing or invalid' }, { status: 400 });
  }

  try {
    const cartItem = await prisma.cartItem.findUnique({
      where: { id: cartItemId },
    });

    if (!cartItem || cartItem.userId !== Number(userId)) {
      return NextResponse.json({ error: 'Cart item not found or unauthorized' }, { status: 404 });
    }

    await prisma.cartItem.delete({
      where: { id: cartItemId },
    });

    return NextResponse.json({ message: 'Cart item removed successfully' });
  } catch (error) {
    console.error('Error removing cart item:', error);
    return NextResponse.json({ error: 'Failed to remove cart item' }, { status: 500 });
  }
}
