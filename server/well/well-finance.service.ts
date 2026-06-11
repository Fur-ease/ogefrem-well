import { prisma } from "@/lib/prisma";
import { logger } from "@/lib/logger";

export async function markWellShipmentAsPaid(id: string, amount?: number) {
    const shipment = await prisma.wellShipment.findUnique({
        where: { id },
    });

    if (!shipment) throw new Error("Shipment not found");
    if (shipment.status !== "PCHARGES") {
        throw new Error("Shipment must be in PCHARGES status to be marked as paid");
    }

    const updated = await prisma.wellShipment.update({
        where: { id },
        data: {
            isPaid: true,
            paidAt: new Date(),
            invoiceDate: new Date(),
            roeKsh: 130, // Default ROE, could be made dynamic
            amount: amount !== undefined ? amount : shipment.amount,
        },
    });

    logger.info({ shipmentId: id }, "Marked WELL shipment as paid");
    return updated;
}
