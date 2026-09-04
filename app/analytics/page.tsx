"use client";

import { useEffect, useState } from "react";
import {
    BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
    ResponsiveContainer
} from "recharts";
import { toast } from "sonner";
import { Printer, TrendingUp, Package, DollarSign, Users } from "lucide-react";
import { apis } from "@/lib/api/apis";

export default function AnalyticsPage() {
    const [data, setData] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [months, setMonths] = useState(6);

    const fetchAnalytics = async (mCount: number) => {
        setLoading(true);
        try {
            const res = await apis.analytics.get(mCount);
            setData(res);
        } catch {
            toast.error("Failed to load OGEFREM analytics");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchAnalytics(months);
    }, [months]);

    const handlePrint = () => {
        window.print();
    };

    if (loading && !data) return (
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", height: "60vh" }}>
            <div className="animate-pulse" style={{ textAlign: "center" }}>
                <TrendingUp size={48} style={{ color: "hsl(var(--primary))", marginBottom: "1rem" }} />
                <p style={{ color: "hsl(var(--text-secondary))" }}>Analyzing OGEFREM representation analytics...</p>
            </div>
        </div>
    );

    const chartData = data?.chartData || [];
    const allClients: string[] = data?.allClients || [];
    const allMonths: string[] = chartData.map((d: any) => d.month);

    // Color palette matching the screenshot (Blue, Gold/Yellow, Dark Navy, Sky Blue, Slate)
    const monthColors = [
        "#0066cc", "#eab308", "#0f2b5c", "#3b82f6",
        "#f59e0b", "#06b6d4", "#8b5cf6", "#64748b"
    ];

    const clientColors = [
        "#0066cc", "#10b981", "#f59e0b", "#8b5cf6",
        "#ec4899", "#06b6d4", "#f97316", "#64748b"
    ];

    // 1. Total Amount Received per Client (USD) - Grouped Bars (X: Client, Bars: Months)
    const totalAmountByClientData = allClients.map((client) => {
        const row: any = { clientName: client };
        chartData.forEach((d: any) => {
            row[d.month] = d.clients[client]?.totalAmount || 0;
        });
        return row;
    });

    // 2. WELL Revenue per Client (USD) - Grouped Bars (X: Client, Bars: Months)
    const wellRevByClientData = allClients.map((client) => {
        const row: any = { clientName: client };
        chartData.forEach((d: any) => {
            row[d.month] = d.clients[client]?.wellRev || 0;
        });
        return row;
    });

    // 3. WELL Revenue per Month - Line Graph
    const wellRevMonthlyLineData = chartData.map((d: any) => ({
        month: d.month,
        wellRev: d.wellRev || 0,
    }));

    // 4. Total Number of Containers per Month per Client - Grouped Bars (X: Month, Bars: Clients)
    const containersByMonthData = chartData.map((d: any) => {
        const row: any = { month: d.month };
        allClients.forEach((client) => {
            row[client] = d.clients[client]?.containerCount || 0;
        });
        return row;
    });

    // 5. Total Number of Containers per Client per Month - Grouped Bars (X: Client, Bars: Months)
    const containersByClientData = allClients.map((client) => {
        const row: any = { clientName: client };
        chartData.forEach((d: any) => {
            row[d.month] = d.clients[client]?.containerCount || 0;
        });
        return row;
    });

    // KPI Aggregations
    const totalContainers = chartData.reduce((acc: number, curr: { containerCount: number }) => acc + (curr.containerCount || 0), 0);
    const totalWellRev = chartData.reduce((acc: number, curr: { wellRev: number }) => acc + (curr.wellRev || 0), 0);
    const totalAmountReceived = chartData.reduce((acc: number, curr: { totalAmount: number }) => acc + (curr.totalAmount || 0), 0);
    const activeClientsCount = allClients.length;

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

            {/* Header Controls */}
            <div className="no-print" style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "2rem", flexWrap: "wrap", gap: "1rem" }}>
                <div>
                    <h1 style={{ fontSize: "1.75rem", fontWeight: 800, marginBottom: "0.25rem" }}>
                        OGEFREM Business Analytics
                    </h1>
                    <p style={{ color: "hsl(var(--text-secondary))", fontSize: "0.9rem" }}>
                        Financial revenue and container volume analytics per client.
                    </p>
                </div>

                <div style={{ display: "flex", gap: "1rem", alignItems: "center", flexWrap: "wrap" }}>
                    <div style={{ display: "flex", alignItems: "center", background: "hsl(var(--surface-2))", borderRadius: "0.5rem", padding: "0.25rem" }}>
                        {[3, 6, 12].map((m) => (
                            <button
                                key={m}
                                onClick={() => setMonths(m)}
                                style={{
                                    border: "none",
                                    padding: "0.4rem 0.88rem",
                                    borderRadius: "0.375rem",
                                    fontSize: "0.8rem",
                                    fontWeight: 600,
                                    background: months === m ? "hsl(var(--primary))" : "transparent",
                                    color: months === m ? "#fff" : "hsl(var(--text-secondary))",
                                    transition: "all 0.2s",
                                    cursor: "pointer"
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

            {/* Summary KPI Cards */}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "1.25rem", marginBottom: "2rem" }}>
                <div className="card" style={{ padding: "1.25rem" }}>
                    <div style={{ color: "hsl(var(--text-muted))", fontSize: "0.75rem", fontWeight: 700, textTransform: "uppercase", marginBottom: "0.4rem" }}>
                        Total Amount Received
                    </div>
                    <div style={{ fontSize: "1.8rem", fontWeight: 800, color: "hsl(var(--primary))", display: "flex", alignItems: "center", gap: "0.5rem" }}>
                        <DollarSign size={24} />
                        USD {totalAmountReceived.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                    </div>
                </div>

                <div className="card" style={{ padding: "1.25rem" }}>
                    <div style={{ color: "hsl(var(--text-muted))", fontSize: "0.75rem", fontWeight: 700, textTransform: "uppercase", marginBottom: "0.4rem" }}>
                        Total WELL Revenue
                    </div>
                    <div style={{ fontSize: "1.8rem", fontWeight: 800, color: "hsl(var(--success))", display: "flex", alignItems: "center", gap: "0.5rem" }}>
                        <DollarSign size={24} />
                        USD {totalWellRev.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                    </div>
                </div>

                <div className="card" style={{ padding: "1.25rem" }}>
                    <div style={{ color: "hsl(var(--text-muted))", fontSize: "0.75rem", fontWeight: 700, textTransform: "uppercase", marginBottom: "0.4rem" }}>
                        Total Containers Handled
                    </div>
                    <div style={{ fontSize: "1.8rem", fontWeight: 800, color: "hsl(var(--info))", display: "flex", alignItems: "center", gap: "0.5rem" }}>
                        <Package size={24} />
                        {totalContainers.toLocaleString()}
                    </div>
                </div>

                <div className="card" style={{ padding: "1.25rem" }}>
                    <div style={{ color: "hsl(var(--text-muted))", fontSize: "0.75rem", fontWeight: 700, textTransform: "uppercase", marginBottom: "0.4rem" }}>
                        Active Clients
                    </div>
                    <div style={{ fontSize: "1.8rem", fontWeight: 800, color: "hsl(var(--warning))", display: "flex", alignItems: "center", gap: "0.5rem" }}>
                        <Users size={24} />
                        {activeClientsCount}
                    </div>
                </div>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>

                {/* 1. Total Finance per Client (USD) */}
                <div className="card" style={{ padding: "2rem", borderRadius: "1rem", background: "#ffffff", border: "1px solid #e2e8f0" }}>
                    <h2 style={{ textAlign: "center", fontSize: "1.4rem", fontWeight: 800, color: "#0f172a", marginBottom: "1.5rem" }}>
                        Total Finance per Client (USD)
                    </h2>

                    <div style={{ height: "380px", width: "100%" }}>
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={totalAmountByClientData} margin={{ top: 20, right: 30, left: 20, bottom: 90 }}>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" opacity={0.7} />
                                <XAxis
                                    dataKey="clientName"
                                    stroke="#64748b"
                                    fontSize={10}
                                    interval={0}
                                    angle={-35}
                                    textAnchor="end"
                                />
                                <YAxis stroke="#64748b" fontSize={11} tickFormatter={(v) => v.toLocaleString()} />
                                <Tooltip
                                    formatter={(val: any) => [`USD ${(val || 0).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`, ""]}
                                    contentStyle={{ background: "#ffffff", border: "1px solid #cbd5e1", borderRadius: "8px", boxShadow: "0 4px 6px -1px rgba(0,0,0,0.1)" }}
                                />
                                <Legend
                                    layout="vertical"
                                    align="right"
                                    verticalAlign="middle"
                                    wrapperStyle={{ paddingLeft: "15px", fontSize: "0.85rem", fontWeight: 600 }}
                                />
                                {allMonths.map((m: string, idx: number) => (
                                    <Bar
                                        key={m}
                                        dataKey={m}
                                        name={m}
                                        fill={monthColors[idx % monthColors.length]}
                                    />
                                ))}
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* 2. WELL Revenue per Client (USD) */}
                <div className="card" style={{ padding: "2rem", borderRadius: "1rem", background: "#ffffff", border: "1px solid #e2e8f0" }}>
                    <h2 style={{ textAlign: "center", fontSize: "1.4rem", fontWeight: 800, color: "#0f172a", marginBottom: "1.5rem" }}>
                        WELL Revenue per Client (USD)
                    </h2>

                    <div style={{ height: "380px", width: "100%" }}>
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={wellRevByClientData} margin={{ top: 20, right: 30, left: 20, bottom: 90 }}>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" opacity={0.7} />
                                <XAxis
                                    dataKey="clientName"
                                    stroke="#64748b"
                                    fontSize={10}
                                    interval={0}
                                    angle={-35}
                                    textAnchor="end"
                                />
                                <YAxis stroke="#64748b" fontSize={11} tickFormatter={(v) => `$${v}`} />
                                <Tooltip
                                    formatter={(val: any) => [`USD ${(val || 0).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`, ""]}
                                    contentStyle={{ background: "#ffffff", border: "1px solid #cbd5e1", borderRadius: "8px", boxShadow: "0 4px 6px -1px rgba(0,0,0,0.1)" }}
                                />
                                <Legend
                                    layout="vertical"
                                    align="right"
                                    verticalAlign="middle"
                                    wrapperStyle={{ paddingLeft: "15px", fontSize: "0.85rem", fontWeight: 600 }}
                                />
                                {allMonths.map((m: string, idx: number) => (
                                    <Bar
                                        key={m}
                                        dataKey={m}
                                        name={m}
                                        fill={monthColors[idx % monthColors.length]}
                                    />
                                ))}
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* 3. WELL Revenue per Month (Line Graph) */}
                <div className="card" style={{ padding: "2rem", borderRadius: "1rem", background: "#ffffff", border: "1px solid #e2e8f0" }}>
                    <h2 style={{ textAlign: "center", fontSize: "1.4rem", fontWeight: 800, color: "#0f172a", marginBottom: "1.5rem" }}>
                        WELL Revenue per Month (USD)
                    </h2>

                    <div style={{ height: "340px", width: "100%" }}>
                        <ResponsiveContainer width="100%" height="100%">
                            <LineChart data={wellRevMonthlyLineData} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
                                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" opacity={0.7} />
                                <XAxis dataKey="month" stroke="#64748b" fontSize={12} />
                                <YAxis stroke="#64748b" fontSize={11} tickFormatter={(v) => `$${v}`} />
                                <Tooltip
                                    formatter={(val: any) => [`USD ${(val || 0).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`, "WELL Revenue"]}
                                    contentStyle={{ background: "#ffffff", border: "1px solid #cbd5e1", borderRadius: "8px" }}
                                />
                                <Line type="monotone" dataKey="wellRev" name="WELL Revenue (USD)" stroke="#0066cc" strokeWidth={3} dot={{ r: 6, fill: "#0066cc" }} activeDot={{ r: 8 }} />
                            </LineChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* 4. Total Number of Containers per Month per Client */}
                <div className="card" style={{ padding: "2rem", borderRadius: "1rem", background: "#ffffff", border: "1px solid #e2e8f0" }}>
                    <h2 style={{ textAlign: "center", fontSize: "1.4rem", fontWeight: 800, color: "#0f172a", marginBottom: "1.5rem" }}>
                        Total Number of Containers per Month per Client
                    </h2>

                    <div style={{ height: "380px", width: "100%" }}>
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={containersByMonthData} margin={{ top: 20, right: 30, left: 10, bottom: 20 }}>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" opacity={0.7} />
                                <XAxis dataKey="month" stroke="#64748b" fontSize={12} />
                                <YAxis stroke="#64748b" fontSize={11} allowDecimals={false} />
                                <Tooltip contentStyle={{ background: "#ffffff", border: "1px solid #cbd5e1", borderRadius: "8px" }} />
                                <Legend
                                    layout="vertical"
                                    align="right"
                                    verticalAlign="middle"
                                    wrapperStyle={{ paddingLeft: "15px", fontSize: "0.85rem", fontWeight: 600 }}
                                />
                                {allClients.map((client, idx) => (
                                    <Bar
                                        key={client}
                                        dataKey={client}
                                        name={client}
                                        fill={clientColors[idx % clientColors.length]}
                                    />
                                ))}
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* 5. Total Number of Containers per Client per Month */}
                <div className="card" style={{ padding: "2rem", borderRadius: "1rem", background: "#ffffff", border: "1px solid #e2e8f0" }}>
                    <h2 style={{ textAlign: "center", fontSize: "1.4rem", fontWeight: 800, color: "#0f172a", marginBottom: "1.5rem" }}>
                        Total Number of Containers per Client per Month
                    </h2>

                    <div style={{ height: "380px", width: "100%" }}>
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={containersByClientData} margin={{ top: 20, right: 30, left: 20, bottom: 90 }}>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" opacity={0.7} />
                                <XAxis
                                    dataKey="clientName"
                                    stroke="#64748b"
                                    fontSize={10}
                                    interval={0}
                                    angle={-35}
                                    textAnchor="end"
                                />
                                <YAxis stroke="#64748b" fontSize={11} allowDecimals={false} />
                                <Tooltip contentStyle={{ background: "#ffffff", border: "1px solid #cbd5e1", borderRadius: "8px" }} />
                                <Legend
                                    layout="vertical"
                                    align="right"
                                    verticalAlign="middle"
                                    wrapperStyle={{ paddingLeft: "15px", fontSize: "0.85rem", fontWeight: 600 }}
                                />
                                {allMonths.map((m: string, idx: number) => (
                                    <Bar
                                        key={m}
                                        dataKey={m}
                                        name={m}
                                        fill={monthColors[idx % monthColors.length]}
                                    />
                                ))}
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>

            </div>
        </div>
    );
}



