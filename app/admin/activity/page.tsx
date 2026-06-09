"use client";

import { useEffect, useState } from "react";
import { Loader2, Activity } from "lucide-react";
import { format } from "date-fns";

export default function ActivityLogsPage() {
    const [logs, setLogs] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch("/api/activity-logs?limit=200")
            .then(res => res.json())
            .then(data => {
                setLogs(data);
                setLoading(false);
            });
    }, []);

    if (loading) return <div style={{ display: "flex", justifyContent: "center", padding: "4rem" }}><Loader2 className="animate-spin" size={32} /></div>;

    return (
        <div className="animate-fade-in" style={{ paddingBottom: "3rem" }}>
            <div style={{ marginBottom: "2rem" }}>
                <h1 style={{ fontSize: "1.75rem", fontWeight: 700, marginBottom: "0.25rem", color: "hsl(var(--text-primary))" }}>
                    System Audit Logs
                </h1>
                <p style={{ color: "hsl(var(--text-secondary))", fontSize: "0.9rem" }}>
                    Track user actions across all departments
                </p>
            </div>

            <div className="card" style={{ padding: 0 }}>
                <div className="data-table-container">
                    <table className="data-table">
                        <thead>
                            <tr>
                                <th>Time</th>
                                <th>User</th>
                                <th>Action</th>
                                <th>Entity</th>
                                <th>Details</th>
                            </tr>
                        </thead>
                        <tbody>
                            {logs.map(log => (
                                <tr key={log.id}>
                                    <td style={{ color: "hsl(var(--text-secondary))", fontSize: "0.85rem", whiteSpace: "nowrap" }}>
                                        {format(new Date(log.createdAt), "dd MMM yyyy HH:mm")}
                                    </td>
                                    <td>
                                        <div style={{ fontWeight: 600 }}>{log.user.username}</div>
                                        <div style={{ fontSize: "0.8rem", color: "hsl(var(--text-muted))" }}>{log.user.email}</div>
                                    </td>
                                    <td>
                                        <span style={{
                                            background: "rgba(255,255,255,0.05)",
                                            padding: "0.2rem 0.5rem",
                                            borderRadius: "4px",
                                            fontSize: "0.75rem",
                                            fontWeight: 600,
                                            color: "hsl(var(--info))"
                                        }}>
                                            {log.action}
                                        </span>
                                    </td>
                                    <td style={{ fontWeight: 600, color: "hsl(var(--primary))" }}>
                                        {log.entity}
                                        {log.entityId && <span style={{ color: "hsl(var(--text-muted))", fontWeight: 400, marginLeft: "0.5rem", fontSize: "0.8rem" }}>#{log.entityId.slice(-6)}</span>}
                                    </td>
                                    <td style={{ maxWidth: "300px" }}>
                                        {log.detail && (
                                            <pre style={{
                                                margin: 0,
                                                background: "rgba(0,0,0,0.2)",
                                                padding: "0.5rem",
                                                borderRadius: "4px",
                                                fontSize: "0.75rem",
                                                color: "hsl(var(--text-muted))",
                                                whiteSpace: "pre-wrap",
                                                wordBreak: "break-all"
                                            }}>
                                                {log.detail}
                                            </pre>
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
