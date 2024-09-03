import prisma from "@/app/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const categories = await prisma.product.findMany({
      select: {
        category: true,
      },
      distinct: ["category"],
    });

    return NextResponse.json(
      {
        message: "Categories fetched successfully!",
        categories: categories
          .map((cat) => cat.category)
          .filter((cat) => cat !== null),
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      {
        message: "Error while fetching categorised products!",
        error,
      },
      { status: 500 }
    );
  }
}
