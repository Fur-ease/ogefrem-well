import { NextRequest, NextResponse } from "next/server";
import { exportReportSchema } from "@/lib/schemas";
import { exportMonthlyIIF } from "@/server/services/report.service";
import { handleApiError } from "@/lib/errors";
import { format } from "date-fns";

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const parsed = exportReportSchema.safeParse(body);

        if (!parsed.success) {
            return NextResponse.json(
                { error: "Invalid month. Use YYYY-MM format." },
                { status: 400 }
            );
        }

        const buffer = await exportMonthlyIIF(parsed.data.month);

        const [year, mon] = parsed.data.month.split("-").map(Number);
        const monthLabel = format(new Date(year, mon - 1, 1), "MMMM_yyyy");
        const filename = `OGEFREM_WELL_Invoices_${monthLabel}.iif`;

        return new NextResponse(buffer as any, {
            status: 200,
            headers: {
                "Content-Type": "application/octet-stream",
                "Content-Disposition": `attachment; filename="${filename}"`,
                "Content-Length": buffer.byteLength.toString(),
            },
        });
    } catch (error) {
        const err = handleApiError(error);
        return NextResponse.json({ error: err.message, code: err.code }, { status: err.statusCode });
    }
}