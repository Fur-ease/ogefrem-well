"use client";

import { useEffect, useState } from "react";
import { Loader2, ArrowLeft, BarChart3, TrendingUp, AlertCircle } from "lucide-react";
import Link from "next/link";
import { toast } from "sonner";

export default function WellAnalyticsPage() {
    const [data, setData] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch("/api/well/analytics")
            .then(res => res.json())
            .then(d => {
                setData(d);
                setLoading(false);
            })
            .catch(() => {
                toast.error("Failed to load analytics");
                setLoading(false);
            });
    }, []);

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
                    Operations Analytics
                </h1>
                <p style={{ color: "hsl(var(--text-secondary))", fontSize: "0.9rem" }}>
                    WESTON LOGISTICS performance overview
                </p>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.5rem" }}>
                <div className="card" style={{ padding: "1.5rem" }}>
                    <h2 style={{ fontSize: "1.2rem", fontWeight: 600, marginBottom: "1.5rem", display: "flex", alignItems: "center", gap: "0.75rem" }}>
                        <BarChart3 size={20} color="hsl(var(--primary))" /> Volume by Status
                    </h2>
                    <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                        {[
                            { label: "Total Shipments", value: data.total, color: "hsl(var(--text-primary))" },
                            { label: "A.V.A (Awaiting)", value: data.statusCounts.AVA, color: "hsl(var(--warning))", pct: (data.statusCounts.AVA / data.total) * 100 },
                            { label: "F.U.P (Follow Up)", value: data.statusCounts.FUP, color: "hsl(var(--info))", pct: (data.statusCounts.FUP / data.total) * 100 },
                            { label: "F.U.R.O (Released)", value: data.statusCounts.FURO, color: "hsl(var(--success))", pct: (data.statusCounts.FURO / data.total) * 100 },
                            { label: "P.CHARGES (Finance)", value: data.statusCounts.PCHARGES, color: "#8b5cf6", pct: (data.statusCounts.PCHARGES / data.total) * 100 },
                        ].map(item => (
                            <div key={item.label}>
                                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "0.5rem", fontSize: "0.9rem", fontWeight: 600 }}>
                                    <span>{item.label}</span>
                                    <span>{item.value}</span>
                                </div>
                                {item.label !== "Total Shipments" && (
                                    <div style={{ width: "100%", height: "8px", background: "rgba(255,255,255,0.1)", borderRadius: "4px", overflow: "hidden" }}>
                                        <div style={{ width: `${item.pct}%`, height: "100%", background: item.color, borderRadius: "4px" }} />
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>

                <div className="card" style={{ padding: "1.5rem" }}>
                    <h2 style={{ fontSize: "1.2rem", fontWeight: 600, marginBottom: "1.5rem", display: "flex", alignItems: "center", gap: "0.75rem" }}>
                        <TrendingUp size={20} color="hsl(var(--success))" /> Finance Queue
                    </h2>
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "center", height: "calc(100% - 3rem)" }}>
                        <div style={{ textAlign: "center" }}>
                            <AlertCircle size={48} color={data.unpaidPcharges > 0 ? "hsl(var(--error))" : "hsl(var(--success))"} style={{ margin: "0 auto 1rem" }} />
                            <div style={{ fontSize: "3rem", fontWeight: 800, lineHeight: 1 }}>{data.unpaidPcharges}</div>
                            <div style={{ color: "hsl(var(--text-secondary))", marginTop: "0.5rem", fontWeight: 600 }}>Unpaid P.Charges Shipments</div>

                            {data.unpaidPcharges > 0 && (
                                <Link href="/well/finance" className="btn btn-primary" style={{ marginTop: "1.5rem" }}>
                                    Go to Finance clearing
                                </Link>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
