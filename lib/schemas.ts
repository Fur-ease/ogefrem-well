/**
 * Zod validation schemas for all API endpoints.
 */

import { z } from "zod";
// @ts-ignore
import { ShipmentStatus, DocumentType } from "@prisma/client";

// ─────────────────────────────────────────────────────────────────────────────
// SHIPMENT SCHEMAS
// ─────────────────────────────────────────────────────────────────────────────

/** Step 1 — Create new shipment */
export const createShipmentSchema = z.object({
    clientName: z.string().min(1, "Client name is required").max(200),
    blNumber: z.string().min(1, "BL number is required").max(100),
    containerCount: z.coerce.number().int().positive("Container count must be at least 1").default(1),
});

/** Step 2 — Add Feri Number + Proforma */
export const addFeriSchema = z.object({
    feriNumber: z.string().min(1, "Feri number is required"),
    proformaNumber: z.string().min(1, "Proforma number is required"),
    proformaAmountEUR: z
        .number()
        .positive("Proforma amount must be positive"),
    commissionEUR: z
        .number()
        .positive()
        .default(40),
});

/** Step 3 — Mark as Paid (POP) */
export const markPaidSchema = z.object({
    exchangeRate: z
        .number()
        .positive("Exchange rate must be positive"),
});

/** Step 4 — AD Generation */
export const addAdSchema = z.object({
    adAmountUSD: z
        .number()
        .positive("AD amount must be positive")
        .optional(),
    tioNumber: z.string().min(1, "TIO number is required"),
});

/** Step 5 — Mark as Completed */
export const completeShipmentSchema = z.object({});

/** Generic PATCH dispatcher */
export const patchShipmentSchema = z.discriminatedUnion("action", [
    z.object({ action: z.literal("ADD_FERI") }).merge(addFeriSchema),
    z.object({ action: z.literal("MARK_PAID") }).merge(markPaidSchema),
    z.object({ action: z.literal("ADD_AD") }).merge(addAdSchema),
    z.object({ action: z.literal("SKIP_FERI") }),
    z.object({ action: z.literal("COMPLETE") }),
]);

// ─────────────────────────────────────────────────────────────────────────────
// DOCUMENT SCHEMAS
// ─────────────────────────────────────────────────────────────────────────────

export const documentTypeSchema = z.nativeEnum(DocumentType);

// ─────────────────────────────────────────────────────────────────────────────
// REPORT SCHEMAS
// ─────────────────────────────────────────────────────────────────────────────

export const monthQuerySchema = z.object({
    month: z
        .string()
        .regex(/^\d{4}-\d{2}$/, "Month must be in YYYY-MM format"),
});

export const exportReportSchema = z.object({
    month: z
        .string()
        .regex(/^\d{4}-\d{2}$/, "Month must be in YYYY-MM format"),
});

// ─────────────────────────────────────────────────────────────────────────────
// WELL SCHEMAS
// ─────────────────────────────────────────────────────────────────────────────

export const wellContainerSchema = z.object({
    id: z.string().optional(),
    containerNumber: z.string().min(1, "Container number is required").toUpperCase(),
    size: z.string().optional(),
    weight: z.coerce.number().optional(),
    dischargeDate: z.string().optional().nullable(),
    gateOutDate: z.string().optional().nullable(),
    truckDetails: z.string().optional().nullable(),
    driverName: z.string().optional().nullable(),
    status: z.string().optional().nullable(),
    remarks: z.string().optional().nullable(),
});

export const createWellShipmentSchema = z.object({
    clientName: z.string().min(1, "Client name is required").max(200),
    clientRef: z.string().optional().nullable(),
    blNumber: z.string().min(1, "BL number is required"),
    containerSize: z.string().min(1, "Container size is required"),
    vesselName: z.string().optional().nullable(),
    eta: z.string().optional().nullable(),
    notes: z.string().optional().nullable(),
    containers: z.array(wellContainerSchema).optional(),
});

export const updateWellShipmentSchema = z.object({
    clientName: z.string().optional().nullable(),
    clientRef: z.string().optional().nullable(),
    blNumber: z.string().optional().nullable(),
    containerSize: z.string().optional().nullable(),
    vesselName: z.string().optional().nullable(),
    eta: z.string().optional().nullable(),
    status: z.string().optional().nullable(),
    notes: z.string().optional().nullable(),
    isPaid: z.boolean().optional(),
    containers: z.array(wellContainerSchema).optional(),
    // Finance fields
    amount: z.coerce.number().optional().nullable(),
    roeKsh: z.coerce.number().optional().nullable(),
    invoiceDate: z.string().optional().nullable(),
    paidAt: z.string().optional().nullable(),
    // Tracking fields
    docRecv: z.string().optional().nullable(),
    entryNumber: z.string().optional().nullable(),
    tblNtbl: z.string().optional().nullable(),
    lastSlingCfs: z.string().optional().nullable(),
    lodgeCustoms: z.string().optional().nullable(),
    entryPassed: z.string().optional().nullable(),
    slineCharges: z.string().optional().nullable(),
    slinePaid: z.string().optional().nullable(),
    ddRecv: z.string().optional().nullable(),
    lodgedKpa: z.string().optional().nullable(),
    dateVerified: z.string().optional().nullable(),
});

export type CreateShipmentInput = z.infer<typeof createShipmentSchema>;
export type AddFeriInput = z.infer<typeof addFeriSchema>;
export type MarkPaidInput = z.infer<typeof markPaidSchema>;
export type AddAdInput = z.infer<typeof addAdSchema>;
export type PatchShipmentInput = z.infer<typeof patchShipmentSchema>;
export type MonthQuery = z.infer<typeof monthQuerySchema>;
