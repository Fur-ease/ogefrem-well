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

    // Revenue and Container Analytics
    const paidShipments = await prisma.wellShipment.findMany({
        where: {
            isPaid: true,
            paidAt: { not: null },
        },
        select: {
            amount: true,
            paidAt: true,
            clientName: true,
            containerSize: true,
        },
    });

    const monthlyRevenue: Record<string, number> = {};
    const revenuePerClient: Record<string, number> = {};
    const monthlyContainers: Record<string, number> = {};

    paidShipments.forEach((s) => {
        const date = new Date(s.paidAt!);
        const monthYear = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}`;

        const amount = Number(s.amount || 0);
        monthlyRevenue[monthYear] = (monthlyRevenue[monthYear] || 0) + amount;
        revenuePerClient[s.clientName] = (revenuePerClient[s.clientName] || 0) + amount;

        // Count containers (simple parsing of "1X20" etc)
        const count = parseInt(s.containerSize?.split('X')[0] || "1");
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
