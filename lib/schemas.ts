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
        .positive("AD amount must be positive"),
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

export type CreateShipmentInput = z.infer<typeof createShipmentSchema>;
export type AddFeriInput = z.infer<typeof addFeriSchema>;
export type MarkPaidInput = z.infer<typeof markPaidSchema>;
export type AddAdInput = z.infer<typeof addAdSchema>;
export type PatchShipmentInput = z.infer<typeof patchShipmentSchema>;
export type MonthQuery = z.infer<typeof monthQuerySchema>;
