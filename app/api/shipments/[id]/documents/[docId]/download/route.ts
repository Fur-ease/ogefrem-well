import { NextRequest, NextResponse } from "next/server";
import { getShipmentById } from "@/server/services/shipment.service";
import { getDownloadStream } from "@/server/services/onedrive.service";
import { handleApiError } from "@/lib/errors";
import { prisma } from "@/lib/prisma";

export async function GET(
    _req: NextRequest,
    { params }: { params: Promise<{ id: string; docId: string }> }
) {
    try {
        const { id, docId } = await params;
        
        // Verify shipment exists
        await getShipmentById(id);

        // Find the document
        const document = await prisma.document.findUnique({
            where: { id: docId, shipmentId: id }
        });

        if (!document) {
            return NextResponse.json({ error: "Document not found" }, { status: 404 });
        }

        // Get stream from OneDrive
        const stream = await getDownloadStream(document.driveFileId);

        // Return as attachment
        return new NextResponse(stream, {
            headers: {
                "Content-Disposition": `attachment; filename="${document.filename}"`,
                "Content-Type": "application/octet-stream",
            },
        });
    } catch (error) {
        const err = handleApiError(error);
        return NextResponse.json({ error: err.message, code: err.code }, { status: err.statusCode });
    }
}
