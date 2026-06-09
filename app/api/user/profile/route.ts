import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";

export async function PUT(req: Request) {
  try {
    const session = await getServerSession(authOptions);

    if (!session || !session.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { username, password } = await req.json();

    if (!username) {
      return NextResponse.json({ error: "Username is required" }, { status: 400 });
    }

    const updateData: any = { username };

    if (password && password.length >= 6) {
      updateData.password = await bcrypt.hash(password, 10);
    }

    const updatedUser = await prisma.user.update({
      where: { id: session.user.id },
      data: updateData,
      select: {
        id: true,
        email: true,
        username: true,
        role: true,
      },
    });

    return NextResponse.json({ user: updatedUser }, { status: 200 });
  } catch (error) {
    console.error("Profile update error:", error);
    return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
  }
}
