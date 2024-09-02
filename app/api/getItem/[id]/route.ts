import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function GET(req: Request, { params }: any) {
    const { id } = params;

    if (!id) {
        return NextResponse.json({
            message: "No ID provided"
        }, { status: 400 });
    }

    try {
        const response = await prisma.product.findUnique({
            where: { id: id as string } 
        });

        if (!response) {
            return NextResponse.json({
                message: "Item not found"
            }, { status: 404 });
        }

        return NextResponse.json({
            message: "Item fetched successfully!",
            response
        }, { status: 200 });
    } catch (error: any) {
        return NextResponse.json({
            message: "Error while fetching the item",
            error: error.message || "Unknown error"
        }, { status: 500 });
    }
}
