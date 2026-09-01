import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { createWellException } from "@/server/well/well-shipment.service";
import { createWellExceptionSchema } from "@/lib/schemas";

export async function POST(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    const session = await getServerSession(authOptions);
    if (!session || (session.user.department !== "WELL" && session.user.department !== "ADMIN")) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = await params;

    try {
        const body = await request.json();
        const validation = createWellExceptionSchema.safeParse(body);
        if (!validation.success) {
            return NextResponse.json({ error: "Invalid exception data", details: validation.error.format() }, { status: 400 });
        }

        const userName = (session.user as any).username || session.user.email || "Operations";
        const exception = await createWellException(id, validation.data, userName);
        return NextResponse.json(exception);
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
