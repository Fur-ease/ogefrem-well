"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { Loader2, ArrowLeft, Search, Package, Calendar, Anchor, ExternalLink } from "lucide-react";
import Link from "next/link";
import { toast } from "sonner";
import { format } from "date-fns";
import Breadcrumbs from "@/components/well/Breadcrumbs";
import { apis } from "@/lib/api/apis";

export default function WellClientShipmentsPage() {
    const { name } = useParams();
    const [shipments, setShipments] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");
    const clientName = decodeURIComponent(name as string);

    useEffect(() => {
        apis.well.getClientShipments(name as string)
            .then((data) => {
                setShipments(data);
                setLoading(false);
            })
            .catch(() => {
                toast.error("Failed to load client shipments");
                setLoading(false);
            });
    }, [name]);

    const filteredShipments = shipments.filter((s) => {
        const query = searchTerm.toLowerCase();
        return (
            s.refNumber.toLowerCase().includes(query) ||
            s.blNumber.toLowerCase().includes(query) ||
            s.containers?.some((c: any) => c.containerNumber.toLowerCase().includes(query))
        );
    });

    if (loading) {
        return (
            <div style={{ display: "flex", justifyContent: "center", padding: "4rem" }}>
                <Loader2 className="animate-spin" size={32} />
            </div>
        );
    }

    return (
        <div className="animate-fade-in" style={{ paddingBottom: "3rem" }}>
            <Breadcrumbs />

            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: "2rem" }}>
                <div>
                    <h1 style={{ fontSize: "1.75rem", fontWeight: 700, marginBottom: "0.25rem", color: "hsl(var(--text-primary))" }}>
                        {clientName}
                    </h1>
                    <p style={{ color: "hsl(var(--text-secondary))", fontSize: "0.9rem" }}>
                        All shipments associated with this client
                    </p>
                </div>

                <div style={{ position: "relative" }}>
                    <Search style={{ position: "absolute", left: "0.75rem", top: "50%", transform: "translateY(-50%)", color: "hsl(var(--text-muted))" }} size={18} />
                    <input
                        type="text"
                        placeholder="Search Ref or B/L..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        style={{
                            padding: "0.6rem 1rem 0.6rem 2.5rem",
                            borderRadius: "8px",
                            background: "rgba(0,0,0,0.2)",
                            border: "1px solid hsl(var(--border))",
                            color: "#fff",
                            minWidth: "300px"
                        }}
                    />
                </div>
            </div>

            <div className="card" style={{ padding: 0, overflow: "hidden" }}>
                <div className="data-table-container">
                    <table className="data-table">
                        <thead>
                            <tr>
                                <th>Ref Number</th>
                                <th>B/L Number</th>
                                <th>Vessel</th>
                                <th>ETA</th>
                                <th>Status</th>
                                <th>Created</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredShipments.length === 0 ? (
                                <tr>
                                    <td colSpan={7} style={{ textAlign: "center", padding: "4rem", color: "hsl(var(--text-muted))" }}>
                                        No shipments found for this client.
                                    </td>
                                </tr>
                            ) : (
                                filteredShipments.map((s) => (
                                    <tr key={s.id}>
                                        <td style={{ fontWeight: 600, fontFamily: "monospace", color: "hsl(var(--primary))" }}>
                                            {s.refNumber}
                                        </td>
                                        <td style={{ fontWeight: 600 }}>{s.blNumber}</td>
                                        <td>
                                            <div style={{ display: "flex", alignItems: "center", gap: "0.4rem", fontSize: "0.85rem" }}>
                                                <Anchor size={14} color="hsl(var(--text-muted))" />
                                                {s.vesselName || "—"}
                                            </div>
                                        </td>
                                        <td style={{ fontSize: "0.85rem" }}>
                                            {s.eta ? (
                                                <div style={{ display: "flex", alignItems: "center", gap: "0.4rem" }}>
                                                    <Calendar size={14} color="hsl(var(--text-muted))" />
                                                    {format(new Date(s.eta), "dd MMM yyyy")}
                                                </div>
                                            ) : "—"}
                                        </td>
                                        <td>
                                            <span className={`status-badge status-well status-${s.status.toLowerCase()}`}>
                                                {s.status}
                                            </span>
                                        </td>
                                        <td style={{ color: "hsl(var(--text-muted))", fontSize: "0.85rem" }}>
                                            {format(new Date(s.createdAt), "dd MMM yyyy")}
                                        </td>
                                        <td style={{ textAlign: "right" }}>
                                            <Link href={`/well/shipments/${s.id}`} className="btn btn-ghost btn-sm">
                                                <ExternalLink size={14} style={{ marginRight: "0.4rem" }} />
                                                Details
                                            </Link>
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
