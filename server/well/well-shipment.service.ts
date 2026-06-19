import { prisma } from "@/lib/prisma";
import { logger } from "@/lib/logger";

/**
 * Ensures the RefCounter exists and returns the next increment.
 */
async function getNextRefNumber(): Promise<string> {
    const result = await prisma.$transaction(async (tx) => {
        // Upsert the counter row (id=1)
        const counter = await tx.wellRefCounter.upsert({
            where: { id: 1 },
            update: { lastRef: { increment: 1 } },
            create: { id: 1, lastRef: 1751 },
        });
        return `WELL/${counter.lastRef}`;
    });
    return result;
}

export async function createWellShipment(data: any, userId: string) {
    const refNumber = await getNextRefNumber();

    const shipment = await prisma.wellShipment.create({
        data: {
            refNumber,
            clientName: data.clientName,
            clientRef: data.clientRef,
            blNumber: data.blNumber,
            containerSize: data.containerSize,
            vesselName: data.vesselName,
            eta: data.eta ? new Date(data.eta) : null,
            notes: data.notes,
            containers: data.containers && Array.isArray(data.containers) ? {
                create: data.containers.map((c: any) => ({
                    containerNumber: c.containerNumber,
                    size: c.size,
                    weight: c.weight ? parseFloat(c.weight) : null,
                }))
            } : undefined,
        },
    });

    logger.info({ shipmentId: shipment.id, refNumber }, "Created new WELL shipment with containers");
    return shipment;
}

export async function getWellShipments(params: any = {}) {
    const where: any = {};

    // Custom filtering
    if (params.status) {
        where.status = params.status;
    }
    if (params.excludePcharges) {
        where.status = { not: "PCHARGES" };
    }
    if (params.isPaid !== undefined) {
        where.isPaid = params.isPaid;
    }

    if (params.q) {
        where.OR = [
            { refNumber: { contains: params.q, mode: "insensitive" } },
            { blNumber: { contains: params.q, mode: "insensitive" } },
            { clientName: { contains: params.q, mode: "insensitive" } },
            {
                containers: {
                    some: {
                        containerNumber: { contains: params.q, mode: "insensitive" }
                    }
                }
            }
        ];
    } else if (params.containerNumber) {
        where.containers = {
            some: {
                containerNumber: { contains: params.containerNumber, mode: "insensitive" }
            }
        };
    }

    const shipments = await prisma.wellShipment.findMany({
        where,
        orderBy: { createdAt: "desc" },
        include: {
            documents: true,
            containers: true,
        },
    });

    return shipments;
}

export async function getWellShipmentById(id: string) {
    const shipment = await prisma.wellShipment.findUnique({
        where: { id },
        include: {
            documents: true,
            containers: {
                orderBy: { createdAt: "asc" }
            },
        },
    });
    if (!shipment) throw new Error("Shipment not found");
    return shipment;
}

export async function updateWellShipment(id: string, data: any) {
    // Filter out undefined and convert dates
    const updateData: any = {};
    const dateFields = [
        "eta", "lodgeCustoms", "entryPassed", "slineCharges",
        "slinePaid", "ddRecv", "lodgedKpa", "dateVerified"
    ];

    const excludeFields = ["id", "createdAt", "updatedAt", "documents", "containers"];

    for (const [key, value] of Object.entries(data)) {
        if (value !== undefined && !excludeFields.includes(key)) {
            if (dateFields.includes(key)) {
                updateData[key] = value ? new Date(value as string) : null;
            } else {
                updateData[key] = value;
            }
        }
    }

    // Handle nested container updates if present
    if (data.containers && Array.isArray(data.containers)) {
        // This is a simplified approach: delete and recreate or similar.
        // For production, a more robust upsert logic per container ID is better.
        // But for now, we'll allow updating them.

        // Let's implement a basic upsert logic if they have IDs
        for (const c of data.containers) {
            const containerData = {
                containerNumber: c.containerNumber,
                size: c.size,
                weight: c.weight ? parseFloat(c.weight.toString()) : null,
                dischargeDate: c.dischargeDate ? new Date(c.dischargeDate) : null,
                gateOutDate: c.gateOutDate ? new Date(c.gateOutDate) : null,
                truckDetails: c.truckDetails,
                driverName: c.driverName,
                status: c.status,
                remarks: c.remarks,
            };

            if (c.id && !c.id.startsWith("temp-")) {
                await prisma.wellContainer.update({
                    where: { id: c.id },
                    data: containerData,
                });
            } else {
                await prisma.wellContainer.create({
                    data: {
                        ...containerData,
                        shipmentId: id,
                    },
                });
            }
        }
    }

    const shipment = await prisma.wellShipment.update({
        where: { id },
        data: updateData,
        include: {
            containers: true
        }
    });

    return shipment;
}

export async function getClientSummaries(q?: string) {
    const where: any = {};
    if (q) {
        where.OR = [
            { clientName: { contains: q, mode: "insensitive" } },
            {
                containers: {
                    some: {
                        containerNumber: { contains: q, mode: "insensitive" }
                    }
                }
            }
        ];
    }

    const clients = await prisma.wellShipment.groupBy({
        where,
        by: ["clientName"],
        _count: {
            id: true,
        },
    });

    const summaries = await Promise.all(
        clients.map(async (c) => {
            const [completed, ongoing] = await Promise.all([
                prisma.wellShipment.count({
                    where: { clientName: c.clientName, isPaid: true },
                }),
                prisma.wellShipment.count({
                    where: { clientName: c.clientName, isPaid: false },
                }),
            ]);

            return {
                clientName: c.clientName,
                total: c._count.id,
                completed,
                ongoing,
            };
        })
    );

    return summaries;
}

export async function getShipmentsByClient(clientName: string) {
    return await prisma.wellShipment.findMany({
        where: { clientName },
        orderBy: { createdAt: "desc" },
        include: {
            documents: true,
            containers: true,
        },
    });
}
