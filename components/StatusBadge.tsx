"use client";

import { ShipmentStatus } from "@prisma/client";
import { Circle } from "lucide-react";

const STATUS_CONFIG: Record<
    ShipmentStatus,
    { label: string; className: string }
> = {
    NEW: { label: "New", className: "badge badge-new" },
    FERI_ADDED: { label: "Feri Added", className: "badge badge-feri" },
    PAID: { label: "Paid", className: "badge badge-paid" },
    AD_GENERATED: { label: "AD Generated", className: "badge badge-ad" },
    COMPLETED: { label: "Completed", className: "badge badge-completed" },
};

export function StatusBadge({ status }: { status: ShipmentStatus }) {
    const cfg = STATUS_CONFIG[status];
    return (
        <span className={cfg.className}>
            <Circle size={6} fill="currentColor" />
            {cfg.label}
        </span>
    );
}

