"use client";

import React from "react";
import { Loader2 } from "lucide-react";

export interface Column<T> {
    header: string;
    accessor: keyof T | ((row: T) => React.ReactNode);
    stickyLeft?: boolean;
    width?: string;
    align?: "left" | "center" | "right";
    mono?: boolean;
    truncate?: boolean;
}

export interface DataTableProps<T> {
    columns: Column<T>[];
    data: T[];
    loading?: boolean;
    emptyMessage?: string;
    onRowClick?: (row: T) => void;
    keyExtractor: (row: T) => string;
}

/**
 * Enterprise Shared DataTable Component (Addendum 6 Standard)
 * - Sticky first column support (e.g. for B/L Number or Ref Number)
 * - Long text truncation with tooltip preview
 * - High-density enterprise layout with theme variables
 */
export function DataTable<T>({
    columns,
    data,
    loading = false,
    emptyMessage = "No records found.",
    onRowClick,
    keyExtractor
}: DataTableProps<T>) {
    if (loading) {
        return (
            <div style={{ padding: "3rem", display: "flex", justifyContent: "center", alignItems: "center", gap: "0.75rem", color: "hsl(var(--text-muted))" }}>
                <Loader2 size={24} className="animate-spin" style={{ color: "hsl(var(--primary))" }} />
                <span style={{ fontSize: "0.88rem", fontWeight: 500 }}>Loading cargo records...</span>
            </div>
        );
    }

    return (
        <div
            style={{
                width: "100%",
                overflowX: "auto",
                border: "1px solid hsl(var(--border))",
                borderRadius: "8px",
                background: "hsl(var(--surface-1, var(--surface)))"
            }}
        >
            <table
                style={{
                    width: "100%",
                    borderCollapse: "separate",
                    borderSpacing: 0,
                    fontSize: "0.82rem",
                    textAlign: "left"
                }}
            >
                <thead>
                    <tr style={{ background: "hsl(var(--surface-2))" }}>
                        {columns.map((col, i) => {
                            const isSticky = col.stickyLeft;
                            return (
                                <th
                                    key={i}
                                    style={{
                                        padding: "0.75rem 1rem",
                                        fontSize: "0.72rem",
                                        fontWeight: 700,
                                        letterSpacing: "0.05em",
                                        textTransform: "uppercase",
                                        color: "hsl(var(--text-muted))",
                                        borderBottom: "1px solid hsl(var(--border))",
                                        textAlign: col.align || "left",
                                        width: col.width,
                                        position: isSticky ? "sticky" : "relative",
                                        left: isSticky ? 0 : undefined,
                                        zIndex: isSticky ? 2 : 1,
                                        background: "hsl(var(--surface-2))",
                                        boxShadow: isSticky ? "3px 0 6px rgba(0,0,0,0.12)" : "none"
                                    }}
                                >
                                    {col.header}
                                </th>
                            );
                        })}
                    </tr>
                </thead>
                <tbody>
                    {data.length === 0 ? (
                        <tr>
                            <td
                                colSpan={columns.length}
                                style={{
                                    textAlign: "center",
                                    padding: "3rem 1rem",
                                    color: "hsl(var(--text-muted))",
                                    fontSize: "0.88rem"
                                }}
                            >
                                {emptyMessage}
                            </td>
                        </tr>
                    ) : (
                        data.map((row) => {
                            const rowKey = keyExtractor(row);
                            return (
                                <tr
                                    key={rowKey}
                                    onClick={() => onRowClick && onRowClick(row)}
                                    style={{
                                        cursor: onRowClick ? "pointer" : "default",
                                        transition: "background-color 0.12s ease"
                                    }}
                                    className="hover:bg-surface-2/60"
                                >
                                    {columns.map((col, i) => {
                                        const isSticky = col.stickyLeft;
                                        const value = typeof col.accessor === "function" ? col.accessor(row) : (row[col.accessor] as any);
                                        return (
                                            <td
                                                key={i}
                                                title={typeof value === "string" ? value : undefined}
                                                style={{
                                                    padding: "0.75rem 1rem",
                                                    borderBottom: "1px solid hsl(var(--border) / 50%)",
                                                    fontFamily: col.mono ? "monospace" : undefined,
                                                    textAlign: col.align || "left",
                                                    position: isSticky ? "sticky" : "relative",
                                                    left: isSticky ? 0 : undefined,
                                                    zIndex: isSticky ? 1 : 0,
                                                    background: isSticky ? "hsl(var(--surface-1, var(--surface)))" : "transparent",
                                                    boxShadow: isSticky ? "3px 0 6px rgba(0,0,0,0.08)" : "none",
                                                    maxWidth: col.width || (col.truncate ? "180px" : undefined),
                                                    overflow: col.truncate ? "hidden" : undefined,
                                                    textOverflow: col.truncate ? "ellipsis" : undefined,
                                                    whiteSpace: col.truncate ? "nowrap" : undefined
                                                }}
                                            >
                                                {value ?? "—"}
                                            </td>
                                        );
                                    })}
                                </tr>
                            );
                        })
                    )}
                </tbody>
            </table>
        </div>
    );
}
