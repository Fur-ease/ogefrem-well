import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { exportWellShipmentContainersExcel } from "@/server/well/well-report.service";

export async function GET(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    const session = await getServerSession(authOptions);
    if (!session || (session.user.department !== "WELL" && session.user.department !== "ADMIN")) {
        return new NextResponse("Unauthorized", { status: 401 });
    }

    const { id } = await params;

    try {
        const buffer = await exportWellShipmentContainersExcel(id);

        return new NextResponse(buffer as any, {
            status: 200,
            headers: {
                "Content-Disposition": `attachment; filename="Container_Report_${id}.xlsx"`,
                "Content-Type": "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
            },
        });
    } catch (error: any) {
        return new NextResponse(error.message, { status: 500 });
    }
}
