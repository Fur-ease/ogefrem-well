"use client";

import { useEffect, useState } from "react";
import { Loader2, ArrowLeft, BarChart3, TrendingUp, AlertCircle, DollarSign, Package, User, Calendar, CheckCircle2, Navigation } from "lucide-react";
import Link from "next/link";
import { toast } from "sonner";
import { apis } from "@/lib/api/apis";
import {
    BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
    LineChart, Line, AreaChart, Area, PieChart, Pie, Cell, Legend
} from "recharts";
import Breadcrumbs from "@/components/well/Breadcrumbs";

export default function WellAnalyticsPage() {
    const [selectedMonth, setSelectedMonth] = useState("2026-08");
    const [data, setData] = useState<any>(null);
    const [containersHandled, setContainersHandled] = useState<any[]>([]);
    const [statusBreakdown, setStatusBreakdown] = useState<any>({ in_transit: 0, delivered: 0 });
    const [completionData, setCompletionData] = useState<any>({ finished: 0, in_progress: 0 });
    const [loading, setLoading] = useState(true);

    const loadAnalyticsData = async (month: string) => {
        setLoading(true);
        try {
            const [analyticsRes, handledRes, statusRes, completionRes] = await Promise.all([
                apis.well.getAnalytics(),
                fetch(`/api/analytics/containers-handled?month=${month}`).then(r => r.json()),
                fetch(`/api/analytics/container-status-breakdown?month=${month}`).then(r => r.json()),
                fetch(`/api/analytics/shipment-completion?month=${month}`).then(r => r.json())
            ]);

            setData(analyticsRes);
            setContainersHandled(Array.isArray(handledRes) ? handledRes : []);
            setStatusBreakdown(statusRes || { in_transit: 0, delivered: 0 });
            setCompletionData(completionRes || { finished: 0, in_progress: 0 });
        } catch (err) {
            toast.error("Failed to load performance analytics");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadAnalyticsData(selectedMonth);
    }, [selectedMonth]);

    // Prepare chart data
    const revenueData = Object.entries(data?.monthlyRevenue || {}).map(([m, val]) => ({
        month: m,
        revenue: val
    })).sort((a, b) => a.month.localeCompare(b.month));

    const clientRevenue = Object.entries(data?.revenuePerClient || {}).map(([client, val]) => ({
        client,
        revenue: val as number
    })).sort((a, b) => b.revenue - a.revenue);

    const pieStatusData = [
        { name: "In Transit", value: statusBreakdown.in_transit || 0, color: "hsl(var(--primary))" },
        { name: "Delivered", value: statusBreakdown.delivered || 0, color: "hsl(var(--success))" }
    ];

    const pieCompletionData = [
        { name: "Finished (Released)", value: completionData.finished || 0, color: "hsl(var(--success))" },
        { name: "In Progress", value: completionData.in_progress || 0, color: "hsl(var(--warning))" }
    ];

    return (
        <div className="animate-fade-in" style={{ paddingBottom: "4rem" }}>
            <Breadcrumbs />

            {/* Header & Month Selector */}
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: "2rem", flexWrap: "wrap", gap: "1rem" }}>
                <div>
                    <h1 style={{ fontSize: "1.75rem", fontWeight: 800, marginBottom: "0.25rem", color: "hsl(var(--text-primary))" }}>
                        Performance & Operations Analytics
                    </h1>
                    <p style={{ color: "hsl(var(--text-secondary))", fontSize: "0.9rem", margin: 0 }}>
                        Financial, container throughput, and completion metrics.
                    </p>
                </div>

                <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", background: "hsl(var(--surface-2))", padding: "0.6rem 1rem", borderRadius: "8px", border: "1px solid hsl(var(--border))" }}>
                    <Calendar size={18} style={{ color: "hsl(var(--primary))" }} />
                    <label style={{ fontSize: "0.82rem", fontWeight: 700, color: "hsl(var(--text-muted))" }}>Filter Month:</label>
                    <input
                        type="month"
                        value={selectedMonth}
                        onChange={e => setSelectedMonth(e.target.value)}
                        style={{
                            background: "hsl(var(--surface))",
                            border: "1px solid hsl(var(--border))",
                            color: "hsl(var(--text-primary))",
                            padding: "0.35rem 0.6rem",
                            borderRadius: "6px",
                            fontSize: "0.85rem",
                            fontWeight: 700
                        }}
                    />
                </div>
            </div>

            {loading ? (
                <div style={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: "40vh" }}>
                    <Loader2 className="animate-spin" size={36} style={{ color: "hsl(var(--primary))" }} />
                </div>
            ) : (
                <>
                    {/* Stat Cards */}
                    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: "1.25rem", marginBottom: "2rem" }}>
                        <div className="card" style={{ padding: "1.25rem" }}>
                            <div style={{ color: "hsl(var(--text-muted))", fontSize: "0.72rem", fontWeight: 700, textTransform: "uppercase", marginBottom: "0.4rem" }}>
                                Total Revenue
                            </div>
                            <div style={{ fontSize: "1.8rem", fontWeight: 800, color: "hsl(var(--success))", display: "flex", alignItems: "center", gap: "0.4rem" }}>
                                <DollarSign size={22} />
                                {clientRevenue.reduce((acc, curr) => acc + curr.revenue, 0).toLocaleString()}
                            </div>
                        </div>

                        <div className="card" style={{ padding: "1.25rem" }}>
                            <div style={{ color: "hsl(var(--text-muted))", fontSize: "0.72rem", fontWeight: 700, textTransform: "uppercase", marginBottom: "0.4rem" }}>
                                Containers Handled ({selectedMonth})
                            </div>
                            <div style={{ fontSize: "1.8rem", fontWeight: 800, color: "hsl(var(--primary))", display: "flex", alignItems: "center", gap: "0.4rem" }}>
                                <Package size={22} />
                                {containersHandled.reduce((acc, curr) => acc + curr.count, 0)}
                            </div>
                        </div>

                        <div className="card" style={{ padding: "1.25rem" }}>
                            <div style={{ color: "hsl(var(--text-muted))", fontSize: "0.72rem", fontWeight: 700, textTransform: "uppercase", marginBottom: "0.4rem" }}>
                                Shipment Completion Rate
                            </div>
                            <div style={{ fontSize: "1.8rem", fontWeight: 800, color: "hsl(var(--info))", display: "flex", alignItems: "center", gap: "0.4rem" }}>
                                <CheckCircle2 size={22} />
                                {completionData.finished + completionData.in_progress > 0
                                    ? Math.round((completionData.finished / (completionData.finished + completionData.in_progress)) * 100)
                                    : 0}%
                            </div>
                        </div>
                    </div>

                    {/* Chart Grid 1: Daily Volume Trend */}
                    <div className="card" style={{ padding: "1.5rem", marginBottom: "1.5rem" }}>
                        <h2 style={{ fontSize: "1.1rem", fontWeight: 700, marginBottom: "1.25rem", display: "flex", alignItems: "center", gap: "0.5rem" }}>
                            <Package size={18} style={{ color: "hsl(var(--primary))" }} /> Containers Handled — Daily Trend ({selectedMonth})
                        </h2>
                        <div style={{ height: "280px", width: "100%" }}>
                            <ResponsiveContainer width="100%" height="100%">
                                <BarChart data={containersHandled}>
                                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" opacity={0.5} />
                                    <XAxis dataKey="date" stroke="hsl(var(--text-muted))" fontSize={11} tickFormatter={(val) => val.split("-")[2]} />
                                    <YAxis stroke="hsl(var(--text-muted))" fontSize={11} />
                                    <Tooltip contentStyle={{ background: "hsl(var(--surface))", border: "1px solid hsl(var(--border))", borderRadius: "8px", color: "hsl(var(--text-primary))" }} />
                                    <Bar dataKey="count" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
                                </BarChart>
                            </ResponsiveContainer>
                        </div>
                    </div>

                    {/* Chart Grid 2: Breakdown Cards */}
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.5rem", marginBottom: "1.5rem" }}>
                        {/* Container Status Breakdown */}
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

                        {/* Shipment Completion Status */}
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

                    {/* Chart Grid 3: Monthly Revenue Trend & Revenue per Client */}
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.5rem", marginBottom: "1.5rem" }}>
                        <div className="card" style={{ padding: "1.5rem" }}>
                            <h2 style={{ fontSize: "1rem", fontWeight: 700, marginBottom: "1.25rem", display: "flex", alignItems: "center", gap: "0.5rem" }}>
                                <TrendingUp size={18} style={{ color: "hsl(var(--success))" }} /> Revenue Trend (Monthly)
                            </h2>
                            <div style={{ height: "260px", width: "100%" }}>
                                <ResponsiveContainer width="100%" height="100%">
                                    <AreaChart data={revenueData}>
                                        <defs>
                                            <linearGradient id="colorRev" x1="0" y1="0" x2="0" y2="1">
                                                <stop offset="5%" stopColor="hsl(var(--success))" stopOpacity={0.3} />
                                                <stop offset="95%" stopColor="hsl(var(--success))" stopOpacity={0} />
                                            </linearGradient>
                                        </defs>
                                        <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" opacity={0.5} />
                                        <XAxis dataKey="month" stroke="hsl(var(--text-muted))" fontSize={11} />
                                        <YAxis stroke="hsl(var(--text-muted))" fontSize={11} />
                                        <Tooltip contentStyle={{ background: "hsl(var(--surface))", border: "1px solid hsl(var(--border))", borderRadius: "8px" }} />
                                        <Area type="monotone" dataKey="revenue" stroke="hsl(var(--success))" fillOpacity={1} fill="url(#colorRev)" />
                                    </AreaChart>
                                </ResponsiveContainer>
                            </div>
                        </div>

                        {/* Revenue per Client Table */}
                        <div className="card" style={{ padding: "1.5rem" }}>
                            <h2 style={{ fontSize: "1rem", fontWeight: 700, marginBottom: "1.25rem" }}>Revenue per Client</h2>
                            <div className="data-table-container">
                                <table className="data-table">
                                    <thead>
                                        <tr>
                                            <th>Client</th>
                                            <th>Revenue</th>
                                            <th>Share %</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {clientRevenue.length === 0 ? (
                                            <tr><td colSpan={3} style={{ textAlign: "center", padding: "2rem" }}>No client revenue records.</td></tr>
                                        ) : (
                                            clientRevenue.map(c => {
                                                const totalAll = clientRevenue.reduce((acc, curr) => acc + curr.revenue, 0);
                                                const pct = totalAll > 0 ? ((c.revenue / totalAll) * 100).toFixed(1) : "0";
                                                return (
                                                    <tr key={c.client}>
                                                        <td style={{ fontWeight: 600 }}>{c.client}</td>
                                                        <td style={{ fontWeight: 800, color: "hsl(var(--success))" }}>USD {c.revenue.toLocaleString()}</td>
                                                        <td>
                                                            <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                                                                <div style={{ flex: 1, height: "6px", background: "hsl(var(--surface-2))", borderRadius: "3px", overflow: "hidden" }}>
                                                                    <div style={{ width: `${pct}%`, height: "100%", background: "hsl(var(--primary))" }} />
                                                                </div>
                                                                <span style={{ fontSize: "0.78rem", fontWeight: 700 }}>{pct}%</span>
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
                    </div>
                </>
            )}
        </div>
    );
}
