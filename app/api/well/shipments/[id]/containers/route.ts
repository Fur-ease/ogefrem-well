import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { parseAndValidateContainer } from "@/server/well/well-shipment.service";

/**
 * POST /api/well/shipments/[id]/containers
 * Add container units of any of the 7 cargo types to a shipment.
 */
export async function POST(req: Request, { params }: { params: Promise<{ id: string }> }) {
    try {
        const { id } = await params;
        const body = await req.json();
        const containersInput = body.containers || (Array.isArray(body) ? body : [body]);

        if (!Array.isArray(containersInput) || containersInput.length === 0) {
            return NextResponse.json({ error: "At least one container unit payload is required" }, { status: 400 });
        }

        const createdUnits: any[] = [];
        for (const rawUnit of containersInput) {
            const validatedData = parseAndValidateContainer(rawUnit);
            const unit = await prisma.wellContainer.create({
                data: {
                    ...validatedData,
                    shipmentId: id
                }
            });
            createdUnits.push(unit);
        }

        // Trigger automated stage transition checks
        const { ClearingStageAutomationService } = await import("@/server/well/clearing-stage-automation.service");
        await ClearingStageAutomationService.checkReleaseToDelivered(id);

        return NextResponse.json({
            message: `Successfully added ${createdUnits.length} cargo unit(s)`,
            containers: createdUnits
        }, { status: 201 });
    } catch (error: any) {
        return NextResponse.json({ error: error.message || "Failed to add container units" }, { status: 400 });
    }
}
