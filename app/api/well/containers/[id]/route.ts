import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function GET(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    const session = await getServerSession(authOptions);
    if (!session) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    try {
        const { id } = await params;
        const container = await prisma.wellContainer.findFirst({
            where: {
                OR: [
                    { id },
                    { containerNumber: id }
                ]
            },
            include: {
                shipment: {
                    include: {
                        documents: true,
                        events: {
                            orderBy: { createdAt: "desc" }
                        }
                    }
                }
            }
        });

        if (!container) {
            return NextResponse.json({ error: "Container not found" }, { status: 404 });
        }

        return NextResponse.json(container);
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

export async function PATCH(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    const session = await getServerSession(authOptions);
    if (!session) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    try {
        const { id } = await params;
        const body = await request.json();

        const updateData: any = {};
        if (body.containerNumber !== undefined) updateData.containerNumber = body.containerNumber;
        if (body.chassisNumber !== undefined) updateData.chassisNumber = body.chassisNumber;
        if (body.sealNumber !== undefined) updateData.sealNumber = body.sealNumber;
        if (body.size !== undefined) updateData.size = body.size;
        if (body.containerType !== undefined) updateData.containerType = body.containerType;
        if (body.truckDetails !== undefined) updateData.truckDetails = body.truckDetails;
        if (body.driverName !== undefined) updateData.driverName = body.driverName;
        if (body.driverIdNumber !== undefined) updateData.driverIdNumber = body.driverIdNumber;
        if (body.status !== undefined) updateData.status = body.status;
        if (body.remarks !== undefined) updateData.remarks = body.remarks;
        if (body.grossWeightKg !== undefined) updateData.grossWeightKg = body.grossWeightKg ? parseFloat(body.grossWeightKg) : null;
        if (body.netWeightKg !== undefined) updateData.netWeightKg = body.netWeightKg ? parseFloat(body.netWeightKg) : null;
        if (body.volumeCbm !== undefined) updateData.volumeCbm = body.volumeCbm ? parseFloat(body.volumeCbm) : null;

        // Conditional validation: driver name requires driver ID number
        const resolvedDriverName = updateData.driverName;
        const resolvedDriverId = updateData.driverIdNumber;
        if (resolvedDriverName && resolvedDriverName.trim() && !resolvedDriverId?.trim()) {
            return NextResponse.json({ error: "Driver ID Number is required when a Driver Name is assigned." }, { status: 400 });
        }

        if (body.dischargeDate) updateData.dischargeDate = new Date(body.dischargeDate);
        if (body.gateOutDate) updateData.gateOutDate = new Date(body.gateOutDate);

        // Persistent Kwatos & Interchange store
        if (body.kwatosData || body.interchangeData) {
            let existingExtra: any = {};
            try {
                const cur = await prisma.wellContainer.findUnique({ where: { id }, select: { remarks: true } });
                if (cur?.remarks && cur.remarks.startsWith("{")) {
                    existingExtra = JSON.parse(cur.remarks);
                } else if (cur?.remarks) {
                    existingExtra = { note: cur.remarks };
                }
            } catch (e) { }

            const mergedExtra = {
                ...existingExtra,
                ...(body.kwatosData ? { kwatos: body.kwatosData } : {}),
                ...(body.interchangeData ? { interchange: body.interchangeData } : {})
            };
            updateData.remarks = JSON.stringify(mergedExtra);
        }

        const updated = await prisma.wellContainer.update({
            where: { id },
            data: updateData,
            include: {
                shipment: true
            }
        });

        // Audit Log Event
        if (updated.shipmentId) {
            await prisma.wellEvent.create({
                data: {
                    shipmentId: updated.shipmentId,
                    title: `Container ${updated.containerNumber || updated.id} updated`,
                    description: `Truck: ${updated.truckDetails || 'N/A'}, Driver: ${updated.driverName || 'N/A'}, Status: ${updated.status || 'N/A'}`,
                    stage: updated.shipment?.currentStage || "CONTAINER_UPDATE",
                    source: "MANUAL",
                    updatedBy: session.user?.name || "Operations"
                }
            });
        }

        return NextResponse.json(updated);
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
