/**
 * Shipment Service — OGEFREM Representation WELL
 *
 * Orchestrates all shipment workflow transitions.
 * Enforces step ordering and calls the Financial Service for calculations.
 */

import { prisma } from "@/lib/prisma";
import { logger } from "@/lib/logger";
import { NotFoundError, WorkflowError, ConflictError } from "@/lib/errors";
import { calculateFinancials, calculatePartialFinancials } from "./financial.service";
import {
    type CreateShipmentInput,
    type AddFeriInput,
    type MarkPaidInput,
    type AddAdInput,
} from "@/lib/schemas";
import { ShipmentStatus, DocumentType, type Shipment, type Document } from "@prisma/client";
import { Decimal } from "@prisma/client/runtime/library";

// ─────────────────────────────────────────────────────────────────────────────
// ALLOWED TRANSITIONS
// ─────────────────────────────────────────────────────────────────────────────

const STATUS_ORDER: ShipmentStatus[] = [
    ShipmentStatus.NEW,
    ShipmentStatus.FERI_ADDED,
    ShipmentStatus.PAID,
    ShipmentStatus.AD_GENERATED,
    ShipmentStatus.COMPLETED,
];

function assertStatus(shipment: Shipment, required: ShipmentStatus) {
    if (shipment.status !== required) {
        throw new WorkflowError(
            `Shipment must be in status '${required}' for this operation. Current: '${shipment.status}'`
        );
    }
}

function toNumber(v: Decimal | null | undefined): number {
    return v ? parseFloat(v.toString()) : 0;
}

// ─────────────────────────────────────────────────────────────────────────────
// CRUD
// ─────────────────────────────────────────────────────────────────────────────

export async function getShipmentById(id: string) {
    // Using $queryRaw to fetch all columns (including new ones) without Prisma Client knowing about them
    const shipments = await prisma.$queryRaw<any[]>`
        SELECT * FROM "Shipment" WHERE id = ${id} LIMIT 1
    `;

    const shipment = shipments[0];
    if (!shipment) throw new NotFoundError("Shipment");

    // Fetch documents separately via standard Prisma (types are likely OK for existing model)
    const documents = await prisma.document.findMany({
        where: { shipmentId: id },
        orderBy: { createdAt: "asc" }
    });

    return { ...shipment, documents };
}

export async function listShipments(filters: {
    status?: ShipmentStatus;
    month?: string; // YYYY-MM
}) {
    const where: Record<string, unknown> = {};
    if (filters.status) where.status = filters.status;
    if (filters.month) {
        const [year, month] = filters.month.split("-").map(Number);
        const start = new Date(year, month - 1, 1);
        const end = new Date(year, month, 1);
        where.createdAt = { gte: start, lt: end };
    }

    return prisma.shipment.findMany({
        where,
        include: { documents: { where: { isReplaced: false } } },
        orderBy: { createdAt: "desc" },
    });
}

// ─────────────────────────────────────────────────────────────────────────────
// STEP 1 — Create Shipment
// ─────────────────────────────────────────────────────────────────────────────

export async function createShipment(data: CreateShipmentInput) {
    const existing = await prisma.shipment.findUnique({ where: { blNumber: data.blNumber } });
    if (existing) {
        throw new ConflictError(`A shipment with BL number '${data.blNumber}' already exists`);
    }

    const shipment = await prisma.shipment.create({
        data: {
            clientName: data.clientName,
            blNumber: data.blNumber,
            containerCount: data.containerCount,
            status: ShipmentStatus.NEW,
        } as any,
    });

    logger.info({ shipmentId: shipment.id }, "Shipment created");
    return shipment;
}

// ─────────────────────────────────────────────────────────────────────────────
// STEP 2 — Add Feri + Proforma
// ─────────────────────────────────────────────────────────────────────────────

