import { prisma } from "@/lib/prisma";

export interface ContainerFilters {
    search?: string;
    containerNumber?: string;
    bolNumber?: string;
    entryNumber?: string;
    clientId?: string;
    clientName?: string;
    status?: string | string[];
    unitType?: string;
    page?: number;
    perPage?: number;
}

function buildWhereClause(filters: ContainerFilters) {
    const where: any = {};

    if (filters.search && filters.search.trim()) {
        const q = filters.search.trim();
        where.OR = [
            { containerNumber: { contains: q, mode: "insensitive" } },
            { chassisNumber: { contains: q, mode: "insensitive" } },
            { truckDetails: { contains: q, mode: "insensitive" } },
            { driverName: { contains: q, mode: "insensitive" } },
            {
                shipment: {
                    OR: [
                        { clientName: { contains: q, mode: "insensitive" } },
                        { blNumber: { contains: q, mode: "insensitive" } },
                        { entryNumber: { contains: q, mode: "insensitive" } },
                        { refNumber: { contains: q, mode: "insensitive" } },
                        { vesselName: { contains: q, mode: "insensitive" } },
                    ]
                }
            }
        ];
    } else {
        if (filters.containerNumber) {
            where.OR = [
                { containerNumber: { contains: filters.containerNumber, mode: "insensitive" } },
                { chassisNumber: { contains: filters.containerNumber, mode: "insensitive" } },
            ];
        }

        const shipmentWhere: any = {};
        if (filters.bolNumber) {
            shipmentWhere.blNumber = { contains: filters.bolNumber, mode: "insensitive" };
        }
        if (filters.entryNumber) {
            shipmentWhere.entryNumber = { contains: filters.entryNumber, mode: "insensitive" };
        }
        if (filters.clientName || filters.clientId) {
            const clientQuery = filters.clientName || filters.clientId;
            if (clientQuery !== "ALL") {
                shipmentWhere.clientName = { contains: clientQuery, mode: "insensitive" };
            }
        }

        if (Object.keys(shipmentWhere).length > 0) {
            where.shipment = shipmentWhere;
        }
    }

    if (filters.unitType && filters.unitType !== "ALL") {
        where.unitType = filters.unitType;
    }

    if (filters.status) {
        if (Array.isArray(filters.status)) {
            where.status = { in: filters.status };
        } else if (filters.status !== "ALL") {
            where.status = { contains: filters.status, mode: "insensitive" };
        }
    }

    return where;
}

export async function getContainers(filters: ContainerFilters) {
    const page = Math.max(1, filters.page || 1);
    const perPage = Math.min(100, Math.max(1, filters.perPage || 20));
    const skip = (page - 1) * perPage;

    const where = buildWhereClause(filters);

    const [containers, totalCount] = await Promise.all([
        prisma.wellContainer.findMany({
            where,
            include: {
                shipment: {
                    select: {
                        id: true,
                        refNumber: true,
                        clientName: true,
                        blNumber: true,
                        entryNumber: true,
                        vesselName: true,
                        eta: true,
                        status: true,
                    }
                }
            },
            orderBy: { createdAt: "desc" },
            skip,
            take: perPage,
        }),
        prisma.wellContainer.count({ where }),
    ]);

    const totalPages = Math.ceil(totalCount / perPage) || 1;

    return {
        containers,
        totalCount,
        page,
        perPage,
        totalPages,
    };
}

