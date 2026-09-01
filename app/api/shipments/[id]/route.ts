import { NextRequest, NextResponse } from "next/server";
import { patchShipmentSchema } from "@/lib/schemas";
import {
    getShipmentById,
    addFeriToShipment,
    markShipmentPaid,
    addAdToShipment,
    completeShipment,
    skipFeriAction,
    updateShipmentAdmin,
} from "@/server/services/shipment.service";
import { handleApiError } from "@/lib/errors";

export async function GET(
    _req: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;
        const shipment = await getShipmentById(id);
        return NextResponse.json({ data: shipment });
    } catch (error) {
        const err = handleApiError(error);
        return NextResponse.json({ error: err.message, code: err.code }, { status: err.statusCode });
    }
}

export async function PATCH(
    req: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;
        const body = await req.json();
        const parsed = patchShipmentSchema.safeParse(body);

        if (!parsed.success) {
            return NextResponse.json(
                { error: "Validation failed", details: parsed.error.flatten().fieldErrors },
                { status: 400 }
            );
        }

        let updated;
        switch (parsed.data.action) {
            case "ADD_FERI":
                updated = await addFeriToShipment(id, parsed.data);
                break;
            case "MARK_PAID":
                updated = await markShipmentPaid(id, parsed.data);
                break;
            case "ADD_AD":
                updated = await addAdToShipment(id, parsed.data);
                break;
            case "SKIP_FERI":
                updated = await skipFeriAction(id);
                break;
            case "COMPLETE":
                updated = await completeShipment(id);
                break;
            case "EDIT_ADMIN":
                updated = await updateShipmentAdmin(id, parsed.data);
                break;
        }

        return NextResponse.json({ data: updated });
    } catch (error) {
        const err = handleApiError(error);
        return NextResponse.json({ error: err.message, code: err.code }, { status: err.statusCode });
    }
}
