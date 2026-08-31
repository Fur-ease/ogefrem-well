"use client";

import { useEffect, useState, useRef } from "react";
import { Plus, User, Check, ChevronsUpDown, Search, X } from "lucide-react";

interface ClientSelectProps {
    label?: string;
    value: string;
    onChange: (value: string) => void;
    required?: boolean;
    placeholder?: string;
    id?: string;
}

export function ClientSelect({
    label = "Client Name",
    value,
    onChange,
    required = false,
    placeholder = "Select or type client name...",
    id
}: ClientSelectProps) {
    const [clients, setClients] = useState<string[]>([]);
    const [loading, setLoading] = useState(true);
    const [isOpen, setIsOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");
    const [isAddingNew, setIsAddingNew] = useState(false);
    const [newClientName, setNewClientName] = useState("");
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        let mounted = true;
        fetch("/api/well/clients")
            .then((res) => res.json())
            .then((data) => {
                if (mounted && Array.isArray(data)) {
                    const names = data.map((c: any) => c.clientName).filter(Boolean);
                    setClients(Array.from(new Set<string>(names)));
                }
            })
            .catch(() => { })
            .finally(() => {
                if (mounted) setLoading(false);
            });
        return () => { mounted = false; };
    }, []);

    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const filteredClients = clients.filter((c) =>
        c.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleSelect = (name: string) => {
        onChange(name);
        setIsOpen(false);
        setIsAddingNew(false);
        setSearchTerm("");
    };

    const handleSaveNewClient = () => {
        if (!newClientName.trim()) return;
        const formatted = newClientName.trim().toUpperCase();
        if (!clients.includes(formatted)) {
            setClients([formatted, ...clients]);
        }
        onChange(formatted);
        setIsAddingNew(false);
        setIsOpen(false);
        setNewClientName("");
        setSearchTerm("");
    };

    return (
        <div style={{ display: "flex", flexDirection: "column", gap: "0.4rem", position: "relative" }} ref={containerRef}>
            {label && (
                <label
                    htmlFor={id}
                    style={{ fontSize: "0.78rem", fontWeight: 600, color: "hsl(var(--text-secondary))", textTransform: "uppercase", letterSpacing: "0.04em" }}
                >
                    {label} {required && <span style={{ color: "#ef4444" }}>*</span>}
                </label>
            )}

            {!isAddingNew ? (
                <div style={{ position: "relative" }}>
                    {/* Trigger Button */}
                    <div
                        id={id}
                        role="combobox"
                        aria-expanded={isOpen}
                        onClick={() => setIsOpen(!isOpen)}
                        style={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "space-between",
                            padding: "0 0.85rem",
                            height: "40px",
                            borderRadius: "6px",
                            border: isOpen ? "1.5px solid hsl(var(--primary))" : "1px solid hsl(var(--border))",
                            background: "#f7f4f4ff",
                            color: value ? "#080808ff" : "#64748b",
                            fontSize: "0.875rem",
                            cursor: "pointer",
                            transition: "border-color 0.15s ease",
                            boxShadow: isOpen ? "0 0 0 3px rgba(59,130,246,0.15)" : "none",
                            userSelect: "none"
                        }}
                    >
                        <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", flex: 1, overflow: "hidden" }}>
                            <User size={15} style={{ color: value ? "#3b82f6" : "#64748b", flexShrink: 0 }} />
                            <span style={{ whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis", fontWeight: value ? 600 : 400 }}>
                                {value || placeholder}
                            </span>
                        </div>
                        <ChevronsUpDown size={15} style={{ color: "#64748b", flexShrink: 0 }} />
                    </div>

                    {/* Hidden input for form validation */}
                    <input
                        type="text"
                        required={required}
                        value={value}
                        onChange={() => { }}
                        tabIndex={-1}
                        style={{ opacity: 0, position: "absolute", pointerEvents: "none", width: "1px", height: "1px", bottom: 0, left: 0 }}
                        aria-hidden="true"
                    />

                    {/* Dropdown Panel — solid opaque background, high z-index */}
                    {isOpen && (
                        <div
                            style={{
                                position: "absolute",
                                top: "calc(100% + 6px)",
                                left: 0,
                                right: 0,
                                background: "#f8f9fbff",       /* Solid dark bg — no bleeding */
                                border: "1px solid #fbfbfcff",
                                borderRadius: "8px",
                                boxShadow: "0 20px 60px rgba(0,0,0,0.6), 0 4px 12px rgba(0,0,0,0.4)",
                                zIndex: 9999,               /* Above everything */
                                overflow: "hidden",
                                display: "flex",
                                flexDirection: "column",
                                minWidth: "260px"
                            }}
                        >
                            {/* Search Row */}
                            <div style={{
                                display: "flex",
                                alignItems: "center",
                                gap: "0.5rem",
                                padding: "0.6rem 0.75rem",
                                borderBottom: "1px solid #1e293b",
                                background: "#f2f3f5ff"
                            }}>
                                <Search size={14} style={{ color: "#64748b", flexShrink: 0 }} />
                                <input
                                    type="text"
                                    placeholder="Search clients..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    autoFocus
                                    style={{
                                        border: "none",
                                        background: "transparent",
                                        color: "#050505ff",
                                        fontSize: "0.82rem",
                                        outline: "none",
                                        width: "100%"
                                    }}
                                />
                                {searchTerm && (
                                    <button
                                        type="button"
                                        onClick={() => setSearchTerm("")}
                                        style={{ background: "none", border: "none", cursor: "pointer", padding: 0, color: "#64748b", display: "flex" }}
                                    >
                                        <X size={13} />
                                    </button>
                                )}
                            </div>

                            {/* Options */}
                            <div style={{ maxHeight: "220px", overflowY: "auto", padding: "0.35rem" }}>

                                {/* Add New Client Option */}
                                <div
                                    onClick={() => {
                                        setIsAddingNew(true);
                                        setNewClientName(searchTerm.toUpperCase());
                                        setIsOpen(false);
                                    }}
                                    style={{
                                        display: "flex",
                                        alignItems: "center",
                                        gap: "0.5rem",
                                        padding: "0.55rem 0.75rem",
                                        borderRadius: "5px",
                                        fontSize: "0.82rem",
                                        fontWeight: 600,
                                        color: "#3b82f6",
                                        background: "rgba(59,130,246,0.1)",
                                        cursor: "pointer",
                                        marginBottom: "0.3rem",
                                        border: "1px dashed rgba(59,130,246,0.3)"
                                    }}
                                    onMouseEnter={e => (e.currentTarget.style.background = "rgba(59,130,246,0.18)")}
                                    onMouseLeave={e => (e.currentTarget.style.background = "rgba(59,130,246,0.1)")}
                                >
                                    <Plus size={14} />
                                    Add New Client Name...
                                </div>

                                {/* Client List */}
                                {loading ? (
                                    <div style={{ padding: "1rem", fontSize: "0.8rem", color: "#64748b", textAlign: "center" }}>
                                        Loading clients...
                                    </div>
                                ) : filteredClients.length === 0 ? (
                                    <div style={{ padding: "1rem", fontSize: "0.8rem", color: "#0f0f0fff", textAlign: "center" }}>
                                        {searchTerm ? `No client matching "${searchTerm}"` : "No clients found"}
                                    </div>
                                ) : (
                                    filteredClients.map((client) => {
                                        const isSelected = client === value;
                                        return (
                                            <div
                                                key={client}
                                                onClick={() => handleSelect(client)}
                                                style={{
                                                    display: "flex",
                                                    alignItems: "center",
                                                    justifyContent: "space-between",
                                                    padding: "0.55rem 0.75rem",
                                                    borderRadius: "5px",
                                                    fontSize: "0.85rem",
                                                    fontWeight: isSelected ? 700 : 400,
                                                    color: isSelected ? "#3b82f6" : "#060606ff",
                                                    background: isSelected ? "rgba(59,130,246,0.15)" : "transparent",
                                                    cursor: "pointer",
                                                    transition: "background 0.1s"
                                                }}
                                                onMouseEnter={e => {
                                                    if (!isSelected) e.currentTarget.style.background = "#b4ccf1ff";
                                                }}
                                                onMouseLeave={e => {
                                                    if (!isSelected) e.currentTarget.style.background = "transparent";
                                                }}
                                            >
                                                <span style={{ overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                                                    {client}
                                                </span>
                                                {isSelected && <Check size={14} style={{ color: "#3b82f6", flexShrink: 0 }} />}
                                            </div>
                                        );
                                    })
                                )}
                            </div>
                        </div>
                    )}
                </div>
            ) : (
                /* Add New Client Inline Form */
                <div style={{ display: "flex", flexDirection: "column", gap: "0.4rem" }}>
                    <div style={{ display: "flex", gap: "0.5rem" }}>
                        <input
                            type="text"
                            placeholder="Enter new client name (e.g. MEGA TRADERS LTD)..."
                            value={newClientName}
                            onChange={(e) => setNewClientName(e.target.value.toUpperCase())}
                            onKeyDown={(e) => {
                                if (e.key === "Enter") { e.preventDefault(); handleSaveNewClient(); }
                                if (e.key === "Escape") setIsAddingNew(false);
                            }}
                            autoFocus
                            style={{
                                flex: 1,
                                height: "40px",
                                padding: "0 0.85rem",
                                borderRadius: "6px",
                                border: "1.5px solid #3b82f6",
                                background: "#f9fafaff",
                                color: "#080808ff",
                                fontSize: "0.88rem",
                                fontFamily: "monospace",
                                outline: "none"
                            }}
                        />
                        <button
                            type="button"
                            onClick={handleSaveNewClient}
                            style={{
                                height: "40px",
                                padding: "0 1rem",
                                borderRadius: "6px",
                                background: "#3b82f6",
                                color: "#fff",
                                border: "none",
                                fontWeight: 600,
                                fontSize: "0.82rem",
                                cursor: "pointer",
                                whiteSpace: "nowrap"
                            }}
                        >
                            Use Client
                        </button>
                        <button
                            type="button"
                            onClick={() => setIsAddingNew(false)}
                            title="Cancel"
                            style={{
                                height: "40px",
                                width: "40px",
                                borderRadius: "6px",
                                background: "#e7e9ecff",
                                color: "#090909ff",
                                border: "none",
                                cursor: "pointer",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                flexShrink: 0
                            }}
                        >
                            <X size={16} />
                        </button>
                    </div>
                    <span style={{ fontSize: "0.72rem", color: "#3b82f6" }}>
                        Press Enter or click "Use Client" · Esc to cancel
                    </span>
                </div>
            )}
        </div>
    );
}
