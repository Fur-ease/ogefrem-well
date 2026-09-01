import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { getContainers } from "@/server/well/well-container.service";

export async function GET(request: Request) {
    const session = await getServerSession(authOptions);
    if (!session) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    try {
        const { searchParams } = new URL(request.url);
        const search = searchParams.get("search") || searchParams.get("query") || searchParams.get("q") || undefined;
        const containerNumber = searchParams.get("container_number") || searchParams.get("containerNumber") || undefined;
        const bolNumber = searchParams.get("bol_number") || searchParams.get("bolNumber") || undefined;
        const entryNumber = searchParams.get("entry_number") || searchParams.get("entryNumber") || undefined;
        const clientId = searchParams.get("client_id") || searchParams.get("clientName") || undefined;
        const status = searchParams.getAll("status[]").length > 0 ? searchParams.getAll("status[]") : (searchParams.get("status") || undefined);
        const unitType = searchParams.get("unit_type") || searchParams.get("unitType") || undefined;
        const page = searchParams.get("page") ? parseInt(searchParams.get("page")!) : 1;
        const perPage = searchParams.get("per_page") ? parseInt(searchParams.get("per_page")!) : 20;

        const data = await getContainers({
            search,
            containerNumber,
            bolNumber,
            entryNumber,
            clientId,
            status,
            unitType,
            page,
            perPage
        });

        return NextResponse.json(data);
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
