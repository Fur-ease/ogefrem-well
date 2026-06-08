"use client";

import { ShipmentStatus } from "@prisma/client";
import { Check } from "lucide-react";


const STEPS = [
    { status: ShipmentStatus.NEW, label: "New Shipment", step: 1 },
    { status: ShipmentStatus.FERI_ADDED, label: "Feri + Proforma", step: 2 },
    { status: ShipmentStatus.PAID, label: "Paid (POP)", step: 3 },
    { status: ShipmentStatus.AD_GENERATED, label: "AD Generated", step: 4 },
    { status: ShipmentStatus.COMPLETED, label: "Completed", step: 5 },
];

const STATUS_ORDER = [
    ShipmentStatus.NEW,
    ShipmentStatus.FERI_ADDED,
    ShipmentStatus.PAID,
    ShipmentStatus.AD_GENERATED,
    ShipmentStatus.COMPLETED,
];

function stepIndex(status: ShipmentStatus) {
    return STATUS_ORDER.indexOf(status);
}

export function StepWizard({ currentStatus, isFeriSkipped }: { currentStatus: ShipmentStatus, isFeriSkipped?: boolean }) {
    const currentIdx = stepIndex(currentStatus);

    return (
        <div style={{ display: "flex", alignItems: "center", gap: "0", marginBottom: "0" }}>
            {STEPS.map((step, i) => {
                const isDone = currentIdx > i;
                const isActive = currentIdx === i;
                const isActuallySkipped = isFeriSkipped && (i === 1 || i === 2);

                return (
                    <div key={step.status} style={{ display: "flex", alignItems: "center", flex: i < STEPS.length - 1 ? "1" : "0" }}>
                        {/* Step node */}
                        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "0.5rem" }}>
                            <div
                                className={
                                    isActive
                                        ? "step-dot step-dot-active"
                                        : (isDone || isActuallySkipped)
                                            ? "step-dot step-dot-done"
                                            : "step-dot step-dot-pending"
                                }
                                style={isActuallySkipped ? { background: "hsl(215,12%,25%)", borderColor: "hsl(215,12%,35%)", color: "hsl(215,12%,50%)" } : {}}
                            >
                                {isDone ? <Check size={14} strokeWidth={3} /> : (isActuallySkipped ? "—" : step.step)}
                            </div>
                            <div
                                style={{
                                    fontSize: "0.7rem",
                                    fontWeight: 600,
                                    color: isActive
                                        ? "hsl(213,94%,65%)"
                                        : (isDone || isActuallySkipped)
                                            ? (isActuallySkipped ? "hsl(215,12%,45%)" : "hsl(145,65%,55%)")
                                            : "hsl(215,12%,45%)",
                                    whiteSpace: "nowrap",
                                    maxWidth: "80px",
                                    textAlign: "center",
                                    lineHeight: 1.3,
                                    textDecoration: isActuallySkipped ? "line-through" : "none",
                                }}
                            >
                                {step.label}
                                {isActuallySkipped && <div style={{ fontSize: "0.6rem", fontWeight: 400 }}>Skipped</div>}
                            </div>
                        </div>
                        {/* Connector line */}
                        {i < STEPS.length - 1 && (
                            <div
                                style={{
                                    flex: 1,
                                    height: "2px",
                                    marginTop: "-1.5rem",
                                    background: (isDone || isActuallySkipped)
                                        ? (isActuallySkipped ? "hsl(217,15%,20%)" : "hsl(145,50%,35%)")
                                        : "hsl(217,25%,22%)",
                                    transition: "background 0.3s",
                                    minWidth: "1rem",
                                }}
                            />
                        )}
                    </div>
                );
            })}
        </div>
    );
}
