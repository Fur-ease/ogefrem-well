import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { getClientSummaries } from "@/server/well/well-shipment.service";

export async function GET(request: Request) {
    const session = await getServerSession(authOptions);
    if (!session || (session.user.department !== "WELL" && session.user.department !== "ADMIN")) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    try {
        const { searchParams } = new URL(request.url);
        const q = searchParams.get("q") || undefined;
        const summaries = await getClientSummaries(q);
        return NextResponse.json(summaries);
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
