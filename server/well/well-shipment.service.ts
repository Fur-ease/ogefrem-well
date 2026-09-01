import { prisma } from "@/lib/prisma";
import { logger } from "@/lib/logger";

/**
 * Ensures the RefCounter exists and returns the next increment.
 */
async function getNextRefNumber(): Promise<string> {
    const result = await prisma.$transaction(async (tx) => {
        const counter = await tx.wellRefCounter.upsert({
            where: { id: 1 },
            update: { lastRef: { increment: 1 } },
            create: { id: 1, lastRef: 1751 },
        });
        return `WELL/${counter.lastRef}`;
    });
    return result;
}

export function parseAndValidateContainer(c: any) {
    const unitType = (c.unit_type || c.unitType || "container").toLowerCase();
    const validUnitTypes = ["roro", "container", "genco", "bulk_4ft", "bulk_05ft", "grouping_lcl", "bulk_01kg"];
    const finalUnitType = validUnitTypes.includes(unitType) ? unitType : "container";

    let containerNumber = c.containerNumber || c.container_number || null;
    let chassisNumber = c.chassisNumber || c.chassis_number || null;
    let sealNumber = c.sealNumber || c.seal_number || null;
    let lclReferenceNumber = c.lclReferenceNumber || c.lcl_reference_number || null;
    let size = c.size ? c.size.toString() : null;
    let containerType = (c.containerType || c.container_type || "DRY").toUpperCase();
    if (containerType === "GP") containerType = "DRY";

    const grossWeightKg = c.grossWeightKg ?? c.gross_weight_kg ?? (c.weight ? parseFloat(c.weight.toString()) : null);
    const netWeightKg = c.netWeightKg ?? c.net_weight_kg ?? null;
    const volumeCbm = c.volumeCbm ?? c.volume_cbm ?? null;

    // Per-unitType required field validations (Addendum 10 section 4):
    if (finalUnitType === "roro" && !chassisNumber) {
        throw new Error("Chassis number is required for RoRo cargo units");
    }
    if (finalUnitType === "container") {
        if (!containerNumber) {
            throw new Error("Container number is required for Container cargo units");
        }
        if (size && !["10", "20", "40"].includes(size)) {
            throw new Error("Container size must be one of '10', '20', or '40'");
        }
    }
    if (finalUnitType === "grouping_lcl" && !lclReferenceNumber) {
        throw new Error("LCL Reference Number is required for Grouping LCL cargo units");
    }
    if (["genco", "bulk_4ft", "bulk_05ft", "bulk_01kg"].includes(finalUnitType)) {
        if (grossWeightKg === null && netWeightKg === null && volumeCbm === null) {
            throw new Error(`Bulk/Genco cargo units require at least one measurement (gross weight, net weight, or volume)`);
        }
    }

    return {
        unitType: finalUnitType,
        containerNumber: containerNumber ? containerNumber.toUpperCase() : null,
        chassisNumber: chassisNumber ? chassisNumber.toUpperCase() : null,
        sealNumber: sealNumber ? sealNumber.toUpperCase() : null,
        lclReferenceNumber: lclReferenceNumber ? lclReferenceNumber.toUpperCase() : null,
        size,
        containerType,
        weight: grossWeightKg ? parseFloat(grossWeightKg.toString()) : null,
        grossWeightKg: grossWeightKg ? parseFloat(grossWeightKg.toString()) : null,
        netWeightKg: netWeightKg ? parseFloat(netWeightKg.toString()) : null,
        volumeCbm: volumeCbm ? parseFloat(volumeCbm.toString()) : null,
        dischargeDate: c.dischargeDate ? new Date(c.dischargeDate) : null,
        gateOutDate: c.gateOutDate ? new Date(c.gateOutDate) : null,
        truckDetails: c.truckDetails || null,
        driverName: c.driverName || null,
        status: c.status || null,
        remarks: c.remarks || null,
    };
}

