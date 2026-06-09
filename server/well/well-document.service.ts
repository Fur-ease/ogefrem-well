import { prisma } from "@/lib/prisma";
import { logger } from "@/lib/logger";
import { ensureShipmentFolder, uploadFileToOneDrive, deleteFileFromOneDrive } from "@/server/services/onedrive.service";

export async function addWellDocument(
    shipmentId: string,
    fileBuffer: Buffer,
    filename: string,
    mimeType: string,
    docType: string
) {
    const shipment = await prisma.wellShipment.findUnique({
        where: { id: shipmentId },
    });

    if (!shipment) throw new Error("Well Shipment not found");

    // Format folder name properly for OneDrive
    // Ogefrem uses FERI, but for WELL we use refNumber. Replace slashes to avoid nested folders.
    const folderNameSafeRef = shipment.refNumber.replace("/", "_");
    const folderId = await ensureShipmentFolder(
        shipment.clientName,
        folderNameSafeRef,
        shipment.createdAt
    );

    const safeFilename = filename.replace(/[^a-zA-Z0-9.\-_]/g, "_");

    const uploaded = await uploadFileToOneDrive(
        fileBuffer,
        mimeType,
        safeFilename,
        folderId
    );

    const document = await prisma.wellDocument.create({
        data: {
            shipmentId,
            filename: uploaded.filename,
            driveFileId: uploaded.fileId,
            driveUrl: uploaded.url,
            docType,
        },
    });

    logger.info({ documentId: document.id, shipmentId }, "Added Well Document");
    return document;
}

export async function deleteWellDocument(documentId: string) {
    const document = await prisma.wellDocument.findUnique({
        where: { id: documentId },
    });

    if (!document) throw new Error("Document not found");

    await deleteFileFromOneDrive(document.driveFileId);

    await prisma.wellDocument.delete({
        where: { id: documentId },
    });

    logger.info({ documentId }, "Deleted Well Document");
}
