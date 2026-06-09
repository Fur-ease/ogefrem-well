import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { getWellShipments } from "@/server/well/well-shipment.service";

export async function GET(request: Request) {
    const session = await getServerSession(authOptions);
    if (!session || (session.user.department !== "WELL" && session.user.department !== "ADMIN")) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    try {
        // The daily cargo report specifically excludes PCHARGES
        const shipments = await getWellShipments({
            excludePcharges: true
        });
        return NextResponse.json(shipments);
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
