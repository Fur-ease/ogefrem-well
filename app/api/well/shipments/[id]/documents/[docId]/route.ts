import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { deleteWellDocument } from "@/server/well/well-document.service";
import { logActivity } from "@/server/well/activity.service";

export async function DELETE(
    request: Request,
    { params }: { params: Promise<{ id: string; docId: string }> }
) {
    const session = await getServerSession(authOptions);
    if (!session || (session.user.department !== "WELL" && session.user.department !== "ADMIN")) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id, docId } = await params;

    try {
        await deleteWellDocument(docId);

        await logActivity(
            session.user.id,
            "DELETED_DOCUMENT",
            "WellShipment",
            id,
            { documentId: docId }
        );

        return NextResponse.json({ success: true });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
