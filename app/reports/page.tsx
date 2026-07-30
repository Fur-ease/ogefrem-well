"use client";

import { useState } from "react";
import { format } from "date-fns";
import { toast } from "sonner";
import { FileDown, Eye, FileText, AlertCircle } from "lucide-react";
import { apis } from "@/lib/api/apis";

type IIFPreviewData = {
    month: string;
    included: Array<{ client: string; docnum: string; proforma: string; displayDate: string; amount: number; memo: string }>;
    skipped: Array<{ client: string; docnum: string; displayDate: string; amount: number; skippedReason?: string }>;
    totalAmount: number;
    arAccount: string;
    incomeAccount: string;
    item: string;
};

export default function ReportsPage() {
    const [month, setMonth] = useState("");
    const [report, setReport] = useState<any>(null);
    const [loading, setLoading] = useState(false);
    const [exporting, setExporting] = useState(false);
    const [exportingExcel, setExportingExcel] = useState(false);
    const [exportingRecon, setExportingRecon] = useState(false);
    const [iifPreview, setIifPreview] = useState<IIFPreviewData | null>(null);
    const [loadingIIFPreview, setLoadingIIFPreview] = useState(false);
    const [exportingIIF, setExportingIIF] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const pageSize = 10;

    async function fetchReport(e: React.FormEvent) {
        e.preventDefault();
        if (!month) return;
        setLoading(true);
        setCurrentPage(1); // Reset to first page on new fetch

        try {
            const res = await apis.reports.getSummary(month);
            setReport(res);
            toast.success("Report data loaded");
        } catch (err: any) {
            toast.error(err.message || "Failed to fetch report");
        } finally {
            setLoading(false);
        }
    }

    async function handlePreviewIIF() {
        if (!month) return;
        setLoadingIIFPreview(true);
        try {
            const data = await apis.reports.previewIIF(month);
            setIifPreview(data);
        } catch (err: any) {
            toast.error(err.message || "Failed to preview IIF");
        } finally {
            setLoadingIIFPreview(false);
        }
    }

    async function handleExportIIF() {
        if (!month) return;
        setExportingIIF(true);
        const tId = toast.loading("Generating IIF file for QuickBooks import...");
        try {
            const blob = await apis.reports.exportIIF(month);
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement("a");
            a.href = url;
            const [year, mon] = month.split("-").map(Number);
            const monthLabel = format(new Date(year, mon - 1, 1), "MMMM_yyyy");
            a.download = `OGEFREM_WELL_Invoices_${monthLabel}.iif`;
            document.body.appendChild(a);
            a.click();
            a.remove();
            window.URL.revokeObjectURL(url);
            toast.success("IIF file downloaded!", { id: tId });
            setIifPreview(null); // close modal after download
        } catch (err: any) {
            toast.error(err.message || "Failed to export IIF", { id: tId });
        } finally {
            setExportingIIF(false);
        }
    }

    // Pagination logic
    const paginatedRows = report?.rows?.slice((currentPage - 1) * pageSize, currentPage * pageSize) || [];
    const totalPages = report ? Math.ceil(report.rows.length / pageSize) : 0;

    async function handleExport() {
        if (!month) return;
        setExporting(true);
        const tId = toast.loading("Generating your report...");
        try {
            const blob = await apis.reports.exportDocx(month);
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

    async function handleExportExcel() {
        if (!month) return;
        setExportingExcel(true);
        const tId = toast.loading("Generating Excel report with QR code...");
        try {
            const blob = await apis.reports.exportExcel(month);
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement("a");
            a.href = url;
            const [year, mon] = month.split("-").map(Number);
            const monthLabel = format(new Date(year, mon - 1, 1), "MMMM_yyyy");
            a.download = `OGEFREM_WELL_Report_${monthLabel}.xlsx`;
            document.body.appendChild(a);
            a.click();
            a.remove();
            window.URL.revokeObjectURL(url);
            toast.success("Excel report downloaded!", { id: tId });
        } catch (err: any) {
            toast.error(err.message || "Failed to export Excel", { id: tId });
        } finally {
            setExportingExcel(false);
        }
    }

    async function handleExportRecon() {
        if (!month) return;
        setExportingRecon(true);
        const tId = toast.loading("Generating reconciliation document...");
        try {
            const blob = await apis.reports.exportReconciliation(month);
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement("a");
            a.href = url;
            const [year, mon] = month.split("-").map(Number);
            const monthLabel = format(new Date(year, mon - 1, 1), "MMMM_yyyy");
            a.download = `Reconciliation_OGEFREM_WELL_${monthLabel}.docx`;
            document.body.appendChild(a);
            a.click();
            a.remove();
            window.URL.revokeObjectURL(url);
            toast.success("Reconciliation doc downloaded!", { id: tId });
        } catch (err: any) {
            toast.error(err.message || "Failed to export Reconciliation Doc", { id: tId });
        } finally {
            setExportingRecon(false);
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
                        <div style={{ display: "flex", gap: "0.5rem" }}>
                            <button onClick={handleExportRecon} className="btn btn-secondary" disabled={exportingRecon} style={{ gap: "0.5rem", background: "hsl(var(--primary))", color: "white", borderColor: "hsl(var(--primary))" }}>
                                {exportingRecon ? "Generating..." : <><FileText size={18} /> Reconciliation Doc</>}
                            </button>
                            <button onClick={handleExportExcel} className="btn btn-secondary" disabled={exportingExcel} style={{ gap: "0.5rem", background: "hsl(var(--success))", color: "white", borderColor: "hsl(var(--success))" }}>
                                {exportingExcel ? "Generating..." : <><FileDown size={18} /> Export Excel (QR)</>}
                            </button>
                            <button onClick={handlePreviewIIF} className="btn btn-secondary" disabled={loadingIIFPreview} style={{ gap: "0.5rem" }}>
                                {loadingIIFPreview ? "Loading..." : <><FileDown size={18} /> Preview & Export IIF</>}
                            </button>
                            <button onClick={handleExport} className="btn btn-secondary" disabled={exporting} style={{ gap: "0.5rem" }}>
                                {exporting ? "Generating..." : <><FileDown size={18} /> Export DOCX</>}
                            </button>
                        </div>
                    </div>

                    <div className="card" style={{ padding: 0, overflow: "hidden" }}>
                        <div className="data-table-container">
                            <table className="data-table" style={{ whiteSpace: "nowrap" }}>
                                <thead>
                                    <tr>
                                        <th>Client</th>
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
                                    {report.rows.length === 0 ? (
                                        <tr><td colSpan={13} style={{ textAlign: "center", padding: "3rem", color: "hsl(var(--text-muted))" }}>No completed shipments this month.</td></tr>
                                    ) : (
                                        paginatedRows.map((r: any, i: number) => (
                                            <tr key={i}>
                                                <td style={{ fontWeight: 500 }}>{r.client}</td>
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
                                        ))
                                    )}
                                </tbody>
                                {report.rows.length > 0 && (
                                    <tfoot>
                                        <tr style={{ background: "hsl(var(--surface-2))", fontWeight: 700 }}>
                                            <td colSpan={3}>TOTALS</td>
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

                        {/* Pagination */}
                        {totalPages > 1 && (
                            <div className="pagination">
                                <div className="pagination-info">
                                    Showing {(currentPage - 1) * pageSize + 1} to {Math.min(currentPage * pageSize, report.rows.length)} of {report.rows.length} entries
                                </div>
                                <button
                                    onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                                    disabled={currentPage === 1}
                                    className="pagination-btn"
                                >
                                    &laquo;
                                </button>
                                {[...Array(totalPages)].map((_, i) => (
                                    <button
                                        key={i}
                                        onClick={() => setCurrentPage(i + 1)}
                                        className={`pagination-btn ${currentPage === i + 1 ? "active" : ""}`}
                                    >
                                        {i + 1}
                                    </button>
                                ))}
                                <button
                                    onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                                    disabled={currentPage === totalPages}
                                    className="pagination-btn"
                                >
                                    &raquo;
                                </button>
                            </div>
                        )}

                        {iifPreview && (
                            <div style={{
                                position: "fixed", inset: 0, background: "rgba(0,0,0,0.5)",
                                display: "flex", alignItems: "center", justifyContent: "center", zIndex: 1000,
                            }}>
                                <div className="card" style={{ width: "min(900px, 92vw)", maxHeight: "85vh", overflow: "auto", padding: "1.5rem" }}>
                                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1rem" }}>
                                        <h2 style={{ fontSize: "1.1rem", fontWeight: 700 }}>IIF Preview — {iifPreview.month}</h2>
                                        <button onClick={() => setIifPreview(null)} className="btn btn-secondary" style={{ padding: "0.25rem 0.75rem" }}>✕</button>
                                    </div>

                                    <p style={{ fontSize: "0.85rem", color: "hsl(var(--text-secondary))", marginBottom: "1rem" }}>
                                        Posts to <strong>{iifPreview.arAccount}</strong> / <strong>{iifPreview.incomeAccount}</strong> as item <strong>{iifPreview.item}</strong>.
                                        {" "}{iifPreview.included.length} invoice{iifPreview.included.length === 1 ? "" : "s"} will be created, totaling{" "}
                                        <strong style={{ color: "hsl(var(--success))" }}>${iifPreview.totalAmount.toFixed(2)}</strong>.
                                    </p>

                                    {iifPreview.skipped.length > 0 && (
                                        <div style={{ background: "hsl(var(--warning, 30 90% 96%))", border: "1px solid hsl(var(--warning, 30 90% 60%))", borderRadius: 8, padding: "0.75rem", marginBottom: "1rem" }}>
                                            <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", fontWeight: 600, marginBottom: "0.5rem" }}>
                                                <AlertCircle size={16} /> {iifPreview.skipped.length} row(s) will be SKIPPED
                                            </div>
                                            {iifPreview.skipped.map((s, i) => (
                                                <div key={i} style={{ fontSize: "0.8rem" }}>
                                                    {s.client} ({s.docnum || "no FERI"}) — {s.skippedReason}
                                                </div>
                                            ))}
                                        </div>
                                    )}

                                    <div className="data-table-container">
                                        <table className="data-table" style={{ whiteSpace: "nowrap" }}>
                                            <thead>
                                                <tr>
                                                    <th>Client</th>
                                                    <th>Invoice # (FERI)</th>
                                                    <th>Proforma</th>
                                                    <th>Date</th>
                                                    <th style={{ textAlign: "right" }}>Amount USD</th>
                                                    <th>Memo</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {iifPreview.included.map((t, i) => (
                                                    <tr key={i}>
                                                        <td style={{ fontWeight: 500 }}>{t.client}</td>
                                                        <td>{t.docnum}</td>
                                                        <td>{t.proforma}</td>
                                                        <td>{t.displayDate}</td>
                                                        <td style={{ textAlign: "right", fontWeight: 600 }}>{t.amount.toFixed(2)}</td>
                                                        <td style={{ whiteSpace: "normal", fontSize: "0.8rem", color: "hsl(var(--text-secondary))" }}>{t.memo}</td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>

                                    <div style={{ display: "flex", justifyContent: "flex-end", gap: "0.75rem", marginTop: "1.5rem" }}>
                                        <button onClick={() => setIifPreview(null)} className="btn btn-secondary">Cancel</button>
                                        <button
                                            onClick={handleExportIIF}
                                            className="btn btn-primary"
                                            disabled={exportingIIF || iifPreview.included.length === 0}
                                        >
                                            {exportingIIF ? "Downloading..." : `Download IIF (${iifPreview.included.length})`}
                                        </button>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>

    );
}

