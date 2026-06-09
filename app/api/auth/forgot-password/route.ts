import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import crypto from "crypto";

export async function POST(req: Request) {
  try {
    const { email } = await req.json();

    if (!email) {
      return NextResponse.json({ error: "Email is required" }, { status: 400 });
    }

    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      // Return 200 even if user not found to prevent email enumeration
      return NextResponse.json({ message: "If an account with that email exists, a reset link has been sent." }, { status: 200 });
    }

    // Generate token
    const token = crypto.randomBytes(32).toString("hex");
    const expires = new Date(Date.now() + 3600000); // 1 hour

    // Save token to DB
    await prisma.resetToken.create({
      data: {
        token,
        expires,
        userId: user.id,
      },
    });

    const resetLink = `${process.env.NEXTAUTH_URL || "http://localhost:3000"}/reset-password?token=${token}`;

    // IMPORTANT: Log to console as per user requirements
    console.log("==========================================");
    console.log("PASSWORD RESET REQUESTED");
    console.log(`For User: ${user.email}`);
    console.log(`Reset Link: ${resetLink}`);
    console.log("==========================================");

    return NextResponse.json({ message: "If an account with that email exists, a reset link has been sent." }, { status: 200 });
  } catch (error) {
    console.error("Forgot password error:", error);
    return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
  }
}
