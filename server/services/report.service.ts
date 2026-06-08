/**
 * Report Service — OGEFREM Representation WELL
 *
 * Monthly financial summary + DOCX export.
 */

import { prisma } from "@/lib/prisma";
import { logger } from "@/lib/logger";
import { ShipmentStatus } from "@prisma/client";
import { Decimal } from "@prisma/client/runtime/library";
import {
    Document as DocxDocument,
    Packer,
    Paragraph,
    Table,
    TableRow,
    TableCell,
    TextRun,
    HeadingLevel,
    AlignmentType,
    WidthType,
    BorderStyle,
} from "docx";
import { format } from "date-fns";

// ─────────────────────────────────────────────────────────────────────────────
// TYPES
// ─────────────────────────────────────────────────────────────────────────────

export interface ReportRow {
    client: string;
    date: string;
    feri: string;
    proforma: string;
    ferriEUR: number;
    curExc: number;
    ferriUSD: number;
    commEUR: number;
    commUSD: number;
    adUSD: number;
    totalUSD: number;
    wellRev: number;
    ogefremRev: number;
    musongo: number;
}

export interface MonthlyReport {
    month: string;
    rows: ReportRow[];
    totals: Omit<ReportRow, "client" | "date" | "feri" | "proforma">;
}

// ─────────────────────────────────────────────────────────────────────────────
// HELPER
// ─────────────────────────────────────────────────────────────────────────────

function toNum(v: Decimal | null | undefined): number {
    return v ? parseFloat(v.toString()) : 0;
}

function round2(v: number): number {
    return Math.round(v * 100) / 100;
}

// ─────────────────────────────────────────────────────────────────────────────
// SUMMARY QUERY
// ─────────────────────────────────────────────────────────────────────────────

export async function getMonthlySummary(month: string): Promise<MonthlyReport> {
    const [year, mon] = month.split("-").map(Number);
    const start = new Date(year, mon - 1, 1);
    const end = new Date(year, mon, 1);

    const shipments = await prisma.shipment.findMany({
        where: {
            createdAt: { gte: start, lt: end },
            status: {
                in: [ShipmentStatus.AD_GENERATED, ShipmentStatus.COMPLETED],
            },
        },
        orderBy: { createdAt: "asc" },
    });

    const rows: ReportRow[] = shipments.map((s) => ({
        client: s.clientName,
        date: format(s.createdAt, "dd/MM/yyyy"),
        feri: s.feriNumber || "",
        proforma: s.proformaNumber || "",
        ferriEUR: toNum(s.proformaAmountEUR),
        curExc: toNum(s.exchangeRate),
        ferriUSD: toNum(s.ferriUSD),
        commEUR: toNum(s.commissionEUR),
        commUSD: toNum(s.commUSD),
        adUSD: toNum(s.adAmountUSD),
        totalUSD: toNum(s.totalUSD),
        wellRev: toNum(s.wellRevenue),
        ogefremRev: toNum(s.ogefremRevenue),
        musongo: toNum(s.musungoRevenue),
    }));

    const totals = {
        ferriEUR: round2(rows.reduce((sum, r) => sum + r.ferriEUR, 0)),
        curExc: 0,
        ferriUSD: round2(rows.reduce((sum, r) => sum + r.ferriUSD, 0)),
        commEUR: round2(rows.reduce((sum, r) => sum + r.commEUR, 0)),
        commUSD: round2(rows.reduce((sum, r) => sum + r.commUSD, 0)),
        adUSD: round2(rows.reduce((sum, r) => sum + r.adUSD, 0)),
        totalUSD: round2(rows.reduce((sum, r) => sum + r.totalUSD, 0)),
        wellRev: round2(rows.reduce((sum, r) => sum + r.wellRev, 0)),
        ogefremRev: round2(rows.reduce((sum, r) => sum + r.ogefremRev, 0)),
        musongo: round2(rows.reduce((sum, r) => sum + r.musongo, 0)),
    };

    logger.info({ month, rowCount: rows.length }, "Monthly summary generated");
    return { month, rows, totals };
}

// ─────────────────────────────────────────────────────────────────────────────
// DOCX EXPORT
// ─────────────────────────────────────────────────────────────────────────────

