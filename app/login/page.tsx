"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Loader2, Lock, Mail, ArrowRight, Eye, EyeOff } from "lucide-react";
import Image from "next/image";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await signIn("credentials", {
        redirect: false,
        email,
        password,
      });

      if (res?.error) {
        toast.error("Invalid email or password");
      } else {
        toast.success("Successfully logged in");
        router.push("/");
        router.refresh();
      }
    } catch (error) {
      toast.error("Something went wrong");
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
        position: "relative",
        padding: "1.5rem",
        backgroundColor: "#050a14",
      }}
    >
      {/* Background Image using Next.js Image for reliability */}
      <div style={{ position: "absolute", inset: 0, zIndex: 0 }}>
        <Image
          src="/login-bg.png"
          alt="Login Background"
          fill
          priority
          style={{ objectFit: "cover", opacity: 0.6 }}
        />
      </div>

      {/* Dark Overlay */}
      <div style={{
        position: "absolute",
        inset: 0,
        background: "linear-gradient(to bottom, rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.9))",
        zIndex: 1,
      }} />

      <div
        className="animate-fade-in"
        style={{
          width: "100%",
          maxWidth: "480px",
          padding: "3.5rem 3rem",
          background: "rgba(5, 12, 30, 0.85)",
          backdropFilter: "blur(28px) saturate(180%)",
          borderRadius: "32px",
          position: "relative",
          zIndex: 10,
          boxShadow: "0 50px 100px -20px rgba(0, 0, 0, 0.95)",
          display: "flex",
          flexDirection: "column",
          gap: "2rem",
          border: "1px solid transparent",
          backgroundImage: "linear-gradient(rgba(5, 12, 30, 0.85), rgba(5, 12, 30, 0.85)), linear-gradient(135deg, #0066cc 0%, #fdb913 100%)",
          backgroundOrigin: "border-box",
          backgroundClip: "padding-box, border-box",
        }}
      >
        <div style={{ textAlign: "center", display: "flex", flexDirection: "column", gap: "1.75rem" }}>
          {/* Branded Logo Container */}
          <div style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            gap: "2rem",
            background: "#ffffff",
            padding: "1.5rem 2.5rem",
            borderRadius: "24px",
            boxShadow: "0 15px 40px rgba(0,0,0,0.4), inset 0 0 0 2px #0066cc20"
          }}>
            <div style={{ position: "relative", width: "120px", height: "60px" }}>
              <Image
                src="/logo1.png"
                alt="OGEFREM Logo"
                fill
                priority
                style={{ objectFit: "contain" }}
              />
            </div>
            <div style={{ width: "2px", height: "45px", background: "linear-gradient(to bottom, #0066cc, #fdb913)" }} />
            <div style={{ position: "relative", width: "100px", height: "50px" }}>
              <Image
                src="/logo2.png"
                alt="WELL Logo"
                fill
                priority
                style={{ objectFit: "contain" }}
              />
            </div>
          </div>

          <div>
            <h1 style={{
              fontSize: "2.25rem",
              fontWeight: 900,
              color: "#fff",
              marginBottom: "0.25rem",
              letterSpacing: "-0.04em",
              textShadow: "0 4px 12px rgba(0,0,0,0.5)"
            }}>
              Operations Console
            </h1>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "0.75rem" }}>
              <div style={{ height: "1px", width: "20px", background: "#0066cc" }} />
              <p style={{ color: "#fdb913", fontSize: "0.85rem", fontWeight: 800, textTransform: "uppercase", letterSpacing: "0.15em" }}>
                Secure Gateway
              </p>
              <div style={{ height: "1px", width: "20px", background: "#fdb913" }} />
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
          <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
            <div className="form-group">
              <label style={{ color: "rgba(255,255,255,0.7)", fontSize: "0.75rem", fontWeight: 700, letterSpacing: "0.05em", marginBottom: "0.5rem", display: "block" }}>CORPORATE EMAIL</label>
              <div style={{ position: "relative" }}>
                <Mail
                  size={20}
                  style={{
                    position: "absolute",
                    left: "14px",
                    top: "50%",
                    transform: "translateY(-50%)",
                    color: "#0066cc",
                  }}
                />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@ogefrem.com"
                  required
                  style={{
                    paddingLeft: "48px",
                    background: "rgba(0,0,0,0.4)",
                    border: "1px solid rgba(255,255,255,0.1)",
                    color: "#fff",
                    height: "56px",
                    width: "100%",
                    borderRadius: "14px",
                    fontSize: "1rem",
                    transition: "all 0.3s ease",
                  }}
                />
              </div>
            </div>

            <div className="form-group">
              <label style={{ color: "rgba(255,255,255,0.7)", fontSize: "0.75rem", fontWeight: 700, letterSpacing: "0.05em" }}>OPERATIONS KEY</label>
              <div style={{ position: "relative" }}>
                <Lock
                  size={20}
                  style={{
                    position: "absolute",
                    left: "14px",
                    top: "50%",
                    transform: "translateY(-50%)",
                    color: "#0066cc",
                  }}
                />
                <input
                  value={password}
                  type={showPassword ? "text" : "password"}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                  style={{
                    paddingLeft: "48px",
                    background: "rgba(0,0,0,0.4)",
                    border: "1px solid rgba(255,255,255,0.1)",
                    color: "#fff",
                    height: "56px",
                    width: "100%",
                    borderRadius: "14px",
                    fontSize: "1rem",
                  }}
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-slate-600 focus:outline-none"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              </div>
              <div style={{ display: "flex", justifyContent: "end", alignItems: "center", marginBottom: "0.5rem" }}>
                <a href="/forgot-password" style={{ fontSize: "0.8rem", color: "#fdb913", fontWeight: 800, textDecoration: "none" }}>
                  FORGOT PASSWORD?
                </a>
              </div>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="btn btn-primary"
            style={{
              width: "100%",
              height: "60px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              gap: "0.75rem",
              fontSize: "1.15rem",
              fontWeight: 900,
              borderRadius: "16px",
              background: "linear-gradient(135deg, #0066cc 0%, #004499 100%)",
              border: "none",
              color: "#fff",
              cursor: "pointer",
              boxShadow: "0 20px 40px rgba(0, 102, 204, 0.4)",
              textTransform: "uppercase",
              letterSpacing: "0.08em"
            }}
          >
            {loading ? <Loader2 className="animate-spin" size={26} /> : "Login"}
            {!loading && <ArrowRight size={22} />}
          </button>
        </form>

        <div style={{ textAlign: "center", borderTop: "1px solid rgba(255,255,255,0.1)", paddingTop: "2rem" }}>
          <p style={{ color: "rgba(255,255,255,0.4)", fontSize: "0.85rem", fontWeight: 600 }}>
            OGEFREM &copy; {new Date().getFullYear()} — WELL CARGO SERVICES
          </p>
        </div>
      </div>
    </div>
  );
}
