"use client";

import React, { useState } from "react";
import { Plus, Trash2, Layers, Truck, Package, Shield, Scale, Hash, Tag, FileText } from "lucide-react";
import { Button } from "./FormControls";
import { Modal } from "./Modal";
import { toast } from "sonner";

export const CONTAINER_TYPES = [
    { code: "DRY", label: "DRY — General Purpose / Dry" },
    { code: "HC", label: "HC — High Cube" },
    { code: "RF", label: "RF — Reefer (Refrigerated)" },
    { code: "OT", label: "OT — Open Top" },
    { code: "FR", label: "FR — Flat Rack" },
    { code: "PL", label: "PL — Platform" },
    { code: "TK", label: "TK — Tank" },
    { code: "VH", label: "VH — Ventilated" },
    { code: "BU", label: "BU — Bulk" },
];

export const CARGO_TABS = [
    { id: "roro", label: "RoRo", unitType: "roro", icon: Truck },
    { id: "container", label: "Container", unitType: "container", icon: Package },
    { id: "genco", label: "Genco", unitType: "genco", icon: Scale },
    { id: "bulk_4ft", label: "Bulk 4FT", unitType: "bulk_4ft", icon: Layers },
    { id: "bulk_05ft", label: "Bulk 0.5FT", unitType: "bulk_05ft", icon: Layers },
    { id: "grouping_lcl", label: "Grouping LCL", unitType: "grouping_lcl", icon: FileText },
    { id: "bulk_01kg", label: "Bulk 0.1KG", unitType: "bulk_01kg", icon: Tag },
];

export interface CargoRow {
    id?: string;
    unitType: string;
    containerNumber?: string;
    chassisNumber?: string;
    sealNumber?: string;
    lclReferenceNumber?: string;
    size?: string;
    containerType?: string;
    grossWeightKg?: number | string;
    netWeightKg?: number | string;
    volumeCbm?: number | string;
    remarks?: string;
}

interface ContainerBulkAddFormProps {
    containers: CargoRow[];
    onChange: (containers: CargoRow[]) => void;
}

