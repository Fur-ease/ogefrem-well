"use client";

import { useEffect, useState } from "react";
import { format } from "date-fns";
import { Download, FileSpreadsheet, Loader2, Search, AlertCircle, CheckCircle2, Clock, Filter, ArrowUpRight, Plus } from "lucide-react";
import { toast } from "sonner";
import Link from "next/link";
import { apis } from "@/lib/api/apis";
import Breadcrumbs from "@/components/well/Breadcrumbs";

export default function WellCargoPage() {
    const [shipments, setShipments] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [exporting, setExporting] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");
    const [appliedSearchTerm, setAppliedSearchTerm] = useState("");
    const [statusFilter, setStatusFilter] = useState<string>("ALL");

    useEffect(() => {
        apis.well.getCargo()
            .then(data => {
                setShipments(data);
                setLoading(false);
            })
            .catch(err => {
                toast.error("Failed to load daily cargo report");
                setLoading(false);
            });
    }, []);

    const filteredShipments = shipments.filter(s => {
        const query = appliedSearchTerm.toLowerCase();
        const matchesQuery = !query || (
            s.clientName?.toLowerCase().includes(query) ||
            s.refNumber?.toLowerCase().includes(query) ||
            s.blNumber?.toLowerCase().includes(query) ||
            s.clientRef?.toLowerCase().includes(query) ||
            s.vesselName?.toLowerCase().includes(query) ||
            s.entryNumber?.toLowerCase().includes(query) ||
            s.containers?.some((c: any) => c.containerNumber.toLowerCase().includes(query))
        );

        const matchesStatus = statusFilter === "ALL" || s.status === statusFilter;

        return matchesQuery && matchesStatus;
    });

    const handleSearch = () => {
        setAppliedSearchTerm(searchTerm);
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === "Enter") {
            handleSearch();
        }
    };

    const handleExport = async () => {
        setExporting(true);
        const tId = toast.loading("Generating Daily Cargo Excel report...");
        try {
            const blob = await apis.well.exportCargo();
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement("a");
            a.href = url;
            a.download = `Well_Daily_Cargo_Report_${format(new Date(), "yyyy_MM_dd")}.xlsx`;
            document.body.appendChild(a);
            a.click();
            window.URL.revokeObjectURL(url);

            toast.success("Daily Cargo Excel report exported successfully", { id: tId });
        } catch (error) {
            toast.error("Failed to export report", { id: tId });
        } finally {
            setExporting(false);
        }
    };

    const formatDate = (date: string | null) => (date ? format(new Date(date), "dd/MM/yyyy") : "—");

    const counts = {
        total: shipments.length,
        ava: shipments.filter(s => s.status === "AVA").length,
        fup: shipments.filter(s => s.status === "FUP").length,
        furo: shipments.filter(s => s.status === "FURO").length,
    };

    return (
        <div className="animate-fade-in" style={{ paddingBottom: "3rem" }}>
            <Breadcrumbs />

            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "1.5rem" }}>
                <div>
                    <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "0.25rem" }}>
                        <h1 style={{ fontSize: "1.75rem", fontWeight: 700, color: "hsl(var(--text-primary))", margin: 0 }}>
                            Daily Cargo Status Register
                        </h1>
                        <span style={{
                            padding: "0.25rem 0.6rem",
                            borderRadius: "4px",
                            background: "hsl(var(--primary) / 0.15)",
                            color: "hsl(var(--primary))",
                            fontWeight: 700,
                            fontSize: "0.75rem",
                            border: "1px solid hsl(var(--primary) / 0.3)"
                        }}>
                            OPERATIONS CONTROL
                        </span>
                    </div>
                    <p style={{ color: "hsl(var(--text-secondary))", fontSize: "0.9rem", fontWeight: 500 }}>
                        WESTON LOGISTICS LTD &bull; Real-time tracking entries & customs clearance workflow
                    </p>
                </div>

                <div style={{ display: "flex", gap: "0.75rem", alignItems: "center" }}>
                    {/* <Link
                        href="/well/shipments/new"
                        className="btn btn-secondary"
                        style={{ gap: "0.5rem", padding: "0.6rem 1.25rem", fontWeight: 600 }}
                    >
                        <Plus size={16} /> Book New Cargo
                    </Link> */}
                    <button
                        onClick={handleExport}
                        disabled={exporting || loading}
                        className="btn btn-primary"
                        style={{ gap: "0.5rem", padding: "0.6rem 1.25rem", fontWeight: 600 }}
                    >
                        {exporting ? <Loader2 size={16} className="animate-spin" /> : <FileSpreadsheet size={16} />}
                        {exporting ? "Exporting..." : "Export Excel (Daily Cargo)"}
                    </button>
                </div>
            </div>

            {/* Quick Metrics Bar */}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "1rem", marginBottom: "1.5rem" }}>
                <div className="card" style={{ padding: "1rem 1.25rem", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <div>
                        <div style={{ fontSize: "0.75rem", fontWeight: 600, color: "hsl(var(--text-secondary))", textTransform: "uppercase" }}>Active Daily Cargo</div>
                        <div style={{ fontSize: "1.5rem", fontWeight: 700, color: "hsl(var(--text-primary))", marginTop: "0.25rem" }}>{counts.total}</div>
                    </div>
                    <Clock size={28} style={{ opacity: 0.3, color: "hsl(var(--primary))" }} />
                </div>
                <div className="card" style={{ padding: "1rem 1.25rem", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <div>
                        <div style={{ fontSize: "0.75rem", fontWeight: 600, color: "hsl(var(--text-secondary))", textTransform: "uppercase" }}>Available / Awaiting Docs (A.V.A)</div>
                        <div style={{ fontSize: "1.5rem", fontWeight: 700, color: "#3b82f6", marginTop: "0.25rem" }}>{counts.ava}</div>
                    </div>
                    <AlertCircle size={28} style={{ opacity: 0.3, color: "#3b82f6" }} />
                </div>
                <div className="card" style={{ padding: "1rem 1.25rem", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <div>
                        <div style={{ fontSize: "0.75rem", fontWeight: 600, color: "hsl(var(--text-secondary))", textTransform: "uppercase" }}>Follow Up In Progress (F.U.P)</div>
                        <div style={{ fontSize: "1.5rem", fontWeight: 700, color: "#f59e0b", marginTop: "0.25rem" }}>{counts.fup}</div>
                    </div>
                    <Clock size={28} style={{ opacity: 0.3, color: "#f59e0b" }} />
                </div>
                <div className="card" style={{ padding: "1rem 1.25rem", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <div>
                        <div style={{ fontSize: "0.75rem", fontWeight: 600, color: "hsl(var(--text-secondary))", textTransform: "uppercase" }}>Charges Paid / Released (F.U.R.O)</div>
                        <div style={{ fontSize: "1.5rem", fontWeight: 700, color: "#10b981", marginTop: "0.25rem" }}>{counts.furo}</div>
                    </div>
                    <CheckCircle2 size={28} style={{ opacity: 0.3, color: "#10b981" }} />
                </div>
            </div>

            {/* Filter & Search Bar */}
            <div className="card" style={{ padding: "1rem", marginBottom: "1.5rem" }}>
                <div style={{ display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: "1rem", alignItems: "center" }}>
                    <div style={{ display: "flex", gap: "0.5rem", alignItems: "center" }}>
                        <Filter size={16} style={{ color: "hsl(var(--text-muted))" }} />
                        <span style={{ fontSize: "0.85rem", fontWeight: 600, color: "hsl(var(--text-secondary))" }}>Filter Status:</span>
                        {["ALL", "AVA", "FUP", "FURO"].map(st => (
                            <button
                                key={st}
                                onClick={() => setStatusFilter(st)}
                                style={{
                                    padding: "0.35rem 0.75rem",
                                    borderRadius: "6px",
                                    fontSize: "0.8rem",
                                    fontWeight: 600,
                                    border: statusFilter === st ? "1px solid hsl(var(--primary))" : "1px solid hsl(var(--border))",
                                    background: statusFilter === st ? "hsl(var(--primary) / 0.15)" : "transparent",
                                    color: statusFilter === st ? "hsl(var(--primary))" : "hsl(var(--text-secondary))",
                                    cursor: "pointer"
                                }}
                            >
                                {st === "ALL" ? "All Active" : st === "AVA" ? "A.V.A (Awaiting)" : st === "FUP" ? "F.U.P (Follow-Up)" : "F.U.R.O (Released)"}
                            </button>
                        ))}
                    </div>

                    <div style={{ display: "flex", gap: "0.5rem" }}>
                        <div style={{ position: "relative" }}>
                            <Search style={{ position: "absolute", left: "0.75rem", top: "50%", transform: "translateY(-50%)", color: "hsl(var(--text-muted))" }} size={16} />
                            <input
                                type="text"
                                placeholder="Search Client, Ref, B/L, Container, Vessel, Entry #..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                onKeyDown={handleKeyDown}
                                style={{
                                    padding: "0.5rem 1rem 0.5rem 2.25rem",
                                    borderRadius: "8px",
                                    background: "hsl(var(--surface-2))",
                                    border: "1px solid hsl(var(--border))",
                                    color: "hsl(var(--text-primary))",
                                    fontSize: "0.85rem",
                                    minWidth: "320px"
                                }}
                            />
                        </div>
                        <button
                            onClick={handleSearch}
                            className="btn btn-secondary btn-sm"
                            style={{ background: "hsl(var(--primary))", color: "white", border: "none" }}
                        >
                            Search
                        </button>
                    </div>
                </div>
            </div>

            {/* High Density Table */}
            <div className="card" style={{ padding: 0, overflowX: "auto" }}>
                <div className="data-table-container">
                    <table className="data-table well-status-table" style={{ whiteSpace: "nowrap", fontSize: "0.78rem" }}>
                        <thead>
                            <tr style={{ background: "hsl(var(--surface-2))" }}>
                                <th>CLIENT NAME</th>
                                <th>REF FILE</th>
                                <th>CLIENT REF</th>
                                <th>B/L NO.</th>
                                <th>CONT SIZE</th>
                                <th>DOC RECV</th>
                                <th>VESSEL</th>
                                <th>E.T.A</th>
                                <th>LODGE CUSTOMS</th>
                                <th>ENTRY NO</th>
                                <th>ENTRY PASSED</th>
                                <th>TBL/N.TBL</th>
                                <th>S/LINE CHARGES</th>
                                <th>S/LINE PAID</th>
                                <th>D/O RECV</th>
                                <th>LAST SLING CFS</th>
                                <th>LODGED KPA</th>
                                <th>DATE VERIFIED</th>
                                <th>REMARKS</th>
                                <th>STATUS</th>
                                <th style={{ position: "sticky", right: 0, background: "hsl(var(--surface-2))", zIndex: 5 }}>ACTION</th>
                            </tr>
                        </thead>
                        <tbody>
                            {loading ? (
                                <tr>
                                    <td colSpan={21} style={{ textAlign: "center", padding: "4rem" }}>
                                        <Loader2 size={24} className="animate-spin" style={{ margin: "0 auto", color: "hsl(var(--primary))" }} />
                                        <div style={{ marginTop: "1rem", color: "hsl(var(--text-muted))" }}>Loading daily cargo operations data...</div>
                                    </td>
                                </tr>
                            ) : filteredShipments.length === 0 ? (
                                <tr>
                                    <td colSpan={21} style={{ textAlign: "center", padding: "4rem", color: "hsl(var(--text-muted))" }}>
                                        {searchTerm || statusFilter !== "ALL"
                                            ? "No matching daily cargo entries found for selected criteria."
                                            : "No active daily cargo entries found. Note: PCHARGES (Port Charges / Finance) shipments are moved to the Finance module."}
                                    </td>
                                </tr>
                            ) : (
                                filteredShipments.map((s) => (
                                    <tr key={s.id} className="hover-row">
                                        <td style={{ fontWeight: 600 }}>{s.clientName}</td>
                                        <td style={{ fontFamily: "monospace", fontWeight: 700, color: "hsl(var(--primary))" }}>
                                            <Link href={`/well/shipments/${s.id}`} style={{ color: "inherit", textDecoration: "none" }}>
                                                {s.refNumber}
                                            </Link>
                                        </td>
                                        <td>{s.clientRef || "—"}</td>
                                        <td style={{ fontFamily: "monospace", color: "hsl(var(--text-secondary))" }}>{s.blNumber}</td>
                                        <td style={{ fontWeight: 600 }}>{s.containerSize}</td>
                                        <td>{s.docRecv || "—"}</td>
                                        <td>{s.vesselName || "—"}</td>
                                        <td style={{ color: "hsl(var(--text-secondary))" }}>{formatDate(s.eta)}</td>
                                        <td style={{ color: "hsl(var(--text-secondary))" }}>{formatDate(s.lodgeCustoms)}</td>
                                        <td style={{ fontFamily: "monospace", fontWeight: 600 }}>{s.entryNumber || "—"}</td>
                                        <td style={{ color: "hsl(var(--text-secondary))" }}>{formatDate(s.entryPassed)}</td>
                                        <td>{s.tblNtbl || "—"}</td>
                                        <td style={{ color: "hsl(var(--text-secondary))" }}>{formatDate(s.slineCharges)}</td>
                                        <td style={{ color: "hsl(var(--text-secondary))" }}>{formatDate(s.slinePaid)}</td>
                                        <td style={{ color: "hsl(var(--text-secondary))" }}>{formatDate(s.ddRecv)}</td>
                                        <td>{s.lastSlingCfs || "—"}</td>
                                        <td style={{ color: "hsl(var(--text-secondary))" }}>{formatDate(s.lodgedKpa)}</td>
                                        <td style={{ color: "hsl(var(--text-secondary))" }}>{formatDate(s.dateVerified)}</td>
                                        <td style={{ fontSize: "0.78rem", maxWidth: "200px", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }} title={s.notesHistory?.[0]?.note || s.notes || "—"}>
                                            {s.notesHistory?.[0]?.note || s.notes || "—"}
                                        </td>
                                        <td>
                                            <span style={{
                                                fontWeight: 700,
                                                fontSize: "0.72rem",
                                                padding: "0.2rem 0.5rem",
                                                borderRadius: "4px",
                                                background: s.status === "FURO" ? "rgba(16, 185, 129, 0.15)" : s.status === "FUP" ? "rgba(245, 158, 11, 0.15)" : "rgba(59, 130, 246, 0.15)",
                                                color: s.status === "FURO" ? "#10b981" : s.status === "FUP" ? "#f59e0b" : "#3b82f6",
                                                border: `1px solid ${s.status === "FURO" ? "rgba(16, 185, 129, 0.3)" : s.status === "FUP" ? "rgba(245, 158, 11, 0.3)" : "rgba(59, 130, 246, 0.3)"}`
                                            }}>
                                                {s.status === "AVA" ? "A.V.A (Awaiting)" : s.status === "FUP" ? "F.U.P (Follow-Up)" : s.status === "FURO" ? "F.U.R.O (Released)" : s.status}
                                            </span>
                                        </td>
                                        <td style={{ position: "sticky", right: 0, background: "hsl(var(--surface-1))" }}>
                                            <Link href={`/well/shipments/${s.id}`} className="btn btn-ghost btn-sm" style={{ padding: "0.25rem 0.5rem", gap: "0.25rem", color: "hsl(var(--primary))" }}>
                                                Open Workspace <ArrowUpRight size={14} />
                                            </Link>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
