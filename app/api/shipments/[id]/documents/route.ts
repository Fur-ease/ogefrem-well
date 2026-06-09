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
        const files = formData.getAll("file") as File[];
        const typeRaw = formData.get("type") as string | null;

        if (files.length === 0 || !typeRaw) {
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

        const uploadedDocs = [];

        // Ensure OneDrive folder exists once
        const folderId = await ensureShipmentFolder(
            shipment.clientName,
            shipment.feriNumber || "NO_FERI",
            shipment.createdAt
        );

        for (const file of files) {
            let version = 1;
            let finalFilename = file.name;

            // Naming & Version Logic
            if (docType === DocumentType.AD) {
                // If it's an AD, we no longer mark others as replaced by default to support multi-container
                const existingCount = await prisma.document.count({
                    where: { shipmentId: id, type: DocumentType.AD },
                });
                version = existingCount + 1;
                
                // Prefix filename with AD_ to keep it distinct
                const ext = file.name.split(".").pop() || "pdf";
                const basePrefix = shipment.status === ShipmentStatus.COMPLETED ? "AMENDED_AD" : "AD";
                finalFilename = `${basePrefix}_${file.name}`;
            }

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

            uploadedDocs.push(doc);
            logger.info({ docId: doc.id, shipmentId: id, type: docType, version }, "Document part of bulk upload complete");
        }

        return NextResponse.json({ data: uploadedDocs }, { status: 201 });
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
