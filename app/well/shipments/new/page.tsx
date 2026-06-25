"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Loader2, PackagePlus, ArrowLeft, Plus, Trash2 } from "lucide-react";
import Link from "next/link";
import { apis } from "@/lib/api/apis";

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
        containers: []
    });

    const [newContainer, setNewContainer] = useState({
        containerNumber: "",
        size: "",
        weight: ""
    });

    const addContainer = () => {
        if (!newContainer.containerNumber) {
            toast.error("Container number is required");
            return;
        }
        setFormData({
            ...formData,
            containers: [...formData.containers, { ...newContainer }]
        });
        setNewContainer({ containerNumber: "", size: "", weight: "" });
    };

    const removeContainer = (index: number) => {
        const newContainers = [...formData.containers];
        newContainers.splice(index, 1);
        setFormData({ ...formData, containers: newContainers });
    };

    const updateContainer = (index: number, field: string, value: string) => {
        const newContainers = [...formData.containers];
        newContainers[index] = { ...newContainers[index], [field]: value };
        setFormData({ ...formData, containers: newContainers });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            const shipment = await apis.well.createShipment(formData);
            toast.success(`Shipment created successfully. Ref: ${shipment.refNumber}`);
            router.push(`/well/shipments/${shipment.id}`);
        } catch (error: any) {
            toast.error(error.message);
            setLoading(false);
        }
    };

    return (
        <div className="animate-fade-in" style={{ maxWidth: "800px", margin: "0 auto", paddingBottom: "4rem" }}>
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

                <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "2rem", padding: "0 1.5rem 1.5rem 1.5rem" }}>
                    <div>
                        <h2 style={{ fontSize: "1rem", fontWeight: 600, marginBottom: "1rem", color: "hsl(var(--text-secondary))" }}>Shipment Details</h2>
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
                                <label>Total Number of Containers (Short Desc) *</label>
                                <input
                                    required
                                    placeholder="e.g. 1X20, 2X40"
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
                    </div>

                    <div style={{ background: "rgba(255,255,255,0.02)", padding: "1.5rem", borderRadius: "12px", border: "1px solid hsl(var(--border))" }}>
                        <div style={{ marginBottom: "1.5rem" }}>
                            <h2 style={{ fontSize: "1rem", fontWeight: 600, color: "hsl(var(--text-primary))" }}>Containers</h2>
                            <p style={{ fontSize: "0.8rem", color: "hsl(var(--text-muted))", marginBottom: "1rem" }}>Fill in container details and click Add to include them in this shipment</p>

                            {/* NEW: Input fields above the list */}
                            <div style={{
                                display: "grid",
                                gridTemplateColumns: "1fr 100px 120px 100px",
                                gap: "1.25rem",
                                alignItems: "flex-end",
                                background: "hsl(var(--surface-3))",
                                padding: "1.25rem",
                                borderRadius: "10px",
                                border: "1px solid hsl(var(--primary) / 0.3)",
                                marginBottom: "2rem"
                            }}>
                                <div className="form-group" style={{ marginBottom: 0 }}>
                                    <label style={{ color: "hsl(var(--text-primary))", fontWeight: 700, fontSize: "0.7rem", opacity: 0.9 }}>Container Number *</label>
                                    <input
                                        placeholder="e.g. TGBU3222408"
                                        value={newContainer.containerNumber}
                                        onChange={e => setNewContainer({ ...newContainer, containerNumber: e.target.value.toUpperCase() })}
                                        style={{ background: "white", color: "black", border: "1px solid #ccc" }}
                                    />
                                </div>
                                <div className="form-group" style={{ marginBottom: 0 }}>
                                    <label style={{ color: "hsl(var(--text-primary))", fontWeight: 700, fontSize: "0.7rem", opacity: 0.9 }}>Size</label>
                                    <input
                                        placeholder="20/40"
                                        value={newContainer.size}
                                        onChange={e => setNewContainer({ ...newContainer, size: e.target.value })}
                                        style={{ background: "white", color: "black", border: "1px solid #ccc" }}
                                    />
                                </div>
                                <div className="form-group" style={{ marginBottom: 0 }}>
                                    <label style={{ color: "hsl(var(--text-primary))", fontWeight: 700, fontSize: "0.7rem", opacity: 0.9 }}>Weight (KG)</label>
                                    <input
                                        type="number"
                                        placeholder="0"
                                        value={newContainer.weight}
                                        onChange={e => setNewContainer({ ...newContainer, weight: e.target.value })}
                                        style={{ background: "white", color: "black", border: "1px solid #ccc" }}
                                    />
                                </div>
                                <button type="button" onClick={addContainer} className="btn btn-primary" style={{ height: "42px", gap: "0.4rem" }}>
                                    <Plus size={16} /> Add
                                </button>
                            </div>
                        </div>

                        <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                            {formData.containers.length === 0 && (
                                <div style={{ textAlign: "center", padding: "2rem", border: "1px dashed hsl(var(--border))", borderRadius: "10px", color: "hsl(var(--text-muted))" }}>
                                    No containers added yet.
                                </div>
                            )}
                            {formData.containers.map((c: any, idx: number) => (
                                <div key={idx} style={{
                                    display: "grid",
                                    gridTemplateColumns: "1fr 100px 120px 40px",
                                    gap: "1.25rem",
                                    alignItems: "flex-end",
                                    background: "rgba(255,255,255,0.05)",
                                    padding: "1rem 1.25rem",
                                    borderRadius: "10px",
                                    border: "1px solid hsl(var(--border))"
                                }}>
                                    <div className="form-group" style={{ marginBottom: 0 }}>
                                        <label style={{ color: "hsl(var(--text-secondary))", fontWeight: 600, fontSize: "0.65rem" }}>Container Number</label>
                                        <input
                                            required
                                            value={c.containerNumber}
                                            onChange={e => updateContainer(idx, "containerNumber", e.target.value)}
                                            style={{ background: "white", color: "black", border: "1px solid #ccc" }}
                                        />
                                    </div>
                                    <div className="form-group" style={{ marginBottom: 0 }}>
                                        <label style={{ color: "hsl(var(--text-secondary))", fontWeight: 600, fontSize: "0.65rem" }}>Size</label>
                                        <input
                                            value={c.size}
                                            onChange={e => updateContainer(idx, "size", e.target.value)}
                                            style={{ background: "white", color: "black", border: "1px solid #ccc" }}
                                        />
                                    </div>
                                    <div className="form-group" style={{ marginBottom: 0 }}>
                                        <label style={{ color: "hsl(var(--text-secondary))", fontWeight: 600, fontSize: "0.65rem" }}>Weight (KG)</label>
                                        <input
                                            type="number"
                                            value={c.weight}
                                            onChange={e => updateContainer(idx, "weight", e.target.value)}
                                            style={{ background: "white", color: "black", border: "1px solid #ccc" }}
                                        />
                                    </div>
                                    <button
                                        type="button"
                                        onClick={() => removeContainer(idx)}
                                        className="btn btn-ghost"
                                        style={{ color: "hsl(var(--error))", padding: "0.5rem", borderRadius: "8px" }}
                                        title="Remove Container"
                                    >
                                        <Trash2 size={20} />
                                    </button>
                                </div>
                            ))}
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
