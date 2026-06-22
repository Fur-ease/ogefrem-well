import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { getWellShipmentById, updateWellShipment } from "@/server/well/well-shipment.service";
import { logActivity } from "@/server/well/activity.service";
import { updateWellShipmentSchema } from "@/lib/schemas";
import { sanitizeObject } from "@/lib/sanitizer";

export async function GET(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    const session = await getServerSession(authOptions);
    if (!session || (session.user.department !== "WELL" && session.user.department !== "ADMIN")) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = await params;

    try {
        const shipment = await getWellShipmentById(id);
        return NextResponse.json(shipment);
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

export async function PATCH(
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
        const validation = updateWellShipmentSchema.safeParse(body);
        if (!validation.success) {
            return NextResponse.json({ error: "Invalid data", details: validation.error.format() }, { status: 400 });
        }

        const data = sanitizeObject(validation.data);
        const shipment = await updateWellShipment(id, data);

        await logActivity(
            session.user.id,
            "UPDATED_WELL_SHIPMENT",
            "WellShipment",
            shipment.id,
            { updates: Object.keys(data) }
        );

        return NextResponse.json(shipment);
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
