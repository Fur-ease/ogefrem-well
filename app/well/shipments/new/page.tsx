"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Loader2, PackagePlus, ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function NewWellShipmentPage() {
    const router = useRouter();
    const [loading, setLoading] = useState(false);

    const [formData, setFormData] = useState({
        clientName: "",
        clientRef: "",
        blNumber: "",
        containerSize: "",
        vesselName: "",
        eta: "",
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            const res = await fetch("/api/well/shipments", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });

            if (!res.ok) {
                const error = await res.json();
                throw new Error(error.error || "Failed to create shipment");
            }

            const shipment = await res.json();
            toast.success(`Shipment created successfully. Ref: ${shipment.refNumber}`);
            router.push(`/well/shipments/${shipment.id}`);
        } catch (error: any) {
            toast.error(error.message);
            setLoading(false);
        }
    };

    return (
        <div className="animate-fade-in" style={{ maxWidth: "800px", margin: "0 auto" }}>
            <Link href="/well" className="btn btn-ghost" style={{ marginBottom: "1.5rem", gap: "0.5rem", display: "inline-flex" }}>
                <ArrowLeft size={16} /> Back to Dashboard
            </Link>

            <div className="card">
                <div style={{ padding: "1.5rem", borderBottom: "1px solid hsl(var(--border))", marginBottom: "1.5rem", display: "flex", gap: "1rem", alignItems: "center" }}>
                    <div style={{ background: "rgba(0, 102, 204, 0.1)", padding: "0.75rem", borderRadius: "12px", color: "hsl(var(--primary))" }}>
                        <PackagePlus size={24} />
                    </div>
                    <div>
                        <h1 style={{ fontSize: "1.25rem", fontWeight: 700 }}>New WELL Shipment</h1>
                        <p style={{ color: "hsl(var(--text-muted))", fontSize: "0.85rem" }}>
                            A unique Ref Number (e.g. WELL/1751) will be automatically generated.
                        </p>
                    </div>
                </div>

                <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "1.5rem", padding: "0 1.5rem 1.5rem 1.5rem" }}>
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.5rem" }}>
                        <div className="form-group">
                            <label>Client Name *</label>
                            <input
                                required
                                placeholder="e.g. AMIRAN"
                                value={formData.clientName}
                                onChange={e => setFormData({ ...formData, clientName: e.target.value })}
                            />
                        </div>

                        <div className="form-group">
                            <label>B/L Number *</label>
                            <input
                                required
                                placeholder="e.g. MEDUWJ566126"
                                value={formData.blNumber}
                                onChange={e => setFormData({ ...formData, blNumber: e.target.value })}
                            />
                        </div>

                        <div className="form-group">
                            <label>Client Reference File</label>
                            <input
                                placeholder="e.g. 25S600032 189"
                                value={formData.clientRef}
                                onChange={e => setFormData({ ...formData, clientRef: e.target.value })}
                            />
                        </div>

                        <div className="form-group">
                            <label>Container Size *</label>
                            <input
                                required
                                placeholder="e.g. 1X20"
                                value={formData.containerSize}
                                onChange={e => setFormData({ ...formData, containerSize: e.target.value })}
                            />
                        </div>

                        <div className="form-group">
                            <label>Vessel Name</label>
                            <input
                                placeholder="e.g. MSC GUERNSEY"
                                value={formData.vesselName}
                                onChange={e => setFormData({ ...formData, vesselName: e.target.value })}
                            />
                        </div>

                        <div className="form-group">
                            <label>Estimated Time of Arrival (E.T.A)</label>
                            <input
                                type="date"
                                value={formData.eta}
                                onChange={e => setFormData({ ...formData, eta: e.target.value })}
                            />
                        </div>
                    </div>

                    <div style={{ display: "flex", justifyContent: "flex-end", marginTop: "1rem" }}>
                        <button type="submit" disabled={loading} className="btn btn-primary btn-lg">
                            {loading ? (
                                <><Loader2 size={18} className="animate-spin" /> Creating...</>
                            ) : (
                                "Create Shipment"
                            )}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
