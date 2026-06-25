"use client";

import { useEffect, useState } from "react";
import { Loader2, ArrowLeft, BarChart3, TrendingUp, AlertCircle, DollarSign, Package, User } from "lucide-react";
import Link from "next/link";
import { toast } from "sonner";
import { apis } from "@/lib/api/apis";
import {
    BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
    LineChart, Line, AreaChart, Area
} from "recharts";
import Breadcrumbs from "@/components/well/Breadcrumbs";

export default function WellAnalyticsPage() {
    const [data, setData] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        apis.well.getAnalytics()
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

    // Prepare chart data
    const revenueData = Object.entries(data.monthlyRevenue || {}).map(([month, val]) => ({
        month,
        revenue: val
    })).sort((a, b) => a.month.localeCompare(b.month));

    const containerData = Object.entries(data.monthlyContainers || {}).map(([month, val]) => ({
        month,
        containers: val
    })).sort((a, b) => a.month.localeCompare(b.month));

    const clientRevenue = Object.entries(data.revenuePerClient || {}).map(([client, val]) => ({
        client,
        revenue: val as number
    })).sort((a, b) => b.revenue - a.revenue);

    return (
        <div className="animate-fade-in" style={{ paddingBottom: "3rem" }}>
            <Breadcrumbs />

            <div style={{ marginBottom: "2rem" }}>
                <h1 style={{ fontSize: "1.75rem", fontWeight: 700, marginBottom: "0.25rem", color: "hsl(var(--text-primary))" }}>
                    Performance Analytics
                </h1>
                <p style={{ color: "hsl(var(--text-secondary))", fontSize: "0.9rem" }}>
                    Financial and operational overview of WELL Logistics
                </p>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "1.5rem", marginBottom: "2rem" }}>
                <div className="card" style={{ padding: "1.5rem" }}>
                    <div style={{ color: "hsl(var(--text-muted))", fontSize: "0.8rem", fontWeight: 600, textTransform: "uppercase", marginBottom: "0.5rem" }}>
                        Total Revenue (All Time)
                    </div>
                    <div style={{ fontSize: "2rem", fontWeight: 800, color: "hsl(var(--success))", display: "flex", alignItems: "center", gap: "0.5rem" }}>
                        <DollarSign size={24} />
                        {clientRevenue.reduce((acc, curr) => acc + curr.revenue, 0).toLocaleString()}
                    </div>
                </div>
                <div className="card" style={{ padding: "1.5rem" }}>
                    <div style={{ color: "hsl(var(--text-muted))", fontSize: "0.8rem", fontWeight: 600, textTransform: "uppercase", marginBottom: "0.5rem" }}>
                        Total Containers Cleared
                    </div>
                    <div style={{ fontSize: "2rem", fontWeight: 800, color: "hsl(var(--info))", display: "flex", alignItems: "center", gap: "0.5rem" }}>
                        <Package size={24} />
                        {containerData.reduce((acc, curr) => acc + (curr.containers as number), 0)}
                    </div>
                </div>
                <div className="card" style={{ padding: "1.5rem" }}>
                    <div style={{ color: "hsl(var(--text-muted))", fontSize: "0.8rem", fontWeight: 600, textTransform: "uppercase", marginBottom: "0.5rem" }}>
                        Active Clients
                    </div>
                    <div style={{ fontSize: "2rem", fontWeight: 800, color: "hsl(var(--primary))", display: "flex", alignItems: "center", gap: "0.5rem" }}>
                        <User size={24} />
                        {clientRevenue.length}
                    </div>
                </div>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.5rem", marginBottom: "1.5rem" }}>
                <div className="card" style={{ padding: "1.5rem" }}>
                    <h2 style={{ fontSize: "1.1rem", fontWeight: 600, marginBottom: "1.5rem", display: "flex", alignItems: "center", gap: "0.5rem" }}>
                        <TrendingUp size={18} color="hsl(var(--success))" /> Revenue Trend (Monthly)
                    </h2>
                    <div style={{ height: "300px", width: "100%" }}>
                        <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={revenueData}>
                                <defs>
                                    <linearGradient id="colorRev" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="hsl(var(--success))" stopOpacity={0.3} />
                                        <stop offset="95%" stopColor="hsl(var(--success))" stopOpacity={0} />
                                    </linearGradient>
                                </defs>
                                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                                <XAxis dataKey="month" stroke="hsl(var(--text-muted))" fontSize={12} />
                                <YAxis stroke="hsl(var(--text-muted))" fontSize={12} />
                                <Tooltip
                                    contentStyle={{ background: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: "8px" }}
                                    itemStyle={{ color: "hsl(var(--success))" }}
                                />
                                <Area type="monotone" dataKey="revenue" stroke="hsl(var(--success))" fillOpacity={1} fill="url(#colorRev)" />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                <div className="card" style={{ padding: "1.5rem" }}>
                    <h2 style={{ fontSize: "1.1rem", fontWeight: 600, marginBottom: "1.5rem", display: "flex", alignItems: "center", gap: "0.5rem" }}>
                        <Package size={18} color="hsl(var(--info))" /> Containers Cleared
                    </h2>
                    <div style={{ height: "300px", width: "100%" }}>
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={containerData}>
                                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                                <XAxis dataKey="month" stroke="hsl(var(--text-muted))" fontSize={12} />
                                <YAxis stroke="hsl(var(--text-muted))" fontSize={12} />
                                <Tooltip
                                    contentStyle={{ background: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: "8px" }}
                                />
                                <Bar dataKey="containers" fill="hsl(var(--info))" radius={[4, 4, 0, 0]} />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            </div>

            <div className="card" style={{ padding: "1.5rem" }}>
                <h2 style={{ fontSize: "1.1rem", fontWeight: 600, marginBottom: "1.5rem" }}>Revenue per Client</h2>
                <div className="data-table-container">
                    <table className="data-table">
                        <thead>
                            <tr>
                                <th>Client</th>
                                <th>Total Revenue Generated</th>
                                <th>Contribution %</th>
                            </tr>
                        </thead>
                        <tbody>
                            {clientRevenue.length === 0 ? (
                                <tr>
                                    <td colSpan={3} style={{ textAlign: "center", padding: "2rem" }}>No revenue data yet.</td>
                                </tr>
                            ) : (
                                clientRevenue.map(c => {
                                    const totalAll = clientRevenue.reduce((acc, curr) => acc + curr.revenue, 0);
                                    const pct = ((c.revenue / totalAll) * 100).toFixed(1);
                                    return (
                                        <tr key={c.client}>
                                            <td style={{ fontWeight: 600 }}>{c.client}</td>
                                            <td style={{ fontWeight: 800, color: "hsl(var(--success))" }}>USD {c.revenue.toLocaleString()}</td>
                                            <td>
                                                <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
                                                    <div style={{ flex: 1, height: "6px", background: "rgba(255,255,255,0.1)", borderRadius: "3px", overflow: "hidden" }}>
                                                        <div style={{ width: `${pct}%`, height: "100%", background: "hsl(var(--primary))" }} />
                                                    </div>
                                                    <span style={{ fontSize: "0.8rem", fontWeight: 700, minWidth: "40px" }}>{pct}%</span>
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
    );
}
