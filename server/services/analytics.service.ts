/**
 * Analytics Service — OGEFREM Representation WELL
 * 
 * Aggregates shipment data across months for visualization.
 */

import { prisma } from "@/lib/prisma";
import { ShipmentStatus } from "@prisma/client";
import { Decimal } from "@prisma/client/runtime/library";
import { format, subMonths, startOfMonth, endOfMonth } from "date-fns";

function toNum(v: Decimal | null | undefined): number {
    return v ? parseFloat(v.toString()) : 0;
}

export async function getAnalyticsData(monthsBack: number = 6) {
    const now = new Date();
    const startDate = startOfMonth(subMonths(now, monthsBack - 1));
    const endDate = endOfMonth(now);

    const shipments = await prisma.shipment.findMany({
        where: {
            createdAt: { gte: startDate, lte: endDate },
            status: {
                in: [ShipmentStatus.AD_GENERATED, ShipmentStatus.COMPLETED],
            },
        },
        orderBy: { createdAt: "asc" },
    });

    // Grouping by Month (YYYY-MM) and Client
    const dataset: Record<string, any> = {};

    shipments.forEach((s) => {
        const monthKey = format(s.createdAt, "MMM yyyy");
        const client = s.clientName;

        if (!dataset[monthKey]) {
            dataset[monthKey] = {
                month: monthKey,
                totalAmount: 0,
                wellRev: 0,
                containerCount: 0,
                clients: {} as Record<string, any>
            };
        }

        const mData = dataset[monthKey];
        mData.totalAmount += toNum(s.totalUSD);
        mData.wellRev += toNum(s.wellRevenue);
        mData.containerCount += (s as any).containerCount || 0;

        if (!mData.clients[client]) {
            mData.clients[client] = { totalAmount: 0, wellRev: 0, containerCount: 0 };
        }
        mData.clients[client].totalAmount += toNum(s.totalUSD);
        mData.clients[client].wellRev += toNum(s.wellRevenue);
        mData.clients[client].containerCount += (s as any).containerCount || 0;
    });

    // Convert to flat array for Recharts
    const chartData = Object.values(dataset);

    // Get list of unique clients for the legend/stacking
    const allClients = Array.from(new Set(shipments.map(s => s.clientName)));

    return {
        chartData,
        allClients
    };
}
