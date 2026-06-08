"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
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
  X
} from "lucide-react";

interface NavLinkProps {
  href: string;
  icon: React.ReactNode;
  label: string;
  isCollapsed: boolean;
  onClick?: () => void;
}

function NavLink({ href, icon, label, isCollapsed, onClick }: NavLinkProps) {
  return (
    <Link
      href={href}
      className="nav-link"
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
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

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
        style={{
          width: isMobile ? "240px" : sidebarWidth,
          flexShrink: 0,
          background: "hsl(217, 33%, 9%)",
          borderRight: "1px solid hsl(217, 25%, 18%)",
          display: "flex",
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
          style={{
            height: "64px",
            display: "flex",
            alignItems: "center",
            padding: "0 0.75rem 0 1.25rem",
            justifyContent: "space-between",
            borderBottom: "1px solid hsl(217, 25%, 18%)",
            overflow: "hidden",
            position: "relative",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
            <div
              style={{
                width: "32px",
                height: "32px",
                borderRadius: "6px",
                backgroundColor: "hsl(var(--primary))",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontWeight: 800,
                fontSize: "12px",
                color: "#fff",
                flexShrink: 0,
              }}
            >
              OW
            </div>
            {(!isCollapsed || isMobile) && (
              <div style={{ whiteSpace: "nowrap", opacity: isCollapsed && !isMobile ? 0 : 1, transition: "opacity 0.2s" }}>
                <div style={{ fontWeight: 700, fontSize: "0.875rem", color: "hsl(210,20%,96%)" }}>
                  OGEFREM
                </div>
                <div style={{ fontSize: "0.8rem", color: "hsl(213,94%,65%)", fontWeight: 600 }}>
                  WELL
                </div>
              </div>
            )}
          </div>

          {!isMobile && (
            <button
              onClick={() => setIsCollapsed(!isCollapsed)}
              className="btn-ghost"
              style={{
                width: "28px",
                height: "28px",
                padding: 0,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                borderRadius: "6px",
                color: "hsl(var(--text-muted))",
                border: "1px solid hsl(217, 25%, 18%)",
                background: "hsl(217, 33%, 12%)",
              }}
            >
              <div style={{ transform: isCollapsed ? "rotate(180deg)" : "none", transition: "transform 0.3s" }}>
                <ChevronLeft size={16} />
              </div>
            </button>
          )}
        </div>

        {/* Nav Links */}
        <nav style={{ padding: "1rem 0.75rem", display: "flex", flexDirection: "column", gap: "0.25rem", flex: 1 }}>
          <NavLink
            href="/"
            icon={<LayoutDashboard size={20} />}
            label="Dashboard"
            isCollapsed={isCollapsed && !isMobile}
            onClick={() => isMobile && setIsMobileMenuOpen(false)}
          />
          {/* <NavLink 
            href="/shipments/new" 
            icon={<PlusCircle size={20} />} 
            label="New Shipment" 
            isCollapsed={isCollapsed && !isMobile}
            onClick={() => isMobile && setIsMobileMenuOpen(false)}
          /> */}
          <NavLink
            href="/reports"
            icon={<BarChart3 size={20} />}
            label="Reports"
            isCollapsed={isCollapsed && !isMobile}
            onClick={() => isMobile && setIsMobileMenuOpen(false)}
          />
        </nav>

        <div style={{ padding: "1rem 1.5rem", borderTop: "1px solid hsl(217,25%,18%)" }}>
          {(!isCollapsed || isMobile) ? (
            <div style={{ fontSize: "0.7rem", color: "hsl(215,12%,40%)", lineHeight: 1.5 }}>
              OGEFREM — WELL<br />
              Management v1.0
            </div>
          ) : (
            <div style={{ height: "20px" }} />
          )}
        </div>

      </aside>

      {/* Main Area */}
      <div
        style={{
          marginLeft: isMobile ? "0" : sidebarWidth,
          flex: 1,
          display: "flex",
          flexDirection: "column",
          transition: "margin-left 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
          width: "100%",
        }}
      >
        {/* Global Header */}
        <header
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
            {isMobile && (
              <button
                className="btn-ghost"
                onClick={() => setIsMobileMenuOpen(true)}
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
            {!isMobile && (
              <>
                <button className="btn-ghost" style={{ padding: "0.5rem" }}><Search size={19} /></button>
                <button className="btn-ghost" style={{ padding: "0.5rem" }}><Bell size={19} /></button>
                <div style={{ width: "1px", height: "20px", backgroundColor: "hsl(var(--border))" }}></div>
              </>
            )}
            <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
              {!isMobile && <div style={{ fontSize: "0.875rem", fontWeight: 500, color: "hsl(var(--text-primary))" }}>Admin User</div>}
              <div style={{ width: "32px", height: "32px", borderRadius: "50%", backgroundColor: "hsl(var(--surface-2))", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <User size={16} />
              </div>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main style={{ flex: 1, padding: isMobile ? "1.25rem" : "2rem" }}>
          {children}
        </main>
      </div>
    </div>
  );
}
