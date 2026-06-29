/**
 * Report Service — OGEFREM Representation WELL
 *
 * Monthly financial summary + DOCX export.
 */

import { prisma } from "@/lib/prisma";
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
    ImageRun,
} from "docx";
import { format } from "date-fns";
import ExcelJS from "exceljs";
import QRCode from "qrcode";
import bwipjs from "bwip-js";



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

    console.log("Monthly summary generated", { month, rowCount: rows.length });
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

    // Generate Barcode/QR Code for DOCX
    const proformaList = report.rows
        .map(r => r.proforma)
        .filter(p => p && p.trim().length > 0)
        .join(", ");

    const qrBuffer = await QRCode.toBuffer(proformaList || "No Proformas Found", {
        margin: 1,
        width: 200,
    });

    const barcodeLabelBuffer = await bwipjs.toBuffer({
        bcid: 'code128',
        text: `REPORT-${month}`,
        scale: 2,
        height: 8,
        includetext: true,
        textxalign: 'center',
    });

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
                    // ── Bottom codes section ──────────────────────────────
                    new Paragraph({ children: [new TextRun({ text: "" })] }),
                    new Paragraph({ children: [new TextRun({ text: "" })] }),
                    new Paragraph({
                        alignment: AlignmentType.CENTER,
                        children: [
                            new TextRun({
                                text: "QR Code — Proforma Numbers",
                                size: 16,
                                bold: true,
                                font: "Calibri",
                                color: "444444",
                            }),
                        ],
                    }),
                    new Paragraph({
                        alignment: AlignmentType.CENTER,
                        children: [
                            new ImageRun({
                                data: qrBuffer as any,
                                transformation: { width: 120, height: 120 },
                                type: "png",
                            } as any),
                        ],
                    }),
                    // spacer between QR and barcode
                    new Paragraph({ children: [new TextRun({ text: "" })] }),
                    new Paragraph({ children: [new TextRun({ text: "" })] }),
                    new Paragraph({
                        alignment: AlignmentType.CENTER,
                        children: [
                            new TextRun({
                                text: "Report Barcode",
                                size: 16,
                                bold: true,
                                font: "Calibri",
                                color: "444444",
                            }),
                        ],
                    }),
                    new Paragraph({
                        alignment: AlignmentType.CENTER,
                        children: [
                            new ImageRun({
                                data: barcodeLabelBuffer as any,
                                transformation: { width: 200, height: 50 },
                                type: "png",
                            } as any),
                        ],
                    }),
                    new Paragraph({ children: [new TextRun({ text: "" })] }),
                ],
            },
        ],
    });

    const buffer = await Packer.toBuffer(doc);
    console.log("DOCX report exported with barcode", { month, rows: report.rows.length });
    return buffer;
}