export async function createWellShipment(data: any, userId: string = "Operations") {
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
            shippingLine: (data.shippingLine && data.shippingLine.trim()) ? data.shippingLine.trim() : "Shipping Line",
            origin: (data.origin && data.origin.trim()) ? data.origin.trim() : "Mombasa Port",
            destination: (data.destination && data.destination.trim()) ? data.destination.trim() : "Nominated CFS",
            finalDelivery: (data.finalDelivery && data.finalDelivery.trim()) ? data.finalDelivery.trim() : ((data.destination && data.destination.trim()) ? data.destination.trim() : "Nominated CFS"),
            transporter: data.transporter || null,
            health: "ON_TRACK",
            healthReason: "Shipment registered successfully",
            currentStage: "BOOKED",
            assignedOperator: data.assignedOperator || "Operations Team",
            notes: data.notes || data.initialNote,
            notesHistory: (data.notes || data.initialNote) ? {
                create: {
                    note: data.notes || data.initialNote,
                    createdBy: userId
                }
            } : undefined,
            containers: data.containers && Array.isArray(data.containers) ? {
                create: data.containers.map((c: any) => parseAndValidateContainer(c))
            } : undefined,
            events: {
                create: {
                    title: "Shipment Created",
                    description: `New cargo shipment ${refNumber} booked for ${data.clientName}`,
                    stage: "BOOKED",
                    source: "MANUAL",
                    updatedBy: userId,
                    reference: refNumber
                }
            }
        },
        include: {
            containers: true,
            documents: true,
            events: true,
            exceptions: true,
            notesHistory: true
        }
    });

    logger.info({ shipmentId: shipment.id, refNumber }, "Created new WELL shipment with containers and initial event");
    return shipment;
}

export async function getWellShipments(params: any = {}) {
    const where: any = {};

    if (params.status) {
        where.status = params.status;
    }
    if (params.excludePcharges) {
        where.status = { not: "PCHARGES" };
    }
    if (params.isPaid !== undefined) {
        where.isPaid = params.isPaid;
    }
    if (params.health) {
        where.health = params.health;
    }
    if (params.currentStage) {
        where.currentStage = params.currentStage;
    }

    if (params.q) {
        where.OR = [
            { refNumber: { contains: params.q, mode: "insensitive" } },
            { blNumber: { contains: params.q, mode: "insensitive" } },
            { clientName: { contains: params.q, mode: "insensitive" } },
            { clientRef: { contains: params.q, mode: "insensitive" } },
            { vesselName: { contains: params.q, mode: "insensitive" } },
            { entryNumber: { contains: params.q, mode: "insensitive" } },
            { shippingLine: { contains: params.q, mode: "insensitive" } },
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
            events: {
                orderBy: { createdAt: "desc" },
                take: 10
            },
            exceptions: {
                where: { status: "OPEN" },
                orderBy: { createdAt: "desc" }
            },
            notesHistory: {
                orderBy: { createdAt: "desc" }
            }
        },
    });

    return shipments;
}

export async function getWellShipmentById(id: string) {
    const shipment = await prisma.wellShipment.findUnique({
        where: { id },
        include: {
            documents: {
                orderBy: { createdAt: "desc" }
            },
            containers: {
                orderBy: { createdAt: "asc" }
            },
            events: {
                orderBy: { createdAt: "desc" }
            },
            exceptions: {
                orderBy: { createdAt: "desc" }
            },
            notesHistory: {
                orderBy: { createdAt: "desc" }
            }
        },
    });
    if (!shipment) throw new Error("Shipment not found");
    return shipment;
}

const STAGE_RANKS: Record<string, number> = {
    BOOKED: 0,
    FILE_OPENED: 0,
    DOCUMENTATION: 0,
    DOCS_RECEIVED: 1,
    VESSEL_ARRIVED: 2,
    CUSTOMS: 3,
    ENTRY_PASSED: 4,
    LINE_PAID: 5,
    DO_RECEIVED: 6,
    VERIFICATION: 7,
    VERIFIED: 7,
    RELEASE: 8,
    RELEASED: 8,
    DELIVERED: 9,
};

const STATUS_RANKS: Record<string, number> = {
    AVA: 0,
    FUP: 1,
    FURO: 2,
    PCHARGES: 3,
};

