import { prisma } from "@/lib/prisma";

export async function getWellAnalytics() {
    const [total, avaCount, fupCount, furoCount, pchargesCount] = await Promise.all([
        prisma.wellShipment.count(),
        prisma.wellShipment.count({ where: { status: "AVA" } }),
        prisma.wellShipment.count({ where: { status: "FUP" } }),
        prisma.wellShipment.count({ where: { status: "FURO" } }),
        prisma.wellShipment.count({ where: { status: "PCHARGES" } }),
    ]);

    const unpaidPcharges = await prisma.wellShipment.count({
        where: {
            status: "PCHARGES",
            isPaid: false,
        },
    });

    // 1. Revenue Analytics (Based on Paid date)
    const paidShipments = await prisma.wellShipment.findMany({
        where: { isPaid: true, paidAt: { not: null } },
        select: { amount: true, paidAt: true, clientName: true }
    });

    const monthlyRevenue: Record<string, number> = {};
    const revenuePerClient: Record<string, number> = {};

    paidShipments.forEach((s) => {
        const date = new Date(s.paidAt!);
        const monthYear = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}`;
        const amount = Number(s.amount || 0);
        monthlyRevenue[monthYear] = (monthlyRevenue[monthYear] || 0) + amount;
        revenuePerClient[s.clientName] = (revenuePerClient[s.clientName] || 0) + amount;
    });

    // 2. Operational Volume (Based on Created date)
    const allShipments = await prisma.wellShipment.findMany({
        select: { createdAt: true, containerSize: true }
    });

    const monthlyContainers: Record<string, number> = {};

    allShipments.forEach((s) => {
        const date = new Date(s.createdAt);
        const monthYear = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}`;

        // Robust container parsing: "2X40" -> 2, "1X20" -> 1, "4X40" -> 4
        // If it doesn't match the pattern, default to 1
        const match = s.containerSize?.match(/^(\d+)[xX]/);
        const count = match ? parseInt(match[1]) : 1;

        monthlyContainers[monthYear] = (monthlyContainers[monthYear] || 0) + count;
    });

    return {
        total,
        statusCounts: {
            AVA: avaCount,
            FUP: fupCount,
            FURO: furoCount,
            PCHARGES: pchargesCount,
        },
        unpaidPcharges,
        monthlyRevenue,
        revenuePerClient,
        monthlyContainers,
    };
}
