"use client";

import { useState } from "react";
import { format } from "date-fns";
import { toast } from "sonner";
import { FileDown, Eye, FileText, AlertCircle } from "lucide-react";

export default function ReportsPage() {
    const [month, setMonth] = useState("");
    const [report, setReport] = useState<any>(null);
    const [loading, setLoading] = useState(false);
    const [exporting, setExporting] = useState(false);

    async function fetchReport(e: React.FormEvent) {
        e.preventDefault();
        if (!month) return;
        setLoading(true);

        try {
            const res = await fetch(`/api/reports/summary?month=${month}`);
            const json = await res.json();
            if (!res.ok) {
                toast.error(json.error || "Failed to fetch report");
            } else {
                setReport(json.data);
                toast.success("Report data loaded");
            }
        } catch {
            toast.error("Failed to fetch report");
        } finally {
            setLoading(false);
        }
    }

    async function handleExport() {
        if (!month) return;
        setExporting(true);
        const tId = toast.loading("Generating your report...");
        try {
            const res = await fetch("/api/reports/export", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ month }),
            });

            if (!res.ok) {
                const json = await res.json();
                throw new Error(json.error || "Export failed");
            }

            const blob = await res.blob();
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement("a");
            a.href = url;
            a.download = `OGEFREM_WELL_Report_${month}.docx`;
            document.body.appendChild(a);
            a.click();
            a.remove();
            window.URL.revokeObjectURL(url);
            toast.success("Report downloaded!", { id: tId });
        } catch (err: any) {
            toast.error(err.message || "Failed to export DOCX", { id: tId });
        } finally {
            setExporting(false);
        }
    }

    return (
        <div className="animate-fade-in">
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "2rem", flexWrap: "wrap", gap: "1rem" }}>
                <div>
                    <h1 style={{ fontSize: "1.75rem", fontWeight: 700, marginBottom: "0.25rem", color: "hsl(var(--text-primary))" }}>Monthly Financial Reports</h1>
                    <p style={{ color: "hsl(var(--text-secondary))", fontSize: "0.9rem" }}>
                        Generate and export aggregated financial summaries for completed shipments.
                    </p>
                </div>
            </div>

            <div className="card" style={{ marginBottom: "2rem" }}>
                <form onSubmit={fetchReport} style={{ display: "flex", gap: "1rem", alignItems: "flex-end", flexWrap: "wrap" }}>
                    <div className="form-group" style={{ flex: "1 1 200px" }}>
                        <label>Select Month</label>
                        <input type="month" required value={month} onChange={(e) => setMonth(e.target.value)} />
                    </div>
                    <button type="submit" className="btn btn-primary" disabled={loading} style={{ marginBottom: 0, gap: "0.5rem", flex: "1 1 150px", justifyContent: "center" }}>
                        {loading ? "Loading..." : <><Eye size={18} /> View Report</>}
                    </button>
                </form>
            </div>

            {report && (
                <div className="animate-fade-in">
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1rem", flexWrap: "wrap", gap: "1rem" }}>
                        <h2 style={{ fontSize: "1.25rem", fontWeight: 600 }}>Summary for {format(new Date(month + "-01"), "MMMM yyyy")}</h2>
                        <button onClick={handleExport} className="btn btn-secondary" disabled={exporting} style={{ gap: "0.5rem", width: "100%", sm: { width: "auto" } } as any}>
                            {exporting ? "Generating..." : <><FileDown size={18} /> Export DOCX</>}
                        </button>
                    </div>

                    <div className="card" style={{ padding: 0, overflow: "hidden" }}>
                        <div className="data-table-container">
                            <table className="data-table" style={{ whiteSpace: "nowrap" }}>
                                <thead>
                                    <tr>
                                        <th>Client</th>
                                        <th>Date</th>
                                        <th>Feri</th>
                                        <th>Proforma</th>
                                        <th style={{ textAlign: "right" }}>Ferri EUR</th>
                                        <th style={{ textAlign: "right" }}>Exchange</th>
                                        <th style={{ textAlign: "right" }}>Ferri USD</th>
                                        <th style={{ textAlign: "right" }}>Comm EUR</th>
                                        <th style={{ textAlign: "right" }}>Comm USD</th>
                                        <th style={{ textAlign: "right" }}>AD USD</th>
                                        <th style={{ textAlign: "right", color: "hsl(var(--success))" }}>Total USD</th>
                                        <th style={{ textAlign: "right" }}>WELL Rev</th>
                                        <th style={{ textAlign: "right" }}>OGEFREM Rev</th>
                                        <th style={{ textAlign: "right" }}>Musongo</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {report.rows.length === 0 && (
                                        <tr><td colSpan={14} style={{ textAlign: "center", padding: "3rem", color: "hsl(var(--text-muted))" }}>No completed shipments this month.</td></tr>
                                    )}
                                    {report.rows.map((r: any, i: number) => (
                                        <tr key={i}>
                                            <td style={{ fontWeight: 500 }}>{r.client}</td>
                                            <td>{r.date}</td>
                                            <td>{r.feri}</td>
                                            <td>{r.proforma}</td>
                                            <td style={{ textAlign: "right" }}>{r.ferriEUR.toFixed(2)}</td>
                                            <td style={{ textAlign: "right" }}>{r.curExc.toFixed(4)}</td>
                                            <td style={{ textAlign: "right" }}>{r.ferriUSD.toFixed(2)}</td>
                                            <td style={{ textAlign: "right" }}>{r.commEUR.toFixed(2)}</td>
                                            <td style={{ textAlign: "right" }}>{r.commUSD.toFixed(2)}</td>
                                            <td style={{ textAlign: "right" }}>{r.adUSD.toFixed(2)}</td>
                                            <td style={{ textAlign: "right", color: "hsl(var(--success))", fontWeight: 600 }}>{r.totalUSD.toFixed(2)}</td>
                                            <td style={{ textAlign: "right" }}>{r.wellRev.toFixed(2)}</td>
                                            <td style={{ textAlign: "right" }}>{r.ogefremRev.toFixed(2)}</td>
                                            <td style={{ textAlign: "right" }}>{r.musongo.toFixed(2)}</td>
                                        </tr>
                                    ))}
                                </tbody>
                                {report.rows.length > 0 && (
                                    <tfoot>
                                        <tr style={{ background: "hsl(var(--surface-2))", fontWeight: 700 }}>
                                            <td colSpan={4}>TOTALS</td>
                                            <td style={{ textAlign: "right" }}>{report.totals.ferriEUR.toFixed(2)}</td>
                                            <td style={{ textAlign: "right" }}>—</td>
                                            <td style={{ textAlign: "right" }}>{report.totals.ferriUSD.toFixed(2)}</td>
                                            <td style={{ textAlign: "right" }}>{report.totals.commEUR.toFixed(2)}</td>
                                            <td style={{ textAlign: "right" }}>{report.totals.commUSD.toFixed(2)}</td>
                                            <td style={{ textAlign: "right" }}>{report.totals.adUSD.toFixed(2)}</td>
                                            <td style={{ textAlign: "right", color: "hsl(var(--success))" }}>{report.totals.totalUSD.toFixed(2)}</td>
                                            <td style={{ textAlign: "right" }}>{report.totals.wellRev.toFixed(2)}</td>
                                            <td style={{ textAlign: "right" }}>{report.totals.ogefremRev.toFixed(2)}</td>
                                            <td style={{ textAlign: "right" }}>{report.totals.musongo.toFixed(2)}</td>
                                        </tr>
                                    </tfoot>
                                )}
                            </table>
                        </div>
                    </div>
                </div>
            )}
        </div>

    );
}