export function ContainerBulkAddForm({ containers, onChange }: ContainerBulkAddFormProps) {
    const [activeTab, setActiveTab] = useState("container");

    // Quantity inputs for quantity-based tabs
    const [roroQty, setRoroQty] = useState(1);
    const [qty10, setQty10] = useState(1);
    const [qty20, setQty20] = useState(1);
    const [qty40, setQty40] = useState(1);

    // Bulk paste modal
    const [showPasteModal, setShowPasteModal] = useState(false);
    const [pasteText, setPasteText] = useState("");

    // Add rows for RoRo
    const handleAddRoroRows = () => {
        const count = Math.max(1, parseInt(roroQty.toString()) || 1);
        const newRows: CargoRow[] = [];
        for (let i = 0; i < count; i++) {
            newRows.push({
                id: `temp-${Date.now()}-${Math.random()}`,
                unitType: "roro",
                chassisNumber: "",
                grossWeightKg: "",
                netWeightKg: "",
                volumeCbm: ""
            });
        }
        onChange([...containers, ...newRows]);
        toast.success(`Added ${count} RoRo row(s)`);
    };

    // Add rows for Container per size (10', 20', 40')
    const handleAddContainerRows = (size: "10" | "20" | "40", qty: number) => {
        const count = Math.max(1, parseInt(qty.toString()) || 1);
        const newRows: CargoRow[] = [];
        for (let i = 0; i < count; i++) {
            newRows.push({
                id: `temp-${Date.now()}-${Math.random()}`,
                unitType: "container",
                size,
                containerType: "DRY",
                containerNumber: "",
                sealNumber: "",
                grossWeightKg: "",
                netWeightKg: "",
                volumeCbm: ""
            });
        }
        onChange([...containers, ...newRows]);
        toast.success(`Added ${count} x ${size}' Container row(s)`);
    };

    // Add single row for bulk / genco / grouping_lcl tabs
    const handleAddSingleRow = (unitType: string) => {
        const newRow: CargoRow = {
            id: `temp-${Date.now()}-${Math.random()}`,
            unitType,
            lclReferenceNumber: unitType === "grouping_lcl" ? "" : undefined,
            grossWeightKg: "",
            netWeightKg: "",
            volumeCbm: ""
        };
        onChange([...containers, ...newRow ? [newRow] : []]);
        toast.success(`Added 1 ${unitType.replace('_', ' ').toUpperCase()} row`);
    };

    // Paste handler for Container and RoRo tabs
    const handleBulkPaste = () => {
        if (!pasteText.trim()) return;
        const lines = pasteText.split(/\r?\n/).map(l => l.trim()).filter(Boolean);
        if (lines.length === 0) return;

        const newRows: CargoRow[] = [];
        for (const line of lines) {
            const parts = line.split(/[\s,\t]+/).filter(Boolean);
            if (parts.length === 0) continue;

            const ident = parts[0].toUpperCase();
            if (activeTab === "roro") {
                newRows.push({
                    id: `temp-${Date.now()}-${Math.random()}`,
                    unitType: "roro",
                    chassisNumber: ident,
                    grossWeightKg: parts[1] || "",
                    netWeightKg: parts[2] || "",
                    volumeCbm: parts[3] || ""
                });
            } else if (activeTab === "container") {
                newRows.push({
                    id: `temp-${Date.now()}-${Math.random()}`,
                    unitType: "container",
                    containerNumber: ident,
                    size: parts[1] && ["10", "20", "40"].includes(parts[1]) ? parts[1] : "20",
                    containerType: "DRY",
                    sealNumber: parts[2] || "",
                    grossWeightKg: parts[3] || "",
                    netWeightKg: parts[4] || "",
                    volumeCbm: parts[5] || ""
                });
            }
        }

        if (newRows.length > 0) {
            onChange([...containers, ...newRows]);
            toast.success(`Parsed and added ${newRows.length} item(s)`);
            setPasteText("");
            setShowPasteModal(false);
        } else {
            toast.error("No valid lines found to parse");
        }
    };

    const handleUpdateRow = (index: number, field: keyof CargoRow, value: any) => {
        const updated = [...containers];
        updated[index] = { ...updated[index], [field]: value };
        onChange(updated);
    };

    const handleRemoveRow = (index: number) => {
        const updated = [...containers];
        updated.splice(index, 1);
        onChange(updated);
    };

    const handleClearAll = () => {
        onChange([]);
        toast.info("Cleared all cargo items");
    };

    // Filter rows belonging to the current active tab or show all with indicator
    const tabUnitType = CARGO_TABS.find(t => t.id === activeTab)?.unitType || "container";

    return (
        <div style={{ background: "hsl(var(--surface-2))", padding: "1.25rem", borderRadius: "10px", border: "1px solid hsl(var(--border))" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1rem", flexWrap: "wrap", gap: "0.5rem" }}>
                <div>
                    <h2 style={{ fontSize: "0.95rem", fontWeight: 700, margin: 0, color: "hsl(var(--text-primary))", display: "flex", alignItems: "center", gap: "0.4rem" }}>
                        <Layers size={16} style={{ color: "hsl(var(--primary))" }} /> Cargo Units Registration ({containers.length})
                    </h2>
                    <p style={{ fontSize: "0.78rem", color: "hsl(var(--text-muted))", margin: "0.2rem 0 0" }}>
                        Select cargo type tab to configure and add items
                    </p>
                </div>
                {containers.length > 0 && (
                    <Button type="button" variant="ghost" size="sm" onClick={handleClearAll} icon={<Trash2 size={14} />} style={{ color: "#ef4444" }}>
                        Clear All ({containers.length})
                    </Button>
                )}
            </div>

            {/* 7 Cargo-Type Tabs */}
            <div style={{ display: "flex", gap: "0.35rem", borderBottom: "1px solid hsl(var(--border))", marginBottom: "1rem", overflowX: "auto" }}>
                {CARGO_TABS.map(tab => {
                    const Icon = tab.icon;
                    const active = activeTab === tab.id;
                    const count = containers.filter(c => (c.unitType || "container").toLowerCase() === tab.unitType).length;
                    return (
                        <button
                            key={tab.id}
                            type="button"
                            onClick={() => setActiveTab(tab.id)}
                            style={{
                                padding: "0.5rem 0.85rem", fontWeight: 600, fontSize: "0.8rem", whiteSpace: "nowrap",
                                borderTop: "none", borderLeft: "none", borderRight: "none",
                                borderBottom: active ? "2.5px solid hsl(var(--primary))" : "2.5px solid transparent",
                                color: active ? "hsl(var(--primary))" : "hsl(var(--text-secondary))",
                                background: active ? "hsl(var(--primary) / 0.08)" : "transparent",
                                borderRadius: "6px 6px 0 0", cursor: "pointer", display: "flex", alignItems: "center", gap: "0.35rem"
                            }}
                        >
                            <Icon size={13} /> {tab.label}
                            {count > 0 && (
                                <span style={{ padding: "0.1rem 0.35rem", borderRadius: "10px", fontSize: "0.68rem", fontWeight: 700, background: "hsl(var(--primary))", color: "#fff" }}>
                                    {count}
                                </span>
                            )}
                        </button>
                    );
                })}
            </div>

            {/* Tab Controls */}
            <div style={{ background: "hsl(var(--surface-1))", padding: "0.85rem 1rem", borderRadius: "8px", border: "1px solid hsl(var(--border))", marginBottom: "1rem" }}>
                {/* RoRo Tab Controls */}
                {activeTab === "roro" && (
                    <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", flexWrap: "wrap" }}>
                        <div style={{ display: "flex", alignItems: "center", gap: "0.4rem" }}>
                            <label style={{ fontSize: "0.8rem", fontWeight: 600 }}>Qty RoRo Units:</label>
                            <input
                                type="number"
                                min={1}
                                value={roroQty}
                                onChange={e => setRoroQty(Math.max(1, parseInt(e.target.value) || 1))}
                                style={{ width: "70px", padding: "0.35rem 0.5rem", borderRadius: "4px", border: "1px solid hsl(var(--border))", fontSize: "0.82rem" }}
                            />
                        </div>
                        <Button type="button" size="sm" onClick={handleAddRoroRows} icon={<Plus size={14} />}>
                            Add RoRo Row(s)
                        </Button>
                        <Button type="button" variant="secondary" size="sm" onClick={() => setShowPasteModal(true)} icon={<Layers size={14} />}>
                            Paste Chassis List
                        </Button>
                    </div>
                )}

                {/* Container Tab Controls */}
                {activeTab === "container" && (
                    <div style={{ display: "flex", alignItems: "center", gap: "1rem", flexWrap: "wrap" }}>
                        <div style={{ display: "flex", alignItems: "center", gap: "0.35rem" }}>
                            <input
                                type="number"
                                min={1}
                                value={qty10}
                                onChange={e => setQty10(Math.max(1, parseInt(e.target.value) || 1))}
                                style={{ width: "55px", padding: "0.35rem 0.4rem", borderRadius: "4px", border: "2px solid hsl(var(--border))", fontSize: "0.82rem" }}
                            />
                            <Button type="button" size="sm" onClick={() => handleAddContainerRows("10", qty10)} icon={<Plus size={13} />}>
                                Add 10'
                            </Button>
                        </div>
                        <div style={{ display: "flex", alignItems: "center", gap: "0.35rem" }}>
                            <input
                                type="number"
                                min={1}
                                value={qty20}
                                onChange={e => setQty20(Math.max(1, parseInt(e.target.value) || 1))}
                                style={{ width: "55px", padding: "0.35rem 0.4rem", borderRadius: "4px", border: "2px solid hsl(var(--border))", fontSize: "0.82rem" }}
                            />
                            <Button type="button" size="sm" onClick={() => handleAddContainerRows("20", qty20)} icon={<Plus size={13} />}>
                                Add 20'
                            </Button>
                        </div>
                        <div style={{ display: "flex", alignItems: "center", gap: "0.35rem" }}>
                            <input
                                type="number"
                                min={1}
                                value={qty40}
                                onChange={e => setQty40(Math.max(1, parseInt(e.target.value) || 1))}
                                style={{ width: "55px", padding: "0.35rem 0.4rem", borderRadius: "4px", border: "2px solid hsl(var(--border))", fontSize: "0.82rem" }}
                            />
                            <Button type="button" size="sm" onClick={() => handleAddContainerRows("40", qty40)} icon={<Plus size={13} />}>
                                Add 40'
                            </Button>
                        </div>
                        <Button type="button" variant="ghost" size="sm" onClick={() => setShowPasteModal(true)} icon={<Layers size={14} />}>
                            Paste Container List
                        </Button>
                    </div>
                )}

                {/* Bulk / Genco / Grouping LCL Single Add Button */}
                {["genco", "bulk_4ft", "bulk_05ft", "grouping_lcl", "bulk_01kg"].includes(activeTab) && (
                    <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
                        <Button type="button" size="sm" onClick={() => handleAddSingleRow(tabUnitType)} icon={<Plus size={14} />}>
                            Add {activeTab.replace('_', ' ').toUpperCase()} Unit
                        </Button>
                        <span style={{ fontSize: "0.78rem", color: "hsl(var(--text-muted))" }}>
                            Click to append a new unit row
                        </span>
                    </div>
                )}
            </div>

            {/* Containers Table */}
            {containers.length === 0 ? (
                <div style={{ textAlign: "center", padding: "2rem", color: "hsl(var(--text-muted))", fontSize: "0.85rem", border: "1px dashed hsl(var(--border))", borderRadius: "8px" }}>
                    No cargo units added yet. Use the buttons above to append rows for registration.
                </div>
            ) : (
                <div style={{ overflowX: "auto" }}>
                    <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "0.82rem" }}>
                        <thead>
                            <tr style={{ borderBottom: "2px solid hsl(var(--border))", textAlign: "left", color: "hsl(var(--text-muted))", textTransform: "uppercase", fontSize: "0.7rem", letterSpacing: "0.04em" }}>
                                <th style={{ padding: "0.5rem" }}>Type</th>
                                {activeTab === "roro" && <th style={{ padding: "0.5rem" }}>Chassis Number</th>}
                                {activeTab === "container" && (
                                    <>
                                        <th style={{ padding: "0.5rem" }}>Model (Type)</th>
                                        <th style={{ padding: "0.5rem" }}>Container Number</th>
                                        <th style={{ padding: "0.5rem" }}>Seal Number</th>
                                        <th style={{ padding: "0.5rem" }}>Size</th>
                                    </>
                                )}
                                {activeTab === "grouping_lcl" && <th style={{ padding: "0.5rem" }}>N° Réf Conteneur</th>}
                                <th style={{ padding: "0.5rem" }}>Gross Weight (KG)</th>
                                <th style={{ padding: "0.5rem" }}>Net Weight (KG)</th>
                                <th style={{ padding: "0.5rem" }}>Volume (CBM)</th>
                                <th style={{ padding: "0.5rem", textAlign: "center" }}>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {containers.map((row, idx) => {
                                const rowType = (row.unitType || "container").toLowerCase();
                                return (
                                    <tr key={row.id || idx} style={{ borderBottom: "1px solid hsl(var(--border))" }}>
                                        <td style={{ padding: "0.5rem" }}>
                                            <span style={{ padding: "0.15rem 0.45rem", borderRadius: "4px", fontSize: "0.7rem", fontWeight: 700, background: "hsl(var(--primary) / 0.12)", color: "hsl(var(--primary))", textTransform: "uppercase" }}>
                                                {rowType}
                                            </span>
                                        </td>

                                        {/* RoRo Chassis */}
                                        {activeTab === "roro" && (
                                            <td style={{ padding: "0.5rem" }}>
                                                <input
                                                    type="text"
                                                    placeholder="e.g. JTMHY7AJ8N4123456"
                                                    value={row.chassisNumber || ""}
                                                    onChange={e => handleUpdateRow(idx, "chassisNumber", e.target.value.toUpperCase())}
                                                    style={{ width: "100%", padding: "0.35rem 0.5rem", borderRadius: "4px", border: "1px solid hsl(var(--border))", fontFamily: "monospace", fontSize: "0.82rem" }}
                                                />
                                            </td>
                                        )}

                                        {/* Container Fields */}
                                        {activeTab === "container" && (
                                            <>
                                                <td style={{ padding: "0.5rem" }}>
                                                    <select
                                                        value={row.containerType || "DRY"}
                                                        onChange={e => handleUpdateRow(idx, "containerType", e.target.value)}
                                                        style={{ width: "100%", padding: "0.35rem 0.4rem", borderRadius: "4px", border: "1px solid hsl(var(--border))", fontSize: "0.8rem" }}
                                                    >
                                                        {CONTAINER_TYPES.map(t => (
                                                            <option key={t.code} value={t.code}>{t.code} — {t.label.split('—')[1] || t.label}</option>
                                                        ))}
                                                    </select>
                                                </td>
                                                <td style={{ padding: "0.5rem" }}>
                                                    <input
                                                        type="text"
                                                        placeholder="e.g. MSMU3366915"
                                                        value={row.containerNumber || ""}
                                                        onChange={e => handleUpdateRow(idx, "containerNumber", e.target.value.toUpperCase())}
                                                        style={{ width: "100%", padding: "0.35rem 0.5rem", borderRadius: "4px", border: "1px solid hsl(var(--border))", fontFamily: "monospace", fontSize: "0.82rem" }}
                                                    />
                                                </td>
                                                <td style={{ padding: "0.5rem" }}>
                                                    <input
                                                        type="text"
                                                        placeholder="e.g. SL482910"
                                                        value={row.sealNumber || ""}
                                                        onChange={e => handleUpdateRow(idx, "sealNumber", e.target.value.toUpperCase())}
                                                        style={{ width: "100%", padding: "0.35rem 0.5rem", borderRadius: "4px", border: "1px solid hsl(var(--border))", fontSize: "0.82rem" }}
                                                    />
                                                </td>
                                                <td style={{ padding: "0.5rem" }}>
                                                    <select
                                                        value={row.size || "20"}
                                                        onChange={e => handleUpdateRow(idx, "size", e.target.value)}
                                                        style={{ padding: "0.35rem 0.4rem", borderRadius: "4px", border: "1px solid hsl(var(--border))", fontSize: "0.8rem" }}
                                                    >
                                                        <option value="10">10'</option>
                                                        <option value="20">20'</option>
                                                        <option value="40">40'</option>
                                                    </select>
                                                </td>
                                            </>
                                        )}

                                        {/* Grouping LCL Ref */}
                                        {activeTab === "grouping_lcl" && (
                                            <td style={{ padding: "0.5rem" }}>
                                                <input
                                                    type="text"
                                                    placeholder="e.g. LCL-2026-0417"
                                                    value={row.lclReferenceNumber || ""}
                                                    onChange={e => handleUpdateRow(idx, "lclReferenceNumber", e.target.value.toUpperCase())}
                                                    style={{ width: "100%", padding: "0.35rem 0.5rem", borderRadius: "4px", border: "1px solid hsl(var(--border))", fontSize: "0.82rem" }}
                                                />
                                            </td>
                                        )}

                                        {/* Shared Weight & Volume Fields */}
                                        <td style={{ padding: "0.5rem" }}>
                                            <input
                                                type="number"
                                                placeholder="Gross KG"
                                                value={row.grossWeightKg ?? ""}
                                                onChange={e => handleUpdateRow(idx, "grossWeightKg", e.target.value)}
                                                style={{ width: "100px", padding: "0.35rem 0.5rem", borderRadius: "4px", border: "1px solid hsl(var(--border))", fontSize: "0.82rem" }}
                                            />
                                        </td>
                                        <td style={{ padding: "0.5rem" }}>
                                            <input
                                                type="number"
                                                placeholder="Net KG"
                                                value={row.netWeightKg ?? ""}
                                                onChange={e => handleUpdateRow(idx, "netWeightKg", e.target.value)}
                                                style={{ width: "100px", padding: "0.35rem 0.5rem", borderRadius: "4px", border: "1px solid hsl(var(--border))", fontSize: "0.82rem" }}
                                            />
                                        </td>
                                        <td style={{ padding: "0.5rem" }}>
                                            <input
                                                type="number"
                                                step="0.001"
                                                placeholder="CBM"
                                                value={row.volumeCbm ?? ""}
                                                onChange={e => handleUpdateRow(idx, "volumeCbm", e.target.value)}
                                                style={{ width: "90px", padding: "0.35rem 0.5rem", borderRadius: "4px", border: "1px solid hsl(var(--border))", fontSize: "0.82rem" }}
                                            />
                                        </td>

                                        {/* Actions */}
                                        <td style={{ padding: "0.5rem", textAlign: "center" }}>
                                            <button
                                                type="button"
                                                onClick={() => handleRemoveRow(idx)}
                                                style={{ border: "none", background: "transparent", color: "#ef4444", cursor: "pointer", padding: "0.2rem" }}
                                                title="Remove unit row"
                                            >
                                                <Trash2 size={15} />
                                            </button>
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
            )}

            {/* Paste Modal */}
            <Modal open={showPasteModal} onClose={() => setShowPasteModal(false)} title={`Paste ${activeTab === "roro" ? "Chassis Numbers" : "Container Numbers"}`}>
                <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                    <p style={{ fontSize: "0.82rem", color: "hsl(var(--text-secondary))", margin: 0 }}>
                        Paste one item per line. You can optional include size/weight separated by spaces or commas.
                    </p>
                    <textarea
                        rows={8}
                        placeholder={activeTab === "roro" ? "JTMHY7AJ8N4123456\nJTMHY7AJ8N4123457" : "MSMU3366915 20 SL482910 26680 25100 28.3\nMSMU3366916 40 SL482911 30000"}
                        value={pasteText}
                        onChange={e => setPasteText(e.target.value)}
                        style={{ width: "100%", padding: "0.6rem", borderRadius: "6px", border: "1px solid hsl(var(--border))", fontFamily: "monospace", fontSize: "0.83rem" }}
                    />
                    <div style={{ display: "flex", justifyContent: "flex-end", gap: "0.5rem" }}>
                        <Button type="button" variant="ghost" onClick={() => setShowPasteModal(false)}>Cancel</Button>
                        <Button type="button" onClick={handleBulkPaste}>Parse & Add Rows</Button>
                    </div>
                </div>
            </Modal>
        </div>
    );
}
