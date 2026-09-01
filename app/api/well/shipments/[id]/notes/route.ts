import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { addWellShipmentNote, getWellShipmentNotes } from "@/server/well/well-shipment.service";

export async function GET(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    const session = await getServerSession(authOptions);
    if (!session || (session.user.department !== "WELL" && session.user.department !== "ADMIN")) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = await params;

    try {
        const notes = await getWellShipmentNotes(id);
        return NextResponse.json(notes);
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

export async function POST(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    const session = await getServerSession(authOptions);
    if (!session || (session.user.department !== "WELL" && session.user.department !== "ADMIN")) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = await params;

    try {
        const body = await request.json();
        if (!body.note || typeof body.note !== "string" || !body.note.trim()) {
            return NextResponse.json({ error: "Note content is required" }, { status: 400 });
        }

        const userName = (session.user as any).username || session.user.name || session.user.email || "Operations";
        const noteEntry = await addWellShipmentNote(id, body.note.trim(), userName);
        return NextResponse.json(noteEntry);
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
