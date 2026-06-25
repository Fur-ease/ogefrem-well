"use client";

import { useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { toast } from "sonner";
import { Loader2, Lock, ArrowRight, CheckCircle2 } from "lucide-react";
import { apis } from "@/lib/api/apis";

function ResetPasswordForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  if (!token) {
    return (
      <div style={{ textAlign: "center", padding: "2rem 0" }}>
        <h2 style={{ color: "hsl(var(--destructive))", marginBottom: "1rem" }}>Invalid Link</h2>
        <p style={{ color: "hsl(var(--text-muted))", marginBottom: "2rem" }}>
          This password reset link is invalid or missing a token.
        </p>
        <Link href="/forgot-password" className="btn-primary" style={{ textDecoration: "none", display: "inline-block" }}>
          Request a new link
        </Link>
      </div>
    );
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    if (password.length < 6) {
      toast.error("Password must be at least 6 characters");
      return;
    }

    setLoading(true);

    try {
      await apis.auth.resetPassword({ token, password });
      setSuccess(true);
      toast.success("Password updated successfully");
    } catch (error: any) {
      toast.error(error.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div style={{ textAlign: "center", padding: "1rem" }}>
        <div
          style={{
            width: "56px",
            height: "56px",
            borderRadius: "50%",
            backgroundColor: "rgba(34, 197, 94, 0.1)",
            color: "rgb(34, 197, 94)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            margin: "0 auto 1.5rem",
          }}
        >
          <CheckCircle2 size={32} />
        </div>
        <h2 style={{ fontSize: "1.5rem", fontWeight: 700, color: "#fff", marginBottom: "0.5rem" }}>
          Password Reset!
        </h2>
        <p style={{ color: "hsl(var(--text-muted))", marginBottom: "2rem" }}>
          Your password has been successfully updated.
        </p>
        <button
          onClick={() => router.push("/login")}
          className="btn-primary"
          style={{ width: "100%", padding: "0.875rem" }}
        >
          Go to Login
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
      <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
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
              required
              className="input-field"
              style={{ paddingLeft: "40px", width: "100%" }}
            />
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
          <label style={{ fontSize: "0.875rem", fontWeight: 500, color: "hsl(var(--text-secondary))" }}>
            Confirm Password
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
              required
              className="input-field"
              style={{ paddingLeft: "40px", width: "100%" }}
            />
          </div>
        </div>
      </div>

      <button
        type="submit"
        disabled={loading}
        className="btn-primary"
        style={{
          width: "100%",
          padding: "0.875rem",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          gap: "0.5rem",
          fontSize: "1rem",
          fontWeight: 600,
        }}
      >
        {loading ? <Loader2 className="spin" size={20} /> : "Update Password"}
        {!loading && <ArrowRight size={18} />}
      </button>
    </form>
  );
}

export default function ResetPasswordPage() {
  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "radial-gradient(ellipse at center, hsl(217, 33%, 12%) 0%, hsl(217, 33%, 9%) 100%)",
        position: "relative",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: "420px",
          padding: "2.5rem",
          background: "rgba(20, 25, 35, 0.6)",
          backdropFilter: "blur(12px)",
          border: "1px solid hsl(217, 25%, 18%)",
          borderRadius: "16px",
          boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.5)",
          display: "flex",
          flexDirection: "column",
          gap: "2rem",
          zIndex: 10,
        }}
      >
        <div style={{ textAlign: "center" }}>
          <h1 style={{ fontSize: "1.75rem", fontWeight: 700, color: "hsl(210, 20%, 98%)", margin: "0 0 0.5rem" }}>
            Create New Password
          </h1>
          <p style={{ color: "hsl(var(--text-muted))", fontSize: "0.95rem", margin: 0 }}>
            Your new password must be securely formed.
          </p>
        </div>

        <Suspense fallback={<div style={{ textAlign: "center", padding: "2rem" }}><Loader2 className="spin" size={24} /></div>}>
          <ResetPasswordForm />
        </Suspense>
      </div>
    </div>
  );
}