export async function exportMonthlyExcel(month: string): Promise<Buffer> {
    const report = await getMonthlySummary(month);

    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet("Monthly Report");

    // Default column widths
    worksheet.columns = COLUMNS.map(c => ({ header: c, key: c, width: 15 }));

    // Add header row style
    const headerRow = worksheet.getRow(1);
    headerRow.font = { bold: true, size: 12 };
    headerRow.alignment = { horizontal: "center", vertical: "middle" };
    headerRow.fill = {
        type: "pattern",
        pattern: "solid",
        fgColor: { argb: "FFE0E0E0" }
    };

    // Add data rows
    report.rows.forEach((r) => {
        worksheet.addRow([
            r.client,
            r.date,
            r.feri,
            r.proforma,
            r.ferriEUR,
            r.curExc,
            r.ferriUSD,
            r.commEUR,
            r.commUSD,
            r.adUSD,
            r.totalUSD,
            r.wellRev,
            r.ogefremRev,
            r.musongo
        ]);
    });

    // Add totals row
    const totals = report.totals;
    const totalRow = worksheet.addRow([
        "TOTALS",
        "",
        "",
        "",
        totals.ferriEUR,
        "",
        totals.ferriUSD,
        totals.commEUR,
        totals.commUSD,
        totals.adUSD,
        totals.totalUSD,
        totals.wellRev,
        totals.ogefremRev,
        totals.musongo
    ]);
    totalRow.font = { bold: true };
    totalRow.fill = {
        type: "pattern",
        pattern: "solid",
        fgColor: { argb: "FFF5F5F5" }
    };

    // Format numbers
    for (let i = 2; i <= report.rows.length + 2; i++) {
        const row = worksheet.getRow(i);
        [5, 7, 8, 9, 10, 11, 12, 13, 14].forEach(colIdx => {
            row.getCell(colIdx).numFmt = "#,##0.00";
        });
        row.getCell(6).numFmt = "#,##0.0000"; // Exchange rate
    }

    // Proforma numbers for QR Code
    const proformaList = report.rows
        .map(r => r.proforma)
        .filter(p => p && p.trim().length > 0)
        .join(", ");

    const qrText = proformaList || "No Proformas Found";

    // Generate QR Code as data URL
    const qrDataUrl = await QRCode.toDataURL(qrText, {
        errorCorrectionLevel: 'M',
        margin: 2,
        width: 200
    });

    // Add QR Code to workbook
    const imageId = workbook.addImage({
        base64: qrDataUrl,
        extension: 'png',
    });

    // Place QR code on the right side of the table
    // Table has 14 columns (A to N). We'll place it starting at P1 (column 16)
    worksheet.addImage(imageId, {
        tl: { col: 15, row: 1 },
        ext: { width: 180, height: 180 }
    });

    // Add a label for the QR code
    worksheet.getCell('P1').value = "Proformas QR Code";
    worksheet.getCell('P1').font = { bold: true };

    const buffer = await workbook.xlsx.writeBuffer() as unknown as Buffer;
    console.log("Excel report exported with QR code", { month, rows: report.rows.length });
    return buffer;
}

