import { NextRequest, NextResponse } from "next/server";
import { finalizeInvoice } from "@/server/services/invoice.service";
import { handleApiError } from "@/lib/errors";

export async function POST(
    req: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;
        const body = await req.json();

        // Simple validation - entryNumber and vesselName are optional as per sample image being sometimes empty
        if (!body.roeKsh || !body.preparedBy) {
            return NextResponse.json(
                { error: "ROE (Ksh) and Preparer Name are required." },
                { status: 400 }
            );
        }

        const data = await finalizeInvoice(id, body);

        return NextResponse.json({ data });
    } catch (error) {
        const err = handleApiError(error);
        return NextResponse.json({ error: err.message, code: err.code }, { status: err.statusCode });
    }
}