export async function exportContainersExcel(filters: ContainerFilters) {
    const where = buildWhereClause(filters);

    const containers = await prisma.wellContainer.findMany({
        where,
        include: {
            shipment: {
                select: {
                    id: true,
                    refNumber: true,
                    clientName: true,
                    blNumber: true,
                    entryNumber: true,
                    vesselName: true,
                    eta: true,
                }
            }
        },
        orderBy: [
            { shipmentId: "asc" },
            { createdAt: "desc" }
        ]
    });

    // Group containers by shipment for report layout
    const grouped: Record<string, { shipment: any; containers: any[] }> = {};
    for (const c of containers) {
        const sId = c.shipmentId;
        if (!grouped[sId]) {
            grouped[sId] = {
                shipment: c.shipment,
                containers: []
            };
        }
        grouped[sId].containers.push(c);
    }

    const rows: string[][] = [
        ["CONTAINER TRACKING REPORT (GROUPED BY SHIPMENT)", "", "", "", "", "", "", "", "", "", "", "", ""],
        ["Export Date", new Date().toISOString().substring(0, 10), "", "", "", "", "", "", "", "", "", "", ""],
        ["", "", "", "", "", "", "", "", "", "", "", "", ""],
        ["Shipment Ref", "Client Name", "B/L Number", "Entry Number", "Vessel", "ETA", "Container No", "Size/Type", "Seal No", "Status", "Discharge Date", "Gate Out Date", "Assigned Truck", "Driver Name"]
    ];

    for (const sId of Object.keys(grouped)) {
        const group = grouped[sId];
        const s = group.shipment;
        for (const c of group.containers) {
            rows.push([
                s?.refNumber || "N/A",
                s?.clientName || "N/A",
                s?.blNumber || "N/A",
                s?.entryNumber || "N/A",
                s?.vesselName || "N/A",
                s?.eta ? new Date(s.eta).toISOString().substring(0, 10) : "N/A",
                c.containerNumber || c.chassisNumber || "N/A",
                `${c.size || '40'}' ${c.containerType || 'HC'}`,
                c.sealNumber || "N/A",
                c.status || "IN_TRANSIT",
                c.dischargeDate ? new Date(c.dischargeDate).toISOString().substring(0, 10) : "N/A",
                c.gateOutDate ? new Date(c.gateOutDate).toISOString().substring(0, 10) : "N/A",
                c.truckDetails || "N/A",
                c.driverName || "N/A"
            ]);
        }
    }

    return rows.map(r => r.map(val => `"${String(val).replace(/"/g, '""')}"`).join(",")).join("\n");
}

export async function getContainerCountSummary() {
    const total = await prisma.wellContainer.count();
    const delivered = await prisma.wellContainer.count({
        where: {
            status: {
                contains: "DELIVERED",
                mode: "insensitive"
            }
        }
    });
    const in_transit = total - delivered;

    return {
        total,
        in_transit,
        delivered
    };
}

export async function getAnalyticsContainersHandled(month?: string) {
    const targetMonth = month || new Date().toISOString().substring(0, 7);
    const [year, m] = targetMonth.split("-").map(Number);

    const startDate = new Date(year, m - 1, 1);
    const endDate = new Date(year, m, 0, 23, 59, 59);

    const containers = await prisma.wellContainer.findMany({
        where: {
            createdAt: {
                gte: startDate,
                lte: endDate
            }
        },
        select: { createdAt: true }
    });

    const daysInMonth = endDate.getDate();
    const dailyCounts: Record<string, number> = {};

    for (let day = 1; day <= daysInMonth; day++) {
        const dayStr = `${targetMonth}-${String(day).padStart(2, "0")}`;
        dailyCounts[dayStr] = 0;
    }

    containers.forEach(c => {
        const dayStr = c.createdAt.toISOString().substring(0, 10);
        if (dailyCounts[dayStr] !== undefined) {
            dailyCounts[dayStr]++;
        }
    });

    return Object.entries(dailyCounts).map(([date, count]) => ({ date, count }));
}

export async function getAnalyticsContainerStatusBreakdown(month?: string) {
    const targetMonth = month || new Date().toISOString().substring(0, 7);
    const [year, m] = targetMonth.split("-").map(Number);

    const startDate = new Date(year, m - 1, 1);
    const endDate = new Date(year, m, 0, 23, 59, 59);

    const totalContainers = await prisma.wellContainer.findMany({
        where: {
            createdAt: {
                gte: startDate,
                lte: endDate
            }
        },
        select: { status: true }
    });

    let delivered = 0;
    let in_transit = 0;

    totalContainers.forEach(c => {
        if (c.status && c.status.toUpperCase().includes("DELIVERED")) {
            delivered++;
        } else {
            in_transit++;
        }
    });

    return { in_transit, delivered };
}

export async function getAnalyticsShipmentCompletion(month?: string) {
    const targetMonth = month || new Date().toISOString().substring(0, 7);
    const [year, m] = targetMonth.split("-").map(Number);

    const startDate = new Date(year, m - 1, 1);
    const endDate = new Date(year, m, 0, 23, 59, 59);

    const shipments = await prisma.wellShipment.findMany({
        where: {
            createdAt: {
                gte: startDate,
                lte: endDate
            }
        },
        select: { status: true, isPaid: true }
    });

    let finished = 0;
    let in_progress = 0;

    shipments.forEach(s => {
        if (s.status === "PCHARGES" || s.isPaid) {
            finished++;
        } else {
            in_progress++;
        }
    });

    return { finished, in_progress };
}
