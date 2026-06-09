import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { exportWellCargoExcel } from "@/server/well/well-report.service";

export async function GET(request: Request) {
    const session = await getServerSession(authOptions);
    if (!session || (session.user.department !== "WELL" && session.user.department !== "ADMIN")) {
        return new NextResponse("Unauthorized", { status: 401 });
    }

    try {
        const buffer = await exportWellCargoExcel();

        return new NextResponse(buffer, {
            status: 200,
            headers: {
                "Content-Disposition": `attachment; filename="Well_Cargo_Report.xlsx"`,
                "Content-Type": "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
            },
        });
    } catch (error: any) {
        return new NextResponse(error.message, { status: 500 });
    }
}
