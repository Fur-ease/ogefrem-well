import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { format } from "date-fns";
import { Plus, ArrowRight, Anchor, FileCheck, CheckCircle, PackageSearch, BarChart3, Package } from "lucide-react";
import { getContainerCountSummary } from "@/server/well/well-container.service";

export const dynamic = "force-dynamic";

export default async function WellDashboardPage() {
    const [stats, containerSummary] = await Promise.all([
        prisma.$transaction([
            prisma.wellShipment.count(),
            prisma.wellShipment.count({ where: { status: "AVA" } }),
            prisma.wellShipment.count({ where: { status: "FUP" } }),
            prisma.wellShipment.count({ where: { status: "FURO" } }),
            prisma.wellShipment.count({ where: { status: "PCHARGES" } }),
        ]),
        getContainerCountSummary()
    ]);

    const [total, ava, fup, furo, pcharges] = stats;

    const recentShipments = await prisma.wellShipment.findMany({
        take: 5,
        orderBy: { createdAt: "desc" },
    });

    return (
        <div className="animate-fade-in">
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "2rem" }}>
                <div>
                    <h1 style={{ fontSize: "1.75rem", fontWeight: 700, marginBottom: "0.25rem", color: "hsl(var(--text-primary))" }}>
                        WELL Logistics Dashboard
                    </h1>
                    <p style={{ color: "hsl(var(--text-secondary))", fontSize: "0.9rem" }}>
                        Overview of WESTON LOGISTICS LTD operation workflow
                    </p>
                </div>
                <Link href="/well/shipments/new" className="btn btn-primary btn-lg" style={{ gap: "0.5rem" }}>
                    <Plus size={18} /> New Shipment
                </Link>
            </div>

            {/* Stats Row */}
            <div className="stat-card-grid" style={{ display: "grid", gridTemplateColumns: "repeat(6, 1fr)", gap: "1rem", marginBottom: "2rem" }}>
                <div className="stat-card">
                    <div style={{ fontSize: "0.7rem", fontWeight: 600, color: "hsl(var(--text-muted))", letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: "0.5rem" }}>
                        Total Shipments
                    </div>
                    <div style={{ fontSize: "1.75rem", fontWeight: 800, color: "hsl(var(--primary))" }}>{total}</div>
                </div>
                <div className="stat-card" style={{ borderTop: "3px solid hsl(var(--info))" }}>
                    <div style={{ fontSize: "0.7rem", fontWeight: 600, color: "hsl(var(--text-muted))", letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: "0.3rem" }}>
                        Total Containers
                    </div>
                    <div style={{ fontSize: "1.75rem", fontWeight: 800, color: "hsl(var(--text-primary))" }}>{containerSummary.total}</div>
                    <div style={{ fontSize: "0.7rem", color: "hsl(var(--text-muted))", fontWeight: 600, marginTop: "0.2rem" }}>
                        {containerSummary.in_transit} in transit, {containerSummary.delivered} delivered
                    </div>
                </div>
                <div className="stat-card" style={{ borderTop: "3px solid hsl(var(--warning))" }}>
                    <div style={{ fontSize: "0.7rem", fontWeight: 600, color: "hsl(var(--text-muted))", letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: "0.5rem" }}>
                        A.V.A (Awaiting)
                    </div>
                    <div style={{ fontSize: "1.75rem", fontWeight: 800, color: "hsl(var(--warning))" }}>{ava}</div>
                </div>
                <div className="stat-card" style={{ borderTop: "3px solid hsl(var(--info))" }}>
                    <div style={{ fontSize: "0.7rem", fontWeight: 600, color: "hsl(var(--text-muted))", letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: "0.5rem" }}>
                        F.U.P (Follow Up)
                    </div>
                    <div style={{ fontSize: "1.75rem", fontWeight: 800, color: "hsl(var(--info))" }}>{fup}</div>
                </div>
                <div className="stat-card" style={{ borderTop: "3px solid hsl(var(--success))" }}>
                    <div style={{ fontSize: "0.7rem", fontWeight: 600, color: "hsl(var(--text-muted))", letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: "0.5rem" }}>
                        F.U.R.O (Released)
                    </div>
                    <div style={{ fontSize: "1.75rem", fontWeight: 800, color: "hsl(var(--success))" }}>{furo}</div>
                </div>
                <div className="stat-card" style={{ borderTop: "3px solid #8b5cf6" }}>
                    <div style={{ fontSize: "0.7rem", fontWeight: 600, color: "hsl(var(--text-muted))", letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: "0.5rem" }}>
                        P.CHARGES
                    </div>
                    <div style={{ fontSize: "1.75rem", fontWeight: 800, color: "#8b5cf6" }}>{pcharges}</div>
                </div>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "1.5rem" }}>

                {/* Quick Links */}
                <div className="card" style={{ padding: "1.5rem" }}>
                    <h2 style={{ fontSize: "1.1rem", fontWeight: 600, marginBottom: "1rem" }}>Quick Actions</h2>
                    <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                        <Link href="/well/cargo" className="btn btn-secondary" style={{ justifyContent: "flex-start", gap: "0.75rem" }}>
                            <PackageSearch size={18} /> View Daily Cargo Report
                        </Link>
                        <Link href="/well/finance" className="btn btn-secondary" style={{ justifyContent: "flex-start", gap: "0.75rem" }}>
                            <CheckCircle size={18} /> Pending P.Charges Payments
                        </Link>
                        <Link href="/well/analytics" className="btn btn-secondary" style={{ justifyContent: "flex-start", gap: "0.75rem" }}>
                            <BarChart3 size={18} /> View Detailed Analytics
                        </Link>
                    </div>
                </div>

                {/* Recent Activity */}
                <div className="card" style={{ padding: "0", gridColumn: "span 2" }}>
                    <div style={{ padding: "1.5rem", borderBottom: "1px solid hsl(var(--border))", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                        <h2 style={{ fontSize: "1.1rem", fontWeight: 600 }}>Recently Created Shipments</h2>
                        <Link href="/well/cargo" style={{ fontSize: "0.85rem", color: "hsl(var(--primary))", textDecoration: "none", fontWeight: 600 }}>
                            View All &rarr;
                        </Link>
                    </div>
                    <div className="data-table-container">
                        <table className="data-table">
                            <thead>
                                <tr>
                                    <th>Ref</th>
                                    <th>Client</th>
                                    <th>B/L NO.</th>
                                    <th>Status</th>
                                    <th>Created</th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                                {recentShipments.length === 0 && (
                                    <tr>
                                        <td colSpan={6} style={{ textAlign: "center", padding: "2rem", color: "hsl(var(--text-muted))" }}>
                                            No shipments yet.
                                        </td>
                                    </tr>
                                )}
                                {recentShipments.map((s: any) => (
                                    <tr key={s.id}>
                                        <td style={{ fontWeight: 600, fontFamily: "monospace" }}>{s.refNumber}</td>
                                        <td>{s.clientName}</td>
                                        <td style={{ color: "hsl(var(--text-secondary))" }}>{s.blNumber}</td>
                                        <td>
                                            <span className={`status-badge status-well status-${s.status.toLowerCase()}`} style={{ fontWeight: 600, fontSize: "0.75rem", padding: "0.2rem 0.5rem", borderRadius: "0.25rem", background: "rgba(255,255,255,0.1)" }}>
                                                {s.status}
                                            </span>
                                        </td>
                                        <td style={{ color: "hsl(var(--text-muted))", fontSize: "0.85rem" }}>
                                            {format(new Date(s.createdAt), "dd MMM yyyy")}
                                        </td>
                                        <td style={{ textAlign: "right" }}>
                                            <Link href={`/well/shipments/${s.id}`} className="btn btn-ghost btn-sm">
                                                View
                                            </Link>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
}
