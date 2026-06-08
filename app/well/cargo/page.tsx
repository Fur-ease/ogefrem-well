import { listWellShipments, getUniqueWellClients } from "@/server/services/shipment.service";
import { WellCargoTable } from "@/components/WellCargoTable";
import { Ship, ChevronLeft, Plus } from "lucide-react";
import Link from "next/link";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";

export const dynamic = "force-dynamic";

export default async function WellCargoPage() {
    const session = await getServerSession(authOptions);

    if (!session) {
        redirect("/login");
    }

    if (session.user.role === "OGEFREM") {
        redirect("/");
    }

    const shipments: any = await listWellShipments({});
    const clients = await getUniqueWellClients();

    return (
        <div className="animate-fade-in" style={{ maxWidth: "100%", padding: "0 1rem 4rem" }}>
            {/* Header */}
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "2rem" }}>
                <div>
                    <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "0.5rem" }}>
                        <Link href="/well" style={{ color: "hsl(var(--text-muted))", display: "flex", alignItems: "center", gap: "0.25rem", textDecoration: "none", fontSize: "0.85rem" }}>
                            <ChevronLeft size={16} /> Back to Dashboard
                        </Link>
                    </div>
                    <h1 style={{ fontSize: "2rem", fontWeight: 800, letterSpacing: "-0.02em" }}>Daily Cargo Report</h1>
                    <p style={{ color: "hsl(var(--text-secondary))", fontSize: "0.95rem" }}>
                        Complete tracking and monitoring for all WELL department shipments.
                    </p>
                </div>
                <Link href="/shipments/new?source=WELL" className="btn btn-primary" style={{ gap: "0.5rem" }}>
                    <Plus size={18} /> New WELL Shipment
                </Link>
            </div>

            <WellCargoTable initialShipments={shipments} clients={clients} />
        </div>
    );
}
