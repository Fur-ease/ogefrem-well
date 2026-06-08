import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { deleteFileFromOneDrive } from "@/server/services/onedrive.service";
import { handleApiError, NotFoundError } from "@/lib/errors";
import { logger } from "@/lib/logger";

export async function DELETE(
    _req: NextRequest,
    { params }: { params: Promise<{ id: string; docId: string }> }
) {
    try {
        const { id, docId } = await params;
        const doc = await prisma.document.findFirst({
            where: { id: docId, shipmentId: id },
        });

        if (!doc) throw new NotFoundError("Document");

        // Delete from OneDrive
        await deleteFileFromOneDrive(doc.driveFileId);


        // Delete from DB
        await prisma.document.delete({ where: { id: docId } });

        logger.info({ docId, shipmentId: id }, "Document deleted");
        return NextResponse.json({ success: true });
    } catch (error) {
        const err = handleApiError(error);
        return NextResponse.json({ error: err.message, code: err.code }, { status: err.statusCode });
    }
}
