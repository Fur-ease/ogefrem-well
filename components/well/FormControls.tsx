"use client";

import React from "react";
import { Loader2, AlertCircle } from "lucide-react";

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label?: string;
    error?: string;
    mono?: boolean;
    required?: boolean;
    helperText?: string;
}

/**
 * Enterprise Shared Input Component (Addendum 6 Standard)
 * - Standard 40px height
 * - Label above field
 * - Validation error directly under field
 * - Monospace mode support (for B/L, Ref, Container IDs)
 */
export const Input = React.forwardRef<HTMLInputElement, InputProps>(
    ({ label, error, mono = false, required = false, helperText, className = "", style, ...props }, ref) => {
        return (
            <div style={{ display: "flex", flexDirection: "column", gap: "0.35rem", width: "100%" }}>
                {label && (
                    <label style={{ fontSize: "0.78rem", fontWeight: 600, color: "hsl(var(--text-secondary))", display: "flex", alignItems: "center", gap: "0.25rem", margin: 0 }}>
                        {label}
                        {required && <span style={{ color: "#ef4444" }}>*</span>}
                    </label>
                )}
                <input
                    ref={ref}
                    required={required}
                    style={{
                        height: "40px",
                        width: "100%",
                        padding: "0 0.85rem",
                        borderRadius: "6px",
                        background: "hsl(var(--surface-2))",
                        border: error ? "1px solid #ef4444" : "1px solid hsl(var(--border))",
                        color: "hsl(var(--text-primary))",
                        fontSize: "0.85rem",
                        fontFamily: mono ? "monospace" : undefined,
                        outline: "none",
                        transition: "all 0.15s ease",
                        ...style
                    }}
                    className={`focus:ring-2 focus:ring-primary/20 ${className}`}
                    {...props}
                />
                {error ? (
                    <span style={{ fontSize: "0.72rem", color: "#ef4444", display: "flex", alignItems: "center", gap: "0.3rem", fontWeight: 500 }}>
                        <AlertCircle size={12} /> {error}
                    </span>
                ) : helperText ? (
                    <span style={{ fontSize: "0.72rem", color: "hsl(var(--text-muted))" }}>{helperText}</span>
                ) : null}
            </div>
        );
    }
);
Input.displayName = "Input";

export interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
    label?: string;
    error?: string;
    required?: boolean;
    helperText?: string;
    children: React.ReactNode;
}

/**
 * Enterprise Shared Select Component (Addendum 6 Standard)
 */
export const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
    ({ label, error, required = false, helperText, children, className = "", style, ...props }, ref) => {
        return (
            <div style={{ display: "flex", flexDirection: "column", gap: "0.35rem", width: "100%" }}>
                {label && (
                    <label style={{ fontSize: "0.78rem", fontWeight: 600, color: "hsl(var(--text-secondary))", display: "flex", alignItems: "center", gap: "0.25rem", margin: 0 }}>
                        {label}
                        {required && <span style={{ color: "#ef4444" }}>*</span>}
                    </label>
                )}
                <select
                    ref={ref}
                    required={required}
                    style={{
                        height: "40px",
                        width: "100%",
                        padding: "0 0.85rem",
                        borderRadius: "6px",
                        background: "hsl(var(--surface-2))",
                        border: error ? "1px solid #ef4444" : "1px solid hsl(var(--border))",
                        color: "hsl(var(--text-primary))",
                        fontSize: "0.85rem",
                        cursor: "pointer",
                        outline: "none",
                        transition: "all 0.15s ease",
                        ...style
                    }}
                    className={`focus:ring-2 focus:ring-primary/20 ${className}`}
                    {...props}
                >
                    {children}
                </select>
                {error ? (
                    <span style={{ fontSize: "0.72rem", color: "#ef4444", display: "flex", alignItems: "center", gap: "0.3rem", fontWeight: 500 }}>
                        <AlertCircle size={12} /> {error}
                    </span>
                ) : helperText ? (
                    <span style={{ fontSize: "0.72rem", color: "hsl(var(--text-muted))" }}>{helperText}</span>
                ) : null}
            </div>
        );
    }
);
Select.displayName = "Select";

export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
    label?: string;
    error?: string;
    required?: boolean;
    helperText?: string;
}

/**
 * Enterprise Shared Textarea Component (Addendum 6 Standard)
 */
