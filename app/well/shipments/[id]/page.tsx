"use client";

import { useEffect, useState, useRef } from "react";
import { useParams } from "next/navigation";
import { toast } from "sonner";
import { Loader2, ArrowLeft, Upload, FileText, Trash2, Save, Download, Eye, X } from "lucide-react";
import Link from "next/link";
import { format } from "date-fns";
import Breadcrumbs from "@/components/well/Breadcrumbs";

export default function WellShipmentDetailPage() {
    const { id } = useParams();
    const [shipment, setShipment] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [uploading, setUploading] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const [formData, setFormData] = useState<any>({});
    const [previewUrl, setPreviewUrl] = useState<string | null>(null);

    const fetchShipment = async () => {
        try {
            const res = await fetch(`/api/well/shipments/${id}`);
            if (!res.ok) throw new Error("Failed to fetch shipment");
            const data = await res.json();
            setShipment(data);

            const formattedData = { ...data };
            const dateFields = ["eta", "lodgeCustoms", "entryPassed", "slineCharges", "slinePaid", "ddRecv", "lodgedKpa", "dateVerified"];
            dateFields.forEach(f => {
                if (formattedData[f]) {
                    formattedData[f] = formattedData[f].split('T')[0];
                } else {
                    formattedData[f] = "";
                }
            });
            setFormData(formattedData);
        } catch (error) {
            toast.error("Failed to load shipment details");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchShipment();
    }, [id]);

    const handleUpdate = async (e?: React.FormEvent) => {
        if (e) e.preventDefault();
        setSaving(true);
        try {
            const res = await fetch(`/api/well/shipments/${id}`, {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });

            if (!res.ok) throw new Error("Failed to update shipment");
            toast.success("Shipment updated");
            fetchShipment();
        } catch (error) {
            toast.error("Update failed");
        } finally {
            setSaving(false);
        }
    };

    const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        const docType = prompt("Enter document type (e.g. BL, INVOICE, PACKING LIST):");
        if (!docType) return;

        setUploading(true);
        const fd = new FormData();
        fd.append("file", file);
        fd.append("type", docType);

        try {
            const res = await fetch(`/api/well/shipments/${id}/documents`, {
                method: "POST",
                body: fd,
            });

            if (!res.ok) throw new Error("Upload failed");
            toast.success("Document uploaded successfully");
            fetchShipment();
        } catch (error) {
            toast.error("Failed to upload document");
        } finally {
            setUploading(false);
            if (fileInputRef.current) fileInputRef.current.value = "";
        }
    };

    const deleteDocument = async (docId: string) => {
        if (!confirm("Delete this document permanently?")) return;

        const tId = toast.loading("Deleting document...");
        try {
            const res = await fetch(`/api/well/shipments/${id}/documents/${docId}`, {
                method: "DELETE",
            });
            if (!res.ok) throw new Error("Delete failed");
            toast.success("Document deleted", { id: tId });
            fetchShipment();
        } catch (error) {
            toast.error("Failed to delete document", { id: tId });
        }
    };

    if (loading) {
        return <div style={{ display: "flex", justifyContent: "center", padding: "4rem" }}><Loader2 className="animate-spin" size={32} /></div>;
    }

    if (!shipment) return <div>Shipment not found</div>;

    return (
        <div className="animate-fade-in" style={{ paddingBottom: "3rem" }}>
            <Breadcrumbs />

            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "2rem" }}>
                <div>
                    <div style={{ display: "flex", alignItems: "center", gap: "1rem", marginBottom: "0.25rem" }}>
                        <h1 style={{ fontSize: "1.75rem", fontWeight: 700, fontFamily: "monospace", color: "hsl(var(--primary))" }}>
                            {shipment.refNumber}
                        </h1>
                        <span className={`status-badge status-well status-${shipment.status.toLowerCase()}`}>
                            {shipment.status}
                        </span>
                    </div>
                    <p style={{ color: "hsl(var(--text-secondary))", fontSize: "0.95rem" }}>
                        {shipment.clientName} &bull; B/L: {shipment.blNumber}
                    </p>
                </div>

                <div style={{ display: "flex", gap: "1rem" }}>
                    <select
                        value={formData.status}
                        onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                        style={{ padding: "0.5rem", borderRadius: "8px", fontWeight: 600 }}
                    >
                        <option value="AVA">A.V.A (Awaiting info)</option>
                        <option value="FUP">F.U.P (Follow Up)</option>
                        <option value="FURO">F.U.R.O (Released)</option>
                        <option value="PCHARGES">P.CHARGES (Finance)</option>
                    </select>
                    <button onClick={() => handleUpdate()} disabled={saving} className="btn btn-primary" style={{ gap: "0.5rem" }}>
                        {saving ? <Loader2 size={16} className="animate-spin" /> : <Save size={16} />} Save Changes
                    </button>
                </div>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr", gap: "1.5rem" }}>
                <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>

                    <div className="card" style={{ padding: "1.5rem" }}>
                        <h2 style={{ fontSize: "1.1rem", fontWeight: 600, marginBottom: "1.5rem", borderBottom: "1px solid hsl(var(--border))", paddingBottom: "0.5rem" }}>
                            Logistics Information
                        </h2>
                        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.5rem" }}>
                            <div className="form-group">
                                <label>Client Ref File</label>
                                <input value={formData.clientRef || ""} onChange={e => setFormData({ ...formData, clientRef: e.target.value })} />
                            </div>
                            <div className="form-group">
                                <label>Container Size</label>
                                <input value={formData.containerSize || ""} onChange={e => setFormData({ ...formData, containerSize: e.target.value })} />
                            </div>
                            <div className="form-group">
                                <label>Docs Recv (e.g. 11/2 COPIES)</label>
                                <input value={formData.docRecv || ""} onChange={e => setFormData({ ...formData, docRecv: e.target.value })} />
                            </div>
                            <div className="form-group">
                                <label>Vessel Name</label>
                                <input value={formData.vesselName || ""} onChange={e => setFormData({ ...formData, vesselName: e.target.value })} />
                            </div>
                            <div className="form-group">
                                <label>E.T.A</label>
                                <input type="date" value={formData.eta || ""} onChange={e => setFormData({ ...formData, eta: e.target.value })} />
                            </div>
                            <div className="form-group">
                                <label>Entry No</label>
                                <input value={formData.entryNumber || ""} onChange={e => setFormData({ ...formData, entryNumber: e.target.value })} />
                            </div>
                            <div className="form-group">
                                <label>Lodge Customs</label>
                                <input type="date" value={formData.lodgeCustoms || ""} onChange={e => setFormData({ ...formData, lodgeCustoms: e.target.value })} />
                            </div>
                            <div className="form-group">
                                <label>Entry Passed</label>
                                <input type="date" value={formData.entryPassed || ""} onChange={e => setFormData({ ...formData, entryPassed: e.target.value })} />
                            </div>
                            <div className="form-group">
                                <label>TBL / N.TBL</label>
                                <input value={formData.tblNtbl || ""} onChange={e => setFormData({ ...formData, tblNtbl: e.target.value })} />
                            </div>
                            <div className="form-group">
                                <label>S/Line Charges</label>
                                <input type="date" value={formData.slineCharges || ""} onChange={e => setFormData({ ...formData, slineCharges: e.target.value })} />
                            </div>
                            <div className="form-group">
                                <label>S/Line Paid</label>
                                <input type="date" value={formData.slinePaid || ""} onChange={e => setFormData({ ...formData, slinePaid: e.target.value })} />
                            </div>
                            <div className="form-group">
                                <label>D/O Recv</label>
                                <input type="date" value={formData.ddRecv || ""} onChange={e => setFormData({ ...formData, ddRecv: e.target.value })} />
                            </div>
                            <div className="form-group">
                                <label>Last Sling cfs</label>
                                <input value={formData.lastSlingCfs || ""} onChange={e => setFormData({ ...formData, lastSlingCfs: e.target.value })} />
                            </div>
                            <div className="form-group">
                                <label>Lodg Ed K.P.A</label>
                                <input type="date" value={formData.lodgedKpa || ""} onChange={e => setFormData({ ...formData, lodgedKpa: e.target.value })} />
                            </div>
                            <div className="form-group">
                                <label>Date Verified</label>
                                <input type="date" value={formData.dateVerified || ""} onChange={e => setFormData({ ...formData, dateVerified: e.target.value })} />
                            </div>
                        </div>
                        <div className="form-group" style={{ marginTop: "1.5rem" }}>
                            <label>Notes</label>
                            <textarea
                                value={formData.notes || ""}
                                onChange={e => setFormData({ ...formData, notes: e.target.value })}
                                style={{ width: "100%", minHeight: "100px", padding: "0.75rem", borderRadius: "8px", background: "rgba(0,0,0,0.2)", border: "1px solid hsl(var(--border))", color: "#fff" }}
                            />
                        </div>
                    </div>
                </div>

                <div>
                    <div className="card" style={{ padding: "1.5rem" }}>
                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1rem", borderBottom: "1px solid hsl(var(--border))", paddingBottom: "0.5rem" }}>
                            <h2 style={{ fontSize: "1.1rem", fontWeight: 600 }}>Documents</h2>
                            <input type="file" ref={fileInputRef} style={{ display: "none" }} onChange={handleFileUpload} />
                            <button onClick={() => fileInputRef.current?.click()} disabled={uploading} className="btn btn-secondary btn-sm" style={{ gap: "0.5rem" }}>
                                {uploading ? <Loader2 size={14} className="animate-spin" /> : <Upload size={14} />}
                                {uploading ? "Uploading..." : "Upload"}
                            </button>
                        </div>

                        <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
                            {shipment.documents?.length === 0 && (
                                <div style={{ textAlign: "center", padding: "2rem", color: "hsl(var(--text-muted))" }}>
                                    No documents attached
                                </div>
                            )}
                            {shipment.documents?.map((doc: any) => (
                                <div key={doc.id} style={{ display: "flex", alignItems: "center", padding: "1rem", background: "rgba(255,255,255,0.03)", borderRadius: "8px", border: "1px solid hsl(var(--border))" }}>
                                    <FileText size={24} style={{ color: "hsl(var(--primary))", marginRight: "1rem" }} />
                                    <div style={{ flex: 1, minWidth: 0 }}>
                                        <div style={{ fontWeight: 600, fontSize: "0.9rem", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                                            {doc.docType}
                                        </div>
                                        <div style={{ color: "hsl(var(--text-muted))", fontSize: "0.75rem", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                                            {doc.filename}
                                        </div>
                                    </div>
                                    <div style={{ display: "flex", gap: "0.5rem" }}>
                                        <button onClick={() => setPreviewUrl(doc.driveUrl)} className="btn btn-ghost btn-sm" style={{ padding: "0.4rem", color: "hsl(var(--primary))" }}>
                                            <Eye size={16} />
                                        </button>
                                        <a href={doc.driveUrl} target="_blank" rel="noopener noreferrer" className="btn btn-ghost btn-sm" style={{ padding: "0.4rem" }}>
                                            <Download size={16} />
                                        </a>
                                        <button onClick={() => deleteDocument(doc.id)} className="btn btn-ghost btn-sm" style={{ padding: "0.4rem", color: "hsl(var(--error))" }}>
                                            <Trash2 size={16} />
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* PDF Preview Modal */}
            {previewUrl && (
                <div style={{
                    position: "fixed",
                    top: 0,
                    left: 0,
                    width: "100%",
                    height: "100%",
                    background: "rgba(0,0,0,0.8)",
                    zIndex: 1000,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    padding: "2rem"
                }}>
                    <div style={{
                        width: "100%",
                        maxWidth: "1000px",
                        display: "flex",
                        justifyContent: "flex-end",
                        marginBottom: "1rem"
                    }}>
                        <button
                            onClick={() => setPreviewUrl(null)}
                            className="btn btn-ghost"
                            style={{ color: "#fff", background: "rgba(255,255,255,0.1)" }}
                        >
                            <X size={24} /> Close
                        </button>
                    </div>
                    <div style={{ width: "100%", maxWidth: "1000px", flex: 1, background: "#fff", borderRadius: "8px", overflow: "hidden" }}>
                        <iframe
                            src={previewUrl.replace("/view", "/preview")}
                            style={{ width: "100%", height: "100%", border: "none" }}
                            title="Document Preview"
                        />
                    </div>
                </div>
            )}
        </div>
    );
}
