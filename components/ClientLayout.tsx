"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSession, signOut } from "next-auth/react";
import { useTheme } from "@/components/ThemeProvider";
import {
  LayoutDashboard,
  PlusCircle,
  BarChart3,
  Settings,
  LogOut,
  Bell,
  Search,
  User,
  ChevronLeft,
  Menu,
  Moon,
  Sun,
  X,
  Ship,
  FileDigitIcon,
  Package,
  Truck,
  DollarSign,
  AlertTriangle,
  FileSpreadsheet
} from "lucide-react";

interface NavLinkProps {
  href: string;
  icon: React.ReactNode;
  label: string;
  isCollapsed: boolean;
  isActive: boolean;
  onClick?: () => void;
}

function NavLink({ href, icon, label, isCollapsed, isActive, onClick }: NavLinkProps) {
  return (
    <Link
      href={href}
      className={`nav-link ${isActive ? "active" : ""}`}
      onClick={onClick}
      style={{
        display: "flex",
        alignItems: "center",
        gap: isCollapsed ? "0" : "0.75rem",
        padding: "0.6rem 0.875rem",
        borderRadius: "0.5rem",
        fontSize: "0.875rem",
        fontWeight: 500,
        transition: "all 0.2s ease",
        textDecoration: "none",
        justifyContent: isCollapsed ? "center" : "flex-start",
      }}
      title={isCollapsed ? label : ""}
    >
      <span style={{ display: "flex", alignItems: "center" }}>{icon}</span>
      {!isCollapsed && <span>{label}</span>}
    </Link>
  );
}

