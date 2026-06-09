"use client";

import { useEffect, useState } from "react";
import { Loader2, ShieldAlert, UserCog, Ban, CheckCircle } from "lucide-react";
import { toast } from "sonner";
import { format } from "date-fns";

export default function AdminUsersPage() {
    const [users, setUsers] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    // New user form
    const [newUser, setNewUser] = useState({
        username: "",
        email: "",
        password: "",
        role: "USER",
        department: "WELL"
    });

    const fetchUsers = async () => {
        try {
            const res = await fetch("/api/users");
            const data = await res.json();
            setUsers(data);
        } catch {
            toast.error("Failed to fetch users");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    const handleCreateUser = async (e: React.FormEvent) => {
        e.preventDefault();
        const tId = toast.loading("Creating user...");
        try {
            const res = await fetch("/api/users", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(newUser),
            });

            if (!res.ok) {
                const err = await res.json();
                throw new Error(err.error);
            }

            toast.success("User created", { id: tId });
            setNewUser({ username: "", email: "", password: "", role: "USER", department: "WELL" });
            fetchUsers();
        } catch (error: any) {
            toast.error(error.message, { id: tId });
        }
    };

    const toggleSuspend = async (id: string, currentStatus: boolean) => {
        const tId = toast.loading("Updating status...");
        try {
            const res = await fetch(`/api/users/${id}`, {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ isSuspended: !currentStatus }),
            });
            if (!res.ok) throw new Error("Update failed");
            toast.success(currentStatus ? "User reactivated" : "User suspended", { id: tId });
            fetchUsers();
        } catch (error) {
            toast.error("Failed to update user", { id: tId });
        }
    };

    const updateDepartment = async (id: string, department: string) => {
        try {
            await fetch(`/api/users/${id}`, {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ department }),
            });
            toast.success("Department changed");
            fetchUsers();
        } catch (error) {
            toast.error("Failed to change department");
        }
    };

    if (loading) return <div style={{ display: "flex", justifyContent: "center", padding: "4rem" }}><Loader2 className="animate-spin" size={32} /></div>;

    return (
        <div className="animate-fade-in" style={{ paddingBottom: "3rem" }}>
            <div style={{ marginBottom: "2rem" }}>
                <h1 style={{ fontSize: "1.75rem", fontWeight: 700, marginBottom: "0.25rem", color: "hsl(var(--text-primary))" }}>
                    User Management
                </h1>
                <p style={{ color: "hsl(var(--text-secondary))", fontSize: "0.9rem" }}>
                    Manage system access, roles, and departments
                </p>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 2fr", gap: "2rem" }}>
                {/* Create User Form */}
                <div className="card" style={{ padding: "1.5rem", height: "fit-content" }}>
                    <h2 style={{ fontSize: "1.2rem", fontWeight: 600, marginBottom: "1.5rem", display: "flex", alignItems: "center", gap: "0.5rem" }}>
                        <UserCog size={20} color="hsl(var(--primary))" /> Create New User
                    </h2>
                    <form onSubmit={handleCreateUser} style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                        <div className="form-group">
                            <label>Name</label>
                            <input required value={newUser.username} onChange={e => setNewUser({ ...newUser, username: e.target.value })} placeholder="John Doe" />
                        </div>
                        <div className="form-group">
                            <label>Email</label>
                            <input required type="email" value={newUser.email} onChange={e => setNewUser({ ...newUser, email: e.target.value })} placeholder="john@ogefrem.com" />
                        </div>
                        <div className="form-group">
                            <label>Password</label>
                            <input required type="password" value={newUser.password} onChange={e => setNewUser({ ...newUser, password: e.target.value })} placeholder="••••••••" />
                        </div>
                        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
                            <div className="form-group">
                                <label>System Role</label>
                                <select value={newUser.role} onChange={e => setNewUser({ ...newUser, role: e.target.value })}>
                                    <option value="USER">User</option>
                                    <option value="ADMIN">Admin</option>
                                </select>
                            </div>
                            <div className="form-group">
                                <label>Department</label>
                                <select value={newUser.department} onChange={e => setNewUser({ ...newUser, department: e.target.value })}>
                                    <option value="WELL">WELL</option>
                                    <option value="OGEFREM">OGEFREM</option>
                                    <option value="ADMIN">All (ADMIN)</option>
                                </select>
                            </div>
                        </div>
                        <button type="submit" className="btn btn-primary" style={{ marginTop: "1rem" }}>Create User</button>
                    </form>
                </div>

                {/* Users List */}
                <div className="card" style={{ padding: 0 }}>
                    <div className="data-table-container">
                        <table className="data-table">
                            <thead>
                                <tr>
                                    <th>User</th>
                                    <th>Role</th>
                                    <th>Department</th>
                                    <th>Status</th>
                                    <th>Created</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {users.map(u => (
                                    <tr key={u.id} style={{ opacity: u.isSuspended ? 0.6 : 1 }}>
                                        <td>
                                            <div style={{ fontWeight: 600 }}>{u.username}</div>
                                            <div style={{ fontSize: "0.8rem", color: "hsl(var(--text-muted))" }}>{u.email}</div>
                                        </td>
                                        <td>
                                            <span className={`status-badge ${u.role === "ADMIN" ? "status-shipped" : "status-draft"}`}>
                                                {u.role}
                                            </span>
                                        </td>
                                        <td>
                                            <select
                                                value={u.department}
                                                onChange={(e) => updateDepartment(u.id, e.target.value)}
                                                disabled={u.role === "ADMIN"}
                                                style={{ padding: "0.2rem 0.5rem", borderRadius: "4px", border: "1px solid hsl(var(--border))", background: "transparent", color: "inherit", cursor: u.role === "ADMIN" ? "not-allowed" : "pointer" }}
                                            >
                                                <option value="WELL" style={{ color: '#000' }}>WELL</option>
                                                <option value="OGEFREM" style={{ color: '#000' }}>OGEFREM</option>
                                                <option value="ADMIN" style={{ color: '#000' }}>ADMIN</option>
                                            </select>
                                        </td>
                                        <td>
                                            {u.isSuspended ? (
                                                <span style={{ color: "hsl(var(--error))", display: "flex", alignItems: "center", gap: "0.4rem", fontSize: "0.8rem", fontWeight: 600 }}><Ban size={14} /> Suspended</span>
                                            ) : (
                                                <span style={{ color: "hsl(var(--success))", display: "flex", alignItems: "center", gap: "0.4rem", fontSize: "0.8rem", fontWeight: 600 }}><CheckCircle size={14} /> Active</span>
                                            )}
                                        </td>
                                        <td style={{ color: "hsl(var(--text-muted))", fontSize: "0.85rem" }}>
                                            {format(new Date(u.createdAt), "dd MMM yyyy")}
                                        </td>
                                        <td>
                                            {u.role !== "ADMIN" && (
                                                <button
                                                    onClick={() => toggleSuspend(u.id, u.isSuspended)}
                                                    className={`btn btn-sm ${u.isSuspended ? "btn-success" : "btn-danger"}`}
                                                    style={{ padding: "0.4rem 0.75rem", fontSize: "0.75rem", gap: "0.4rem" }}
                                                >
                                                    {u.isSuspended ? <CheckCircle size={14} /> : <Ban size={14} />}
                                                    {u.isSuspended ? "Reactivate" : "Suspend"}
                                                </button>
                                            )}
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
