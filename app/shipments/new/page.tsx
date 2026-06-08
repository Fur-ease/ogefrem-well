"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { PlusCircle } from "lucide-react";

export default function NewShipmentPage() {
    const router = useRouter();
    const [loading, setLoading] = useState(false);

    const [form, setForm] = useState({
        clientName: "",
        blNumber: "",
    });

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        setLoading(true);

        try {
            const res = await fetch("/api/shipments", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(form),
            });

            const json = await res.json();

            if (!res.ok) {
                toast.error(json.error || "Failed to create shipment");
            } else {
                toast.success("Shipment created successfully!");
                router.push(`/shipments/${json.data.id}`);
            }
        } catch (err) {
            toast.error("Network error. Please try again.");
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
                <div className="form-group" style={{ marginBottom: "1.25rem" }}>
                    <label htmlFor="clientName">Client Name</label>
                    <input
                        id="clientName"
                        type="text"
                        required
                        value={form.clientName}
                        onChange={(e) => setForm({ ...form, clientName: e.target.value })}
                        placeholder="e.g. ACME Corp"
                    />
                </div>

                <div className="form-group" style={{ marginBottom: "2rem" }}>
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

