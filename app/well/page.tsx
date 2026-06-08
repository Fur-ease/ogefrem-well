import { getWellAnalyticsData, getWellOverallStats } from "@/server/services/analytics.service";
import { WellChartsClient } from "@/components/WellChartsClient";
import { Ship, Activity, CheckCircle2, Clock, ArrowRight, BarChart3, TrendingUp, PieChart as PieIcon } from "lucide-react";
import Link from "next/link";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";

export const dynamic = "force-dynamic";

export default async function WellDashboardPage() {
    const session = await getServerSession(authOptions);

    if (!session) {
        redirect("/login");
    }

    if (session.user.role === "OGEFREM") {
        redirect("/");
    }

    const { chartData } = await getWellAnalyticsData();
    const stats = await getWellOverallStats();

    return (
        <div className="animate-fade-in" style={{ paddingBottom: "4rem" }}>
            {/* Header */}
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "2.5rem" }}>
                <div>
                    <h1 style={{ fontSize: "2.25rem", fontWeight: 900, letterSpacing: "-0.03em", marginBottom: "0.5rem" }}>WELL Operations Dashboard</h1>
                    <p style={{ color: "hsl(var(--text-secondary))", fontSize: "1rem" }}>Predictive logistics oversight and departmental performance metrics.</p>
                </div>
                <div style={{ display: "flex", gap: "1rem" }}>
                    <Link href="/well/cargo" className="btn btn-primary" style={{ gap: "0.5rem", padding: "0.75rem 1.25rem" }}>
                        <Ship size={20} /> View Daily Cargo Report <ArrowRight size={18} />
                    </Link>
                </div>
            </div>

            {/* Stats Grid */}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "1.5rem", marginBottom: "2.5rem" }}>
                {[
                    { label: "Total Shipments", value: stats.total, icon: <Activity size={20} />, color: "hsl(var(--primary))" },
                    { label: "Active in Pipeline", value: stats.inPipeline, icon: <Clock size={20} />, color: "hsl(var(--warning))" },
                    { label: "Cleared & Verified", value: stats.cleared, icon: <BarChart3 size={20} />, color: "hsl(var(--info))" },
                    { label: "Finalized Payments", value: stats.paid, icon: <CheckCircle2 size={20} />, color: "hsl(var(--success))" },
                ].map((s, i) => (
                    <div key={i} className="stat-card" style={{ borderLeft: `4px solid ${s.color}` }}>
                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1rem" }}>
                            <div style={{ fontSize: "0.75rem", fontWeight: 700, color: "hsl(var(--text-muted))", textTransform: "uppercase", letterSpacing: "0.06em" }}>{s.label}</div>
                            <div style={{ color: s.color }}>{s.icon}</div>
                        </div>
                        <div style={{ fontSize: "2.25rem", fontWeight: 800, color: s.color }}>{s.value}</div>
                    </div>
                ))}
            </div>

            {/* Charts — rendered via client wrapper to avoid ssr:false restriction */}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(480px, 1fr))", gap: "2rem" }}>
                <div className="card">
                    <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "1.5rem" }}>
                        <TrendingUp size={20} color="hsl(var(--primary))" />
                        <h3 style={{ fontSize: "1.1rem", fontWeight: 700, margin: 0 }}>Monthly Shipment Volume</h3>
                    </div>
                    <div style={{ height: "320px" }}>
                        <WellChartsClient type="bar" data={chartData} />
                    </div>
                </div>

                <div className="card">
                    <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "1.5rem" }}>
                        <PieIcon size={20} color="hsl(var(--secondary))" />
                        <h3 style={{ fontSize: "1.1rem", fontWeight: 700, margin: 0 }}>Shipment Trend</h3>
                    </div>
                    <div style={{ height: "320px" }}>
                        <WellChartsClient type="area" data={chartData} />
                    </div>
                </div>
            </div>
        </div>
    );
}
