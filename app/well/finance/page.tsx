"use client";

import { useEffect, useState } from "react";
import { Loader2, ArrowLeft, CheckCircle, Ship } from "lucide-react";
import Link from "next/link";
import { toast } from "sonner";
import { format } from "date-fns";

export default function WellFinancePage() {
    const [shipments, setShipments] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    const fetchPending = async () => {
        try {
            const res = await fetch("/api/well/finance");
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

    const markPaid = async (id: string) => {
        const amountStr = prompt("Enter payment amount USD (optional):", "0");
        if (amountStr === null) return;

        const amount = parseFloat(amountStr) || 0;
        const tId = toast.loading("Marking as paid...");

        try {
            const res = await fetch(`/api/well/finance/${id}/pay`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ amount }),
            });
            if (!res.ok) throw new Error("Failed");

            toast.success("Shipment cleared from finance queue", { id: tId });
            fetchPending();
        } catch (error) {
            toast.error("Error marking as paid", { id: tId });
        }
    };

    if (loading) {
        return <div style={{ display: "flex", justifyContent: "center", padding: "4rem" }}><Loader2 className="animate-spin" size={32} /></div>;
    }

    return (
        <div className="animate-fade-in" style={{ paddingBottom: "3rem" }}>
            <Link href="/well" className="btn btn-ghost" style={{ marginBottom: "1.5rem", gap: "0.5rem", display: "inline-flex" }}>
                <ArrowLeft size={16} /> Back to Dashboard
            </Link>

            <div style={{ marginBottom: "2rem" }}>
                <h1 style={{ fontSize: "1.75rem", fontWeight: 700, marginBottom: "0.25rem", color: "hsl(var(--text-primary))" }}>
                    Finance Queue
                </h1>
                <p style={{ color: "hsl(var(--text-secondary))", fontSize: "0.9rem" }}>
                    Shipments in P.CHARGES status awaiting payment clearance
                </p>
            </div>

            <div className="card" style={{ padding: 0, overflow: "hidden" }}>
                <div className="data-table-container">
                    <table className="data-table">
                        <thead>
                            <tr>
                                <th>Ref</th>
                                <th>Client</th>
                                <th>B/L NO.</th>
                                <th>Vessel</th>
                                <th>Moved to PCHARGES</th>
                                <th>Action</th>
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
                                shipments.map(s => (
                                    <tr key={s.id}>
                                        <td style={{ fontWeight: 600, fontFamily: "monospace", color: "hsl(var(--primary))" }}>{s.refNumber}</td>
                                        <td style={{ fontWeight: 600 }}>{s.clientName}</td>
                                        <td style={{ color: "hsl(var(--text-secondary))" }}>{s.blNumber}</td>
                                        <td>{s.vesselName || "—"}</td>
                                        <td style={{ color: "hsl(var(--text-muted))" }}>
                                            {format(new Date(s.updatedAt), "dd MMM yyyy HH:mm")}
                                        </td>
                                        <td>
                                            <button onClick={() => markPaid(s.id)} className="btn btn-success btn-sm" style={{ gap: "0.5rem" }}>
                                                <CheckCircle size={14} /> Clear Payment
                                            </button>
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
