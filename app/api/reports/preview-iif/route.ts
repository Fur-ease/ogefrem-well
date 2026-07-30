import { NextRequest, NextResponse } from "next/server";
import { exportReportSchema } from "@/lib/schemas";
import { getMonthlyIIFPreview } from "@/server/services/report.service";
import { handleApiError } from "@/lib/errors";

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const parsed = exportReportSchema.safeParse(body);

        if (!parsed.success) {
            return NextResponse.json({ error: "Invalid month. Use YYYY-MM format." }, { status: 400 });
        }

        const preview = await getMonthlyIIFPreview(parsed.data.month);
        return NextResponse.json(preview, { status: 200 });
    } catch (error) {
        const err = handleApiError(error);
        return NextResponse.json({ error: err.message, code: err.code }, { status: err.statusCode });
    }
}