const COLUMNS = [
    "CLIENT", "DATE", "FERI", "PROFORMA",
    "FERRI EUR", "CUR EXC", "FERRI USD",
    "COMM EUR", "COMM USD", "AD USD", "TOTAL USD",
    "WELL REV", "OGEFREM REV", "MUSONGO",
];

function cell(text: string, header = false): TableCell {
    return new TableCell({
        children: [
            new Paragraph({
                alignment: AlignmentType.CENTER,
                children: [
                    new TextRun({
                        text: String(text),
                        bold: header,
                        size: header ? 18 : 16,
                        font: "Calibri",
                    }),
                ],
            }),
        ],
        width: { size: Math.floor(100 / COLUMNS.length), type: WidthType.PERCENTAGE },
        borders: {
            top: { style: BorderStyle.SINGLE, size: 1 },
            bottom: { style: BorderStyle.SINGLE, size: 1 },
            left: { style: BorderStyle.SINGLE, size: 1 },
            right: { style: BorderStyle.SINGLE, size: 1 },
        },
    });
}

function rowValues(r: ReportRow): string[] {
    return [
        r.client, r.date, r.feri, r.proforma,
        r.ferriEUR.toFixed(2),
        r.curExc.toFixed(4),
        r.ferriUSD.toFixed(2),
        r.commEUR.toFixed(2),
        r.commUSD.toFixed(2),
        r.adUSD.toFixed(2),
        r.totalUSD.toFixed(2),
        r.wellRev.toFixed(2),
        r.ogefremRev.toFixed(2),
        r.musongo.toFixed(2),
    ];
}

function totalsValues(t: MonthlyReport["totals"]): string[] {
    return [
        "TOTALS", "", "", "",
        t.ferriEUR.toFixed(2),
        "",
        t.ferriUSD.toFixed(2),
        t.commEUR.toFixed(2),
        t.commUSD.toFixed(2),
        t.adUSD.toFixed(2),
        t.totalUSD.toFixed(2),
        t.wellRev.toFixed(2),
        t.ogefremRev.toFixed(2),
        t.musongo.toFixed(2),
    ];
}

export async function exportMonthlyDocx(month: string): Promise<Buffer> {
    const report = await getMonthlySummary(month);

    const headerRow = new TableRow({
        children: COLUMNS.map((c) => cell(c, true)),
        tableHeader: true,
    });

    const dataRows = report.rows.map(
        (r) =>
            new TableRow({
                children: rowValues(r).map((v) => cell(v)),
            })
    );

    const totalRow = new TableRow({
        children: totalsValues(report.totals).map((v) => cell(v, true)),
    });

    const table = new Table({
        rows: [headerRow, ...dataRows, totalRow],
        width: { size: 100, type: WidthType.PERCENTAGE },
    });

    const [year, mon] = month.split("-").map(Number);
    const monthLabel = format(new Date(year, mon - 1, 1), "MMMM yyyy");

    const doc = new DocxDocument({
        sections: [
            {
                children: [
                    new Paragraph({
                        heading: HeadingLevel.HEADING_1,
                        alignment: AlignmentType.CENTER,
                        children: [
                            new TextRun({
                                text: `OGEFREM — WELL Monthly Report`,
                                bold: true,
                                size: 28,
                                font: "Calibri",
                            }),
                        ],
                    }),
                    new Paragraph({
                        alignment: AlignmentType.CENTER,
                        children: [
                            new TextRun({
                                text: monthLabel,
                                size: 22,
                                font: "Calibri",
                                color: "555555",
                            }),
                        ],
                    }),
                    new Paragraph({ children: [new TextRun({ text: "" })] }),
                    table,
                    new Paragraph({ children: [new TextRun({ text: "" })] }),
                    new Paragraph({
                        alignment: AlignmentType.RIGHT,
                        children: [
                            new TextRun({
                                text: `Generated: ${format(new Date(), "dd/MM/yyyy HH:mm")}`,
                                size: 14,
                                color: "888888",
                                font: "Calibri",
                            }),
                        ],
                    }),
                ],
            },
        ],
    });

    const buffer = await Packer.toBuffer(doc);
    logger.info({ month, rows: report.rows.length }, "DOCX report exported");
    return buffer;
}
