import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { verifyWellShipmentPayment } from "@/server/well/well-shipment.service";

export async function POST(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    const session = await getServerSession(authOptions);
    if (!session || (session.user.department !== "WELL" && session.user.department !== "ADMIN")) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = await params;

    try {
        const shipment = await verifyWellShipmentPayment(id, session.user.name || "Operations Team");
        return NextResponse.json(shipment);
    } catch (error: any) {
        return NextResponse.json({ error: error.message || "Failed to verify payment" }, { status: 500 });
    }
}
