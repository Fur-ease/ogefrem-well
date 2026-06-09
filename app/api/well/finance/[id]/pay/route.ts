import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { markWellShipmentAsPaid } from "@/server/well/well-finance.service";
import { logActivity } from "@/server/well/activity.service";

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
        const data = await request.json();
        const shipment = await markWellShipmentAsPaid(id, data.amount);

        await logActivity(
            session.user.id,
            "MARKED_PAYMENT",
            "WellShipment",
            shipment.id,
            { amount: data.amount }
        );

        return NextResponse.json(shipment);
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
