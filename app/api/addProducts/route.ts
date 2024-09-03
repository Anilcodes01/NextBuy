import prisma from "@/app/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { name, description, price, imageUrl, category } = await req.json();

    const newProduct = await prisma.product.create({
      data: {
        name,
        description,
        price,
        imageUrl,
        category,
      },
    });

    return NextResponse.json({
        message: "Product added successfully!", 
        success: true,
        newProduct
    }, {status: 200})
  } catch (error) {
    return NextResponse.json(
      {
        message: "Error while listing the Product!",
        error,
      },
      { status: 500 }
    );
  }
}
