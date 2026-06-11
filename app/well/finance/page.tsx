"use client";

import { useEffect, useState, useRef } from "react";
import { Loader2, ArrowLeft, CheckCircle, Ship, Printer, FileText, X, Search, DollarSign, ExternalLink, Eye } from "lucide-react";
import Link from "next/link";
import { toast } from "sonner";
import { format } from "date-fns";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import Breadcrumbs from "@/components/well/Breadcrumbs";
import { WellQuotation } from "@/components/well/WellQuotation";
import { WellReceipt } from "@/components/well/WellReceipt";

export default function WellFinancePage() {
    const [shipments, setShipments] = useState<any[]>([]);
    const [paidShipments, setPaidShipments] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [view, setView] = useState<"pending" | "paid">("pending");
    const [activeQuotation, setActiveQuotation] = useState<any>(null);
    const [activeReceipt, setActiveReceipt] = useState<any>(null);
    const [quotationAmount, setQuotationAmount] = useState<number>(0);
    const [searchQuery, setSearchQuery] = useState("");
    const [pdfUrl, setPdfUrl] = useState<string | null>(null);
    const [isGenerating, setIsGenerating] = useState(false);

    const quotationRef = useRef<HTMLDivElement>(null);
    const receiptRef = useRef<HTMLDivElement>(null);

    const generatePDF = async (element: HTMLElement | null) => {
        if (!element) return;
        setIsGenerating(true);
        const tId = toast.loading("Preparing PDF viewing...");

        try {
            // Temporarily unhide the container
            const container = element.parentElement;
            if (container) {
                container.style.display = "block";
                container.style.position = "absolute";
                container.style.left = "-9999px";
            }

            await new Promise(r => setTimeout(r, 300));

            const canvas = await html2canvas(element, {
                scale: 2,
                useCORS: true,
                logging: false,
                windowWidth: 1000
            });

            if (container) {
                container.style.display = "none";
                container.style.position = "static";
                container.style.left = "auto";
            }

            const imgData = canvas.toDataURL("image/png");
            const pdf = new jsPDF({
                orientation: "portrait", unit: "mm", format: "a4"
            });

            const pdfWidth = pdf.internal.pageSize.getWidth();
            const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
            pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);

            const blob = pdf.output("blob");
            const url = URL.createObjectURL(blob);
            setPdfUrl(url);
            toast.success("PDF Ready", { id: tId });
        } catch (error) {
            console.error(error);
            toast.error("Generation failed", { id: tId });
        } finally {
            setIsGenerating(false);
        }
    };

    const fetchAll = async () => {
        try {
            setLoading(true);
            const res = await fetch("/api/well/shipments");
            const data = await res.json();

            setShipments(data.filter((s: any) => s.status === "PCHARGES" && !s.isPaid));
            setPaidShipments(data.filter((s: any) => s.isPaid));
        } catch (error) {
            toast.error("Failed to load shipments");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchAll();
    }, []);

    const suggestBilledAmount = (containerSize: string) => {
        const size20 = containerSize.match(/(\d+)X20/i);
        const size40 = containerSize.match(/(\d+)X40/i);
        let total = 0;
        if (size20) total += parseInt(size20[1]) * 500;
        if (size40) total += parseInt(size40[1]) * 900;
        return total || 500;
    };


    const markPaid = async (id: string, currentAmount: number) => {
        if (!confirm(`Clear payment of USD ${currentAmount} for this shipment?`)) return;

        const tId = toast.loading("Marking as paid...");
        try {
            const res = await fetch(`/api/well/finance/${id}/pay`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ amount: currentAmount }),
            });
            if (!res.ok) throw new Error("Failed");

            const updated = await res.json();
            toast.success("Shipment cleared successfully", { id: tId });
            setActiveReceipt(updated);
            fetchAll();
        } catch (error) {
            toast.error("Error marking as paid", { id: tId });
        }
    };


    const handleQuotation = (s: any) => {
        const size20 = s.containerSize?.match(/(\d+)X20/i);
        const size40 = s.containerSize?.match(/(\d+)X40/i);
        let sug = 0;
        if (size20) sug += parseInt(size20[1]) * 500;
        if (size40) sug += parseInt(size40[1]) * 900;
        const amount = prompt(`Enter quotation amount:`, (sug || 500).toString());
        if (amount === null) return;
        setQuotationAmount(parseFloat(amount) || 0);
        setActiveQuotation(s);
        setTimeout(() => generatePDF(quotationRef.current), 100);
    };

    const previewReceipt = (s?: any) => {
        const target = s || activeReceipt;
        if (!target) return;
        setActiveReceipt(target);
        setTimeout(() => generatePDF(receiptRef.current), 100);
    };

    const filteredPending = shipments.filter(s =>
        s.clientName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        s.blNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
        s.refNumber.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const filteredPaid = paidShipments.filter(s =>
        s.clientName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        s.blNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
        s.refNumber.toLowerCase().includes(searchQuery.toLowerCase())
    );

    if (loading) {
        return <div style={{ display: "flex", justifyContent: "center", padding: "4rem" }}><Loader2 className="animate-spin" size={32} /></div>;
    }

    return (
        <div className="animate-fade-in" style={{ paddingBottom: "3rem" }}>
            <Breadcrumbs />

            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: "2rem", flexWrap: "wrap", gap: "1rem" }}>
                <div>
                    <h1 style={{ fontSize: "1.75rem", fontWeight: 700, marginBottom: "0.25rem", color: "hsl(var(--text-primary))" }}>
                        Finance & Billing
                    </h1>
                    <p style={{ color: "hsl(var(--text-secondary))", fontSize: "0.9rem" }}>
                        Manage quotations and process payments for WELL shipments
                    </p>
                </div>

                <div style={{ display: "flex", background: "hsl(var(--surface-2))", borderRadius: "0.5rem", padding: "0.25rem" }}>
                    <button
                        onClick={() => setView("pending")}
                        style={{
                            border: "none", padding: "0.5rem 1rem", borderRadius: "0.4rem", fontSize: "0.875rem", fontWeight: 600,
                            background: view === "pending" ? "hsl(var(--primary))" : "transparent",
                            color: view === "pending" ? "#fff" : "hsl(var(--text-secondary))"
                        }}
                    >
                        Pending ({shipments.length})
                    </button>
                    <button
                        onClick={() => setView("paid")}
                        style={{
                            border: "none", padding: "0.5rem 1rem", borderRadius: "0.4rem", fontSize: "0.875rem", fontWeight: 600,
                            background: view === "paid" ? "hsl(var(--primary))" : "transparent",
                            color: view === "paid" ? "#fff" : "hsl(var(--text-secondary))"
                        }}
                    >
                        Paid ({paidShipments.length})
                    </button>
                </div>
            </div>

            <div className="card" style={{ marginBottom: "1.5rem" }}>
                <div style={{ position: "relative" }}>
                    <Search size={18} style={{ position: "absolute", left: "1rem", top: "50%", transform: "translateY(-50%)", color: "hsl(var(--text-muted))" }} />
                    <input
                        type="text"
                        placeholder="Search by client, B/L or Ref number..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        style={{ paddingLeft: "2.75rem" }}
                    />
                </div>
            </div>

            <div className="card" style={{ padding: 0, overflow: "hidden" }}>
                <div className="data-table-container">
                    <table className="data-table">
                        <thead>
                            <tr>
                                <th>Ref</th>
                                <th>Client</th>
                                <th>Containers</th>
                                <th>{view === "pending" ? "Suggested" : "Amount Paid"}</th>
                                <th>B/L NO.</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {(view === "pending" ? filteredPending : filteredPaid).length === 0 ? (
                                <tr>
                                    <td colSpan={6} style={{ textAlign: "center", padding: "4rem", color: "hsl(var(--text-muted))" }}>
                                        {searchQuery ? "No matching shipments found." : (
                                            <>
                                                <CheckCircle size={48} color="hsl(var(--success))" style={{ margin: "0 auto 1rem", opacity: 0.5 }} />
                                                <div style={{ fontSize: "1.1rem", fontWeight: 600 }}>All caught up!</div>
                                                <div>No shipments in this category.</div>
                                            </>
                                        )}
                                    </td>
                                </tr>
                            ) : (
                                (view === "pending" ? filteredPending : filteredPaid).map(s => {
                                    const suggested = suggestBilledAmount(s.containerSize || "");
                                    return (
                                        <tr key={s.id}>
                                            <td style={{ fontWeight: 600, fontFamily: "monospace", color: "hsl(var(--primary))" }}>{s.refNumber}</td>
                                            <td style={{ fontWeight: 600 }}>{s.clientName}</td>
                                            <td style={{ fontSize: "0.85rem" }}>{s.containerSize || "—"}</td>
                                            <td style={{ fontWeight: 600, color: "hsl(var(--success))" }}>
                                                {view === "pending" ? `USD ${suggested}` : `USD ${Number(s.amount).toFixed(2)}`}
                                            </td>
                                            <td style={{ color: "hsl(var(--text-secondary))" }}>{s.blNumber}</td>
                                            <td>
                                                <div style={{ display: "flex", gap: "0.5rem" }}>
                                                    {view === "pending" ? (
                                                        <>
                                                            <button onClick={() => handleQuotation(s)} className="btn btn-secondary btn-sm" style={{ gap: "0.4rem" }}>
                                                                <FileText size={14} /> Quotation
                                                            </button>
                                                            <button onClick={() => markPaid(s.id, suggested)} className="btn btn-success btn-sm" style={{ gap: "0.4rem" }}>
                                                                <CheckCircle size={14} /> Clear
                                                            </button>
                                                        </>
                                                    ) : (
                                                        <button
                                                            onClick={() => previewReceipt(s)}
                                                            className="btn btn-secondary btn-sm"
                                                            style={{ gap: "0.4rem" }}
                                                        >
                                                            <Printer size={14} /> Receipt
                                                        </button>
                                                    )}
                                                </div>
                                            </td>
                                        </tr>
                                    );
                                })
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Hidden capture containers */}
            <div style={{ display: "none" }}>
                <div ref={quotationRef}>
                    {activeQuotation && <WellQuotation shipment={activeQuotation} quotationAmount={quotationAmount} />}
                </div>
                <div id="hidden-receipt-container" ref={receiptRef}>
                    {activeReceipt && <WellReceipt shipment={activeReceipt} />}
                </div>
            </div>

            {/* PDF Viewer Modal */}
            {(pdfUrl || isGenerating || activeQuotation || activeReceipt) && (
                <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.85)", zIndex: 1000, display: "flex", flexDirection: "column", alignItems: "center", padding: "1rem" }}>
                    <div style={{ width: "100%", maxWidth: "1000px", display: "flex", justifyContent: "space-between", marginBottom: "0.5rem" }}>
                        <div style={{ color: "#fff", fontWeight: 600, display: "flex", alignItems: "center", gap: "0.5rem" }}>
                            <FileText size={18} />
                            {activeQuotation ? "Quotation Viewer" : "Receipt Viewer"}
                        </div>
                        <button onClick={() => { setPdfUrl(null); setActiveQuotation(null); setActiveReceipt(null); }} className="btn btn-ghost" style={{ color: "#fff" }}>
                            <X size={24} />
                        </button>
                    </div>

                    <div style={{ width: "100%", maxWidth: "1000px", flex: 1, background: "#333", borderRadius: "8px", overflow: "hidden", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
                        {!pdfUrl ? (
                            <div style={{ color: "#fff", textAlign: "center" }}>
                                <Loader2 className="animate-spin" size={48} style={{ margin: "0 auto 1rem" }} />
                                <p>Optimizing PDF Viewer...</p>
                            </div>
                        ) : (
                            <iframe
                                src={`${pdfUrl}#toolbar=1&navpanes=0`}
                                style={{ width: "100%", height: "100%", border: "none" }}
                                title="PDF Viewer"
                            />
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}