export async function updateWellShipment(id: string, data: any, updatedBy: string = "Operations") {
    const existing = await prisma.wellShipment.findUnique({
        where: { id },
        include: { exceptions: { where: { status: "OPEN" } } }
    });
    if (!existing) throw new Error("Shipment not found");

    const updateData: any = {};
    const dateFields = [
        "eta", "lodgeCustoms", "entryPassed", "slineCharges",
        "slinePaid", "ddRecv", "lodgedKpa", "dateVerified"
    ];

    const excludeFields = ["id", "createdAt", "updatedAt", "documents", "containers", "events", "exceptions", "notesHistory", "isSuperAdmin"];

    for (const [key, value] of Object.entries(data)) {
        if (value !== undefined && !excludeFields.includes(key)) {
            if (dateFields.includes(key)) {
                if (value === "" || value === null) {
                    // Do not erase existing date unless explicitly requested or clearing
                    if (data.clearDates === true) {
                        updateData[key] = null;
                    }
                } else {
                    updateData[key] = new Date(value as string);
                }
            } else {
                updateData[key] = value;
            }
        }
    }

    // ── AUTOMATIC MILESTONE & STATUS PROGRESSION (Non-Reversing) ───────────────
    const merged = { ...existing, ...updateData };

    const hasDoc = !!merged.docRecv;
    const hasLodgeCustoms = !!merged.lodgeCustoms;
    const hasEntryNumber = !!merged.entryNumber;
    const hasEntryPassed = !!merged.entryPassed;
    const hasSlineCharges = !!merged.slineCharges;
    const hasSlinePaid = !!merged.slinePaid;
    const hasDdRecv = !!merged.ddRecv; // D/O Issued / Received
    const hasKpaLodged = !!merged.lodgedKpa;
    const hasDateVerified = !!merged.dateVerified;

    let calculatedStage = existing.currentStage || "VESSEL_ARRIVED";
    let calculatedStatus = existing.status || "AVA";

    if (merged.status === "FURO" || merged.status === "PCHARGES") {
        calculatedStage = "RELEASE";
        calculatedStatus = merged.status;
    } else if (hasDateVerified) {
        calculatedStage = "RELEASE";
        calculatedStatus = "PCHARGES";
    } else if (hasKpaLodged) {
        calculatedStage = "VERIFICATION";
        if (existing.status === "AVA" || !existing.status) {
            calculatedStatus = "FUP";
        }
    } else if (hasDdRecv) {
        calculatedStage = "DO_RECEIVED";
    } else if (hasSlinePaid || hasSlineCharges) {
        calculatedStage = "LINE_PAID";
    } else if (hasEntryPassed || hasEntryNumber) {
        calculatedStage = hasEntryPassed ? "ENTRY_PASSED" : "CUSTOMS";
        if (hasEntryPassed && (existing.status === "AVA" || !existing.status)) {
            calculatedStatus = "FUP";
        }
    } else if (hasLodgeCustoms) {
        calculatedStage = "CUSTOMS";
    } else if (hasDoc) {
        calculatedStage = "DOCS_RECEIVED";
    }

    const existingStageRank = STAGE_RANKS[(existing.currentStage || "BOOKED").toUpperCase()] ?? 0;
    const calculatedStageRank = STAGE_RANKS[(calculatedStage || "BOOKED").toUpperCase()] ?? 0;
    const payloadStageRank = data.currentStage ? (STAGE_RANKS[data.currentStage.toUpperCase()] ?? null) : null;

    const existingStatusRank = STATUS_RANKS[(existing.status || "AVA").toUpperCase()] ?? 0;
    const calculatedStatusRank = STATUS_RANKS[(calculatedStatus || "AVA").toUpperCase()] ?? 0;
    const payloadStatusRank = data.status ? (STATUS_RANKS[data.status.toUpperCase()] ?? null) : null;

    const isSuperAdmin = data.isSuperAdmin === true ||
        updatedBy.toLowerCase().includes("super_admin") ||
        updatedBy.toLowerCase().includes("superadmin") ||
        updatedBy.toLowerCase().includes("admin");

    // STAGE NON-REVERSION PROTECTION:
    if (payloadStageRank !== null && payloadStageRank !== existingStageRank) {
        if (payloadStageRank < existingStageRank && !isSuperAdmin) {
            // Non-super-admin tried to reverse stage -> enforce current stage
            updateData.currentStage = existing.currentStage;
        } else {
            // Explicit manual change by user (or Super Admin reversal)
            updateData.currentStage = data.currentStage;
        }
    } else {
        // Automatic milestone progression: only advance forward
        if (calculatedStageRank >= existingStageRank) {
            updateData.currentStage = calculatedStage;
        } else {
            updateData.currentStage = existing.currentStage; // Preserve higher current stage
        }
    }

    // STATUS NON-REVERSION PROTECTION:
    if (payloadStatusRank !== null && payloadStatusRank !== existingStatusRank) {
        if (payloadStatusRank < existingStatusRank && !isSuperAdmin) {
            // Non-super-admin tried to reverse status -> enforce current status
            updateData.status = existing.status;
        } else {
            // Explicit manual change by user (or Super Admin reversal)
            updateData.status = data.status;
        }
    } else {
        // Automatic status progression: only advance forward
        if (calculatedStatusRank >= existingStatusRank) {
            updateData.status = calculatedStatus;
        } else {
            updateData.status = existing.status; // Preserve higher current status
        }
    }

    // Auto calculate Health Status if not explicitly overridden
    if (!data.health) {
        const exceptions: any[] = (existing as any).exceptions || [];
        const hasCriticalException = exceptions.some((e: any) => e.severity === "CRITICAL" || e.severity === "HIGH");
        if (hasCriticalException) {
            updateData.health = "BLOCKED";
            updateData.healthReason = exceptions[0]?.description || "Critical exception flagged";
        } else if (exceptions.length > 0) {
            updateData.health = "ATTENTION";
            updateData.healthReason = exceptions[0]?.description || "Operational exception flagged";
        } else if (updateData.status === "FURO" || updateData.status === "PCHARGES") {
            updateData.health = "ON_TRACK";
            updateData.healthReason = "Shipment progressing smoothly";
        }
    }

    // Handle container updates/creations
    if (data.containers && Array.isArray(data.containers)) {
        for (const c of data.containers) {
            const containerData = parseAndValidateContainer(c);

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

    // Create an operational event log for changes
    const changes: string[] = [];
    if (updateData.status && updateData.status !== existing.status) changes.push(`Status changed to ${updateData.status}`);
    if (updateData.currentStage && updateData.currentStage !== existing.currentStage) changes.push(`Stage updated to ${updateData.currentStage}`);
    if (data.entryNumber && data.entryNumber !== existing.entryNumber) changes.push(`Entry # updated: ${data.entryNumber}`);
    if (data.entryPassed && !existing.entryPassed) changes.push("Customs entry passed");
    if (data.slinePaid && !existing.slinePaid) changes.push("Shipping line paid");
    if (data.ddRecv && !existing.ddRecv) changes.push("Delivery Order (D/O) received");
    if (data.dateVerified && !existing.dateVerified) changes.push("KPA verification completed");

    if (changes.length > 0) {
        await prisma.wellEvent.create({
            data: {
                shipmentId: id,
                title: changes[0],
                description: changes.join("; "),
                stage: updateData.currentStage || existing.currentStage || "VESSEL_ARRIVED",
                source: "AUTOMATIC",
                updatedBy,
                reference: data.entryNumber || existing.entryNumber || existing.refNumber
            }
        });
    }

    const updatedShipment = await prisma.wellShipment.update({
        where: { id },
        data: updateData,
        include: {
            containers: { orderBy: { createdAt: "asc" } },
            documents: true,
            events: { orderBy: { createdAt: "desc" } },
            exceptions: { orderBy: { createdAt: "desc" } },
            notesHistory: { orderBy: { createdAt: "desc" } }
        }
    });

    // Addendum 9: Trigger automated stage transitions
    const { ClearingStageAutomationService } = await import("@/server/well/clearing-stage-automation.service");
    await ClearingStageAutomationService.checkEntryPassedToVerification(id);
    await ClearingStageAutomationService.checkReleaseToDelivered(id);

    return getWellShipmentById(id);
}

/**
 * Explicit payment verification action (Addendum 9)
 */
export async function verifyWellShipmentPayment(id: string, updatedBy: string = "Finance / Operations Team") {
    const updated = await prisma.wellShipment.update({
        where: { id },
        data: {
            paymentVerifiedAt: new Date(),
            isPaid: true,
            paidAt: new Date()
        } as any
    });

    await prisma.wellEvent.create({
        data: {
            shipmentId: id,
            title: "Payment Verified",
            description: "Shipment payment marked as verified.",
            stage: updated.currentStage,
            source: "MANUAL",
            updatedBy
        }
    });

    const { ClearingStageAutomationService } = await import("@/server/well/clearing-stage-automation.service");
    await ClearingStageAutomationService.checkEntryPassedToVerification(id);

    return getWellShipmentById(id);
}

export async function addWellShipmentNote(shipmentId: string, note: string, createdBy: string = "Operations") {
    const noteEntry = await prisma.wellShipmentNote.create({
        data: {
            shipmentId,
            note,
            createdBy
        }
    });

    // Sync legacy notes field on WellShipment for latest note summary
    await prisma.wellShipment.update({
        where: { id: shipmentId },
        data: { notes: note }
    });

    // Log as operational event
    await prisma.wellEvent.create({
        data: {
            shipmentId,
            title: "Operational Note Added",
            description: note,
            source: "MANUAL",
            updatedBy: createdBy
        }
    });

    return noteEntry;
}

export async function getWellShipmentNotes(shipmentId: string) {
    return prisma.wellShipmentNote.findMany({
        where: { shipmentId },
        orderBy: { createdAt: "desc" }
    });
}

export async function createWellEvent(shipmentId: string, eventData: any, updatedBy: string = "Operations") {
    const event = await prisma.wellEvent.create({
        data: {
            shipmentId,
            title: eventData.title,
            description: eventData.description,
            stage: eventData.stage,
            source: eventData.source || "MANUAL",
            updatedBy: eventData.updatedBy || updatedBy,
            reference: eventData.reference
        }
    });
    return event;
}

export async function createWellException(shipmentId: string, exceptionData: any, createdBy: string = "Operations") {
    const exception = await prisma.wellException.create({
        data: {
            shipmentId,
            containerId: exceptionData.containerId,
            issueType: exceptionData.issueType,
            severity: exceptionData.severity || "MEDIUM",
            status: "OPEN",
            description: exceptionData.description,
            expectedResolution: exceptionData.expectedResolution,
            assignedTo: exceptionData.assignedTo || "Operations Team",
            dueDate: exceptionData.dueDate ? new Date(exceptionData.dueDate) : null,
            createdBy
        }
    });

    // Update shipment health to ATTENTION or BLOCKED
    const healthState = exceptionData.severity === "CRITICAL" || exceptionData.severity === "HIGH" ? "BLOCKED" : "ATTENTION";
    await prisma.wellShipment.update({
        where: { id: shipmentId },
        data: {
            health: healthState,
            healthReason: `Exception: ${exceptionData.issueType} - ${exceptionData.description}`
        }
    });

    // Log activity event
    await prisma.wellEvent.create({
        data: {
            shipmentId,
            title: `Exception Reported: ${exceptionData.issueType}`,
            description: `Severity ${exceptionData.severity}: ${exceptionData.description}`,
            stage: "EXCEPTION",
            source: "MANUAL",
            updatedBy: createdBy,
            reference: exception.id
        }
    });

    return exception;
}

export async function resolveWellException(exceptionId: string, resolutionNotes?: string, resolvedBy: string = "Operations") {
    const exception = await prisma.wellException.update({
        where: { id: exceptionId },
        data: {
            status: "RESOLVED",
            resolvedAt: new Date(),
            resolvedBy
        }
    });

    // Check remaining open exceptions for the shipment
    const openExceptions = await prisma.wellException.findMany({
        where: { shipmentId: exception.shipmentId, status: "OPEN" }
    });

    let newHealth = "ON_TRACK";
    let newReason = "All exceptions resolved";
    if (openExceptions.length > 0) {
        const hasHigh = openExceptions.some(e => e.severity === "CRITICAL" || e.severity === "HIGH");
        newHealth = hasHigh ? "BLOCKED" : "ATTENTION";
        newReason = openExceptions[0].description;
    }

    await prisma.wellShipment.update({
        where: { id: exception.shipmentId },
        data: {
            health: newHealth,
            healthReason: newReason
        }
    });

    await prisma.wellEvent.create({
        data: {
            shipmentId: exception.shipmentId,
            title: `Exception Resolved: ${exception.issueType}`,
            description: resolutionNotes || "Issue marked resolved by operator.",
            stage: "RESOLVED",
            source: "MANUAL",
            updatedBy: resolvedBy,
            reference: exception.id
        }
    });

    return exception;
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

    const [wellClients, ogefremClients] = await Promise.all([
        prisma.wellShipment.groupBy({
            where,
            by: ["clientName"],
            _count: { id: true },
        }),
        prisma.shipment.groupBy({
            where: q ? { clientName: { contains: q, mode: "insensitive" } } : {},
            by: ["clientName"],
            _count: { id: true },
        })
    ]);

    // Merge client names uniquely
    const clientNameMap = new Map<string, number>();
    wellClients.forEach(c => {
        if (c.clientName) clientNameMap.set(c.clientName, c._count.id);
    });
    ogefremClients.forEach(c => {
        if (c.clientName) {
            const current = clientNameMap.get(c.clientName) || 0;
            clientNameMap.set(c.clientName, current + c._count.id);
        }
    });

    const clientNames = Array.from(clientNameMap.keys());

    const summaries = await Promise.all(
        clientNames.map(async (name) => {
            const [completed, ongoing] = await Promise.all([
                prisma.wellShipment.count({
                    where: { clientName: name, isPaid: true },
                }),
                prisma.wellShipment.count({
                    where: { clientName: name, isPaid: false },
                }),
            ]);

            return {
                clientName: name,
                total: clientNameMap.get(name) || 0,
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
            events: { orderBy: { createdAt: "desc" }, take: 5 },
            exceptions: { where: { status: "OPEN" } }
        },
    });
}