export async function addFeriToShipment(id: string, data: AddFeriInput) {
    const shipment = await getShipmentById(id);
    assertStatus(shipment, ShipmentStatus.NEW);

    // Mandatory document checks removed per user request:
    // Draft Feri and Proforma no longer required to proceed.

    const updated = await prisma.shipment.update({
        where: { id },
        data: {
            feriNumber: data.feriNumber,
            proformaNumber: data.proformaNumber,
            proformaAmountEUR: data.proformaAmountEUR,
            commissionEUR: data.commissionEUR,
            status: ShipmentStatus.FERI_ADDED,
        },
    });

    logger.info({ shipmentId: id, feriNumber: data.feriNumber }, "Feri added to shipment");
    return updated;
}

export async function skipFeriAction(id: string) {
    const shipment = await getShipmentById(id);
    assertStatus(shipment, ShipmentStatus.NEW);

    const updated = await prisma.shipment.update({
        where: { id },
        data: {
            status: ShipmentStatus.AD_GENERATED,
            isFeriSkipped: true,
        },
    });

    logger.info({ shipmentId: id }, "FERI skipped - Jumping to AD_GENERATED");
    return updated;
}

// ─────────────────────────────────────────────────────────────────────────────
// STEP 3 — Mark as Paid
// ─────────────────────────────────────────────────────────────────────────────

export async function markShipmentPaid(id: string, data: MarkPaidInput) {
    const shipment = await getShipmentById(id);
    assertStatus(shipment, ShipmentStatus.FERI_ADDED);

    // Mandatory document checks removed per user request:
    // POP no longer required to proceed.

    const proformaEUR = toNumber(shipment.proformaAmountEUR);
    const commEUR = toNumber(shipment.commissionEUR);
    const { ferriUSD, commUSD } = calculatePartialFinancials(
        proformaEUR,
        commEUR,
        data.exchangeRate
    );

    const updated = await prisma.shipment.update({
        where: { id },
        data: {
            exchangeRate: data.exchangeRate,
            ferriUSD,
            commUSD,
            status: ShipmentStatus.PAID,
        },
    });

    logger.info({ shipmentId: id, exchangeRate: data.exchangeRate, ferriUSD, commUSD }, "Shipment marked as paid");
    return updated;
}

// ─────────────────────────────────────────────────────────────────────────────
// STEP 4 — AD Generation
// ─────────────────────────────────────────────────────────────────────────────

export async function addAdToShipment(id: string, data: AddAdInput) {
    const shipment = await getShipmentById(id);

    // Normally we expect PAID status. If FERI was skipped, we are in AD_GENERATED but need to finalize data.
    const isSkippedAndUnfilled = (shipment as any).isFeriSkipped && shipment.adAmountUSD === null;
    if (shipment.status !== ShipmentStatus.PAID && !isSkippedAndUnfilled) {
        throw new WorkflowError(
            `Shipment must be in status 'PAID' or 'AD_GENERATED' (if skipped) for this operation. Current: '${shipment.status}'`
        );
    }

    const proformaEUR = toNumber(shipment.proformaAmountEUR);
    const commEUR = toNumber(shipment.commissionEUR);
    const rate = toNumber(shipment.exchangeRate);

    // Calculate AD Amount: $20 per container
    const adAmountUSD = (shipment as any).containerCount * 20;

    // If FERI was skipped, we might not have proforma/rate.
    // In that case, we just use the calculated AD amount and let other fields be zero.
    const { ferriUSD, commUSD, totalUSD, wellRevenue, musungoRevenue, ogefremRevenue } =
        calculateFinancials({
            proformaAmountEUR: proformaEUR || 0,
            commissionEUR: commEUR || 0,
            exchangeRate: rate || 0,
            adAmountUSD: adAmountUSD,
        });

    const updated = await prisma.shipment.update({
        where: { id },
        data: {
            adAmountUSD: adAmountUSD,
            tioNumber: data.tioNumber,
            ferriUSD,
            commUSD,
            totalUSD,
            wellRevenue,
            musungoRevenue,
            ogefremRevenue,
            status: ShipmentStatus.AD_GENERATED,
        },
    });

    logger.info({ shipmentId: id, totalUSD }, "AD generated for shipment");
    return updated;
}

