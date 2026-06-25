"use client";

import { useEffect, useState, useRef } from "react";
import { useParams } from "next/navigation";
import { toast } from "sonner";
import { Loader2, ArrowLeft, Upload, FileText, Trash2, Save, Download, Eye, X, Plus, FileSpreadsheet } from "lucide-react";
import Link from "next/link";
import { format } from "date-fns";
import Breadcrumbs from "@/components/well/Breadcrumbs";
import { apis } from "@/lib/api/apis";

export default function WellShipmentDetailPage() {
    const { id } = useParams();
    const [shipment, setShipment] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [uploading, setUploading] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const [formData, setFormData] = useState<any>({});
    const [previewUrl, setPreviewUrl] = useState<string | null>(null);
    const [exporting, setExporting] = useState(false);
    const [editingContainerIdx, setEditingContainerIdx] = useState<number | null>(null);
    const [newContainer, setNewContainer] = useState({
        containerNumber: "",
        size: "",
        weight: "",
    });

    const fetchShipment = async () => {
        try {
            const data = await apis.well.getShipment(id as string);
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

            // Format container dates
            if (formattedData.containers) {
                formattedData.containers = formattedData.containers.map((c: any) => ({
                    ...c,
                    dischargeDate: c.dischargeDate ? c.dischargeDate.split('T')[0] : "",
                    gateOutDate: c.gateOutDate ? c.gateOutDate.split('T')[0] : ""
                }));
            }

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
            await apis.well.updateShipment(id as string, formData);
            toast.success("Shipment updated");
            fetchShipment();
        } catch (error) {
            toast.error("Update failed");
        } finally {
            setSaving(false);
        }
    };

    const addContainer = () => {
        if (!newContainer.containerNumber) {
            toast.error("Container number is required");
            return;
        }
        const containerToAdd = {
            id: `temp-${Date.now()}`,
            ...newContainer,
            dischargeDate: "",
            gateOutDate: "",
            truckDetails: "",
            driverName: "",
            status: "",
            remarks: ""
        };
        setFormData({
            ...formData,
            containers: [...(formData.containers || []), containerToAdd]
        });
        setNewContainer({ containerNumber: "", size: "", weight: "" });
    };

    const updateContainerField = (idx: number, field: string, value: any) => {
        const newContainers = [...formData.containers];
        newContainers[idx] = { ...newContainers[idx], [field]: value };
        setFormData({ ...formData, containers: newContainers });
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
            await apis.well.uploadDocument(id as string, fd);
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
            await apis.well.deleteDocument(id as string, docId);
            toast.success("Document deleted", { id: tId });
            fetchShipment();
        } catch (error) {
            toast.error("Failed to delete document", { id: tId });
        }
    };

    const handleExportContainers = async () => {
        setExporting(true);
        const tId = toast.loading("Generating Excel report...");
        try {
            const blob = await apis.well.exportShipment(id as string);
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement("a");
            a.href = url;
            a.download = `Container_Report_${formData.refNumber.replace('/', '_')}.xlsx`;
            document.body.appendChild(a);
            a.click();
            window.URL.revokeObjectURL(url);

            toast.success("Report downloaded successfully", { id: tId });
        } catch (error) {
            toast.error("Failed to export report", { id: tId });
        } finally {
            setExporting(false);
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
                    <button onClick={handleExportContainers} disabled={exporting} className="btn btn-secondary" style={{ gap: "0.5rem" }}>
                        {exporting ? <Loader2 size={16} className="animate-spin" /> : <FileSpreadsheet size={16} />} Export Containers
                    </button>
                    <button onClick={() => handleUpdate()} disabled={saving} className="btn btn-primary" style={{ gap: "0.5rem" }}>
                        {saving ? <Loader2 size={16} className="animate-spin" /> : <Save size={16} />} Save Changes
                    </button>
                </div>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "1.5rem", alignItems: "start" }}>
                    {/* Logistics Card */}
                    <div className="card" style={{ padding: "1.5rem" }}>
                        <h2 style={{ fontSize: "1.1rem", fontWeight: 600, marginBottom: "1.5rem", borderBottom: "1px solid hsl(var(--border))", paddingBottom: "0.5rem", color: "hsl(var(--primary))" }}>
                            Logistics Information
                        </h2>
                        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))", gap: "1.25rem" }}>
                            <div className="form-group">
                                <label>Client Ref File</label>
                                <input value={formData.clientRef || ""} onChange={e => setFormData({ ...formData, clientRef: e.target.value })} />
                            </div>
                            <div className="form-group">
                                <label>Total Containers (Desc)</label>
                                <input value={formData.containerSize || ""} onChange={e => setFormData({ ...formData, containerSize: e.target.value })} />
                            </div>
                            <div className="form-group">
                                <label>Docs Recv</label>
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
                            <label>Internal Notes</label>
                            <textarea
                                value={formData.notes || ""}
                                onChange={e => setFormData({ ...formData, notes: e.target.value })}
                                style={{ width: "100%", minHeight: "100px", padding: "0.75rem", borderRadius: "8px", background: "hsl(var(--surface-2))", border: "1px solid hsl(var(--border))", color: "#fff" }}
                            />
                        </div>
                    </div>

                    {/* Documents Card */}
                    <div className="card" style={{ padding: "1.5rem", height: "fit-content" }}>
                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1rem", borderBottom: "1px solid hsl(var(--border))", paddingBottom: "0.5rem" }}>
                            <h2 style={{ fontSize: "1.1rem", fontWeight: 600, color: "hsl(var(--primary))" }}>Documents</h2>
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
                                <div key={doc.id} style={{ display: "flex", alignItems: "center", padding: "1rem", background: "hsl(var(--surface-2))", borderRadius: "8px", border: "1px solid hsl(var(--border))" }}>
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

                {/* Containers Tracking Section - Full Width but Scrollable */}
                <div className="card" style={{ padding: "1.5rem", overflow: "hidden" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.5rem", borderBottom: "1px solid hsl(var(--border))", paddingBottom: "0.5rem" }}>
                        <h2 style={{ fontSize: "1.1rem", fontWeight: 600, color: "hsl(var(--primary))" }}>Containers Tracking</h2>
                    </div>

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
                    <div style={{ overflowX: "auto", borderRadius: "8px", border: "1px solid hsl(var(--border))" }}>
                        <table className="data-table" style={{ minWidth: "1400px", fontSize: "0.85rem" }}>
                            <thead style={{ background: "hsl(var(--surface-2))" }}>
                                <tr>
                                    <th style={{ width: "180px" }}>Container #</th>
                                    <th style={{ width: "80px" }}>Size</th>
                                    <th style={{ width: "100px" }}>Weight</th>
                                    <th style={{ width: "160px" }}>Discharge Date</th>
                                    <th style={{ width: "160px" }}>Gate Out Date</th>
                                    <th style={{ width: "180px" }}>Truck Details</th>
                                    <th style={{ width: "160px" }}>Driver</th>
                                    <th style={{ width: "150px" }}>Status</th>
                                    <th>Remarks</th>
                                    <th style={{ width: "80px" }}>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {(formData.containers || []).map((c: any, idx: number) => (
                                    <tr key={c.id || idx}>
                                        <td style={{ fontWeight: 600 }}>{c.containerNumber}</td>
                                        <td>{c.size}</td>
                                        <td>{c.weight}</td>
                                        <td>{c.dischargeDate || "—"}</td>
                                        <td>{c.gateOutDate || "—"}</td>
                                        <td>{c.truckDetails || "—"}</td>
                                        <td>{c.driverName || "—"}</td>
                                        <td>
                                            <span style={{ fontSize: "0.75rem", padding: "0.2rem 0.5rem", borderRadius: "4px", background: "hsl(var(--surface-3))", border: "1px solid hsl(var(--border))" }}>
                                                {c.status || "PENDING"}
                                            </span>
                                        </td>
                                        <td>{c.remarks || "—"}</td>
                                        <td>
                                            <button
                                                onClick={() => setEditingContainerIdx(idx)}
                                                className="btn btn-ghost btn-sm"
                                                style={{ padding: "0.3rem", color: "hsl(var(--primary))" }}
                                            >
                                                VIEW
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            {/* Container Edit Modal */}
            {editingContainerIdx !== null && (
                <div style={{
                    position: "fixed",
                    top: 0, left: 0, width: "100%", height: "100%",
                    background: "rgba(0,0,0,0.8)", zIndex: 1100,
                    display: "flex", alignItems: "center", justifyContent: "center", padding: "1rem"
                }}>
                    <div className="card" style={{ width: "100%", maxWidth: "600px", padding: "2rem", display: "flex", flexDirection: "column", gap: "1.5rem" }}>
                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", borderBottom: "1px solid hsl(var(--border))", paddingBottom: "1rem" }}>
                            <h2 style={{ fontSize: "1.25rem", color: "hsl(var(--primary))" }}>
                                Modify Container: {formData.containers[editingContainerIdx].containerNumber}
                            </h2>
                            <button onClick={() => setEditingContainerIdx(null)} className="btn btn-ghost" style={{ padding: "0.5rem" }}><X size={20} /></button>
                        </div>

                        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
                            <div className="form-group">
                                <label>Container #</label>
                                <input
                                    value={formData.containers[editingContainerIdx].containerNumber}
                                    onChange={e => updateContainerField(editingContainerIdx, "containerNumber", e.target.value.toUpperCase())}
                                    style={{ background: "white", color: "black" }}
                                />
                            </div>
                            <div className="form-group">
                                <label>Size</label>
                                <input
                                    value={formData.containers[editingContainerIdx].size}
                                    onChange={e => updateContainerField(editingContainerIdx, "size", e.target.value)}
                                    style={{ background: "white", color: "black" }}
                                />
                            </div>
                            <div className="form-group">
                                <label>Weight (KG)</label>
                                <input
                                    type="number"
                                    value={formData.containers[editingContainerIdx].weight}
                                    onChange={e => updateContainerField(editingContainerIdx, "weight", e.target.value)}
                                    style={{ background: "white", color: "black" }}
                                />
                            </div>
                            <div className="form-group">
                                <label>Status</label>
                                <input
                                    value={formData.containers[editingContainerIdx].status}
                                    onChange={e => updateContainerField(editingContainerIdx, "status", e.target.value)}
                                    style={{ background: "white", color: "black" }}
                                />
                            </div>
                            <div className="form-group">
                                <label>Discharge Date</label>
                                <input
                                    type="date"
                                    value={formData.containers[editingContainerIdx].dischargeDate}
                                    onChange={e => updateContainerField(editingContainerIdx, "dischargeDate", e.target.value)}
                                    style={{ background: "white", color: "black", colorScheme: "light" }}
                                />
                            </div>
                            <div className="form-group">
                                <label>Gate Out Date</label>
                                <input
                                    type="date"
                                    value={formData.containers[editingContainerIdx].gateOutDate}
                                    onChange={e => updateContainerField(editingContainerIdx, "gateOutDate", e.target.value)}
                                    style={{ background: "white", color: "black", colorScheme: "light" }}
                                />
                            </div>
                            <div className="form-group">
                                <label>Truck Details</label>
                                <input
                                    value={formData.containers[editingContainerIdx].truckDetails}
                                    onChange={e => updateContainerField(editingContainerIdx, "truckDetails", e.target.value)}
                                    style={{ background: "white", color: "black" }}
                                />
                            </div>
                            <div className="form-group">
                                <label>Driver Name</label>
                                <input
                                    value={formData.containers[editingContainerIdx].driverName}
                                    onChange={e => updateContainerField(editingContainerIdx, "driverName", e.target.value)}
                                    style={{ background: "white", color: "black" }}
                                />
                            </div>
                        </div>
                        <div className="form-group">
                            <label>Remarks</label>
                            <textarea
                                value={formData.containers[editingContainerIdx].remarks}
                                onChange={e => updateContainerField(editingContainerIdx, "remarks", e.target.value)}
                                style={{ background: "white", color: "black", minHeight: "80px" }}
                            />
                        </div>

                        <div style={{ display: "flex", justifyContent: "flex-end", gap: "1rem", marginTop: "1rem" }}>
                            <button onClick={() => setEditingContainerIdx(null)} className="btn btn-primary" style={{ width: "100%" }}>
                                Done
                            </button>
                        </div>
                    </div>
                </div>
            )}
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
