"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { PackagePlus, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { apis } from "@/lib/api/apis";
import { Input, FormSection, Button } from "@/components/well/FormControls";
import { ContainerBulkAddForm } from "@/components/well/ContainerBulkAddForm";
import { ClientSelect } from "@/components/well/ClientSelect";

export default function NewWellShipmentPage() {
    const router = useRouter();
    const [loading, setLoading] = useState(false);

    const [formData, setFormData] = useState<any>({
        clientName: "",
        clientRef: "",
        blNumber: "",
        containerSize: "",
        vesselName: "",
        eta: "",
        shippingLine: "MSC",
        origin: "Mombasa Port",
        destination: "Nairobi CFS",
        finalDelivery: "",
        transporter: "",
        assignedOperator: "Operations Team",
        initialNote: "",
        containers: []
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        try {
            const res = await apis.well.createShipment(formData);
            toast.success(`Shipment registered successfully! Assigned Ref: ${res.refNumber}`);
            router.push(`/well/shipments/${res.id}`);
        } catch (err: any) {
            toast.error(err.message || "Failed to register shipment");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={{ maxWidth: "1300px", margin: "0 auto", paddingBottom: "3rem" }}>
            <Link
                href="/well/shipments"
                style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "0.4rem",
                    fontSize: "0.85rem",
                    color: "hsl(var(--text-secondary))",
                    marginBottom: "1rem",
                    textDecoration: "none"
                }}
            >
                <ArrowLeft size={16} /> Back to Cargo List
            </Link>

            <div className="card">
                <div style={{ padding: "1.5rem", borderBottom: "1px solid hsl(var(--border))", marginBottom: "1.5rem", display: "flex", gap: "1rem", alignItems: "center" }}>
                    <div style={{ background: "hsl(var(--primary) / 0.12)", padding: "0.75rem", borderRadius: "12px", color: "hsl(var(--primary))" }}>
                        <PackagePlus size={24} />
                    </div>
                    <div>
                        <h1 style={{ fontSize: "1.25rem", fontWeight: 700, margin: 0 }}>New Cargo Shipment</h1>
                        <p style={{ color: "hsl(var(--text-muted))", fontSize: "0.83rem", margin: "0.2rem 0 0" }}>
                            A unique Ref Number (e.g. WELL/1751) will be automatically assigned upon first registration.
                        </p>
                    </div>
                </div>

                <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "1.5rem", padding: "0 1.5rem 1.5rem 1.5rem" }}>
                    <FormSection title="Core B/L & Client Details">
                        <ClientSelect
                            label="Client Name *"
                            required
                            value={formData.clientName}
                            onChange={val => setFormData({ ...formData, clientName: val })}
                        />
                        <Input
                            label="Bill of Lading (B/L)"
                            required
                            mono
                            placeholder="e.g. MEDUWJ566126"
                            value={formData.blNumber}
                            onChange={e => setFormData({ ...formData, blNumber: e.target.value.toUpperCase() })}
                        />
                        <Input
                            label="Client Reference / File #"
                            placeholder="e.g. 25S600032 189"
                            value={formData.clientRef}
                            onChange={e => setFormData({ ...formData, clientRef: e.target.value })}
                        />
                        <Input
                            label="Container Size / Description"
                            required
                            placeholder="e.g. 1X20, 2X40, 40FT HQ"
                            value={formData.containerSize}
                            onChange={e => setFormData({ ...formData, containerSize: e.target.value })}
                        />
                        <Input
                            label="Vessel Name"
                            placeholder="e.g. MSC GUERNSEY"
                            value={formData.vesselName}
                            onChange={e => setFormData({ ...formData, vesselName: e.target.value })}
                        />
                        <Input
                            label="Shipping Line"
                            placeholder="e.g. MSC / MAERSK / CMA CGM"
                            value={formData.shippingLine}
                            onChange={e => setFormData({ ...formData, shippingLine: e.target.value })}
                        />
                        <Input
                            label="Port of Origin"
                            placeholder="e.g. Shanghai / Mombasa"
                            value={formData.origin}
                            onChange={e => setFormData({ ...formData, origin: e.target.value })}
                        />
                        <Input
                            label="Destination / Nominated CFS"
                            placeholder="e.g. FOCUS / INTERPEL / ICD EMBAKASI"
                            value={formData.destination}
                            onChange={e => setFormData({ ...formData, destination: e.target.value })}
                        />
                        <Input
                            label="Final Delivery Destination"
                            placeholder="e.g. FOCUS / INTERPEL / ICD EMBAKASI / Customer Warehouse"
                            value={formData.finalDelivery}
                            onChange={e => setFormData({ ...formData, finalDelivery: e.target.value })}
                        />
                        <Input
                            label="Expected E.T.A"
                            type="date"
                            value={formData.eta}
                            onChange={e => setFormData({ ...formData, eta: e.target.value })}
                        />
                    </FormSection>

                    {/* Initial Note / B/L Commentary */}
                    <div style={{ display: "flex", flexDirection: "column", gap: "0.4rem" }}>
                        <label style={{ fontSize: "0.82rem", fontWeight: 600, color: "hsl(var(--text-primary))" }}>
                            Initial B/L Remark / Operational Note (Optional)
                        </label>
                        <textarea
                            value={formData.initialNote}
                            onChange={e => setFormData({ ...formData, initialNote: e.target.value })}
                            placeholder="e.g. Vessel expected to arrive 15th Aug, draft documents sent to client for verification..."
                            rows={2}
                            style={{
                                width: "100%",
                                padding: "0.6rem",
                                borderRadius: "6px",
                                border: "1px solid hsl(var(--border))",
                                background: "hsl(var(--surface-1, var(--surface)))",
                                color: "hsl(var(--text-primary))",
                                fontSize: "0.85rem"
                            }}
                        />
                    </div>

                    {/* 7-Tab Cargo Units Registration Component */}
                    <ContainerBulkAddForm
                        containers={formData.containers}
                        onChange={(containers) => setFormData({ ...formData, containers })}
                    />

                    <div style={{ display: "flex", justifyContent: "flex-end", marginTop: "1rem" }}>
                        <Button type="submit" loading={loading} size="lg">
                            Register Shipment
                        </Button>
                    </div>
                </form>
            </div>

        </div>
    );
}

