import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { StatusBadge } from "@/components/StatusBadge";
// @ts-ignore
import { ShipmentStatus } from "@prisma/client";
import { format } from "date-fns";
import { Decimal } from "@prisma/client/runtime/library";
import { Plus, ArrowRight, Search, Ship, BarChart3, Filter, X, FileDigit, Banknote, BanknoteArrowUpIcon, ArrowBigUpDashIcon, ArrowUp01, ArrowUp, TrendingUp } from "lucide-react";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";

interface SearchParams {
  status?: string;
  month?: string;
  q?: string;
  page?: string;
}

function toNum(v: Decimal | null): string {
  if (!v) return "—";
  return `$${parseFloat(v.toString()).toFixed(2)}`;
}

export default async function DashboardPage({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}) {
  const session = await getServerSession(authOptions);
  if (session?.user?.department === "WELL") {
    redirect("/well");
  }

  const { status: statusFilter, month: monthFilter, q: searchQuery, page } = await searchParams;
  const pageNum = parseInt(page || "1") || 1;
  const pageSize = 10;

  const where: any = {};
  if (statusFilter) where.status = statusFilter as ShipmentStatus;
  if (monthFilter) {
    const [year, mon] = monthFilter.split("-").map(Number);
    where.createdAt = { gte: new Date(year, mon - 1, 1), lt: new Date(year, mon, 1) };
  }
  if (searchQuery) {
    where.OR = [
      { feriNumber: { contains: searchQuery, mode: "insensitive" } },
      { proformaNumber: { contains: searchQuery, mode: "insensitive" } },
      { blNumber: { contains: searchQuery, mode: "insensitive" } },
    ];
  }

  const [shipments, totalCount] = await Promise.all([
    prisma.shipment.findMany({
      where,
      orderBy: { createdAt: "desc" },
      include: { documents: { where: { isReplaced: false } } },
      skip: (pageNum - 1) * pageSize,
      take: pageSize,
    }),
    prisma.shipment.count({ where })
  ]);

  const totalPages = Math.ceil(totalCount / pageSize);

  const aggregate = await prisma.shipment.aggregate({
    where,
    _sum: {
      totalUSD: true,
      wellRevenue: true,
    },
  });

  const stats = {
    total: totalCount,
    completed: await prisma.shipment.count({ where: { ...where, status: ShipmentStatus.COMPLETED } }),
    totalAmountPaid: toNum(aggregate._sum.totalUSD as Decimal | null),
    wellRevenue: toNum(aggregate._sum.wellRevenue as Decimal | null),
  };

  const createPageUrl = (p: number) => {
    const params = new URLSearchParams();
    if (statusFilter) params.set("status", statusFilter);
    if (monthFilter) params.set("month", monthFilter);
    if (searchQuery) params.set("q", searchQuery);
    params.set("page", p.toString());
    return `/?${params.toString()}`;
  };

  return (
    <div className="animate-fade-in">
      {/* Header */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "2rem" }}>
        <div>
          <h1 style={{ fontSize: "1.75rem", fontWeight: 700, marginBottom: "0.25rem", color: "hsl(var(--text-primary))" }}>Dashboard</h1>
          <p style={{ color: "hsl(var(--text-secondary))", fontSize: "0.9rem" }}>
            {totalCount} shipment{totalCount !== 1 ? "s" : ""} matching filters
          </p>
        </div>
        <Link href="/shipments/new" className="btn btn-primary btn-lg" style={{ gap: "0.5rem" }}>
          <Plus size={18} /> New Shipment
        </Link>
      </div>

      {/* Stats Row */}
      <div className="stat-card-grid" style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "1rem", marginBottom: "2rem" }}>
        {[
          { label: "Total Shipments", value: stats.total, color: "hsl(var(--primary))", icon: <Ship size={16} /> },
          { label: "Completed", value: stats.completed, color: "hsl(var(--success))", icon: <BarChart3 size={16} /> },
          { label: "Total Amount Paid", value: stats.totalAmountPaid, color: "hsl(var(--warning))", icon: <Banknote size={16} /> },
          { label: "Well Revenue", value: stats.wellRevenue, color: "hsl(var(--info))", icon: <TrendingUp size={16} /> },
        ].map((s) => (
          <div key={s.label} className="stat-card">
            <div style={{ fontSize: "0.7rem", fontWeight: 600, color: "hsl(var(--text-muted))", letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: "0.5rem", display: "flex", alignItems: "center", gap: "0.5rem" }}>
              {s.icon} {s.label}
            </div>
            <div style={{ fontSize: "1.75rem", fontWeight: 800, color: s.color }}>
              {s.value}
            </div>
          </div>
        ))}
      </div>

      {/* Filters */}
      <form method="GET" style={{ display: "flex", gap: "0.75rem", marginBottom: "1.5rem", alignItems: "flex-end", flexWrap: "wrap" }}>
        <div className="form-group" style={{ flex: "1 1 300px", position: "relative" }}>
          <label htmlFor="q">Search by Feri, Proforma or BL</label>
          <div style={{ position: "relative" }}>
            <Search size={16} style={{ position: "absolute", left: "0.75rem", top: "50%", transform: "translateY(-50%)", color: "hsl(var(--text-muted))" }} />
            <input id="q" name="q" placeholder="Enter number..." defaultValue={searchQuery || ""} style={{ paddingLeft: "2.5rem" }} />
          </div>
        </div>
        <div className="form-group" style={{ flex: "1 1 180px" }}>
          <label htmlFor="status">Status</label>
          <select id="status" name="status" defaultValue={statusFilter || ""}>
            <option value="">All Statuses</option>
            {Object.values(ShipmentStatus).map((s) => (
              <option key={String(s)} value={String(s)}>{String(s).replace("_", " ")}</option>
            ))}
          </select>
        </div>
        <div className="form-group" style={{ flex: "1 1 160px" }}>
          <label htmlFor="month">Month</label>
          <input id="month" type="month" name="month" defaultValue={monthFilter || ""} />
        </div>

        <div style={{ display: "flex", gap: "0.5rem" }}>
          <button type="submit" className="btn btn-secondary" style={{ marginBottom: "0", gap: "0.5rem" }}>
            <Filter size={16} /> Apply
          </button>
          <Link href="/" className="btn btn-ghost" style={{ textDecoration: "none", display: "flex", alignItems: "center", gap: "0.4rem" }}>
            <X size={16} /> Clear
          </Link>
        </div>
      </form>

      {/* Shipments Table */}
      <div className="card" style={{ padding: 0, overflow: "hidden" }}>
        <div className="data-table-container">
          <table className="data-table">
            <thead>
              <tr>
                <th>Client</th>
                <th>BL Number</th>
                <th>Feri</th>
                <th>Containers</th>
                <th>Status</th>
                <th>Total USD</th>
                <th>Docs</th>
                <th>Created</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {shipments.length === 0 ? (
                <tr>
                  <td colSpan={9} style={{ textAlign: "center", padding: "3rem", color: "hsl(var(--text-muted))" }}>
                    No shipments found. <Link href="/shipments/new" style={{ textDecoration: "underline" }}>Create one</Link>
                  </td>
                </tr>
              ) : (
                shipments.map((s: any) => (
                  <tr key={s.id}>
                    <td style={{ fontWeight: 600 }}>{s.clientName}</td>
                    <td style={{ color: "hsl(var(--text-secondary))", fontFamily: "monospace", fontSize: "0.825rem" }}>
                      {s.blNumber}
                    </td>
                    <td style={{ color: "hsl(var(--text-secondary))" }}>{s.feriNumber || "—"}</td>
                    <td style={{ textAlign: "center" }}>
                      <span style={{
                        background: "hsl(var(--surface-3))",
                        padding: "0.2rem 0.5rem",
                        borderRadius: "0.25rem",
                        fontSize: "0.8rem",
                        fontWeight: 600,
                        color: "hsl(var(--text-primary))"
                      }}>
                        {s.containerCount}
                      </span>
                    </td>
                    <td><StatusBadge status={s.status} /></td>
                    <td style={{ fontWeight: 600, color: "hsl(var(--success))" }}>
                      {toNum(s.totalUSD)}
                    </td>
                    <td style={{ color: "hsl(var(--text-muted))" }}>{s.documents.length}</td>
                    <td style={{ color: "hsl(var(--text-muted))", fontSize: "0.825rem" }}>
                      {format(s.createdAt, "dd MMM yyyy")}
                    </td>
                    <td style={{ textAlign: "right" }}>
                      <Link href={`/shipments/${s.id}`} className="btn btn-secondary btn-sm" style={{ gap: "0.4rem" }}>
                        View <ArrowRight size={14} />
                      </Link>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="pagination">
            <div className="pagination-info">
              Showing {(pageNum - 1) * pageSize + 1} to {Math.min(pageNum * pageSize, totalCount)} of {totalCount} entries
            </div>
            <Link
              href={createPageUrl(pageNum - 1)}
              className={`pagination-btn ${pageNum <= 1 ? "disabled" : ""}`}
              style={{ pointerEvents: pageNum <= 1 ? "none" : "auto", opacity: pageNum <= 1 ? 0.5 : 1 }}
            >
              &laquo;
            </Link>
            {[...Array(totalPages)].map((_, i) => (
              <Link
                key={i}
                href={createPageUrl(i + 1)}
                className={`pagination-btn ${pageNum === i + 1 ? "active" : ""}`}
              >
                {i + 1}
              </Link>
            ))}
            <Link
              href={createPageUrl(pageNum + 1)}
              className={`pagination-btn ${pageNum >= totalPages ? "disabled" : ""}`}
              style={{ pointerEvents: pageNum >= totalPages ? "none" : "auto", opacity: pageNum >= totalPages ? 0.5 : 1 }}
            >
              &raquo;
            </Link>
          </div>
        )}
      </div>

    </div>
  );
}

