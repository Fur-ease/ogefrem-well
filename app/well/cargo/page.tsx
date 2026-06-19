"use client";

import { useEffect, useState } from "react";
import { format } from "date-fns";
import { Download, FileSpreadsheet, Loader2, Search } from "lucide-react";
import { toast } from "sonner";
import Link from "next/link";
import { StatusBadge } from "@/components/StatusBadge";
import Breadcrumbs from "@/components/well/Breadcrumbs";

export default function WellCargoPage() {
    const [shipments, setShipments] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [exporting, setExporting] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");
    const [appliedSearchTerm, setAppliedSearchTerm] = useState("");

    useEffect(() => {
        fetch("/api/well/cargo")
            .then(res => res.json())
            .then(data => {
                setShipments(data);
                setLoading(false);
            })
            .catch(err => {
                toast.error("Failed to load cargo report");
                setLoading(false);
            });
    }, []);

    const filteredShipments = shipments.filter(s => {
        const query = appliedSearchTerm.toLowerCase();
        if (!query) return true;
        return (
            s.clientName.toLowerCase().includes(query) ||
            s.refNumber.toLowerCase().includes(query) ||
            s.blNumber.toLowerCase().includes(query) ||
            s.containers?.some((c: any) => c.containerNumber.toLowerCase().includes(query))
        );
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
        const tId = toast.loading("Generating Excel report...");
        try {
            const res = await fetch("/api/well/cargo/export");
            if (!res.ok) throw new Error("Export failed");

            const blob = await res.blob();
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement("a");
            a.href = url;
            a.download = `Well_Cargo_Report_${format(new Date(), "yyyy_MM_dd")}.xlsx`;
            document.body.appendChild(a);
            a.click();
            window.URL.revokeObjectURL(url);

            toast.success("Excel report downloaded successfully", { id: tId });
        } catch (error) {
            toast.error("Failed to export report", { id: tId });
        } finally {
            setExporting(false);
        }
    };

    const formatDate = (date: string | null) => (date ? format(new Date(date), "dd/MM/yyyy") : "—");

    return (
        <div className="animate-fade-in" style={{ paddingBottom: "2rem" }}>
            <Breadcrumbs />

            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: "1.5rem" }}>
                <div>
                    <h1 style={{ fontSize: "1.75rem", fontWeight: 700, marginBottom: "0.25rem", color: "hsl(var(--text-primary))" }}>
                        Daily Cargo Status
                    </h1>
                    <p style={{ color: "hsl(var(--text-secondary))", fontSize: "0.9rem", fontWeight: 600 }}>
                        WESTON LOGISTICS LTD - Real-time tracking entries
                    </p>
                </div>

                <div style={{ display: "flex", gap: "1rem" }}>
                    <div style={{ display: "flex", gap: "0.5rem" }}>
                        <div style={{ position: "relative" }}>
                            <Search style={{ position: "absolute", left: "0.75rem", top: "50%", transform: "translateY(-50%)", color: "hsl(var(--text-muted))" }} size={16} />
                            <input
                                type="text"
                                placeholder="Search client, ref or B/L..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                onKeyDown={handleKeyDown}
                                style={{
                                    padding: "0.5rem 1rem 0.5rem 2.25rem",
                                    borderRadius: "8px",
                                    background: "white",
                                    border: "1px solid hsl(var(--border))",
                                    color: "black",
                                    fontSize: "0.85rem",
                                    minWidth: "250px"
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
                    <button
                        onClick={handleExport}
                        disabled={exporting || loading}
                        className="btn btn-primary btn-sm"
                        style={{ gap: "0.5rem" }}
                    >
                        {exporting ? <Loader2 size={16} className="animate-spin" /> : <FileSpreadsheet size={16} />}
                        {exporting ? "Exporting..." : "Export Excel"}
                    </button>
                </div>
            </div>

            <div className="card" style={{ padding: 0, overflowX: "auto" }}>
                <div className="data-table-container">
                    <table className="data-table well-status-table" style={{ whiteSpace: "nowrap", fontSize: "0.8rem" }}>
                        <thead>
                            <tr>
                                <th>NAME</th>
                                <th>CLIENT REF FILE</th>
                                <th>CLIENT REF.</th>
                                <th>B/L NO.</th>
                                <th>SIZE OF CONT</th>
                                <th>DOC RECV</th>
                                <th>VESSEL NAME</th>
                                <th>E.T.A</th>
                                <th>LODGE CUSTOM S</th>
                                <th>ENTRY NO</th>
                                <th>ENTRY PASSED</th>
                                <th>TBL/ N.TBL</th>
                                <th>S/LINE CHARGE S</th>
                                <th>S/LINE PAID</th>
                                <th>D/O RECV</th>
                                <th>LAST SLING cfs</th>
                                <th>LODG ED K.P.A</th>
                                <th>DATE VERIFIED</th>
                                <th>STATUS</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {loading ? (
                                <tr>
                                    <td colSpan={20} style={{ textAlign: "center", padding: "4rem" }}>
                                        <Loader2 size={24} className="animate-spin" style={{ margin: "0 auto", color: "hsl(var(--primary))" }} />
                                        <div style={{ marginTop: "1rem", color: "hsl(var(--text-muted))" }}>Loading daily cargo report...</div>
                                    </td>
                                </tr>
                            ) : filteredShipments.length === 0 ? (
                                <tr>
                                    <td colSpan={20} style={{ textAlign: "center", padding: "4rem", color: "hsl(var(--text-muted))" }}>
                                        {searchTerm ? "No matching cargo entries found." : "No cargo entries found. Note: PCHARGES shipments are excluded from this report."}
                                    </td>
                                </tr>
                            ) : (
                                filteredShipments.map((s) => (
                                    <tr key={s.id} className="hover-row">
                                        <td style={{ fontWeight: 600 }}>{s.clientName}</td>
                                        <td style={{ fontFamily: "monospace", fontWeight: 600, color: "hsl(var(--primary))" }}>{s.refNumber}</td>
                                        <td>{s.clientRef || "—"}</td>
                                        <td style={{ fontFamily: "monospace", color: "hsl(var(--text-secondary))" }}>{s.blNumber}</td>
                                        <td>{s.containerSize}</td>
                                        <td>{s.docRecv || "—"}</td>
                                        <td>{s.vesselName || "—"}</td>
                                        <td style={{ color: "hsl(var(--text-secondary))" }}>{formatDate(s.eta)}</td>
                                        <td style={{ color: "hsl(var(--text-secondary))" }}>{formatDate(s.lodgeCustoms)}</td>
                                        <td style={{ fontFamily: "monospace" }}>{s.entryNumber || "—"}</td>
                                        <td style={{ color: "hsl(var(--text-secondary))" }}>{formatDate(s.entryPassed)}</td>
                                        <td>{s.tblNtbl || "—"}</td>
                                        <td style={{ color: "hsl(var(--text-secondary))" }}>{formatDate(s.slineCharges)}</td>
                                        <td style={{ color: "hsl(var(--text-secondary))" }}>{formatDate(s.slinePaid)}</td>
                                        <td style={{ color: "hsl(var(--text-secondary))" }}>{formatDate(s.ddRecv)}</td>
                                        <td>{s.lastSlingCfs || "—"}</td>
                                        <td style={{ color: "hsl(var(--text-secondary))" }}>{formatDate(s.lodgedKpa)}</td>
                                        <td style={{ color: "hsl(var(--text-secondary))" }}>{formatDate(s.dateVerified)}</td>
                                        <td>
                                            <span className={`status-badge status-well status-${s.status.toLowerCase()}`} style={{ fontWeight: 600, fontSize: "0.75rem", padding: "0.2rem 0.5rem", borderRadius: "0.25rem" }}>
                                                {s.status}
                                            </span>
                                        </td>
                                        <td style={{ position: "sticky", right: 0, background: "hsl(var(--surface-1))" }}>
                                            <Link href={`/well/shipments/${s.id}`} className="btn btn-ghost btn-sm" style={{ padding: "0.25rem 0.5rem" }}>
                                                Edit
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
