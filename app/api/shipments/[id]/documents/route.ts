import { NextRequest, NextResponse } from "next/server";
import { documentTypeSchema } from "@/lib/schemas";
import { getShipmentById, canUploadDocument } from "@/server/services/shipment.service";
import {
    ensureShipmentFolder,
    uploadFileToOneDrive,
    buildVersionedFilename,
} from "@/server/services/onedrive.service";
import { handleApiError, WorkflowError } from "@/lib/errors";
import { prisma } from "@/lib/prisma";
// @ts-ignore
import { DocumentType, ShipmentStatus } from "@prisma/client";
import { logger } from "@/lib/logger";


export async function POST(
    req: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;
        const formData = await req.formData();
        const file = formData.get("file") as File | null;
        const typeRaw = formData.get("type") as string | null;

        if (!file || !typeRaw) {
            return NextResponse.json(
                { error: "Missing 'file' or 'type' in form data" },
                { status: 400 }
            );
        }

        const typeResult = documentTypeSchema.safeParse(typeRaw);
        if (!typeResult.success) {
            return NextResponse.json(
                { error: `Invalid document type. Allowed: ${Object.values(DocumentType).join(", ")}` },
                { status: 400 }
            );
        }
        const docType = typeResult.data;

        const shipment = await getShipmentById(id);

        if (!canUploadDocument(shipment.status, docType)) {
            throw new WorkflowError(
                `Cannot upload '${docType}' when shipment status is '${shipment.status}'. Please complete the required prior steps first.`
            );
        }

        // Determine AD version if applicable
        let version = 1;
        let finalFilename = file.name;

        if (docType === DocumentType.AD) {
            const existing = await prisma.document.findMany({
                where: { shipmentId: id, type: DocumentType.AD },
                orderBy: { version: "desc" },
            });
            if (existing.length > 0) {
                version = existing[0].version + 1;
                // Mark prior AD documents as replaced
                await prisma.document.updateMany({
                    where: { shipmentId: id, type: DocumentType.AD },
                    data: { isReplaced: true },
                });
            }
            const ext = file.name.split(".").pop() || "pdf";
            const basePrefix = shipment.status === ShipmentStatus.COMPLETED ? "AMENDED_AD" : "AD";
            finalFilename = buildVersionedFilename(basePrefix, version, ext);
        }


        // Ensure OneDrive folder exists
        const folderId = await ensureShipmentFolder(
            shipment.clientName,
            shipment.feriNumber || "NO_FERI",
            shipment.createdAt
        );

        // Upload to OneDrive
        const buffer = Buffer.from(await file.arrayBuffer());
        const uploaded = await uploadFileToOneDrive(buffer, file.type || "application/octet-stream", finalFilename, folderId);

        // Save document record
        const doc = await prisma.document.create({
            data: {
                shipmentId: id,
                type: docType,
                filename: finalFilename,
                driveFileId: uploaded.fileId,
                driveUrl: uploaded.url,
                version,
                isReplaced: false,
            },
        });


        logger.info({ docId: doc.id, shipmentId: id, type: docType, version }, "Document uploaded");
        return NextResponse.json({ data: doc }, { status: 201 });
    } catch (error) {
        const err = handleApiError(error);
        return NextResponse.json({ error: err.message, code: err.code }, { status: err.statusCode });
    }
}

export async function GET(
    _req: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;
        await getShipmentById(id); // validates existence
        const docs = await prisma.document.findMany({
            where: { shipmentId: id },
            orderBy: { createdAt: "asc" },
        });
        return NextResponse.json({ data: docs });
    } catch (error) {
        const err = handleApiError(error);
        return NextResponse.json({ error: err.message, code: err.code }, { status: err.statusCode });
    }
}
