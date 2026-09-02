"use client";

import React, { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { X } from "lucide-react";

export interface ModalProps {
    open: boolean;
    onClose: () => void;
    title: string;
    subtitle?: string;
    children: React.ReactNode;
    footer?: React.ReactNode;
    maxWidth?: string;
    accentColor?: string;
}

/**
 * Enterprise Modal Component (Addendum 6 Standard)
 * - Rendered via React Portal directly into document.body to prevent containing block displacement
 * - Strict 90vh maximum height limit
 * - Header: Fixed top (never scrolls)
 * - Body: ONLY scrollable container (overflow-y: auto)
 * - Footer: Fixed bottom (never scrolls, action buttons always reachable)
 * - Keyboard Escape listener & Backdrop click close
 */
export function Modal({
    open,
    onClose,
    title,
    subtitle,
    children,
    footer,
    maxWidth = "640px",
    accentColor = "hsl(var(--primary))"
}: ModalProps) {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === "Escape") onClose();
        };
        if (open) {
            document.addEventListener("keydown", handleKeyDown);
            document.body.style.overflow = "hidden";
        }
        return () => {
            document.removeEventListener("keydown", handleKeyDown);
            document.body.style.overflow = "";
        };
    }, [open, onClose]);

    if (!open || !mounted) return null;

    return createPortal(
        <div
            onClick={(e) => {
                if (e.target === e.currentTarget) onClose();
            }}
            style={{
                position: "fixed",
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                width: "100vw",
                height: "100vh",
                zIndex: 99999,
                background: "rgba(0, 0, 0, 0.75)",
                backdropFilter: "blur(6px)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                padding: "1rem"
            }}
            role="dialog"
            aria-modal="true"
        >
            <div
                style={{
                    width: "100%",
                    maxWidth,
                    maxHeight: "90vh",
                    height: "auto",
                    background: "hsl(var(--surface-1, var(--surface)))",
                    borderRadius: "12px",
                    border: "1px solid hsl(var(--border))",
                    boxShadow: "0 25px 60px rgba(0,0,0,0.5)",
                    display: "flex",
                    flexDirection: "column",
                    overflow: "hidden",
                    animation: "slideUp 0.18s cubic-bezier(0.16, 1, 0.3, 1)"
                }}
            >
                {/* Header — Fixed Top */}
                <div
                    style={{
                        padding: "1.1rem 1.5rem",
                        borderBottom: `3px solid ${accentColor}`,
                        background: `linear-gradient(135deg, hsl(var(--surface-2)), hsl(var(--surface)))`,
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        flexShrink: 0
                    }}
                >
                    <div>
                        <h2 style={{ fontSize: "1.1rem", fontWeight: 700, color: accentColor, margin: 0, letterSpacing: "-0.01em" }}>
                            {title}
                        </h2>
                        {subtitle && (
                            <p style={{ fontSize: "0.8rem", color: "hsl(var(--text-muted))", margin: "0.2rem 0 0" }}>
                                {subtitle}
                            </p>
                        )}
                    </div>
                    <button
                        type="button"
                        onClick={onClose}
                        aria-label="Close modal"
                        style={{
                            width: "32px",
                            height: "32px",
                            borderRadius: "50%",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            background: "hsl(var(--surface-3))",
                            border: "1px solid hsl(var(--border))",
                            color: "hsl(var(--text-muted))",
                            cursor: "pointer",
                            transition: "all 0.15s ease"
                        }}
                    >
                        <X size={16} />
                    </button>
                </div>

                {/* Body — ONLY Scrollable Region */}
                <div
                    style={{
                        flex: 1,
                        overflowY: "auto",
                        padding: "1.5rem",
                        display: "flex",
                        flexDirection: "column",
                        gap: "1.25rem"
                    }}
                >
                    {children}
                </div>

                {/* Footer — Fixed Bottom */}
                {footer && (
                    <div
                        style={{
                            padding: "1rem 1.5rem",
                            borderTop: "1px solid hsl(var(--border))",
                            background: "hsl(var(--surface-2))",
                            display: "flex",
                            justifyContent: "flex-end",
                            alignItems: "center",
                            gap: "0.75rem",
                            flexShrink: 0
                        }}
                    >
                        {footer}
                    </div>
                )}
            </div>
        </div>,
        document.body
    );
}

