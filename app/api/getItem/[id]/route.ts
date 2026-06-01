import prisma from "@/app/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  if (!id) {
    return NextResponse.json(
      {
        message: "No ID provided",
      },
      { status: 400 }
    );
  }

  try {
    const response = await prisma.product.findUnique({
      where: { id },
    });

    if (!response) {
      return NextResponse.json(
        {
          message: "Item not found",
        },
        { status: 404 }
      );
    }

    return NextResponse.json(
      {
        message: "Item fetched successfully!",
        response,
      },
      { status: 200 }
    );
  } catch (error: any) {
    return NextResponse.json(
      {
        message: "Error while fetching the item",
        error: error.message || "Unknown error",
      },
      { status: 500 }
    );
  }
}
