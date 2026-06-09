import { NextResponse } from "next/server";
import { getNextInvoiceNumber } from "@/server/services/invoice.service";

export async function GET() {
    try {
        const nextNumber = await getNextInvoiceNumber();
        return NextResponse.json({ nextNumber });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