export async function exportReconciliationDocx(month: string): Promise<Buffer> {
    const report = await getMonthlySummary(month);
    const [year, mon] = month.split("-").map(Number);
    const monthLabel = format(new Date(year, mon - 1, 1), "MMMM yyyy");

    const proformaList = report.rows
        .map(r => r.proforma)
        .filter(p => p && p.trim().length > 0)
        .join(", ");

    const qrBuffer = await QRCode.toBuffer(proformaList || "No Proformas Found", {
        margin: 1,
        width: 250,
    });

    const barcodeLabelBuffer = await bwipjs.toBuffer({
        bcid: 'code128',
        text: `REPORT-${month}`,
        scale: 2,
        height: 10,
        includetext: true,
        textxalign: 'center',
    });

    const cell = (text: string, bold = false, align: any = AlignmentType.CENTER, colSpan = 1) => new TableCell({
        children: [
            new Paragraph({
                alignment: align,
                children: [
                    new TextRun({
                        text: String(text),
                        bold: bold,
                        size: 18,
                        font: "Calibri",
                    }),
                ],
            }),
        ],
        columnSpan: colSpan,
        borders: {
            top: { style: BorderStyle.SINGLE, size: 1 },
            bottom: { style: BorderStyle.SINGLE, size: 1 },
            left: { style: BorderStyle.SINGLE, size: 1 },
            right: { style: BorderStyle.SINGLE, size: 1 },
        },
    });

    const headerRow = new TableRow({
        children: [
            cell("CLIENT", true),
            cell("FERI", true),
            cell("PROFORMA", true),
            cell("FERRI EUR", true),
            cell("CUR EXC", true),
            cell("FERRI USD", true),
            cell("OGEFREM REV", true),
        ],
    });

    const dataRows = report.rows.map(r => new TableRow({
        children: [
            cell(r.client, false, AlignmentType.LEFT),
            cell(r.feri),
            cell(r.proforma),
            cell(r.ferriEUR.toFixed(2), false, AlignmentType.RIGHT),
            cell(r.curExc.toFixed(4), false, AlignmentType.RIGHT),
            cell(r.ferriUSD.toFixed(2), false, AlignmentType.RIGHT),
            cell(r.ogefremRev.toFixed(2), false, AlignmentType.RIGHT),
        ],
    }));

    const totalsRow = new TableRow({
        children: [
            cell("TOTALS", true, AlignmentType.LEFT),
            cell(""),
            cell(""),
            cell(report.totals.ferriEUR.toFixed(2), true, AlignmentType.RIGHT),
            cell(""),
            cell(report.totals.ferriUSD.toFixed(0), true, AlignmentType.RIGHT),
            cell(report.totals.ogefremRev.toFixed(2), true, AlignmentType.RIGHT),
        ],
    });

    const allTotalValue = (report.totals.ferriUSD + report.totals.ogefremRev).toFixed(0);
    const allTotalRow = new TableRow({
        children: [
            cell("ALL TOTAL", true, AlignmentType.LEFT),
            cell("", false, AlignmentType.CENTER, 4),
            cell(allTotalValue, true, AlignmentType.RIGHT, 2),
        ],
    });

    const bankDetailsRow = new TableRow({
        children: [
            cell("BANK DETAILS: ACC NAME: OGEFREM; ACC NUMBER: 02402070004; BANKOFAFRICA; SWIFTCODE: AFRIKENXXX;", true, AlignmentType.CENTER, 7),
        ],
    });

    const table = new Table({
        rows: [headerRow, ...dataRows, totalsRow, allTotalRow, bankDetailsRow],
        width: { size: 100, type: WidthType.PERCENTAGE },
    });

    const doc = new DocxDocument({
        sections: [
            {
                children: [
                    new Paragraph({
                        alignment: AlignmentType.CENTER,
                        children: [
                            new TextRun({
                                text: `OGEFREM -- WELL Monthly Report`,
                                bold: true,
                                size: 32,
                                font: "Calibri",
                            }),
                        ],
                    }),
                    new Paragraph({
                        alignment: AlignmentType.CENTER,
                        children: [
                            new TextRun({
                                text: monthLabel,
                                size: 24,
                                font: "Calibri",
                            }),
                        ],
                    }),
                    new Paragraph({ children: [new TextRun({ text: "" })] }),
                    table,
                    new Paragraph({ children: [new TextRun({ text: "" })] }),
                    new Paragraph({ children: [new TextRun({ text: "" })] }),
                    new Table({
                        width: { size: 100, type: WidthType.PERCENTAGE },
                        borders: {
                            top: { style: BorderStyle.NONE },
                            bottom: { style: BorderStyle.NONE },
                            left: { style: BorderStyle.NONE },
                            right: { style: BorderStyle.NONE },
                            insideHorizontal: { style: BorderStyle.NONE },
                            insideVertical: { style: BorderStyle.NONE },
                        },
                        rows: [
                            new TableRow({
                                children: [
                                    new TableCell({
                                        width: { size: 50, type: WidthType.PERCENTAGE },
                                        children: [
                                            new Paragraph({
                                                alignment: AlignmentType.LEFT,
                                                children: [
                                                    new ImageRun({
                                                        data: qrBuffer as any,
                                                        transformation: { width: 100, height: 100 },
                                                        type: "png",
                                                    } as any),
                                                ],
                                            }),
                                        ],
                                    }),
                                    new TableCell({
                                        width: { size: 50, type: WidthType.PERCENTAGE },
                                        children: [
                                            new Paragraph({
                                                alignment: AlignmentType.RIGHT,
                                                children: [
                                                    new ImageRun({
                                                        data: barcodeLabelBuffer as any,
                                                        transformation: { width: 150, height: 40 },
                                                        type: "png",
                                                    } as any),
                                                ],
                                            }),
                                        ],
                                    }),
                                ],
                            }),
                        ],
                    }),
                ],
            },
        ],
    });

    const buffer = await Packer.toBuffer(doc);
    console.log("Reconciliation DOCX report exported", { month, rows: report.rows.length });
    return buffer;
}