// ─────────────────────────────────────────────────────────────────────────────
// STEP 5 — Complete Shipment
// ─────────────────────────────────────────────────────────────────────────────

export async function completeShipment(id: string) {
    const shipment = await getShipmentById(id);
    assertStatus(shipment, ShipmentStatus.AD_GENERATED);

    const updated = await prisma.shipment.update({
        where: { id },
        data: { status: ShipmentStatus.COMPLETED },
    });

    logger.info({ shipmentId: id }, "Shipment completed");
    return updated;
}

export async function updateShipmentAdmin(id: string, data: {
    feriNumber?: string;
    proformaNumber?: string;
    containerCount?: number;
    clientName?: string;
    blNumber?: string;
    proformaAmountEUR?: number;
    commissionEUR?: number;
}) {
    const shipment = await getShipmentById(id);
    const updateData: any = {};
    if (data.feriNumber !== undefined) updateData.feriNumber = data.feriNumber;
    if (data.proformaNumber !== undefined) updateData.proformaNumber = data.proformaNumber;
    if (data.containerCount !== undefined) updateData.containerCount = data.containerCount;
    if (data.clientName !== undefined) updateData.clientName = data.clientName;
    if (data.blNumber !== undefined) updateData.blNumber = data.blNumber;
    if (data.proformaAmountEUR !== undefined) updateData.proformaAmountEUR = data.proformaAmountEUR;
    if (data.commissionEUR !== undefined) updateData.commissionEUR = data.commissionEUR;

    const newCount = data.containerCount ?? (shipment as any).containerCount;
    if (shipment.adAmountUSD !== null && newCount) {
        updateData.adAmountUSD = newCount * 20;
    }

    const updated = await prisma.shipment.update({
        where: { id },
        data: updateData,
    });

    logger.info({ shipmentId: id, updates: Object.keys(updateData) }, "Super Admin updated shipment details");
    return updated;
}

// ─────────────────────────────────────────────────────────────────────────────
// DOCUMENT GUARD — prevent upload if prior step incomplete
// ─────────────────────────────────────────────────────────────────────────────

/** Returns the minimum status required to upload a document of a given type */
export function requiredStatusForDocument(docType: string): ShipmentStatus {
    const step1Docs = ["BL", "PACKING_LIST", "COMMERCIAL_INVOICE"];
    const step2Docs = ["DRAFT_FERI", "PROFORMA"];
    const step3Docs = ["POP"];
    const step4Docs = ["AD", "FACTURE", "FINAL_FERI", "TIO"];

    if (step1Docs.includes(docType)) return ShipmentStatus.NEW;
    if (step2Docs.includes(docType)) return ShipmentStatus.NEW; // Allow upload in Step 1
    if (step3Docs.includes(docType)) return ShipmentStatus.FERI_ADDED; // Allow upload in Step 2
    if (step4Docs.includes(docType)) return ShipmentStatus.PAID; // Allow upload in Step 3
    return ShipmentStatus.NEW;
}

export function canUploadDocument(
    shipmentStatus: ShipmentStatus,
    docType: string
): boolean {
    // If shipment is completed, we still allow uploading technical documents (Step 4 docs)
    // for amendments or fixing mistakes.
    // If shipment is completed, we allow uploading ALL document types
    // for amendments, fixing mistakes, or late uploads as requested.
    if (shipmentStatus === ShipmentStatus.COMPLETED) {
        return true;
    }

    // Special case for skipped FERI: allow POP in AD_GENERATED
    if (docType === "POP" && shipmentStatus === ShipmentStatus.AD_GENERATED) {
        return true;
    }

    const required = requiredStatusForDocument(docType);

    const reqIdx = STATUS_ORDER.indexOf(required);
    const curIdx = STATUS_ORDER.indexOf(shipmentStatus);
    return curIdx >= reqIdx;
}
