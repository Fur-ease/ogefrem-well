"use client";

import { useState } from "react";
import Link from "next/link";
import { toast } from "sonner";
import { Loader2, Mail, ArrowLeft, Send } from "lucide-react";
import { apis } from "@/lib/api/apis";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      await apis.auth.forgotPassword(email);
      setSubmitted(true);
      toast.success("Reset link sent");
    } catch (error: any) {
      toast.error(error.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

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
        <div>
          <Link
            href="/login"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "0.5rem",
              color: "hsl(var(--text-muted))",
              textDecoration: "none",
              fontSize: "0.875rem",
              marginBottom: "1.5rem",
              transition: "color 0.2s",
            }}
            className="hover:text-primary"
          >
            <ArrowLeft size={16} />
            Back to Login
          </Link>

          <h1 style={{ fontSize: "1.75rem", fontWeight: 700, color: "hsl(210, 20%, 98%)", margin: "0 0 0.5rem" }}>
            Reset Password
          </h1>
          <p style={{ color: "hsl(var(--text-muted))", fontSize: "0.95rem", margin: 0 }}>
            Enter your email address and we'll send you a link to reset your password.
          </p>
        </div>

        {submitted ? (
          <div style={{ textAlign: "center", padding: "1rem" }}>
            <div
              style={{
                width: "48px",
                height: "48px",
                borderRadius: "50%",
                backgroundColor: "rgba(34, 197, 94, 0.1)",
                color: "rgb(34, 197, 94)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                margin: "0 auto 1rem",
              }}
            >
              <Mail size={24} />
            </div>
            <h3 style={{ fontSize: "1.1rem", fontWeight: 600, color: "#fff", marginBottom: "0.5rem" }}>
              Check your terminal/email
            </h3>
            <p style={{ color: "hsl(var(--text-muted))", fontSize: "0.9rem" }}>
              We've sent password reset instructions to <strong>{email}</strong>
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
            <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
              <label style={{ fontSize: "0.875rem", fontWeight: 500, color: "hsl(var(--text-secondary))" }}>
                Email Address
              </label>
              <div style={{ position: "relative" }}>
                <Mail
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
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@ogefrem.com"
                  required
                  className="input-field"
                  style={{ paddingLeft: "40px", width: "100%" }}
                />
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
              {loading ? <Loader2 className="spin" size={20} /> : "Send Reset Link"}
              {!loading && <Send size={18} />}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
