import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function PUT(req: Request, { params }: { params: { itemId: string } }) {
  try {
    const { itemId } = params;
    const { quantity } = await req.json();

    if (quantity < 1) {
      return NextResponse.json({ message: 'Quantity must be at least 1' }, { status: 400 });
    }

    const updatedItem = await prisma.cartItem.update({
      where: { id: itemId },
      data: { quantity },
    });

    return NextResponse.json({
      message: 'Cart item quantity updated',
      updatedItem,
    });
  } catch (error: any) {
    return NextResponse.json(
      { message: 'Error updating cart item quantity', error: error.message },
      { status: 500 }
    );
  }
}
