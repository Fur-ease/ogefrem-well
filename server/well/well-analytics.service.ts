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

    return {
        total,
        statusCounts: {
            AVA: avaCount,
            FUP: fupCount,
            FURO: furoCount,
            PCHARGES: pchargesCount,
        },
        unpaidPcharges,
    };
}
