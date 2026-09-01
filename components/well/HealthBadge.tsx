"use client";

import React from "react";
import { CheckCircle2, AlertTriangle, Clock, ShieldAlert } from "lucide-react";

export type HealthStatus = "ON_TRACK" | "ATTENTION" | "DELAYED" | "BLOCKED";

const HEALTH_CONFIG: Record<HealthStatus, { label: string; bg: string; color: string; border: string; icon: React.ReactNode }> = {
    ON_TRACK: {
        label: "On Track",
        bg: "rgba(16, 185, 129, 0.12)",
        color: "#10b981",
        border: "rgba(16, 185, 129, 0.3)",
        icon: <CheckCircle2 size={12} />
    },
    ATTENTION: {
        label: "Attention Needed",
        bg: "rgba(249, 115, 22, 0.12)",
        color: "#f97316",
        border: "rgba(249, 115, 22, 0.3)",
        icon: <AlertTriangle size={12} />
    },
    DELAYED: {
        label: "Delayed",
        bg: "rgba(245, 158, 11, 0.12)",
        color: "#f59e0b",
        border: "rgba(245, 158, 11, 0.3)",
        icon: <Clock size={12} />
    },
    BLOCKED: {
        label: "Blocked",
        bg: "rgba(239, 68, 68, 0.15)",
        color: "#ef4444",
        border: "rgba(239, 68, 68, 0.35)",
        icon: <ShieldAlert size={12} />
    }
};

export function HealthBadge({ health = "ON_TRACK", reason }: { health?: HealthStatus; reason?: string }) {
    const cfg = HEALTH_CONFIG[health] || HEALTH_CONFIG.ON_TRACK;

    return (
        <span
            title={reason || cfg.label}
            style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "0.35rem",
                padding: "0.2rem 0.55rem",
                borderRadius: "4px",
                fontSize: "0.72rem",
                fontWeight: 700,
                background: cfg.bg,
                color: cfg.color,
                border: `1px solid ${cfg.border}`,
                letterSpacing: "0.02em",
                whiteSpace: "nowrap"
            }}
        >
            {cfg.icon}
            {cfg.label}
        </span>
    );
}
