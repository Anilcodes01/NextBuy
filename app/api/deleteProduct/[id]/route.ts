import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function DELETE(req: Request, {params}: {params: {id: string}}) {
const {id} = params
    try {
        const deletedProduct = await prisma.product.delete({
            where: {id}
        })
        return NextResponse.json({
            message: "Product deleted successfully!",
            success: true
        }, {status: 200})
    } catch (error) {
        return NextResponse.json({
            message: "Error while deleting Product", error
        }, {status: 500})
    }
}