"use client";

import { useEffect, useState, useRef } from "react";
import {
    BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
    ResponsiveContainer, AreaChart, Area, PieChart, Pie, Cell, LabelList
} from "recharts";
import { toast } from "sonner";
import { Printer, Calendar, TrendingUp, Package, DollarSign, CheckCircle2, Navigation } from "lucide-react";
import { apis } from "@/lib/api/apis";

export default function AnalyticsPage() {
    const [selectedMonth, setSelectedMonth] = useState("2026-08");
    const [data, setData] = useState<any>(null);
    const [containersHandled, setContainersHandled] = useState<any[]>([]);
    const [statusBreakdown, setStatusBreakdown] = useState<any>({ in_transit: 0, delivered: 0 });
    const [completionData, setCompletionData] = useState<any>({ finished: 0, in_progress: 0 });
    const [loading, setLoading] = useState(true);
    const [months, setMonths] = useState(6);

    const fetchAnalytics = async (monthStr: string) => {
        setLoading(true);
        try {
            const [json, handledRes, statusRes, completionRes] = await Promise.all([
                apis.analytics.get(months),
                fetch(`/api/analytics/containers-handled?month=${monthStr}`).then(r => r.json()),
                fetch(`/api/analytics/container-status-breakdown?month=${monthStr}`).then(r => r.json()),
                fetch(`/api/analytics/shipment-completion?month=${monthStr}`).then(r => r.json())
            ]);

            setData(json);
            setContainersHandled(Array.isArray(handledRes) ? handledRes : []);
            setStatusBreakdown(statusRes || { in_transit: 0, delivered: 0 });
            setCompletionData(completionRes || { finished: 0, in_progress: 0 });
        } catch {
            toast.error("Failed to load analytics");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchAnalytics(selectedMonth);
    }, [months, selectedMonth]);

    const handlePrint = () => {
        window.print();
    };

    if (loading && !data) return (
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", height: "60vh" }}>
            <div className="animate-pulse" style={{ textAlign: "center" }}>
                <TrendingUp size={48} style={{ color: "hsl(var(--primary))", marginBottom: "1rem" }} />
                <p style={{ color: "hsl(var(--text-secondary))" }}>Analyzing shipment data...</p>
            </div>
        </div>
    );

    const qualitativeColors = [
        "#0066cc", "#ffcc00", "#004488", "#e6ac00", "#003366", "#ffd700", "#255e91", "#9e480e"
    ];

    const pivotedFinanceData = data?.allClients?.map((client: string) => {
        const clientRow: any = { clientName: client };
        data?.chartData?.forEach((monthData: any) => {
            clientRow[monthData.month] = monthData.clients[client]?.totalAmount || 0;
        });
        return clientRow;
    }) || [];

    const pivotedWellData = data?.allClients?.map((client: string) => {
        const clientRow: any = { clientName: client };
        data?.chartData?.forEach((monthData: any) => {
            clientRow[monthData.month] = monthData.clients[client]?.wellRev || 0;
        });
        return clientRow;
    }) || [];

    const pieStatusData = [
        { name: "In Transit", value: statusBreakdown.in_transit || 0, color: "hsl(var(--primary))" },
        { name: "Delivered", value: statusBreakdown.delivered || 0, color: "hsl(var(--success))" }
    ];

    const pieCompletionData = [
        { name: "Finished (Released)", value: completionData.finished || 0, color: "hsl(var(--success))" },
        { name: "In Progress", value: completionData.in_progress || 0, color: "hsl(var(--warning))" }
    ];

    const allMonths = data?.chartData?.map((d: any) => d.month) || [];

    return (
        <div className="animate-fade-in" style={{ paddingBottom: "3rem" }}>
            <style jsx global>{`
                @media print {
                    * {
                        -webkit-print-color-adjust: exact !important;
                        print-color-adjust: exact !important;
                    }
                    header, aside, .no-print {
                        display: none !important;
                    }
                    main {
                        margin: 0 !important;
                        padding: 0 !important;
                    }
                    .card {
                        box-shadow: none !important;
                        border: 1px solid #ddd !important;
                        margin-bottom: 2rem !important;
                        break-inside: avoid;
                    }
                    body {
                        background: white !important;
                        color: black !important;
                    }
                }
            `}</style>

            <div className="no-print" style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "2rem", flexWrap: "wrap", gap: "1rem" }}>
                <div>
                    <h1 style={{ fontSize: "1.75rem", fontWeight: 700, marginBottom: "0.25rem" }}>Business Analytics</h1>
                    <p style={{ color: "hsl(var(--text-secondary))", fontSize: "0.9rem" }}>Performance overview for completed and active freight workflows.</p>
                </div>
                <div style={{ display: "flex", gap: "1rem", alignItems: "center", flexWrap: "wrap" }}>
                    {/* Unified Month Selector */}
                    <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", background: "hsl(var(--surface-2))", padding: "0.35rem 0.75rem", borderRadius: "8px", border: "1px solid hsl(var(--border))" }}>
                        <Calendar size={16} style={{ color: "hsl(var(--primary))" }} />
                        <span style={{ fontSize: "0.8rem", fontWeight: 700, color: "hsl(var(--text-muted))" }}>Month:</span>
                        <input
                            type="month"
                            value={selectedMonth}
                            onChange={e => setSelectedMonth(e.target.value)}
                            style={{
                                background: "hsl(var(--surface))",
                                border: "1px solid hsl(var(--border))",
                                color: "hsl(var(--text-primary))",
                                padding: "0.3rem 0.5rem",
                                borderRadius: "6px",
                                fontSize: "0.82rem",
                                fontWeight: 700
                            }}
                        />
                    </div>

                    <div style={{ display: "flex", alignItems: "center", background: "hsl(var(--surface-2))", borderRadius: "0.5rem", padding: "0.25rem" }}>
                        {[3, 6, 12].map((m) => (
                            <button
                                key={m}
                                onClick={() => setMonths(m)}
                                style={{
                                    border: "none",
                                    padding: "0.4rem 0.8rem",
                                    borderRadius: "0.375rem",
                                    fontSize: "0.8rem",
                                    fontWeight: 600,
                                    background: months === m ? "hsl(var(--primary))" : "transparent",
                                    color: months === m ? "#fff" : "hsl(var(--text-secondary))",
                                    transition: "all 0.2s"
                                }}
                            >
                                {m}M Range
                            </button>
                        ))}
                    </div>
                    <button onClick={handlePrint} className="btn btn-secondary" style={{ gap: "0.5rem" }}>
                        <Printer size={18} /> Print Report
                    </button>
                </div>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
                {/* Containers Handled Daily Volume Trend Chart */}
                <div className="card" style={{ padding: "1.5rem" }}>
                    <h2 style={{ fontSize: "1.1rem", fontWeight: 700, marginBottom: "1.25rem", display: "flex", alignItems: "center", gap: "0.5rem" }}>
                        <Package size={18} style={{ color: "hsl(var(--primary))" }} /> Containers Handled — Daily Trend ({selectedMonth})
                    </h2>
                    <div style={{ height: "280px", width: "100%" }}>
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={containersHandled}>
                                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" opacity={0.5} />
                                <XAxis dataKey="date" stroke="hsl(var(--text-muted))" fontSize={11} tickFormatter={(val) => val.split("-")[2]} />
                                <YAxis stroke="hsl(var(--text-muted))" fontSize={11} />
                                <Tooltip contentStyle={{ background: "hsl(var(--surface))", border: "1px solid hsl(var(--border))", borderRadius: "8px" }} />
                                <Bar dataKey="count" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* 2-Category Breakdown Grid */}
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.5rem" }}>
                    <div className="card" style={{ padding: "1.5rem" }}>
                        <h2 style={{ fontSize: "1rem", fontWeight: 700, marginBottom: "1rem", display: "flex", alignItems: "center", gap: "0.5rem" }}>
                            <Navigation size={18} style={{ color: "hsl(var(--primary))" }} /> Container Status Breakdown ({selectedMonth})
                        </h2>
                        <div style={{ height: "240px", width: "100%" }}>
                            <ResponsiveContainer width="100%" height="100%">
                                <PieChart>
                                    <Pie data={pieStatusData} cx="50%" cy="50%" innerRadius={50} outerRadius={80} dataKey="value" label>
                                        {pieStatusData.map((entry, index) => (
                                            <Cell key={`cell-${index}`} fill={entry.color} />
                                        ))}
                                    </Pie>
                                    <Tooltip contentStyle={{ background: "hsl(var(--surface))", border: "1px solid hsl(var(--border))", borderRadius: "8px" }} />
                                    <Legend />
                                </PieChart>
                            </ResponsiveContainer>
                        </div>
                    </div>

                    <div className="card" style={{ padding: "1.5rem" }}>
                        <h2 style={{ fontSize: "1rem", fontWeight: 700, marginBottom: "1rem", display: "flex", alignItems: "center", gap: "0.5rem" }}>
                            <CheckCircle2 size={18} style={{ color: "hsl(var(--success))" }} /> Shipments Finished vs In Progress ({selectedMonth})
                        </h2>
                        <div style={{ height: "240px", width: "100%" }}>
                            <ResponsiveContainer width="100%" height="100%">
                                <PieChart>
                                    <Pie data={pieCompletionData} cx="50%" cy="50%" innerRadius={50} outerRadius={80} dataKey="value" label>
                                        {pieCompletionData.map((entry, index) => (
                                            <Cell key={`cell-${index}`} fill={entry.color} />
                                        ))}
                                    </Pie>
                                    <Tooltip contentStyle={{ background: "hsl(var(--surface))", border: "1px solid hsl(var(--border))", borderRadius: "8px" }} />
                                    <Legend />
                                </PieChart>
                            </ResponsiveContainer>
                        </div>
                    </div>
                </div>

                {/* Total Finance per Client */}
                <div className="card">
                    <h2 style={{ textAlign: "center", fontSize: "1.5rem", fontWeight: 700, marginBottom: "2rem" }}>
                        Total Finance per Client (USD)
                    </h2>
                    <div style={{ height: "400px", width: "100%" }}>
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={pivotedFinanceData} margin={{ top: 30, right: 120, left: 40, bottom: 120 }}>
                                <CartesianGrid strokeDasharray="0" stroke="hsl(var(--border) / 0.5)" vertical={false} />
                                <XAxis dataKey="clientName" stroke="hsl(var(--text-primary))" tickLine={true} axisLine={true} interval={0} tick={{ angle: -35, textAnchor: 'end', fontSize: 10, dy: 10 }} />
                                <YAxis stroke="hsl(var(--text-primary))" fontSize={12} tickFormatter={(v) => v.toLocaleString()} />
                                <Tooltip contentStyle={{ background: "hsl(var(--surface))", border: "1px solid hsl(var(--border))", borderRadius: "6px" }} />
                                <Legend layout="vertical" verticalAlign="middle" align="right" />
                                {allMonths.map((month: string, idx: number) => (
                                    <Bar key={month} dataKey={month} name={month} fill={qualitativeColors[idx % qualitativeColors.length]} />
                                ))}
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            </div>
        </div>
    );
}
