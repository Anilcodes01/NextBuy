import prisma from "@/app/lib/prisma";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";



export async function POST(req: Request) {
  try {
    const { name, email, password, avatarUrl }: any = await req.json();

    if (!email) {
      return NextResponse.json(
        {
          message: "Email is required!",
        },
        { status: 400 }
      );
    }

    const existingUser = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (existingUser) {
      return NextResponse.json(
        {
          message: "User with this email already exists, please sign in...!",
          success: false,
        },
        { status: 500 }
      );
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        avatarUrl,
      },
    });

    return NextResponse.json(
      {
        message: "User created successfully!",
        success: true,
      },
      { status: 200 }
    );
  } catch (error: any) {
    console.log(error);
    return NextResponse.json(
      {
        message: "Failed to signup",
        error: error.message,
      },
      { status: 500 }
    );
  }
}
