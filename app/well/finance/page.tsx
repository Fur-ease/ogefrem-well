"use client";

import { useEffect, useState, useRef } from "react";
import { Loader2, ArrowLeft, CheckCircle, Ship, Printer, FileText, X } from "lucide-react";
import Link from "next/link";
import { toast } from "sonner";
import { format } from "date-fns";
import Breadcrumbs from "@/components/well/Breadcrumbs";
import { WellQuotation } from "@/components/well/WellQuotation";

export default function WellFinancePage() {
    const [shipments, setShipments] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [activeQuotation, setActiveQuotation] = useState<any>(null);
    const [quotationAmount, setQuotationAmount] = useState<number>(0);
    const printRef = useRef<HTMLDivElement>(null);

    const fetchPending = async () => {
        try {
            const res = await fetch("/api/well/shipments?status=PCHARGES");
            const data = await res.json();
            setShipments(data.filter((s: any) => !s.isPaid));
            setLoading(false);
        } catch (error) {
            toast.error("Failed to load pending payments");
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchPending();
    }, []);

    const suggestBilledAmount = (containerSize: string) => {
        // Simple logic: $500 per 20ft, $900 per 40ft
        const size20 = containerSize.match(/(\d+)X20/i);
        const size40 = containerSize.match(/(\d+)X40/i);

        let total = 0;
        if (size20) total += parseInt(size20[1]) * 500;
        if (size40) total += parseInt(size40[1]) * 900;

        return total || 500; // default to 500
    };

    const handleGenerateQuotation = (shipment: any) => {
        const suggested = suggestBilledAmount(shipment.containerSize || "");
        const amount = prompt(`Enter quotation amount for ${shipment.refNumber}:`, suggested.toString());
        if (amount === null) return;

        setQuotationAmount(parseFloat(amount) || 0);
        setActiveQuotation(shipment);
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

            toast.success("Shipment cleared successfully", { id: tId });
            fetchPending();
        } catch (error) {
            toast.error("Error marking as paid", { id: tId });
        }
    };

    const handlePrint = () => {
        const printContent = printRef.current;
        if (!printContent) return;

        const win = window.open("", "", "width=900,height=900");
        if (!win) return;

        win.document.write(`
            <html>
                <head>
                    <title>Quotation - ${activeQuotation.refNumber}</title>
                    <style>
                        body { margin: 0; padding: 0; }
                    </style>
                </head>
                <body>
                    ${printContent.innerHTML}
                </body>
            </html>
        `);
        win.document.close();
        setTimeout(() => {
            win.print();
            win.close();
        }, 500);
    };

    if (loading) {
        return <div style={{ display: "flex", justifyContent: "center", padding: "4rem" }}><Loader2 className="animate-spin" size={32} /></div>;
    }

    return (
        <div className="animate-fade-in" style={{ paddingBottom: "3rem" }}>
            <Breadcrumbs />

            <div style={{ marginBottom: "2rem" }}>
                <h1 style={{ fontSize: "1.75rem", fontWeight: 700, marginBottom: "0.25rem", color: "hsl(var(--text-primary))" }}>
                    Finance & Billing
                </h1>
                <p style={{ color: "hsl(var(--text-secondary))", fontSize: "0.9rem" }}>
                    Generate quotations and clear payments for P.CHARGES shipments
                </p>
            </div>

            <div className="card" style={{ padding: 0, overflow: "hidden" }}>
                <div className="data-table-container">
                    <table className="data-table">
                        <thead>
                            <tr>
                                <th>Ref</th>
                                <th>Client</th>
                                <th>Containers</th>
                                <th>Suggested</th>
                                <th>B/L NO.</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {shipments.length === 0 ? (
                                <tr>
                                    <td colSpan={6} style={{ textAlign: "center", padding: "4rem", color: "hsl(var(--text-muted))" }}>
                                        <CheckCircle size={48} color="hsl(var(--success))" style={{ margin: "0 auto 1rem", opacity: 0.5 }} />
                                        <div style={{ fontSize: "1.1rem", fontWeight: 600 }}>All caught up!</div>
                                        <div>No pending P.CHARGES shipments.</div>
                                    </td>
                                </tr>
                            ) : (
                                shipments.map(s => {
                                    const suggested = suggestBilledAmount(s.containerSize || "");
                                    return (
                                        <tr key={s.id}>
                                            <td style={{ fontWeight: 600, fontFamily: "monospace", color: "hsl(var(--primary))" }}>{s.refNumber}</td>
                                            <td style={{ fontWeight: 600 }}>{s.clientName}</td>
                                            <td style={{ fontSize: "0.85rem" }}>{s.containerSize || "—"}</td>
                                            <td style={{ fontWeight: 600, color: "hsl(var(--success))" }}>USD {suggested}</td>
                                            <td style={{ color: "hsl(var(--text-secondary))" }}>{s.blNumber}</td>
                                            <td>
                                                <div style={{ display: "flex", gap: "0.5rem" }}>
                                                    <button
                                                        onClick={() => handleGenerateQuotation(s)}
                                                        className="btn btn-secondary btn-sm"
                                                        style={{ gap: "0.4rem" }}
                                                    >
                                                        <FileText size={14} /> Quotation
                                                    </button>
                                                    <button
                                                        onClick={() => markPaid(s.id, suggested)}
                                                        className="btn btn-success btn-sm"
                                                        style={{ gap: "0.4rem" }}
                                                    >
                                                        <CheckCircle size={14} /> Clear
                                                    </button>
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

            {/* Quotation Preview Modal */}
            {activeQuotation && (
                <div style={{
                    position: "fixed",
                    top: 0,
                    left: 0,
                    width: "100%",
                    height: "100%",
                    background: "rgba(0,0,0,0.8)",
                    zIndex: 1000,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    padding: "2rem"
                }}>
                    <div style={{
                        width: "100%",
                        maxWidth: "900px",
                        display: "flex",
                        justifyContent: "space-between",
                        marginBottom: "1rem"
                    }}>
                        <button
                            onClick={() => handlePrint()}
                            className="btn btn-primary"
                            style={{ gap: "0.5rem" }}
                        >
                            <Printer size={18} /> Print Quotation
                        </button>
                        <button
                            onClick={() => setActiveQuotation(null)}
                            className="btn btn-ghost"
                            style={{ color: "#fff", background: "rgba(255,255,255,0.1)" }}
                        >
                            <X size={24} />
                        </button>
                    </div>

                    <div style={{ width: "100%", maxWidth: "900px", flex: 1, background: "#fff", borderRadius: "8px", overflowY: "auto" }}>
                        <div ref={printRef}>
                            <WellQuotation shipment={activeQuotation} quotationAmount={quotationAmount} />
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
