import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";

export async function POST(req: Request) {
  try {
    const { token, password } = await req.json();

    if (!token || !password) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    // Find the reset token
    const resetToken = await prisma.resetToken.findUnique({
      where: { token },
      include: { user: true },
    });

    if (!resetToken) {
      return NextResponse.json({ error: "Invalid or expired token" }, { status: 400 });
    }

    // Check if token is expired
    if (new Date() > resetToken.expires) {
      // Clean up expired token
      await prisma.resetToken.delete({ where: { id: resetToken.id } });
      return NextResponse.json({ error: "Token has expired" }, { status: 400 });
    }

    // Hash the new password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Update user password and delete reset token in a transaction
    await prisma.$transaction([
      prisma.user.update({
        where: { id: resetToken.userId },
        data: { password: hashedPassword },
      }),
      prisma.resetToken.deleteMany({
        where: { userId: resetToken.userId },
      }),
    ]);

    return NextResponse.json({ message: "Password updated successfully" }, { status: 200 });
  } catch (error) {
    console.error("Reset password error:", error);
    return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
  }
}
