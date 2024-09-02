import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function POST(req: Request) {

try {
    const {name, description, price, imageUrl, category}: any = await req.json();

    const newListing = await prisma.product.create({
        data: {
            name, description, price, imageUrl, category
        }
    })

    return NextResponse.json({
        message: "Product listing is Successful!",
        success: true,
        newListing
    }, {status: 200})
} catch (error: any) {
    return NextResponse.json({
        message: "Error while listing the Product!",
        error : error.message
    }, {status: 500})
}
}