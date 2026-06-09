"use client";

import { useEffect, useState, useRef } from "react";
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer,
    LineChart,
    Line,
    AreaChart,
    Area
} from "recharts";
import { toast } from "sonner";
import { Printer, Calendar, TrendingUp, Package, DollarSign, Download } from "lucide-react";

export default function AnalyticsPage() {
    const [data, setData] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [months, setMonths] = useState(6);
    const printRef = useRef<HTMLDivElement>(null);

    const fetchAnalytics = async () => {
        setLoading(true);
        try {
            const res = await fetch(`/api/analytics?months=${months}`);
            const json = await res.json();
            if (res.ok) setData(json.data);
            else toast.error("Failed to load analytics");
        } catch {
            toast.error("Network error");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchAnalytics();
    }, [months]);

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
        "#0066cc", // OGEFREM Blue
        "#ffcc00", // OGEFREM Yellow
        "#004488", // Deep Blue
        "#e6ac00", // Gold
        "#003366", // Navy
        "#ffd700", // Bright Gold
        "#255e91", // Deep Blue
        "#9e480e", // Deep Orange
    ];

    // Pivot data: X-Axis = Client, Bars = Months
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

    const allMonths = data?.chartData?.map((d: any) => d.month) || [];

    return (
        <div className="animate-fade-in" style={{ paddingBottom: "3rem" }}>
            <style jsx global>{`
                @media print {
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
                    .print-header {
                        display: block !important;
                        margin-bottom: 2rem;
                        text-align: center;
                    }
                }
                .print-header {
                    display: none;
                }
            `}</style>

            <div className="no-print" style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "2rem", flexWrap: "wrap", gap: "1rem" }}>
                <div>
                    <h1 style={{ fontSize: "1.75rem", fontWeight: 700, marginBottom: "0.25rem" }}>Business Analytics</h1>
                    <p style={{ color: "hsl(var(--text-secondary))", fontSize: "0.9rem" }}>Performance overview for completed and final-stage shipments.</p>
                </div>
                <div style={{ display: "flex", gap: "1rem", alignItems: "center" }}>
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
                                {m}M
                            </button>
                        ))}
                    </div>
                    <button onClick={handlePrint} className="btn btn-secondary" style={{ gap: "0.5rem" }}>
                        <Printer size={18} /> Print Report
                    </button>
                </div>
            </div>

            <div className="print-header">
                <h1 style={{ fontSize: "2rem", marginBottom: "0.5rem" }}>OGEFREM WELL — Analytics Report</h1>
                <p>Data period: last {months} months | Generated on {new Date().toLocaleDateString()}</p>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>

                {/* 1. Total Finance per Client (USD) */}
                <div className="card">
                    <h2 style={{ textAlign: "center", fontSize: "1.5rem", fontWeight: 700, marginBottom: "2rem" }}>
                        Total Finance per Client (USD)
                    </h2>
                    <div style={{ height: "450px", width: "100%" }}>
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={pivotedFinanceData} margin={{ top: 20, right: 120, left: 40, bottom: 60 }}>
                                <CartesianGrid strokeDasharray="0" stroke="hsl(var(--border) / 0.5)" vertical={false} />
                                <XAxis
                                    dataKey="clientName"
                                    stroke="hsl(var(--text-primary))"
                                    fontSize={11}
                                    tickLine={true}
                                    axisLine={true}
                                    label={{ value: "Client", position: "bottom", offset: 40, fontSize: 14, fontWeight: 700, fill: "hsl(var(--text-primary))" }}
                                />
                                <YAxis
                                    stroke="hsl(var(--text-primary))"
                                    fontSize={12}
                                    tickLine={true}
                                    axisLine={true}
                                    tickFormatter={(v) => v.toLocaleString()}
                                    label={{ value: "Amount (USD)", angle: -90, position: "insideLeft", offset: -20, fontSize: 14, fontWeight: 700, fill: "hsl(var(--text-primary))" }}
                                />
                                <Tooltip
                                    cursor={{ fill: "hsl(var(--primary) / 0.05)" }}
                                    contentStyle={{ background: "hsl(var(--surface))", border: "1px solid hsl(var(--border))", borderRadius: "6px", boxShadow: "0 4px 12px rgba(0,0,0,0.15)" }}
                                />
                                <Legend
                                    layout="vertical"
                                    verticalAlign="middle"
                                    align="right"
                                    wrapperStyle={{ paddingLeft: "20px" }}
                                />
                                {allMonths.map((month: string, idx: number) => (
                                    <Bar
                                        key={month}
                                        dataKey={month}
                                        name={month}
                                        fill={qualitativeColors[idx % qualitativeColors.length]}
                                        stroke="#333"
                                        strokeWidth={0.5}
                                        radius={0}
                                    />
                                ))}
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* 2. Total WELL Revenue per Client (USD) */}
                <div className="card">
                    <h2 style={{ textAlign: "center", fontSize: "1.5rem", fontWeight: 700, marginBottom: "2rem" }}>
                        Total WELL Revenue per Client (USD)
                    </h2>
                    <div style={{ height: "450px", width: "100%" }}>
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={pivotedWellData} margin={{ top: 20, right: 120, left: 40, bottom: 60 }}>
                                <CartesianGrid strokeDasharray="0" stroke="hsl(var(--border) / 0.5)" vertical={false} />
                                <XAxis
                                    dataKey="clientName"
                                    stroke="hsl(var(--text-primary))"
                                    fontSize={11}
                                    tickLine={true}
                                    axisLine={true}
                                    label={{ value: "Client", position: "bottom", offset: 40, fontSize: 14, fontWeight: 700, fill: "hsl(var(--text-primary))" }}
                                />
                                <YAxis
                                    stroke="hsl(var(--text-primary))"
                                    fontSize={12}
                                    tickLine={true}
                                    axisLine={true}
                                    tickFormatter={(v) => v.toLocaleString()}
                                    label={{ value: "WELL Revenue (USD)", angle: -90, position: "insideLeft", offset: -20, fontSize: 14, fontWeight: 700, fill: "hsl(var(--text-primary))" }}
                                />
                                <Tooltip
                                    cursor={{ fill: "hsl(var(--primary) / 0.05)" }}
                                    contentStyle={{ background: "hsl(var(--surface))", border: "1px solid hsl(var(--border))", borderRadius: "6px", boxShadow: "0 4px 12px rgba(0,0,0,0.15)" }}
                                />
                                <Legend
                                    layout="vertical"
                                    verticalAlign="middle"
                                    align="right"
                                    wrapperStyle={{ paddingLeft: "20px" }}
                                />
                                {allMonths.map((month: string, idx: number) => (
                                    <Bar
                                        key={month}
                                        dataKey={month}
                                        name={month}
                                        fill={qualitativeColors[idx % qualitativeColors.length]}
                                        stroke="#333"
                                        strokeWidth={0.5}
                                        radius={0}
                                    />
                                ))}
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(450px, 1fr))", gap: "1.5rem" }}>
                    {/* 2. Total WELL (REV) per month */}
                    <div className="card">
                        <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "1.5rem" }}>
                            <div style={{ padding: "0.5rem", background: "hsl(var(--success) / 0.15)", borderRadius: "0.5rem", color: "hsl(var(--success))" }}>
                                <TrendingUp size={20} />
                            </div>
                            <h3 style={{ margin: 0 }}>WELL Representation Revenue</h3>
                        </div>
                        <div style={{ height: "300px", width: "100%" }}>
                            <ResponsiveContainer width="100%" height="100%">
                                <AreaChart data={data?.chartData}>
                                    <defs>
                                        <linearGradient id="colorWell" x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="5%" stopColor="hsl(var(--success))" stopOpacity={0.3} />
                                            <stop offset="95%" stopColor="hsl(var(--success))" stopOpacity={0} />
                                        </linearGradient>
                                    </defs>
                                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border) / 0.4)" vertical={false} />
                                    <XAxis dataKey="month" stroke="hsl(var(--text-primary))" fontSize={11} tickLine={false} axisLine={false} />
                                    <YAxis stroke="hsl(var(--text-primary))" fontSize={11} tickLine={false} axisLine={false} />
                                    <Tooltip
                                        cursor={{ stroke: "hsl(var(--border))", strokeWidth: 1, strokeDasharray: "4 4" }}
                                        contentStyle={{ background: "hsl(var(--surface))", border: "1px solid hsl(var(--border))", borderRadius: "8px", boxShadow: "0 4px 12px rgba(0,0,0,0.1)" }}
                                    />
                                    <Area type="monotone" dataKey="wellRev" name="WELL Rev (USD)" stroke="hsl(var(--success))" fillOpacity={1} fill="url(#colorWell)" strokeWidth={3} activeDot={{ r: 6, strokeWidth: 0, fill: "hsl(var(--success))" }} />
                                </AreaChart>
                            </ResponsiveContainer>
                        </div>
                    </div>

                    {/* 3. Total Containers per month */}
                    <div className="card">
                        <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "1.5rem" }}>
                            <div style={{ padding: "0.5rem", background: "hsl(var(--warning) / 0.15)", borderRadius: "0.5rem", color: "hsl(var(--warning))" }}>
                                <Package size={20} />
                            </div>
                            <h3 style={{ margin: 0 }}>Container Volume</h3>
                        </div>
                        <div style={{ height: "300px", width: "100%" }}>
                            <ResponsiveContainer width="100%" height="100%">
                                <BarChart data={data?.chartData}>
                                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border) / 0.4)" vertical={false} />
                                    <XAxis dataKey="month" stroke="hsl(var(--text-primary))" fontSize={11} tickLine={false} axisLine={false} />
                                    <YAxis stroke="hsl(var(--text-primary))" fontSize={11} tickLine={false} axisLine={false} />
                                    <Tooltip
                                        cursor={{ fill: "hsl(var(--primary) / 0.05)" }}
                                        contentStyle={{ background: "hsl(var(--surface))", border: "1px solid hsl(var(--border))", borderRadius: "8px", boxShadow: "0 4px 12px rgba(0,0,0,0.1)" }}
                                    />
                                    <Bar dataKey="containerCount" name="Total Containers" fill="hsl(var(--warning))" stroke="#333" strokeWidth={0.5} radius={[2, 2, 0, 0]} />
                                </BarChart>
                            </ResponsiveContainer>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}
