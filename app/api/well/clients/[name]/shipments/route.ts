import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { getShipmentsByClient } from "@/server/well/well-shipment.service";

export async function GET(
    request: Request,
    { params }: { params: { name: string } }
) {
    const session = await getServerSession(authOptions);
    if (!session || (session.user.department !== "WELL" && session.user.department !== "ADMIN")) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    try {
        const { name } = params;
        const shipments = await getShipmentsByClient(decodeURIComponent(name));
        return NextResponse.json(shipments);
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