export interface DrawerProps {
    open: boolean;
    onClose: () => void;
    title: string;
    subtitle?: string;
    children: React.ReactNode;
    footer?: React.ReactNode;
    width?: string;
    accentColor?: string;
}

/**
 * Enterprise Drawer Component (Addendum 6 Standard)
 * - Rendered via React Portal directly into document.body to guarantee 100% visibility & viewport alignment
 * - Right side panel with 100vh view height
 * - Header: Fixed top
 * - Body: ONLY scrollable container (overflow-y: auto)
 * - Footer: Fixed bottom
 */
export function Drawer({
    open,
    onClose,
    title,
    subtitle,
    children,
    footer,
    width = "520px",
    accentColor = "hsl(var(--primary))"
}: DrawerProps) {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === "Escape") onClose();
        };
        if (open) {
            document.addEventListener("keydown", handleKeyDown);
            document.body.style.overflow = "hidden";
        }
        return () => {
            document.removeEventListener("keydown", handleKeyDown);
            document.body.style.overflow = "";
        };
    }, [open, onClose]);

    if (!mounted) return null;

    return createPortal(
        <>
            {/* Backdrop */}
            {open && (
                <div
                    onClick={onClose}
                    style={{
                        position: "fixed",
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        width: "100vw",
                        height: "100vh",
                        zIndex: 99998,
                        background: "rgba(0, 0, 0, 0.65)",
                        backdropFilter: "blur(4px)"
                    }}
                />
            )}

            {/* Panel */}
            <div
                style={{
                    position: "fixed",
                    top: 0,
                    right: 0,
                    bottom: 0,
                    height: "100vh",
                    zIndex: 99999,
                    width,
                    maxWidth: "100vw",
                    background: "hsl(var(--surface-1, var(--surface)))",
                    borderLeft: "1px solid hsl(var(--border))",
                    boxShadow: "-12px 0 40px rgba(0,0,0,0.5)",
                    display: "flex",
                    flexDirection: "column",
                    transform: open ? "translateX(0)" : "translateX(100%)",
                    transition: "transform 0.25s cubic-bezier(0.16, 1, 0.3, 1)",
                    visibility: open ? "visible" : "hidden"
                }}
                role="dialog"
                aria-modal="true"
            >
                {/* Header — Fixed Top */}
                <div
                    style={{
                        padding: "1.1rem 1.5rem",
                        borderBottom: `3px solid ${accentColor}`,
                        background: `linear-gradient(135deg, hsl(var(--surface-2)), hsl(var(--surface)))`,
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        flexShrink: 0
                    }}
                >
                    <div style={{ paddingRight: "1rem" }}>
                        <h2 style={{ fontSize: "1.1rem", fontWeight: 700, color: accentColor, margin: 0 }}>
                            {title}
                        </h2>
                        {subtitle && (
                            <p style={{ fontSize: "0.8rem", color: "hsl(var(--text-muted))", margin: "0.2rem 0 0" }}>
                                {subtitle}
                            </p>
                        )}
                    </div>
                    <button
                        type="button"
                        onClick={onClose}
                        aria-label="Close drawer"
                        style={{
                            width: "32px",
                            height: "32px",
                            borderRadius: "50%",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            background: "hsl(var(--surface-3))",
                            border: "1px solid hsl(var(--border))",
                            color: "hsl(var(--text-muted))",
                            cursor: "pointer",
                            flexShrink: 0,
                            transition: "all 0.15s ease"
                        }}
                    >
                        <X size={16} />
                    </button>
                </div>

                {/* Body — ONLY Scrollable Region */}
                <div
                    style={{
                        flex: 1,
                        overflowY: "auto",
                        padding: "1.5rem",
                        display: "flex",
                        flexDirection: "column",
                        gap: "1.25rem"
                    }}
                >
                    {children}
                </div>

                {/* Footer — Fixed Bottom */}
                {footer && (
                    <div
                        style={{
                            padding: "1rem 1.5rem",
                            borderTop: "1px solid hsl(var(--border))",
                            background: "hsl(var(--surface-2))",
                            display: "flex",
                            justifyContent: "flex-end",
                            alignItems: "center",
                            gap: "0.75rem",
                            flexShrink: 0
                        }}
                    >
                        {footer}
                    </div>
                )}
            </div>
        </>,
        document.body
    );
}

/**
 * Slideover Component Alias (Addendum 6 Standard)
 */
export const Slideover = Drawer;
export type SlideoverProps = DrawerProps;

