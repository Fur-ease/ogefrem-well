"use client";

import { useEffect, useState } from "react";
import {
    Loader2, Search, Filter, User, Package, CheckCircle, Clock, AlertTriangle,
    ShieldAlert, ArrowUpRight, Plus, SlidersHorizontal, LayoutGrid, Table as TableIcon,
    RefreshCw, X, Layers, Ship, Calendar, FileText
} from "lucide-react";
import Link from "next/link";
import { format } from "date-fns";
import { toast } from "sonner";
import Breadcrumbs from "@/components/well/Breadcrumbs";
import { apis } from "@/lib/api/apis";
import { ClientSelect } from "@/components/well/ClientSelect";

export default function WellShipmentsListPage() {
    const [shipments, setShipments] = useState<any[]>([]);
    const [clients, setClients] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [viewMode, setViewMode] = useState<"table" | "client">("table");

    // Search & Advanced Filters
    const [searchTerm, setSearchTerm] = useState("");
    const [appliedSearch, setAppliedSearch] = useState("");
    const [presetFilter, setPresetFilter] = useState<string>("ALL");
    const [statusFilter, setStatusFilter] = useState<string>("ALL");
    const [healthFilter, setHealthFilter] = useState<string>("ALL");
    const [stageFilter, setStageFilter] = useState<string>("ALL");
    const [showAdvancedFilters, setShowAdvancedFilters] = useState(false);

    // New Shipment Modal State
    const [showNewModal, setShowNewModal] = useState(false);
    const [creating, setCreating] = useState(false);
    const [newShipment, setNewShipment] = useState({
        clientName: "",
        clientRef: "",
        blNumber: "",
        containerSize: "1X20",
        vesselName: "",
        eta: "",
        shippingLine: "Maersk",
        origin: "Mombasa Port",
        destination: "Nairobi CFS",
        notes: "",
        containers: [{ containerNumber: "", size: "20", weight: "" }]
    });

    const fetchData = async () => {
        setLoading(true);
        try {
            const [shipmentsData, clientsData] = await Promise.all([
                apis.well.getShipments({
                    q: appliedSearch || undefined,
                    status: statusFilter !== "ALL" ? statusFilter : undefined,
                    health: healthFilter !== "ALL" ? healthFilter : undefined,
                    stage: stageFilter !== "ALL" ? stageFilter : undefined,
                }),
                apis.well.getClients(appliedSearch || undefined)
            ]);
            setShipments(shipmentsData);
            setClients(clientsData);
        } catch (error) {
            toast.error("Failed to load shipments");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, [appliedSearch, statusFilter, healthFilter, stageFilter]);

    const handleSearch = () => {
        setAppliedSearch(searchTerm);
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === "Enter") handleSearch();
    };

    // Apply Quick Filter Presets
    const applyPreset = (preset: string) => {
        setPresetFilter(preset);
        if (preset === "ALL") {
            setStatusFilter("ALL");
            setHealthFilter("ALL");
            setStageFilter("ALL");
        } else if (preset === "ARRIVING") {
            setHealthFilter("ALL");
            setStatusFilter("ALL");
            setStageFilter("VESSEL_ARRIVED");
        } else if (preset === "CUSTOMS_PENDING") {
            setStageFilter("CUSTOMS");
            setHealthFilter("ALL");
            setStatusFilter("ALL");
        } else if (preset === "DO_PENDING") {
            setStageFilter("D/O");
            setHealthFilter("ALL");
            setStatusFilter("ALL");
        } else if (preset === "CFS_PENDING") {
            setStageFilter("CFS");
            setHealthFilter("ALL");
            setStatusFilter("ALL");
        } else if (preset === "DELAYED") {
            setHealthFilter("DELAYED");
            setStatusFilter("ALL");
            setStageFilter("ALL");
        } else if (preset === "EXCEPTIONS") {
            setHealthFilter("ATTENTION");
            setStatusFilter("ALL");
            setStageFilter("ALL");
        } else if (preset === "BLOCKED") {
            setHealthFilter("BLOCKED");
            setStatusFilter("ALL");
            setStageFilter("ALL");
        }
    };

    // Create New Shipment
    const handleCreateShipment = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!newShipment.clientName || !newShipment.blNumber) {
            toast.error("Client Name and B/L Number are required");
            return;
        }
        setCreating(true);
        try {
            await apis.well.createShipment(newShipment);
            toast.success("New shipment created successfully");
            setShowNewModal(false);
            fetchData();
        } catch (error: any) {
            toast.error(error.message || "Failed to create shipment");
        } finally {
            setCreating(false);
        }
    };

    const formatDate = (dateStr: string | null) => (dateStr ? format(new Date(dateStr), "dd MMM yyyy") : "—");

    // Metrics
    const metrics = {
        total: shipments.length,
        onTrack: shipments.filter(s => s.health === "ON_TRACK" || !s.health).length,
        attention: shipments.filter(s => s.health === "ATTENTION").length,
        delayed: shipments.filter(s => s.health === "DELAYED").length,
        blocked: shipments.filter(s => s.health === "BLOCKED" || s.exceptions?.length > 0).length,
    };

    const renderHealthBadge = (shipment: any) => {
        const health = shipment.health || "ON_TRACK";
        if (health === "BLOCKED") {
            return (
                <div style={{ display: "flex", alignItems: "center", gap: "0.4rem" }}>
                    <span style={{
                        padding: "0.2rem 0.5rem", borderRadius: "4px", fontSize: "0.72rem", fontWeight: 700,
                        background: "rgba(239, 68, 68, 0.15)", color: "#ef4444", border: "1px solid rgba(239, 68, 68, 0.3)",
                        display: "flex", alignItems: "center", gap: "0.3rem"
                    }}>
                        <ShieldAlert size={12} /> BLOCKED
                    </span>
                </div>
            );
        }
        if (health === "DELAYED") {
            return (
                <div style={{ display: "flex", alignItems: "center", gap: "0.4rem" }}>
                    <span style={{
                        padding: "0.2rem 0.5rem", borderRadius: "4px", fontSize: "0.72rem", fontWeight: 700,
                        background: "rgba(245, 158, 11, 0.15)", color: "#f59e0b", border: "1px solid rgba(245, 158, 11, 0.3)",
                        display: "flex", alignItems: "center", gap: "0.3rem"
                    }}>
                        <Clock size={12} /> DELAYED
                    </span>
                </div>
            );
        }
        if (health === "ATTENTION") {
            return (
                <div style={{ display: "flex", alignItems: "center", gap: "0.4rem" }}>
                    <span style={{
                        padding: "0.2rem 0.5rem", borderRadius: "4px", fontSize: "0.72rem", fontWeight: 700,
                        background: "rgba(249, 115, 22, 0.15)", color: "#f97316", border: "1px solid rgba(249, 115, 22, 0.3)",
                        display: "flex", alignItems: "center", gap: "0.3rem"
                    }}>
                        <AlertTriangle size={12} /> ATTENTION
                    </span>
                </div>
            );
        }
        return (
            <span style={{
                padding: "0.2rem 0.5rem", borderRadius: "4px", fontSize: "0.72rem", fontWeight: 700,
                background: "rgba(16, 185, 129, 0.15)", color: "#10b981", border: "1px solid rgba(16, 185, 129, 0.3)",
                display: "flex", alignItems: "center", gap: "0.3rem"
            }}>
                <CheckCircle size={12} /> ON TRACK
            </span>
        );
    };

    return (
        <div className="animate-fade-in" style={{ paddingBottom: "4rem" }}>
            <Breadcrumbs />

            {/* Top Operational Header */}
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "1.5rem" }}>
                <div>
                    <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "0.25rem" }}>
                        <h1 style={{ fontSize: "1.75rem", fontWeight: 700, color: "hsl(var(--text-primary))", margin: 0 }}>
                            Shipments Tracking Workspace
                        </h1>
                        <span style={{
                            padding: "0.25rem 0.6rem", borderRadius: "4px",
                            background: "hsl(var(--primary) / 0.15)", color: "hsl(var(--primary))",
                            fontWeight: 700, fontSize: "0.75rem", border: "1px solid hsl(var(--primary) / 0.3)"
                        }}>
                            CARGO OS HUB
                        </span>
                    </div>
                    <p style={{ color: "hsl(var(--text-secondary))", fontSize: "0.9rem" }}>
                        Comprehensive freight forwarding shipment register, health monitoring & journey tracking
                    </p>
                </div>

                <div style={{ display: "flex", gap: "0.75rem" }}>
                    <div style={{ background: "hsl(var(--surface-2))", padding: "0.25rem", borderRadius: "8px", display: "flex", gap: "0.25rem", border: "1px solid hsl(var(--border))" }}>
                        <button
                            onClick={() => setViewMode("table")}
                            style={{
                                padding: "0.4rem 0.75rem", borderRadius: "6px", fontSize: "0.8rem", fontWeight: 600,
                                background: viewMode === "table" ? "hsl(var(--primary))" : "transparent",
                                color: viewMode === "table" ? "#fff" : "hsl(var(--text-secondary))", border: "none", cursor: "pointer",
                                display: "flex", alignItems: "center", gap: "0.35rem"
                            }}
                        >
                            <TableIcon size={14} /> Data Grid
                        </button>
                        <button
                            onClick={() => setViewMode("client")}
                            style={{
                                padding: "0.4rem 0.75rem", borderRadius: "6px", fontSize: "0.8rem", fontWeight: 600,
                                background: viewMode === "client" ? "hsl(var(--primary))" : "transparent",
                                color: viewMode === "client" ? "#fff" : "hsl(var(--text-secondary))", border: "none", cursor: "pointer",
                                display: "flex", alignItems: "center", gap: "0.35rem"
                            }}
                        >
                            <LayoutGrid size={14} /> Client Summary
                        </button>
                    </div>

                    {/* <button
                        onClick={() => setShowNewModal(true)}
                        className="btn btn-primary"
                        style={{ gap: "0.5rem", padding: "0.6rem 1.25rem", fontWeight: 600 }}
                    >
                        <Plus size={16} /> New Shipment
                    </button> */}
                    <Link href="/well/shipments/new" className="btn btn-primary btn-lg" style={{ gap: "0.5rem" }}>
                        <Plus size={18} /> New Shipment
                    </Link>
                </div>
            </div>

            {/* Operational Summary Metrics Cards */}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "1rem", marginBottom: "1.5rem" }}>
                <div className="card" style={{ padding: "1.25rem", borderLeft: "4px solid hsl(var(--primary))" }}>
                    <div style={{ fontSize: "0.75rem", fontWeight: 700, color: "hsl(var(--text-secondary))", textTransform: "uppercase" }}>Total Registered</div>
                    <div style={{ fontSize: "1.75rem", fontWeight: 700, color: "hsl(var(--text-primary))", marginTop: "0.25rem" }}>{metrics.total}</div>
                    <div style={{ fontSize: "0.75rem", color: "hsl(var(--text-muted))", marginTop: "0.25rem" }}>Active operational files</div>
                </div>
                <div className="card" style={{ padding: "1.25rem", borderLeft: "4px solid #10b981" }}>
                    <div style={{ fontSize: "0.75rem", fontWeight: 700, color: "hsl(var(--text-secondary))", textTransform: "uppercase" }}>On Track</div>
                    <div style={{ fontSize: "1.75rem", fontWeight: 700, color: "#10b981", marginTop: "0.25rem" }}>{metrics.onTrack}</div>
                    <div style={{ fontSize: "0.75rem", color: "hsl(var(--text-muted))", marginTop: "0.25rem" }}>Normal progress</div>
                </div>
                <div className="card" style={{ padding: "1.25rem", borderLeft: "4px solid #f97316" }}>
                    <div style={{ fontSize: "0.75rem", fontWeight: 700, color: "hsl(var(--text-secondary))", textTransform: "uppercase" }}>Requires Attention</div>
                    <div style={{ fontSize: "1.75rem", fontWeight: 700, color: "#f97316", marginTop: "0.25rem" }}>{metrics.attention}</div>
                    <div style={{ fontSize: "0.75rem", color: "hsl(var(--text-muted))", marginTop: "0.25rem" }}>Action pending</div>
                </div>
                <div className="card" style={{ padding: "1.25rem", borderLeft: "4px solid #f59e0b" }}>
                    <div style={{ fontSize: "0.75rem", fontWeight: 700, color: "hsl(var(--text-secondary))", textTransform: "uppercase" }}>Delayed Schedule</div>
                    <div style={{ fontSize: "1.75rem", fontWeight: 700, color: "#f59e0b", marginTop: "0.25rem" }}>{metrics.delayed}</div>
                    <div style={{ fontSize: "0.75rem", color: "hsl(var(--text-muted))", marginTop: "0.25rem" }}>ETA or milestone passed</div>
                </div>
                <div className="card" style={{ padding: "1.25rem", borderLeft: "4px solid #ef4444" }}>
                    <div style={{ fontSize: "0.75rem", fontWeight: 700, color: "hsl(var(--text-secondary))", textTransform: "uppercase" }}>Blocked / Exceptions</div>
                    <div style={{ fontSize: "1.75rem", fontWeight: 700, color: "#ef4444", marginTop: "0.25rem" }}>{metrics.blocked}</div>
                    <div style={{ fontSize: "0.75rem", color: "hsl(var(--text-muted))", marginTop: "0.25rem" }}>Critical holds / issues</div>
                </div>
            </div>

            {/* Fast Presets Tabs */}
            <div style={{ display: "flex", gap: "0.5rem", overflowX: "auto", paddingBottom: "0.5rem", marginBottom: "1rem" }}>
                {[
                    { id: "ALL", label: "All Shipments" },
                    { id: "ARRIVING", label: "Arriving Soon" },
                    { id: "CUSTOMS_PENDING", label: "Customs Pending" },
                    { id: "DO_PENDING", label: "D/O Pending" },
                    { id: "CFS_PENDING", label: "CFS Allocation" },
                    { id: "DELAYED", label: "Delayed Shipments" },
                    { id: "EXCEPTIONS", label: "Attention Needed" },
                    { id: "BLOCKED", label: "Blocked Holds" }
                ].map(tab => (
                    <button
                        key={tab.id}
                        onClick={() => applyPreset(tab.id)}
                        style={{
                            padding: "0.4rem 0.85rem",
                            borderRadius: "6px",
                            fontSize: "0.8rem",
                            fontWeight: 600,
                            whiteSpace: "nowrap",
                            background: presetFilter === tab.id ? "hsl(var(--primary))" : "hsl(var(--surface-2))",
                            color: presetFilter === tab.id ? "#fff" : "hsl(var(--text-secondary))",
                            border: "1px solid hsl(var(--border))",
                            cursor: "pointer"
                        }}
                    >
                        {tab.label}
                    </button>
                ))}
            </div>

            {/* Universal Search & Advanced Filter Controls */}
            <div className="card" style={{ padding: "1rem", marginBottom: "1.5rem" }}>
                <div style={{ display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: "1rem", alignItems: "center" }}>
                    <div style={{ display: "flex", gap: "0.5rem", flex: 1, minWidth: "300px" }}>
                        <div style={{ position: "relative", flex: 1 }}>
                            <Search style={{ position: "absolute", left: "0.75rem", top: "50%", transform: "translateY(-50%)", color: "hsl(var(--text-muted))" }} size={16} />
                            <input
                                type="text"
                                placeholder="Search by Shipment #, Client, B/L, Container, Vessel, Entry #, Shipper, Consignee..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                onKeyDown={handleKeyDown}
                                style={{
                                    width: "100%",
                                    padding: "0.55rem 1rem 0.55rem 2.25rem",
                                    borderRadius: "8px",
                                    background: "hsl(var(--surface-2))",
                                    border: "1px solid hsl(var(--border))",
                                    color: "hsl(var(--text-primary))",
                                    fontSize: "0.85rem"
                                }}
                            />
                        </div>
                        <button onClick={handleSearch} className="btn btn-secondary" style={{ background: "hsl(var(--primary))", color: "white", border: "none" }}>
                            Search
                        </button>
                        <button
                            onClick={() => setShowAdvancedFilters(!showAdvancedFilters)}
                            className="btn btn-ghost"
                            style={{ gap: "0.35rem", border: "1px solid hsl(var(--border))" }}
                        >
                            <SlidersHorizontal size={16} /> Filters {showAdvancedFilters ? "▲" : "▼"}
                        </button>
                    </div>
                </div>

                {showAdvancedFilters && (
                    <div style={{
                        marginTop: "1rem", paddingTop: "1rem", borderTop: "1px solid hsl(var(--border))",
                        display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "1rem"
                    }}>
                        <div>
                            <label style={{ fontSize: "0.75rem", fontWeight: 700, color: "hsl(var(--text-secondary))", display: "block", marginBottom: "0.25rem" }}>Operational Status</label>
                            <select
                                value={statusFilter}
                                onChange={(e) => setStatusFilter(e.target.value)}
                                style={{ width: "100%", padding: "0.45rem", borderRadius: "6px", background: "hsl(var(--surface-2))", color: "#fff", border: "1px solid hsl(var(--border))" }}
                            >
                                <option value="ALL">All Statuses</option>
                                <option value="AVA">A.V.A — Awaiting Documents</option>
                                <option value="FUP">F.U.P — Follow Up In Progress</option>
                                <option value="FURO">F.U.R.O — Released / Paid</option>
                                <option value="PCHARGES">P.CHARGES — Moved to Finance</option>
                            </select>
                        </div>
                        <div>
                            <label style={{ fontSize: "0.75rem", fontWeight: 700, color: "hsl(var(--text-secondary))", display: "block", marginBottom: "0.25rem" }}>Shipment Health</label>
                            <select
                                value={healthFilter}
                                onChange={(e) => setHealthFilter(e.target.value)}
                                style={{ width: "100%", padding: "0.45rem", borderRadius: "6px", background: "hsl(var(--surface-2))", color: "#fff", border: "1px solid hsl(var(--border))" }}
                            >
                                <option value="ALL">All Health States</option>
                                <option value="ON_TRACK">ON TRACK — Normal</option>
                                <option value="ATTENTION">ATTENTION — Needs Operator</option>
                                <option value="DELAYED">DELAYED — Milestone Passed</option>
                                <option value="BLOCKED">BLOCKED — Critical Issue</option>
                            </select>
                        </div>
                        <div>
                            <label style={{ fontSize: "0.75rem", fontWeight: 700, color: "hsl(var(--text-secondary))", display: "block", marginBottom: "0.25rem" }}>Active Journey Stage</label>
                            <select
                                value={stageFilter}
                                onChange={(e) => setStageFilter(e.target.value)}
                                style={{ width: "100%", padding: "0.45rem", borderRadius: "6px", background: "hsl(var(--surface-2))", color: "#fff", border: "1px solid hsl(var(--border))" }}
                            >
                                <option value="ALL">All Stages</option>
                                <option value="BOOKED">Booked</option>
                                <option value="VESSEL_ARRIVED">Vessel Arrived</option>
                                <option value="CUSTOMS">Customs Clearance</option>
                                <option value="KPA">KPA Verification</option>
                                <option value="D/O">Delivery Order (D/O)</option>
                                <option value="CFS">CFS Station</option>
                                <option value="DELIVERY">In Delivery</option>
                                <option value="COMPLETED">Completed</option>
                            </select>
                        </div>
                    </div>
                )}
            </div>

            {/* View Mode Switch — Grid Table vs Client Cards */}
            {viewMode === "table" ? (
                <div className="card" style={{ padding: 0, overflowX: "auto" }}>
                    <div className="data-table-container">
                        <table className="data-table" style={{ whiteSpace: "nowrap", fontSize: "0.8rem" }}>
                            <thead>
                                <tr style={{ background: "hsl(var(--surface-2))" }}>
                                    <th>SHIPMENT ID</th>
                                    <th>CLIENT & REF</th>
                                    <th>B/L NUMBER</th>
                                    <th>ROUTING</th>
                                    <th>VESSEL / VOYAGE</th>
                                    <th>ETA</th>
                                    <th>CONTAINERS</th>
                                    <th>HEALTH</th>
                                    <th>STAGE</th>
                                    <th>STATUS</th>
                                    <th style={{ position: "sticky", right: 0, background: "hsl(var(--surface-2))", zIndex: 5 }}>ACTION</th>
                                </tr>
                            </thead>
                            <tbody>
                                {loading ? (
                                    <tr>
                                        <td colSpan={11} style={{ textAlign: "center", padding: "4rem" }}>
                                            <Loader2 size={28} className="animate-spin" style={{ margin: "0 auto", color: "hsl(var(--primary))" }} />
                                            <div style={{ marginTop: "1rem", color: "hsl(var(--text-muted))" }}>Loading high-density shipment grid...</div>
                                        </td>
                                    </tr>
                                ) : shipments.length === 0 ? (
                                    <tr>
                                        <td colSpan={11} style={{ textAlign: "center", padding: "4rem", color: "hsl(var(--text-muted))" }}>
                                            No shipments match your current search or filter criteria.
                                        </td>
                                    </tr>
                                ) : (
                                    shipments.map((s) => (
                                        <tr key={s.id} className="hover-row">
                                            <td style={{ fontFamily: "monospace", fontWeight: 700, color: "hsl(var(--primary))" }}>
                                                <Link href={`/well/shipments/${s.id}`} style={{ color: "inherit", textDecoration: "none" }}>
                                                    {s.refNumber}
                                                </Link>
                                            </td>
                                            <td>
                                                <div style={{ fontWeight: 600 }}>{s.clientName}</div>
                                                <div style={{ fontSize: "0.72rem", color: "hsl(var(--text-muted))" }}>{s.clientRef || "No Client Ref"}</div>
                                            </td>
                                            <td style={{ fontFamily: "monospace", fontWeight: 600 }}>{s.blNumber}</td>
                                            <td style={{ fontSize: "0.75rem" }}>
                                                <span style={{ color: "hsl(var(--text-muted))" }}>{s.origin || "Mombasa"}</span> &rarr;{" "}
                                                <span style={{ fontWeight: 600 }}>{s.destination || "Nairobi"}</span>
                                            </td>
                                            <td>
                                                <div style={{ fontWeight: 600 }}>{s.vesselName || "—"}</div>
                                                <div style={{ fontSize: "0.72rem", color: "hsl(var(--text-muted))" }}>{s.shippingLine || "Marine Line"}</div>
                                            </td>
                                            <td style={{ color: "hsl(var(--text-secondary))" }}>{formatDate(s.eta)}</td>
                                            <td>
                                                <div style={{ fontWeight: 700 }}>{s.containers?.length || 0} Units</div>
                                                <div style={{ fontSize: "0.72rem", color: "hsl(var(--text-muted))" }}>{s.containerSize}</div>
                                            </td>
                                            <td>{renderHealthBadge(s)}</td>
                                            <td>
                                                <span style={{
                                                    fontSize: "0.75rem", fontWeight: 600, padding: "0.2rem 0.5rem", borderRadius: "4px",
                                                    background: "hsl(var(--surface-3))", border: "1px solid hsl(var(--border))"
                                                }}>
                                                    {s.currentStage || "VESSEL_ARRIVED"}
                                                </span>
                                            </td>
                                            <td>
                                                <span className={`status-badge status-well status-${s.status.toLowerCase()}`}>
                                                    {s.status}
                                                </span>
                                            </td>
                                            <td style={{ position: "sticky", right: 0, background: "hsl(var(--surface-1))" }}>
                                                <Link href={`/well/shipments/${s.id}`} className="btn btn-primary btn-sm" style={{ padding: "0.25rem 0.6rem", fontSize: "0.75rem", gap: "0.25rem" }}>
                                                    Workspace <ArrowUpRight size={14} />
                                                </Link>
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            ) : (
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))", gap: "1.25rem" }}>
                    {clients.map((c) => (
                        <div key={c.clientName} className="card" style={{ padding: "1.25rem", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
                            <div>
                                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "0.75rem" }}>
                                    <div style={{ fontWeight: 700, fontSize: "1.1rem", color: "hsl(var(--text-primary))", display: "flex", alignItems: "center", gap: "0.5rem" }}>
                                        <User size={18} style={{ color: "hsl(var(--primary))" }} />
                                        {c.clientName}
                                    </div>
                                    <span style={{ fontSize: "0.75rem", padding: "0.2rem 0.5rem", borderRadius: "12px", background: "hsl(var(--primary) / 0.15)", color: "hsl(var(--primary))", fontWeight: 700 }}>
                                        {c.total} Shipments
                                    </span>
                                </div>
                                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.75rem", marginTop: "1rem", background: "hsl(var(--surface-2))", padding: "0.75rem", borderRadius: "8px" }}>
                                    <div>
                                        <div style={{ fontSize: "0.7rem", color: "hsl(var(--text-muted))" }}>Completed</div>
                                        <div style={{ fontSize: "1.1rem", fontWeight: 700, color: "#10b981" }}>{c.completed}</div>
                                    </div>
                                    <div>
                                        <div style={{ fontSize: "0.7rem", color: "hsl(var(--text-muted))" }}>Ongoing</div>
                                        <div style={{ fontSize: "1.1rem", fontWeight: 700, color: "#f59e0b" }}>{c.ongoing}</div>
                                    </div>
                                </div>
                            </div>

                            <div style={{ marginTop: "1.25rem", paddingTop: "0.75rem", borderTop: "1px solid hsl(var(--border))", display: "flex", justifyContent: "flex-end" }}>
                                <Link href={`/well/shipments/client/${encodeURIComponent(c.clientName)}`} className="btn btn-ghost btn-sm" style={{ gap: "0.35rem", color: "hsl(var(--primary))" }}>
                                    View Client Cargo <ArrowUpRight size={14} />
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {/* Create New Shipment Modal */}
            {showNewModal && (
                <div style={{
                    position: "fixed", top: 0, left: 0, width: "100%", height: "100%",
                    background: "rgba(0,0,0,0.85)", zIndex: 1100, display: "flex", alignItems: "center", justifyContent: "center", padding: "1.5rem"
                }}>
                    <div className="card" style={{ width: "100%", maxWidth: "700px", padding: "2rem", maxHeight: "90vh", overflowY: "auto" }}>
                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.5rem", borderBottom: "1px solid hsl(var(--border))", paddingBottom: "0.75rem" }}>
                            <h2 style={{ fontSize: "1.3rem", fontWeight: 700, color: "hsl(var(--primary))" }}>Book New Cargo Shipment</h2>
                            <button onClick={() => setShowNewModal(false)} className="btn btn-ghost" style={{ padding: "0.5rem" }}><X size={20} /></button>
                        </div>

                        <form onSubmit={handleCreateShipment} style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
                            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
                                <div>
                                    <ClientSelect
                                        label="Client Name *"
                                        required
                                        value={newShipment.clientName}
                                        onChange={val => setNewShipment({ ...newShipment, clientName: val })}
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Client Ref / File #</label>
                                    <input
                                        placeholder="e.g. 25S600032 189"
                                        value={newShipment.clientRef}
                                        onChange={e => setNewShipment({ ...newShipment, clientRef: e.target.value })}
                                        style={{ background: "white", color: "black" }}
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Bill of Lading (B/L) *</label>
                                    <input
                                        required
                                        placeholder="e.g. MEDU1029384"
                                        value={newShipment.blNumber}
                                        onChange={e => setNewShipment({ ...newShipment, blNumber: e.target.value.toUpperCase() })}
                                        style={{ background: "white", color: "black", fontFamily: "monospace" }}
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Container Size / Description</label>
                                    <input
                                        placeholder="e.g. 1X20, 2X40"
                                        value={newShipment.containerSize}
                                        onChange={e => setNewShipment({ ...newShipment, containerSize: e.target.value })}
                                        style={{ background: "white", color: "black" }}
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Vessel Name</label>
                                    <input
                                        placeholder="e.g. MSC ALIX"
                                        value={newShipment.vesselName}
                                        onChange={e => setNewShipment({ ...newShipment, vesselName: e.target.value })}
                                        style={{ background: "white", color: "black" }}
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Expected E.T.A</label>
                                    <input
                                        type="date"
                                        value={newShipment.eta}
                                        onChange={e => setNewShipment({ ...newShipment, eta: e.target.value })}
                                        style={{ background: "white", color: "black" }}
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Shipping Line</label>
                                    <input
                                        placeholder="e.g. MAERSK / MSC / CMA CGM"
                                        value={newShipment.shippingLine}
                                        onChange={e => setNewShipment({ ...newShipment, shippingLine: e.target.value })}
                                        style={{ background: "white", color: "black" }}
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Origin Port</label>
                                    <input
                                        value={newShipment.origin}
                                        onChange={e => setNewShipment({ ...newShipment, origin: e.target.value })}
                                        style={{ background: "white", color: "black" }}
                                    />
                                </div>
                            </div>

                            <div className="form-group">
                                <label>Operational Notes</label>
                                <textarea
                                    placeholder="Add initial notes or instructions..."
                                    value={newShipment.notes}
                                    onChange={e => setNewShipment({ ...newShipment, notes: e.target.value })}
                                    style={{ background: "white", color: "black", minHeight: "70px" }}
                                />
                            </div>

                            <div style={{ display: "flex", justifyContent: "flex-end", gap: "1rem", marginTop: "1rem" }}>
                                <button type="button" onClick={() => setShowNewModal(false)} className="btn btn-ghost">Cancel</button>
                                <button type="submit" disabled={creating} className="btn btn-primary" style={{ minWidth: "140px" }}>
                                    {creating ? <Loader2 size={16} className="animate-spin" /> : "Save & Book Cargo"}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}
