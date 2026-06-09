import { prisma } from "@/lib/prisma";
import { format } from "date-fns";
import ExcelJS from "exceljs";
import { logger } from "@/lib/logger";

const COLUMNS = [
    "NAME",
    "CLIENT REF FILE",
    "CLIENT REF.",
    "B/L NO.",
    "SIZE OF CONT",
    "DOC RECV",
    "VESSEL NAME",
    "E.T.A",
    "LODGE CUSTOM S",
    "ENTRY NO",
    "ENTRY PASSED",
    "TBL/ N.TBL",
    "S/LINE CHARGE S",
    "S/LINE PAID",
    "D/O RECV",
    "LAST SLING cfs",
    "LODG ED K.P.A",
    "DATE VERIFIED",
    "STATUS",
];

export async function exportWellCargoExcel(): Promise<Buffer> {
    const shipments = await prisma.wellShipment.findMany({
        // the daily cargo report specifically excludes PCHARGES
        where: {
            status: { not: "PCHARGES" },
        },
        orderBy: { createdAt: "asc" },
    });

    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet("DAILY CARGO STATUS");

    // Title row
    worksheet.mergeCells("A1", "S1");
    const titleCell = worksheet.getCell("A1");
    titleCell.value = "WESTON LOGISTICS LTD\nDAILY CARGO STATUS";
    titleCell.font = { bold: true, size: 14 };
    titleCell.alignment = { horizontal: "center", vertical: "middle", wrapText: true };
    worksheet.getRow(1).height = 40;

    // Header row
    const headerRow = worksheet.getRow(2);
    COLUMNS.forEach((col, idx) => {
        const cell = headerRow.getCell(idx + 1);
        cell.value = col;
        cell.font = { bold: true };
        cell.alignment = { horizontal: "center", vertical: "middle", wrapText: true };
        cell.border = {
            top: { style: "thin" },
            left: { style: "thin" },
            bottom: { style: "thin" },
            right: { style: "thin" }
        };
    });
    worksheet.getRow(2).height = 45;

    // Set widths
    worksheet.columns = [
        { width: 15 }, // NAME
        { width: 15 }, // CLIENT REF FILE
        { width: 15 }, // CLIENT REF
        { width: 15 }, // BL NO
        { width: 12 }, // SIZE OF CONT
        { width: 12 }, // DOC RECV
        { width: 15 }, // VESSEL NAME
        { width: 12 }, // ETA
        { width: 12 }, // LODGE CUSTOM S
        { width: 12 }, // ENTRY NO
        { width: 12 }, // ENTRY PASSED
        { width: 10 }, // TBL/N.TBL
        { width: 12 }, // S/LINE CHARGE S
        { width: 12 }, // S/LINE PAID
        { width: 12 }, // D/O RECV (ddRecv)
        { width: 12 }, // LAST SLING CFS
        { width: 12 }, // LODG ED K.P.A
        { width: 12 }, // DATE VERIFIED
        { width: 10 }, // STATUS
    ];

    const formatDate = (date: Date | null) => (date ? format(date, "d/M/yyyy") : "");

    shipments.forEach((s) => {
        const row = worksheet.addRow([
            s.clientName,
            s.refNumber,
            s.clientRef || "",
            s.blNumber,
            s.containerSize,
            s.docRecv || "",
            s.vesselName || "",
            formatDate(s.eta),
            formatDate(s.lodgeCustoms),
            s.entryNumber || "",
            formatDate(s.entryPassed),
            s.tblNtbl || "",
            formatDate(s.slineCharges),
            formatDate(s.slinePaid),
            formatDate(s.ddRecv),
            s.lastSlingCfs || "",
            formatDate(s.lodgedKpa),
            formatDate(s.dateVerified),
            s.status,
        ]);

        // Border and alignment for data cells
        row.eachCell((cell) => {
            cell.border = {
                top: { style: "thin" },
                left: { style: "thin" },
                bottom: { style: "thin" },
                right: { style: "thin" }
            };
            if (typeof cell.value === "string" && cell.value.includes("/")) {
                cell.alignment = { horizontal: "center", vertical: "middle" };
            } else {
                cell.alignment = { horizontal: "center", vertical: "middle", wrapText: true };
            }
        });
    });

    const buffer = await workbook.xlsx.writeBuffer() as unknown as Buffer;
    logger.info({ rows: shipments.length }, "WELL Daily Cargo report exported");
    return buffer;
}