export const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
    ({ label, error, required = false, helperText, rows = 3, className = "", style, ...props }, ref) => {
        return (
            <div style={{ display: "flex", flexDirection: "column", gap: "0.35rem", width: "100%", gridColumn: "1 / -1" }}>
                {label && (
                    <label style={{ fontSize: "0.78rem", fontWeight: 600, color: "hsl(var(--text-secondary))", display: "flex", alignItems: "center", gap: "0.25rem", margin: 0 }}>
                        {label}
                        {required && <span style={{ color: "#ef4444" }}>*</span>}
                    </label>
                )}
                <textarea
                    ref={ref}
                    rows={rows}
                    required={required}
                    style={{
                        width: "100%",
                        padding: "0.6rem 0.85rem",
                        borderRadius: "6px",
                        background: "hsl(var(--surface-2))",
                        border: error ? "1px solid #ef4444" : "1px solid hsl(var(--border))",
                        color: "hsl(var(--text-primary))",
                        fontSize: "0.85rem",
                        resize: "vertical",
                        outline: "none",
                        transition: "all 0.15s ease",
                        ...style
                    }}
                    className={`focus:ring-2 focus:ring-primary/20 ${className}`}
                    {...props}
                />
                {error ? (
                    <span style={{ fontSize: "0.72rem", color: "#ef4444", display: "flex", alignItems: "center", gap: "0.3rem", fontWeight: 500 }}>
                        <AlertCircle size={12} /> {error}
                    </span>
                ) : helperText ? (
                    <span style={{ fontSize: "0.72rem", color: "hsl(var(--text-muted))" }}>{helperText}</span>
                ) : null}
            </div>
        );
    }
);
Textarea.displayName = "Textarea";

/**
 * Section Group Wrapper for dense forms
 */
export function FormSection({ title, children }: { title: string; children: React.ReactNode }) {
    return (
        <div style={{ marginBottom: "1.25rem" }}>
            <div
                style={{
                    fontSize: "0.72rem",
                    fontWeight: 700,
                    textTransform: "uppercase",
                    letterSpacing: "0.06em",
                    color: "hsl(var(--text-muted))",
                    marginBottom: "0.75rem",
                    paddingBottom: "0.35rem",
                    borderBottom: "1px solid hsl(var(--border))"
                }}
            >
                {title}
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "1rem" }}>
                {children}
            </div>
        </div>
    );
}

/**
 * 2-Column Grid Layout for Form Pairs
 */
export function FormRow({ children }: { children: React.ReactNode }) {
    return (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "1rem", width: "100%" }}>
            {children}
        </div>
    );
}

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: "primary" | "secondary" | "danger" | "ghost";
    size?: "sm" | "md" | "lg";
    loading?: boolean;
    icon?: React.ReactNode;
}

/**
 * Enterprise Shared Button Component with Loading State (Addendum 6 Standard)
 */
export function Button({
    children,
    variant = "primary",
    size = "md",
    loading = false,
    disabled = false,
    icon,
    className = "",
    style,
    ...props
}: ButtonProps) {
    const isPrimary = variant === "primary";
    const isDanger = variant === "danger";
    const isSecondary = variant === "secondary";
    const isGhost = variant === "ghost";

    const bg = isPrimary
        ? "hsl(var(--primary))"
        : isDanger
            ? "#ef4444"
            : isSecondary
                ? "hsl(var(--surface-2))"
                : "transparent";

    const color = isPrimary || isDanger ? "#ffffff" : "hsl(var(--text-primary))";
    const border = isSecondary ? "1px solid hsl(var(--border))" : isGhost ? "1px solid transparent" : "none";

    const height = size === "sm" ? "32px" : size === "lg" ? "44px" : "38px";
    const padding = size === "sm" ? "0 0.75rem" : size === "lg" ? "0 1.5rem" : "0 1.1rem";
    const fontSize = size === "sm" ? "0.78rem" : size === "lg" ? "0.95rem" : "0.85rem";

    return (
        <button
            disabled={disabled || loading}
            style={{
                height,
                padding,
                fontSize,
                fontWeight: 600,
                borderRadius: "6px",
                background: bg,
                color,
                border,
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "0.4rem",
                cursor: disabled || loading ? "not-allowed" : "pointer",
                opacity: disabled || loading ? 0.6 : 1,
                transition: "all 0.15s ease",
                boxShadow: isPrimary ? "0 2px 8px hsl(var(--primary) / 0.3)" : "none",
                ...style
            }}
            className={className}
            {...props}
        >
            {loading ? <Loader2 size={size === "sm" ? 14 : 16} className="animate-spin" /> : icon}
            {children}
        </button>
    );
}
