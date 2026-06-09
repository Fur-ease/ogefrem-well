import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { addWellDocument } from "@/server/well/well-document.service";
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
        const formData = await request.formData();
        const file = formData.get("file") as File;
        const docType = formData.get("type") as string;

        if (!file || !docType) {
            return NextResponse.json({ error: "File and type are required" }, { status: 400 });
        }

        const buffer = Buffer.from(await file.arrayBuffer());

        const document = await addWellDocument(
            id,
            buffer,
            file.name,
            file.type,
            docType
        );

        // Also update shipment status to FUP if this is the first doc (optional heuristic)
        // We'll leave that logic for the frontend to trigger specifically.

        await logActivity(
            session.user.id,
            "UPLOADED_DOCUMENT",
            "WellShipment",
            id,
            { docType, documentId: document.id }
        );

        return NextResponse.json(document);
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
