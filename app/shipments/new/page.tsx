"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { PlusCircle } from "lucide-react";
import { apis } from "@/lib/api/apis";
import { ClientSelect } from "@/components/well/ClientSelect";

export default function NewShipmentPage() {
    const router = useRouter();
    const [loading, setLoading] = useState(false);

    const [form, setForm] = useState({
        clientName: "",
        blNumber: "",
        containerCount: 1,
    });

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        setLoading(true);

        try {
            const json = await apis.shipments.createShipment(form);
            toast.success("Shipment created successfully!");
            router.push(`/shipments/${json.id}`);
        } catch (err: any) {
            toast.error(err.message || "Failed to create shipment");
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="animate-fade-in" style={{ maxWidth: "500px", margin: "0 auto", padding: "1.5rem 0" }}>
            <h1 style={{ fontSize: "1.75rem", fontWeight: 700, marginBottom: "0.5rem" }}>Create New Shipment</h1>
            <p style={{ color: "hsl(215,15%,55%)", marginBottom: "2rem" }}>
                Enter the client name and Bill of Lading (BL) number to begin the workflow.
            </p>

            <form onSubmit={handleSubmit} className="card">
                <div style={{ marginBottom: "1.25rem" }}>
                    <ClientSelect
                        id="clientName"
                        label="Client Name"
                        required
                        value={form.clientName}
                        onChange={(val) => setForm({ ...form, clientName: val })}
                        placeholder="Select or enter client name..."
                    />
                </div>

                <div className="form-group" style={{ marginBottom: "1.25rem" }}>
                    <label htmlFor="blNumber">BL Number</label>
                    <input
                        id="blNumber"
                        type="text"
                        required
                        value={form.blNumber}
                        onChange={(e) => setForm({ ...form, blNumber: e.target.value })}
                        placeholder="e.g. BL-123456789"
                    />
                </div>

                <div className="form-group" style={{ marginBottom: "2rem" }}>
                    <label htmlFor="containerCount">Number of Containers</label>
                    <input
                        id="containerCount"
                        type="number"
                        min="1"
                        required
                        value={form.containerCount}
                        onChange={(e) => setForm({ ...form, containerCount: parseInt(e.target.value) || 1 })}
                    />
                </div>

                <button type="submit" className="btn btn-primary" style={{ width: "100%", justifyContent: "center", gap: "0.5rem" }} disabled={loading}>
                    {loading ? "Creating..." : (
                        <>
                            <PlusCircle size={18} />
                            Create Shipment
                        </>
                    )}
                </button>
            </form>
        </div>
    );
}

