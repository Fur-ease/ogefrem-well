import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { resolveWellException } from "@/server/well/well-shipment.service";

export async function POST(
    request: Request,
    { params }: { params: Promise<{ exceptionId: string }> }
) {
    const session = await getServerSession(authOptions);
    if (!session || (session.user.department !== "WELL" && session.user.department !== "ADMIN")) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { exceptionId } = await params;

    try {
        const body = await request.json().catch(() => ({}));
        const userName = (session.user as any).username || session.user.email || "Operations";
        const exception = await resolveWellException(exceptionId, body.notes, userName);
        return NextResponse.json(exception);
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
