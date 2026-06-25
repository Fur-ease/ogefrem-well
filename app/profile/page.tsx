"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { toast } from "sonner";
import { Loader2, User, Lock, Save, LayoutDashboard } from "lucide-react";
import Link from "next/link";
import { apis } from "@/lib/api/apis";

export default function ProfilePage() {
  const { data: session, update } = useSession();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (session?.user?.name) {
      setUsername(session.user.name);
    }
  }, [session]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (password && password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    if (password && password.length < 6) {
      toast.error("Password must be at least 6 characters");
      return;
    }

    setLoading(true);

    try {
      await apis.users.updateProfile({ username, password });
      toast.success("Profile updated successfully");
      setPassword("");
      setConfirmPassword("");
      // Optimistically update session
      await update({ name: username });
    } catch (error: any) {
      toast.error(error.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: "600px" }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "2rem" }}>
        <div>
          <h1 style={{ fontSize: "1.5rem", fontWeight: 700, margin: "0 0 0.5rem" }}>Profile Settings</h1>
          <p style={{ color: "hsl(var(--text-muted))", margin: 0 }}>
            Manage your personal information and security.
          </p>
        </div>
        <Link href="/" className="btn-outline" style={{ textDecoration: "none", display: "flex", alignItems: "center", gap: "0.5rem" }}>
          <LayoutDashboard size={16} />
          Go to Dashboard
        </Link>
      </div>

      <div
        className="card"
        style={{
          background: "hsl(var(--surface))",
          border: "1px solid hsl(var(--border))",
          borderRadius: "12px",
          overflow: "hidden",
        }}
      >
        <div style={{ padding: "1.5rem", borderBottom: "1px solid hsl(var(--border))" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
            <div
              style={{
                width: "64px",
                height: "64px",
                borderRadius: "50%",
                backgroundColor: "hsl(var(--surface-2))",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "hsl(var(--text-secondary))",
              }}
            >
              <User size={32} />
            </div>
            <div>
              <h3 style={{ fontSize: "1.1rem", fontWeight: 600, margin: "0 0 0.25rem" }}>
                {session?.user?.name || "User"}
              </h3>
              <p style={{ color: "hsl(var(--text-muted))", fontSize: "0.9rem", margin: 0 }}>
                {session?.user?.email}
              </p>
              <div style={{
                display: "inline-block",
                marginTop: "0.5rem",
                padding: "2px 8px",
                borderRadius: "12px",
                fontSize: "0.75rem",
                fontWeight: 600,
                backgroundColor: "rgba(56, 189, 248, 0.1)",
                color: "hsl(var(--primary))"
              }}>
                Role: {session?.user?.role || "USER"}
              </div>
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit} style={{ padding: "1.5rem", display: "flex", flexDirection: "column", gap: "1.5rem" }}>

          <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
            <label style={{ fontSize: "0.875rem", fontWeight: 500, color: "hsl(var(--text-secondary))" }}>
              Username
            </label>
            <div style={{ position: "relative" }}>
              <User
                size={18}
                style={{
                  position: "absolute",
                  left: "12px",
                  top: "50%",
                  transform: "translateY(-50%)",
                  color: "hsl(var(--text-muted))",
                }}
              />
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Your name"
                required
                className="input-field"
                style={{ paddingLeft: "40px", width: "100%", maxWidth: "400px" }}
              />
            </div>
          </div>

          <hr style={{ border: 0, borderTop: "1px solid hsl(var(--border))", margin: "0.5rem 0" }} />

          <div>
            <h4 style={{ fontSize: "1rem", fontWeight: 600, marginBottom: "1rem" }}>Change Password</h4>
            <p style={{ color: "hsl(var(--text-muted))", fontSize: "0.875rem", marginBottom: "1rem" }}>
              Leave blank if you don't want to change your password.
            </p>

            <div style={{ display: "flex", flexDirection: "column", gap: "1rem", maxWidth: "400px" }}>
              <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                <label style={{ fontSize: "0.875rem", fontWeight: 500, color: "hsl(var(--text-secondary))" }}>
                  New Password
                </label>
                <div style={{ position: "relative" }}>
                  <Lock
                    size={18}
                    style={{
                      position: "absolute",
                      left: "12px",
                      top: "50%",
                      transform: "translateY(-50%)",
                      color: "hsl(var(--text-muted))",
                    }}
                  />
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="input-field"
                    style={{ paddingLeft: "40px", width: "100%" }}
                  />
                </div>
              </div>

              <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                <label style={{ fontSize: "0.875rem", fontWeight: 500, color: "hsl(var(--text-secondary))" }}>
                  Confirm New Password
                </label>
                <div style={{ position: "relative" }}>
                  <Lock
                    size={18}
                    style={{
                      position: "absolute",
                      left: "12px",
                      top: "50%",
                      transform: "translateY(-50%)",
                      color: "hsl(var(--text-muted))",
                    }}
                  />
                  <input
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="••••••••"
                    className="input-field"
                    style={{ paddingLeft: "40px", width: "100%" }}
                  />
                </div>
              </div>
            </div>
          </div>

          <div style={{ marginTop: "1rem" }}>
            <button
              type="submit"
              disabled={loading}
              className="btn-primary"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "0.5rem",
              }}
            >
              {loading ? <Loader2 className="spin" size={18} /> : <Save size={18} />}
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