export function ClientLayout({ children }: { children: React.ReactNode }) {
  const { data: session } = useSession();
  const { theme, toggleTheme } = useTheme();
  const pathname = usePathname();
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  const isAuthPage = pathname === "/login" || pathname === "/forgot-password" || pathname?.startsWith("/reset-password");

  // Handle window resize for mobile detection
  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth <= 768;
      setIsMobile(mobile);
      if (!mobile) setIsMobileMenuOpen(false);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const sidebarWidth = isCollapsed ? "72px" : "240px";

  if (isAuthPage) {
    return (
      <div style={{ minHeight: "100vh", background: "hsl(var(--background))" }}>
        <main>{children}</main>
      </div>
    );
  }

  return (
    <div style={{ display: "flex", minHeight: "100vh", position: "relative" }}>
      {/* Mobile Backdrop */}
      {isMobile && isMobileMenuOpen && (
        <div
          onClick={() => setIsMobileMenuOpen(false)}
          style={{
            position: "fixed",
            inset: 0,
            backgroundColor: "rgba(0,0,0,0.5)",
            backdropFilter: "blur(4px)",
            zIndex: 90,
          }}
        />
      )}

      {/* Sidebar */}
      <aside
        className="no-print"
        style={{
          width: isMobile ? "240px" : sidebarWidth,
          flexShrink: 0,
          background: "hsl(var(--sidebar-bg))",
          borderRight: "1px solid hsl(var(--sidebar-border))",
          display: "flex",
          overflowY: "auto",
          flexDirection: "column",
          padding: "0",
          position: "fixed",
          top: 0,
          left: isMobile && !isMobileMenuOpen ? "-240px" : 0,
          bottom: 0,
          zIndex: 100,
          transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
        }}
      >
        {/* Logo Section */}
        <div
          onClick={() => isCollapsed && !isMobile && setIsCollapsed(false)}
          style={{
            height: "64px",
            display: "flex",
            alignItems: "center",
            padding: "0 0.75rem",
            justifyContent: isCollapsed && !isMobile ? "center" : "flex-start",
            borderBottom: "1px solid hsl(var(--sidebar-border))",
            overflow: "hidden",
            position: "sticky",
            top: 0,
            zIndex: 20,
            backgroundColor: "hsl(var(--sidebar-bg))",
            gap: "0.25rem",
            cursor: isCollapsed && !isMobile ? "pointer" : "default"
          }}
        >
          <div style={{ flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "center", width: isCollapsed && !isMobile ? "40px" : "48px" }}>
            <img
              src="/logo2.png"
              alt="OGEFREM"
              style={{
                height: isCollapsed && !isMobile ? "20px" : "30px",
                width: "auto",
                objectFit: "contain",
                transition: "all 0.3s ease",
                filter: theme === "dark" ? "drop-shadow(0 0 4px rgba(255,255,255,0.1))" : "none"
              }}
            />
          </div>

          {(!isCollapsed || isMobile) && (
            <div style={{ whiteSpace: "nowrap", opacity: isCollapsed && !isMobile ? 0 : 1, transition: "opacity 0.2s", marginLeft: "0.5rem" }}>
              <div style={{ fontSize: "0.75rem", color: "hsl(var(--primary))", fontWeight: 700, letterSpacing: "0.05em" }}>
                WELL OPS
              </div>
              {/* <div style={{ fontWeight: 800, fontSize: "0.9rem", color: "hsl(var(--text-primary))", letterSpacing: "0.02em" }}>
                OGEFREM
              </div> */}
            </div>
          )}
        </div>

        {/* Nav Links */}
        <nav style={{ padding: "1rem 0.75rem", display: "flex", flexDirection: "column", gap: "0.25rem", flex: 1 }}>

          {/* WELL Section */}
          {(session?.user?.department === "WELL" || session?.user?.department === "ADMIN") && (
            <>
              {session?.user?.department === "ADMIN" && (
                <div style={{ fontSize: "0.7rem", fontWeight: 700, color: "hsl(var(--text-muted))", padding: "0.5rem 0.75rem", marginTop: "0.5rem", letterSpacing: "0.05em" }}>WELL LOGISTICS</div>
              )}
              <NavLink
                href="/well"
                icon={<LayoutDashboard size={20} />}
                label="WELL Dashboard"
                isCollapsed={isCollapsed && !isMobile}
                isActive={pathname === "/well"}
                onClick={() => isMobile && setIsMobileMenuOpen(false)}
              />
              {!isCollapsed && !isMobile && (
                <div style={{ fontSize: "0.68rem", fontWeight: 700, color: "hsl(var(--primary))", padding: "0.75rem 0.75rem 0.25rem", letterSpacing: "0.06em", opacity: 0.8 }}>CARGO OS</div>
              )}
              <NavLink
                href="/well/shipments"
                icon={<Ship size={20} />}
                label="Shipments Tracking"
                isCollapsed={isCollapsed && !isMobile}
                isActive={pathname.startsWith("/well/shipments")}
                onClick={() => isMobile && setIsMobileMenuOpen(false)}
              />
              <NavLink
                href="/well/containers"
                icon={<Package size={20} />}
                label="Containers"
                isCollapsed={isCollapsed && !isMobile}
                isActive={pathname.startsWith("/well/containers")}
                onClick={() => isMobile && setIsMobileMenuOpen(false)}
              />
              <NavLink
                href="/well/cargo"
                icon={<FileSpreadsheet size={20} />}
                label="Daily Cargo Register"
                isCollapsed={isCollapsed && !isMobile}
                isActive={pathname === "/well/cargo"}
                onClick={() => isMobile && setIsMobileMenuOpen(false)}
              />
              <NavLink
                href="/well/finance"
                icon={<DollarSign size={20} />}
                label="Finance"
                isCollapsed={isCollapsed && !isMobile}
                isActive={pathname === "/well/finance"}
                onClick={() => isMobile && setIsMobileMenuOpen(false)}
              />
              <NavLink
                href="/well/analytics"
                icon={<BarChart3 size={20} />}
                label="Analytics"
                isCollapsed={isCollapsed && !isMobile}
                isActive={pathname === "/well/analytics"}
                onClick={() => isMobile && setIsMobileMenuOpen(false)}
              />
            </>
          )}

          {/* OGEFREM Section */}
          {(session?.user?.department === "OGEFREM" || session?.user?.department === "ADMIN") && (
            <>
              {session?.user?.department === "ADMIN" && (
                <div style={{ fontSize: "0.7rem", fontWeight: 700, color: "hsl(var(--text-muted))", padding: "0.5rem 0.75rem", marginTop: "0.5rem", letterSpacing: "0.05em" }}>OGEFREM</div>
              )}
              <NavLink
                href="/"
                icon={<LayoutDashboard size={20} />}
                label="Dashboard"
                isCollapsed={isCollapsed && !isMobile}
                isActive={pathname === "/"}
                onClick={() => isMobile && setIsMobileMenuOpen(false)}
              />
              <NavLink
                href="/reports"
                icon={<FileDigitIcon size={20} />}
                label="Reports"
                isCollapsed={isCollapsed && !isMobile}
                isActive={pathname === "/reports"}
                onClick={() => isMobile && setIsMobileMenuOpen(false)}
              />
              <NavLink
                href="/analytics"
                icon={<BarChart3 size={20} />}
                label="Analytics"
                isCollapsed={isCollapsed && !isMobile}
                isActive={pathname === "/analytics"}
                onClick={() => isMobile && setIsMobileMenuOpen(false)}
              />
            </>
          )}

          {/* ADMIN Section */}
          {session?.user?.role === "ADMIN" && (
            <>
              <div style={{ margin: "1rem 0", borderBottom: "1px solid hsl(217, 25%, 18%)" }} />
              <div style={{ fontSize: "0.7rem", fontWeight: 700, color: "hsl(var(--text-muted))", padding: "0.5rem 0.75rem", letterSpacing: "0.05em" }}>ADMINISTRATION</div>
              <NavLink
                href="/admin/users"
                icon={<User size={20} />}
                label="User Management"
                isCollapsed={isCollapsed && !isMobile}
                isActive={pathname === "/admin/users"}
                onClick={() => isMobile && setIsMobileMenuOpen(false)}
              />
              <NavLink
                href="/admin/activity"
                icon={<LayoutDashboard size={20} />}
                label="Activity Logs"
                isCollapsed={isCollapsed && !isMobile}
                isActive={pathname === "/admin/activity"}
                onClick={() => isMobile && setIsMobileMenuOpen(false)}
              />
            </>
          )}

          <div style={{ margin: "1rem 0", borderBottom: "1px solid hsl(217, 25%, 18%)" }} />

          <NavLink
            href="/profile"
            icon={<Settings size={20} />}
            label="Profile Setup"
            isCollapsed={isCollapsed && !isMobile}
            isActive={pathname === "/profile"}
            onClick={() => isMobile && setIsMobileMenuOpen(false)}
          />
          <button
            onClick={() => signOut({ callbackUrl: "/login" })}
            className="nav-link"
            style={{
              display: "flex",
              alignItems: "center",
              gap: isCollapsed && !isMobile ? "0" : "0.75rem",
              padding: "0.6rem 0.875rem",
              borderRadius: "0.5rem",
              fontSize: "0.875rem",
              fontWeight: 500,
              transition: "all 0.2s ease",
              background: "transparent",
              border: "none",
              color: "hsl(var(--text-secondary))",
              cursor: "pointer",
              justifyContent: isCollapsed && !isMobile ? "center" : "flex-start",
              width: "100%",
              marginTop: "auto",
            }}
            title={isCollapsed && !isMobile ? "Log out" : ""}
          >
            <span style={{ display: "flex", alignItems: "center", color: "hsl(var(--destructive))" }}><LogOut size={20} /></span>
            {!(isCollapsed && !isMobile) && <span style={{ color: "hsl(var(--destructive))" }}>Log out</span>}
          </button>
        </nav>

        <div style={{ padding: "1rem 1.5rem", borderTop: "1px solid hsl(var(--sidebar-border))" }}>
          {(!isCollapsed || isMobile) ? (
            <div style={{ fontSize: "0.7rem", color: "hsl(var(--text-muted))", lineHeight: 1.5 }}>
              Cargo OS v2.0<br />
              WELL Operations
            </div>
          ) : (
            <div style={{ height: "20px" }} />
          )}
        </div>

      </aside>

      {/* Main Area */}
      <div
        className="print-reset-margin"
        style={{
          marginLeft: isMobile ? "0" : sidebarWidth,
          flex: 1,
          display: "flex",
          flexDirection: "column",
          transition: "margin-left 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
          minWidth: 0, // Critical for flex children to respect boundaries
        }}
      >
        {/* Global Header */}
        <header
          className="no-print"
          style={{
            height: "64px",
            borderBottom: "1px solid hsl(var(--border))",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "0 1rem",
            backgroundColor: "hsl(var(--background))",
            position: "sticky",
            top: 0,
            zIndex: 40,
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
            {isMobile ? (
              <button
                className="btn-ghost"
                onClick={() => setIsMobileMenuOpen(true)}
                style={{ padding: "0.5rem" }}
              >
                <Menu size={24} />
              </button>
            ) : (
              <button
                className="btn-ghost"
                onClick={() => setIsCollapsed(!isCollapsed)}
                style={{ padding: "0.5rem" }}
              >
                <Menu size={24} />
              </button>
            )}
            <div style={{ color: "hsl(var(--text-secondary))", fontSize: "0.9rem", fontWeight: 500 }}>
              {isMobile ? "OGEFREM WELL" : "Operations Console"}
            </div>
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
            {/* {!isMobile && (
              <>
                <button className="btn-ghost" style={{ padding: "0.5rem" }}><Search size={19} /></button>
                <button className="btn-ghost" style={{ padding: "0.5rem" }}><Bell size={19} /></button>
                <div style={{ width: "1px", height: "20px", backgroundColor: "hsl(var(--border))" }} />
              </>
            )} */}
            {/* Theme Toggle — always visible */}
            <button
              className="theme-toggle"
              onClick={toggleTheme}
              title={theme === "dark" ? "Switch to Light Mode" : "Switch to Dark Mode"}
            >
              {theme === "dark" ? <Sun size={17} /> : <Moon size={17} />}
            </button>
            <div style={{ width: "1px", height: "20px", backgroundColor: "hsl(var(--border))" }} />
            <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
              {!isMobile && <div style={{ fontSize: "0.875rem", fontWeight: 500, color: "hsl(var(--text-primary))" }}>{session?.user?.name || "User"}</div>}
              <Link href="/profile" style={{ width: "32px", height: "32px", borderRadius: "50%", backgroundColor: "hsl(var(--primary))", display: "flex", alignItems: "center", justifyContent: "center", textDecoration: "none", color: "#fff", transition: "opacity 0.2s" }} className="hover:opacity-80">
                <User size={16} />
              </Link>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="print-reset-padding" style={{ flex: 1, padding: isMobile ? "1.25rem" : "2rem", minWidth: 0, overflowX: "hidden" }}>
          <div className="print-reset-max-width" style={{ maxWidth: "1400px", margin: "0 auto", width: "100%" }}>
            {children}
          </div>
        </main>
      </div>

      <style jsx global>{`
        @media print {
          .no-print {
            display: none !important;
          }
          .print-reset-margin {
            margin-left: 0 !important;
          }
          .print-reset-padding {
            padding: 0 !important;
          }
          .print-reset-max-width {
            max-width: none !important;
            margin: 0 !important;
          }
        }
      `}</style>
    </div>
  );
}
