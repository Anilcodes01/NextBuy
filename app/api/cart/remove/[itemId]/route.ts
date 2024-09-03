import prisma from "@/app/lib/prisma";
import { NextResponse } from "next/server";


export async function DELETE(req: Request, {params}: {params: {itemId: string}} ) {
  
  try {
    const {itemId} = params

    await prisma.cartItem.delete({
      where: { id: itemId },
    });

    return NextResponse.json({
      message: "Item removed from cart successfully!",
    }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({
      message: "Error while removing item from cart.",
      error: error.message,
    }, { status: 500 });
  }
}
