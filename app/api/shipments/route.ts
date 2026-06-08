import { NextRequest, NextResponse } from "next/server";
import { createShipmentSchema } from "@/lib/schemas";
import { createShipment, listShipments } from "@/server/services/shipment.service";
import { handleApiError } from "@/lib/errors";
import { ShipmentStatus } from "@prisma/client";

export async function GET(req: NextRequest) {
    try {
        const { searchParams } = new URL(req.url);
        const status = searchParams.get("status") as ShipmentStatus | null;
        const month = searchParams.get("month");

        const shipments = await listShipments({
            status: status || undefined,
            month: month || undefined,
        });

        return NextResponse.json({ data: shipments });
    } catch (error) {
        const err = handleApiError(error);
        return NextResponse.json({ error: err.message, code: err.code }, { status: err.statusCode });
    }
}

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const parsed = createShipmentSchema.safeParse(body);

        if (!parsed.success) {
            return NextResponse.json(
                { error: "Validation failed", details: parsed.error.flatten().fieldErrors },
                { status: 400 }
            );
        }

        const shipment = await createShipment(parsed.data);
        return NextResponse.json({ data: shipment }, { status: 201 });
    } catch (error) {
        const err = handleApiError(error);
        return NextResponse.json({ error: err.message, code: err.code }, { status: err.statusCode });
    }
}
