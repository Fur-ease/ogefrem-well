import { prisma } from "@/lib/prisma";

/**
 * ClearingStageAutomationService — Addendum 9
 * Automates shipment stage transitions based on operational & document events:
 * 
 * 1. FILE_OPENED / BOOKED -> ENTRY_PASSED: Triggered when first document is uploaded.
 * 2. ENTRY_PASSED -> VERIFICATION: Triggered when paymentVerifiedAt (or isPaid) AND entryNumber are set.
 * 3. RELEASE -> DELIVERED: Triggered when EVERY container has gateOutDate set.
 */
export class ClearingStageAutomationService {
    /**
     * Trigger 1: Document Uploaded
     * If current stage is FILE_OPENED / BOOKED -> advance to ENTRY_PASSED
     */
    static async onDocumentCreated(shipmentId: string) {
        try {
            const shipment = await prisma.wellShipment.findUnique({
                where: { id: shipmentId },
                include: { documents: true }
            });
            if (!shipment) return;

            const stage = (shipment.currentStage || "FILE_OPENED").toUpperCase();
            if ((stage === "FILE_OPENED" || stage === "BOOKED" || stage === "DOCUMENTATION") && shipment.documents.length >= 1) {
                await prisma.wellShipment.update({
                    where: { id: shipmentId },
                    data: {
                        currentStage: "ENTRY_PASSED",
                        status: "FUP", // Follow Up
                    }
                });

                await prisma.wellEvent.create({
                    data: {
                        shipmentId,
                        title: "Automated Stage Transition: ENTRY_PASSED",
                        description: "First document uploaded — shipment stage automatically advanced to ENTRY_PASSED.",
                        stage: "ENTRY_PASSED",
                        source: "system_rule",
                        updatedBy: "System Automation",
                        reference: "DOC_UPLOAD_TRIGGER"
                    }
                });
            }
        } catch (err) {
            console.error("[ClearingStageAutomationService] Error onDocumentCreated:", err);
        }
    }

    /**
     * Trigger 2: Payment Verified & Entry Number Set
     * If current stage is ENTRY_PASSED AND paymentVerifiedAt (or isPaid) is set AND entryNumber is set -> advance to VERIFICATION
     */
    static async checkEntryPassedToVerification(shipmentId: string) {
        try {
            const shipment = await prisma.wellShipment.findUnique({
                where: { id: shipmentId }
            });
            if (!shipment) return;

            const stage = (shipment.currentStage || "").toUpperCase();
            const hasPaymentVerified = !!((shipment as any).paymentVerifiedAt || shipment.isPaid);
            const hasEntryNumber = !!(shipment.entryNumber && shipment.entryNumber.trim());

            if (stage === "ENTRY_PASSED" && hasPaymentVerified && hasEntryNumber) {
                await prisma.wellShipment.update({
                    where: { id: shipmentId },
                    data: {
                        currentStage: "VERIFICATION"
                    }
                });

                await prisma.wellEvent.create({
                    data: {
                        shipmentId,
                        title: "Automated Stage Transition: VERIFICATION",
                        description: "Customs Entry Number and Payment Verification confirmed — shipment automatically advanced to VERIFICATION stage.",
                        stage: "VERIFICATION",
                        source: "system_rule",
                        updatedBy: "System Automation",
                        reference: "PAYMENT_ENTRY_VERIFIED"
                    }
                });
            }
        } catch (err) {
            console.error("[ClearingStageAutomationService] Error checkEntryPassedToVerification:", err);
        }
    }

    /**
     * Trigger 3: Containers Gated Out / Returned
     * If parent shipment stage is RELEASE / RELEASED (or VERIFIED/VERIFICATION) AND at least one (or all) container has gateOutDate or returned status -> advance to DELIVERED
     */
    static async checkReleaseToDelivered(shipmentId: string) {
        try {
            const shipment = await prisma.wellShipment.findUnique({
                where: { id: shipmentId },
                include: { containers: true }
            });
            if (!shipment || !shipment.containers || shipment.containers.length === 0) return;

            const stage = (shipment.currentStage || "").toUpperCase();
            if (stage === "RELEASE" || stage === "RELEASED" || stage === "VERIFICATION" || stage === "VERIFIED") {
                const hasReturnedOrGatedOutContainer = shipment.containers.some(c =>
                    c.gateOutDate !== null ||
                    (c.status && (
                        c.status.toLowerCase().includes("return") ||
                        c.status.toLowerCase().includes("gate") ||
                        c.status.toLowerCase().includes("deliver")
                    ))
                );

                if (hasReturnedOrGatedOutContainer) {
                    await prisma.wellShipment.update({
                        where: { id: shipmentId },
                        data: {
                            currentStage: "DELIVERED",
                            status: "FURO"
                        }
                    });

                    await prisma.wellEvent.create({
                        data: {
                            shipmentId,
                            title: "Automated Stage Transition: DELIVERED",
                            description: "Container(s) returned / gated out — shipment stage automatically advanced to DELIVERED.",
                            stage: "DELIVERED",
                            source: "system_rule",
                            updatedBy: "System Automation",
                            reference: "CONTAINER_RETURNED_GATED_OUT"
                        }
                    });
                }
            }
        } catch (err) {
            console.error("[ClearingStageAutomationService] Error checkReleaseToDelivered:", err);
        }
    }
}
