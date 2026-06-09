/**
 * Invoice Service — OGEFREM Representation WELL
 * 
 * Handles invoice number generation and data persistence.
 */

import { prisma } from "@/lib/prisma";
import { logger } from "@/lib/logger";
import { getShipmentById } from "./shipment.service";

const STARTING_INVOICE_NUMBER = 17612;

/**
 * Generates the next invoice number by finding the maximum current number
 * and incrementing it. If no invoices exist, starts at 17612.
 */
export async function getNextInvoiceNumber(): Promise<string> {
    const results = await prisma.$queryRaw<any[]>`
        SELECT "invoiceNumber" 
        FROM "Shipment" 
        WHERE "invoiceNumber" IS NOT NULL 
        ORDER BY "invoiceNumber" DESC 
        LIMIT 1
    `;

    const highestShipment = results[0];

    if (!highestShipment || !highestShipment.invoiceNumber) {
        return STARTING_INVOICE_NUMBER.toString();
    }

    const currentMax = parseInt(highestShipment.invoiceNumber);
    if (isNaN(currentMax)) {
        // Fallback if formatting changes
        return (STARTING_INVOICE_NUMBER + 1).toString();
    }

    return (Math.max(currentMax, STARTING_INVOICE_NUMBER - 1) + 1).toString();
}

/**
 * Finalizes an invoice for a shipment
 */
export async function finalizeInvoice(id: string, data: any) {
    const invoiceNumber = await getNextInvoiceNumber();
    const invoiceDate = new Date();
    
    // Using $executeRaw to bypass Prisma Client's field validation for new fields
    await prisma.$executeRaw`
        UPDATE "Shipment" 
        SET 
            "invoiceNumber" = ${invoiceNumber},
            "invoiceDate" = ${invoiceDate},
            "vesselName" = ${data.vesselName || null},
            "entryNumber" = ${data.entryNumber || null},
            "roeKsh" = ${Number(data.roeKsh)},
            "preparedBy" = ${data.preparedBy},
            "feriNumber" = ${data.feriNumber || null},
            "blNumber" = ${data.blNumber || null},
            "cuInvoiceNumber" = ${data.cuInvoiceNumber || null},
            "qrCodeUrl" = ${data.qrCodeUrl || null},
            "cuDateTime" = ${data.cuDateTime ? new Date(data.cuDateTime) : null},
            "cuSerialNumber" = ${data.cuSerialNumber || null},
            "customerPin" = ${data.customerPin || null}
        WHERE id = ${id}
    `;

    const updated = await getShipmentById(id);

    logger.info({ shipmentId: id, invoiceNumber }, "Invoice finalized for shipment");
    return updated;
}
