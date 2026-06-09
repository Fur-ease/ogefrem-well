import { NextRequest, NextResponse } from "next/server";
import { getAnalyticsData } from "@/server/services/analytics.service";
import { handleApiError } from "@/lib/errors";

export async function GET(req: NextRequest) {
    try {
        const { searchParams } = new URL(req.url);
        const months = parseInt(searchParams.get("months") || "6");

        const data = await getAnalyticsData(months);
        return NextResponse.json({ data });
    } catch (error) {
        const err = handleApiError(error);
        return NextResponse.json({ error: err.message, code: err.code }, { status: err.statusCode });
    }
}
