import { NextRequest, NextResponse } from "next/server";
import { monthQuerySchema } from "@/lib/schemas";
import { getMonthlySummary } from "@/server/services/report.service";
import { handleApiError } from "@/lib/errors";

export async function GET(req: NextRequest) {
    try {
        const { searchParams } = new URL(req.url);
        const parsed = monthQuerySchema.safeParse({ month: searchParams.get("month") });

        if (!parsed.success) {
            return NextResponse.json(
                { error: "Invalid month parameter. Use YYYY-MM format." },
                { status: 400 }
            );
        }

        const summary = await getMonthlySummary(parsed.data.month);
        return NextResponse.json({ data: summary });
    } catch (error) {
        const err = handleApiError(error);
        return NextResponse.json({ error: err.message, code: err.code }, { status: err.statusCode });
    }
}
