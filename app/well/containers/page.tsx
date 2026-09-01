"use client";

import { useEffect, useState } from "react";
import { format } from "date-fns";
import { toast } from "sonner";
import Link from "next/link";
import {
    Container, Search, FileSpreadsheet, Loader2, ArrowUpRight, RefreshCw,
    Package, X
} from "lucide-react";
import Breadcrumbs from "@/components/well/Breadcrumbs";
import { Button } from "@/components/well/FormControls";

export default function ContainersListPage() {
    const [containers, setContainers] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [totalCount, setTotalCount] = useState(0);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    // Filter states: Single unified search bar + Status & UnitType dropdowns
    const [searchQuery, setSearchQuery] = useState("");
    const [status, setStatus] = useState("ALL");
    const [unitType, setUnitType] = useState("ALL");

    const fetchContainers = async () => {
        setLoading(true);
        try {
            const params = new URLSearchParams();
            if (searchQuery.trim()) params.append("search", searchQuery.trim());
            if (status && status !== "ALL") params.append("status", status);
            if (unitType && unitType !== "ALL") params.append("unit_type", unitType);
            params.append("page", page.toString());
            params.append("per_page", "20");

            const res = await fetch(`/api/containers?${params.toString()}`);
            if (!res.ok) throw new Error("Failed to fetch containers");
            const data = await res.json();
            setContainers(data.containers || []);
            setTotalCount(data.totalCount || 0);
            setTotalPages(data.totalPages || 1);
        } catch (err: any) {
            toast.error(err.message || "Failed to load containers");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchContainers();
    }, [page, status, unitType]);

    const handleSearchSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setPage(1);
        fetchContainers();
    };

    const handleResetFilters = () => {
        setSearchQuery("");
        setStatus("ALL");
        setUnitType("ALL");
        setPage(1);
    };

    const handleExportExcel = () => {
        const params = new URLSearchParams();
        if (searchQuery.trim()) params.append("search", searchQuery.trim());
        if (status && status !== "ALL") params.append("status", status);
        if (unitType && unitType !== "ALL") params.append("unit_type", unitType);

        window.open(`/api/containers/export?${params.toString()}`, "_blank");
        toast.success("Downloading Grouped Containers Excel Report...");
    };

    const formatDate = (d: string | null) => (d ? format(new Date(d), "dd MMM yyyy") : "—");

    return (
        <div className="animate-fade-in" style={{ paddingBottom: "4rem" }}>
            <Breadcrumbs />

            {/* Page Header */}
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "1.5rem", flexWrap: "wrap", gap: "1rem" }}>
                <div>
                    <h1 style={{ fontSize: "1.75rem", fontWeight: 800, color: "hsl(var(--text-primary))", margin: 0, display: "flex", alignItems: "center", gap: "0.6rem" }}>
                        <Package size={28} style={{ color: "hsl(var(--primary))" }} /> Container Tracking Register
                    </h1>
                    <p style={{ color: "hsl(var(--text-secondary))", fontSize: "0.88rem", marginTop: "0.25rem" }}>
                        Global container search, real-time status tracking, and grouped Excel exports.
                    </p>
                </div>

                <div style={{ display: "flex", gap: "0.75rem" }}>
                    <Button onClick={handleExportExcel} variant="secondary" icon={<FileSpreadsheet size={16} style={{ color: "hsl(var(--success))" }} />}>
                        Export Grouped Report (Excel)
                    </Button>
                </div>
            </div>

            {/* Unified Search Section */}
            <div className="card" style={{ padding: "1.25rem", marginBottom: "1.5rem", background: "hsl(var(--surface))", border: "1px solid hsl(var(--border))" }}>
                <form onSubmit={handleSearchSubmit}>
                    {/* Full-width Search Bar */}
                    <div style={{ marginBottom: "1rem" }}>
                        <label style={{ fontSize: "0.78rem", fontWeight: 700, color: "hsl(var(--text-muted))", display: "block", marginBottom: "0.4rem", textTransform: "uppercase", letterSpacing: "0.04em" }}>
                            Search Containers & Shipments
                        </label>
                        <div style={{ position: "relative", width: "100%" }}>
                            <Search size={18} style={{ position: "absolute", left: "14px", top: "50%", transform: "translateY(-50%)", color: "hsl(var(--text-muted))", pointerEvents: "none" }} />
                            <input
                                type="text"
                                className="form-control"
                                value={searchQuery}
                                onChange={e => setSearchQuery(e.target.value)}
                                placeholder="Search by Client Name, Container No, B/L No, Entry No, Vessel, Assigned Truck, or Driver..."
                                style={{
                                    width: "100%",
                                    height: "46px",
                                    paddingLeft: "42px",
                                    paddingRight: searchQuery ? "40px" : "14px",
                                    fontSize: "0.95rem",
                                    borderRadius: "8px",
                                    border: "1.5px solid hsl(var(--border))",
                                    background: "hsl(var(--surface-2))",
                                    color: "hsl(var(--text-primary))",
                                    outline: "none",
                                    transition: "border-color 0.2s, box-shadow 0.2s"
                                }}
                            />
                            {searchQuery && (
                                <button
                                    type="button"
                                    onClick={() => setSearchQuery("")}
                                    style={{ position: "absolute", right: "12px", top: "50%", transform: "translateY(-50%)", background: "none", border: "none", color: "hsl(var(--text-muted))", cursor: "pointer", display: "flex", alignItems: "center" }}
                                >
                                    <X size={16} />
                                </button>
                            )}
                        </div>
                    </div>

                    {/* Filter controls row */}
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "1rem" }}>
                        <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap", flex: 1 }}>
                            <div style={{ minWidth: "180px" }}>
                                <select
                                    className="form-control"
                                    value={status}
                                    onChange={e => { setStatus(e.target.value); setPage(1); }}
                                    style={{ width: "100%", height: "38px", padding: "0 0.75rem", borderRadius: "6px", border: "1px solid hsl(var(--border))", background: "hsl(var(--surface-2))", color: "hsl(var(--text-primary))", fontSize: "0.85rem", fontWeight: 600 }}
                                >
                                    <option value="ALL">All Statuses</option>
                                    <option value="AWAITING_ARRIVAL">Awaiting Arrival</option>
                                    <option value="DISCHARGED">Discharged</option>
                                    <option value="GATED_OUT">Gated Out</option>
                                    <option value="IN_TRANSIT">In Transit</option>
                                    <option value="DELIVERED">Delivered</option>
                                </select>
                            </div>

                            <div style={{ minWidth: "180px" }}>
                                <select
                                    className="form-control"
                                    value={unitType}
                                    onChange={e => { setUnitType(e.target.value); setPage(1); }}
                                    style={{ width: "100%", height: "38px", padding: "0 0.75rem", borderRadius: "6px", border: "1px solid hsl(var(--border))", background: "hsl(var(--surface-2))", color: "hsl(var(--text-primary))", fontSize: "0.85rem", fontWeight: 600 }}
                                >
                                    <option value="ALL">All Unit Types</option>
                                    <option value="container">Container</option>
                                    <option value="roro">RoRo</option>
                                    <option value="genco">GenCo</option>
                                    <option value="bulk_4ft">Bulk 4ft</option>
                                </select>
                            </div>
                        </div>

                        <div style={{ display: "flex", gap: "0.75rem" }}>
                            <Button type="button" variant="secondary" onClick={handleResetFilters} icon={<RefreshCw size={14} />}>
                                Reset Filters
                            </Button>
                            <Button type="submit" variant="primary" icon={<Search size={14} />}>
                                Search Register
                            </Button>
                        </div>
                    </div>
                </form>
            </div>

            {/* Containers Data Table */}
            <div className="card" style={{ padding: 0, overflow: "hidden", background: "hsl(var(--surface))", border: "1px solid hsl(var(--border))" }}>
                <div style={{ padding: "1rem 1.25rem", borderBottom: "1px solid hsl(var(--border))", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <div style={{ fontSize: "0.9rem", fontWeight: 700, color: "hsl(var(--text-primary))" }}>
                        Total Containers Found: <strong style={{ color: "hsl(var(--primary))" }}>{totalCount}</strong>
                    </div>
                    <div style={{ fontSize: "0.8rem", color: "hsl(var(--text-muted))" }}>
                        Page {page} of {totalPages}
                    </div>
                </div>

                <div className="data-table-container" style={{ overflowX: "auto" }}>
                    <table className="data-table" style={{ width: "100%", borderCollapse: "collapse" }}>
                        <thead>
                            <tr style={{ background: "hsl(var(--surface-2))", borderBottom: "1px solid hsl(var(--border))" }}>
                                <th style={{ position: "sticky", left: 0, background: "hsl(var(--surface-2))", zIndex: 10, textAlign: "left", padding: "0.75rem 1rem" }}>Container / Unit ID</th>
                                <th>Client Name</th>
                                <th>Shipment Ref</th>
                                <th>B/L No</th>
                                <th>Entry No</th>
                                <th>Vessel</th>
                                <th>ETA</th>
                                <th>Status</th>
                                <th>Discharge Date</th>
                                <th>Gate Out Date</th>
                                <th>Assigned Truck</th>
                                <th>Driver Name</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {loading ? (
                                <tr>
                                    <td colSpan={13} style={{ textAlign: "center", padding: "3rem" }}>
                                        <Loader2 className="animate-spin" size={28} style={{ color: "hsl(var(--primary))", margin: "0 auto" }} />
                                        <div style={{ marginTop: "0.5rem", fontSize: "0.85rem", color: "hsl(var(--text-muted))" }}>Searching container database...</div>
                                    </td>
                                </tr>
                            ) : containers.length === 0 ? (
                                <tr>
                                    <td colSpan={13} style={{ textAlign: "center", padding: "3rem", color: "hsl(var(--text-muted))" }}>
                                        No containers found matching current search terms.
                                    </td>
                                </tr>
                            ) : (
                                containers.map(c => {
                                    const s = c.shipment || {};
                                    return (
                                        <tr key={c.id} style={{ borderBottom: "1px solid hsl(var(--border))" }}>
                                            <td style={{ position: "sticky", left: 0, background: "hsl(var(--surface))", zIndex: 5, fontWeight: 800, fontFamily: "monospace", padding: "0.75rem 1rem" }}>
                                                <Link href={`/well/containers/${c.id}`} style={{ color: "hsl(var(--primary))", textDecoration: "none", display: "inline-flex", alignItems: "center", gap: "0.4rem" }}>
                                                    <Container size={16} /> {c.containerNumber || c.chassisNumber || "UNASSIGNED"}
                                                </Link>
                                            </td>
                                            <td style={{ fontWeight: 600 }}>{s.clientName || "N/A"}</td>
                                            <td>
                                                <Link href={`/well/shipments/${s.id}`} style={{ color: "hsl(var(--text-primary))", textDecoration: "none", fontWeight: 600, fontFamily: "monospace" }}>
                                                    {s.refNumber || "N/A"}
                                                </Link>
                                            </td>
                                            <td style={{ fontFamily: "monospace", color: "hsl(var(--text-secondary))" }}>{s.blNumber || "N/A"}</td>
                                            <td style={{ fontFamily: "monospace" }}>{s.entryNumber || "N/A"}</td>
                                            <td>{s.vesselName || "N/A"}</td>
                                            <td style={{ fontSize: "0.82rem", color: "hsl(var(--text-muted))" }}>{formatDate(s.eta)}</td>
                                            <td>
                                                <span style={{
                                                    padding: "0.2rem 0.5rem", borderRadius: "12px", fontSize: "0.72rem", fontWeight: 700,
                                                    background: c.status?.includes("DELIVERED") ? "hsl(var(--success) / 0.15)" : "hsl(var(--primary) / 0.15)",
                                                    color: c.status?.includes("DELIVERED") ? "hsl(var(--success))" : "hsl(var(--primary))",
                                                    border: `1px solid ${c.status?.includes("DELIVERED") ? "hsl(var(--success) / 0.3)" : "hsl(var(--primary) / 0.3)"}`
                                                }}>
                                                    {c.status || "IN_TRANSIT"}
                                                </span>
                                            </td>
                                            <td style={{ fontSize: "0.82rem" }}>{formatDate(c.dischargeDate)}</td>
                                            <td style={{ fontSize: "0.82rem" }}>{formatDate(c.gateOutDate)}</td>
                                            <td style={{ fontWeight: 600 }}>{c.truckDetails || "—"}</td>
                                            <td>{c.driverName || "—"}</td>
                                            <td>
                                                <Link href={`/well/containers/${c.id}`} className="btn btn-ghost btn-sm" style={{ padding: "0.3rem 0.6rem" }}>
                                                    <ArrowUpRight size={15} /> View
                                                </Link>
                                            </td>
                                        </tr>
                                    );
                                })
                            )}
                        </tbody>
                    </table>
                </div>

                {/* Pagination footer */}
                <div style={{ padding: "1rem 1.25rem", borderTop: "1px solid hsl(var(--border))", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <Button
                        variant="secondary"
                        size="sm"
                        disabled={page <= 1}
                        onClick={() => setPage(prev => Math.max(1, prev - 1))}
                    >
                        Previous Page
                    </Button>
                    <span style={{ fontSize: "0.85rem", color: "hsl(var(--text-muted))" }}>
                        Showing Page <strong>{page}</strong> of <strong>{totalPages}</strong>
                    </span>
                    <Button
                        variant="secondary"
                        size="sm"
                        disabled={page >= totalPages}
                        onClick={() => setPage(prev => Math.min(totalPages, prev + 1))}
                    >
                        Next Page
                    </Button>
                </div>
            </div>
        </div>
    );
}
