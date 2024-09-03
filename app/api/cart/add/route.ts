import prisma from "@/app/lib/prisma";
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/lib/authOptions";



export async function POST(req: Request) {
  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  try {
    const { productId, quantity } = await req.json();

    // Validate input
    if (!productId || typeof quantity !== 'number' || quantity <= 0) {
      return NextResponse.json({ message: "Invalid input. Ensure productId is a non-empty string and quantity is a positive number.", productId, quantity }, { status: 400 });
    }

    // Check if the cart exists and includes items
    let cart = await prisma.cart.findUnique({
      where: { userId: session.user.id },
      include: { items: true },
    });

    // If cart does not exist, create a new one
    if (!cart) {
      cart = await prisma.cart.create({
        data: {
          userId: session.user.id,
        },
        include: { items: true },
      });
    }

    // Check if the item already exists in the cart
    const existingCartItem = cart.items.find(
      (item) => item.productId === productId
    );

    if (existingCartItem) {
      // Update the quantity of the existing item
      const updatedItem = await prisma.cartItem.update({
        where: { id: existingCartItem.id },
        data: { quantity: existingCartItem.quantity + quantity },
      });
      return NextResponse.json({ message: "Item quantity updated", updatedItem });
    } else {
      // Add a new item to the cart
      const newItem = await prisma.cartItem.create({
        data: {
          cartId: cart.id,
          productId,
          quantity,
        },
      });
      return NextResponse.json({ message: "Item added to cart", newItem });
    }
  } catch (error: any) {
    console.error('Error adding item to cart:', error);
    return NextResponse.json({
      message: "Error adding item to cart",
      error: error.message,
    }, { status: 500 });
  }
}
