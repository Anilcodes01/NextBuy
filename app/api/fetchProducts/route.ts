import prisma from "@/app/lib/prisma";
import { NextResponse } from "next/server";


export async function GET() {
  try {
    const products = await prisma.product.findMany();

    return NextResponse.json(
      {
        message: "Products fetched successfully!",
        products,
      },
      { status: 200 }
    );
  } catch (error: any) {
    return NextResponse.json(
      {
        message: "Error while fetching Products...",
        error: error.message,
      },
      { status: 500 }
    );
  }
}
