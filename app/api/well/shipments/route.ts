import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { getWellShipments, createWellShipment } from "@/server/well/well-shipment.service";
import { logActivity } from "@/server/well/activity.service";

export async function GET(request: Request) {
    const session = await getServerSession(authOptions);
    if (!session || (session.user.department !== "WELL" && session.user.department !== "ADMIN")) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const status = searchParams.get("status");

    try {
        const shipments = await getWellShipments({
            status: status || undefined
        });
        return NextResponse.json(shipments);
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

export async function POST(request: Request) {
    const session = await getServerSession(authOptions);
    if (!session || (session.user.department !== "WELL" && session.user.department !== "ADMIN")) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    try {
        const data = await request.json();
        const shipment = await createWellShipment(data, session.user.id);

        await logActivity(
            session.user.id,
            "CREATED_WELL_SHIPMENT",
            "WellShipment",
            shipment.id,
            { refNumber: shipment.refNumber, clientName: shipment.clientName }
        );

        return NextResponse.json(shipment);
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
