"use client";

import { useEffect, useState } from "react";
import { Loader2, Search, Filter, User, Package, CheckCircle, Clock } from "lucide-react";
import Link from "next/link";
import { toast } from "sonner";
import Breadcrumbs from "@/components/well/Breadcrumbs";

export default function WellShipmentsListPage() {
    const [clients, setClients] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");

    const fetchClients = (q?: string) => {
        setLoading(true);
        const url = q ? `/api/well/clients?q=${encodeURIComponent(q)}` : "/api/well/clients";
        fetch(url)
            .then((res) => res.json())
            .then((data) => {
                setClients(data);
                setLoading(false);
            })
            .catch(() => {
                toast.error("Failed to load client data");
                setLoading(false);
            });
    };

    useEffect(() => {
        fetchClients();
    }, []);

    const handleSearch = () => {
        fetchClients(searchTerm);
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === "Enter") {
            handleSearch();
        }
    };

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
                        Shipments by Client
                    </h1>
                    <p style={{ color: "hsl(var(--text-secondary))", fontSize: "0.9rem" }}>
                        Overview of logistics volume and status per client
                    </p>
                </div>

                <div style={{ display: "flex", gap: "0.5rem" }}>
                    <div style={{ position: "relative" }}>
                        <Search style={{ position: "absolute", left: "0.75rem", top: "50%", transform: "translateY(-50%)", color: "hsl(var(--text-muted))" }} size={18} />
                        <input
                            type="text"
                            placeholder="Search clients or container #..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            onKeyDown={handleKeyDown}
                            style={{
                                padding: "0.6rem 1rem 0.6rem 2.5rem",
                                borderRadius: "8px",
                                background: "white",
                                border: "1px solid hsl(var(--border))",
                                color: "black",
                                minWidth: "300px"
                            }}
                        />
                    </div>
                    <button
                        onClick={handleSearch}
                        className="btn btn-secondary"
                        style={{ background: "hsl(var(--primary))", color: "white", border: "none" }}
                    >
                        Search
                    </button>
                </div>
            </div>

            <div className="card" style={{ padding: 0, overflow: "hidden" }}>
                <div className="data-table-container">
                    <table className="data-table">
                        <thead>
                            <tr>
                                <th>Client Name</th>
                                <th>Total Shipments</th>
                                <th>Completed</th>
                                <th>Ongoing</th>
                                <th>Status</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {clients.length === 0 ? (
                                <tr>
                                    <td colSpan={6} style={{ textAlign: "center", padding: "4rem", color: "hsl(var(--text-muted))" }}>
                                        No clients found.
                                    </td>
                                </tr>
                            ) : (
                                clients.map((c) => (
                                    <tr key={c.clientName}>
                                        <td style={{ fontWeight: 600 }}>
                                            <Link
                                                href={`/well/shipments/client/${encodeURIComponent(c.clientName)}`}
                                                style={{ color: "hsl(var(--primary))", textDecoration: "none", display: "flex", alignItems: "center", gap: "0.5rem" }}
                                            >
                                                <User size={16} />
                                                {c.clientName}
                                            </Link>
                                        </td>
                                        <td style={{ fontWeight: 600 }}>{c.total}</td>
                                        <td style={{ color: "hsl(var(--success))" }}>
                                            <div style={{ display: "flex", alignItems: "center", gap: "0.4rem" }}>
                                                <CheckCircle size={14} />
                                                {c.completed}
                                            </div>
                                        </td>
                                        <td style={{ color: "hsl(var(--warning))" }}>
                                            <div style={{ display: "flex", alignItems: "center", gap: "0.4rem" }}>
                                                <Clock size={14} />
                                                {c.ongoing}
                                            </div>
                                        </td>
                                        <td>
                                            <div style={{ width: "100px", height: "8px", background: "rgba(255,255,255,0.1)", borderRadius: "4px", overflow: "hidden" }}>
                                                <div
                                                    style={{
                                                        width: `${(c.completed / c.total) * 100}%`,
                                                        height: "100%",
                                                        background: "hsl(var(--success))"
                                                    }}
                                                />
                                            </div>
                                        </td>
                                        <td style={{ textAlign: "right" }}>
                                            <Link
                                                href={`/well/shipments/client/${encodeURIComponent(c.clientName)}`}
                                                className="btn btn-ghost btn-sm"
                                            >
                                                View Shipments
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
