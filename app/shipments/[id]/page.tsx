"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { type Shipment, type Document, ShipmentStatus, DocumentType } from "@prisma/client";
import { StepWizard } from "@/components/StepWizard";
import { StatusBadge } from "@/components/StatusBadge";
import { FinancialSummary } from "@/components/FinancialSummary";
import { DocumentUpload } from "@/components/DocumentUpload";
import { format } from "date-fns";
import { toast } from "sonner";
import {
    Trash2,
    Download,
    ArrowRight,
    CheckCircle2,
    Calendar,
    FileText,
    AlertCircle,
    FileDigit,
    User as UserIcon,
    Package
} from "lucide-react";



type FullShipment = Shipment & { documents: Document[] };

export default function ShipmentDetailPage() {
    const params = useParams();
    const [shipment, setShipment] = useState<FullShipment | null>(null);
    const [loading, setLoading] = useState(true);
    const [actionLoading, setActionLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    // Form states per step
    const [feriForm, setFeriForm] = useState({ feriNumber: "", proformaNumber: "", proformaAmountEUR: "", commissionEUR: 40 });
    const [paidForm, setPaidForm] = useState({ exchangeRate: "1.23" });
    const [adForm, setAdForm] = useState({ adAmountUSD: "", tioNumber: "" });


    const fetchShipment = async () => {
        try {
            const res = await fetch(`/api/shipments/${params.id}`);
            const json = await res.json();
            if (res.ok) setShipment(json.data);
            else setError(json.error);
        } catch {
            setError("Failed to fetch shipment");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchShipment();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [params.id]);

    const handleAction = async (action: string, payload: any) => {
        const tId = toast.loading("Processing action...");
        setActionLoading(true);
        setError(null);
        try {
            const res = await fetch(`/api/shipments/${params.id}`, {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ action, ...payload }),
            });
            const json = await res.json();
            if (!res.ok) {
                toast.error(json.error || "Action failed", { id: tId });
                setError(json.error);
            } else {
                toast.success("Action completed successfully", { id: tId });
                await fetchShipment();
            }
        } catch {
            toast.error("Network error. Please try again.", { id: tId });
            setError("Action failed. Please try again.");
        } finally {
            setActionLoading(false);
        }
    };

    const deleteDoc = async (docId: string) => {
        if (!confirm("Are you sure you want to delete this document?")) return;
        const tId = toast.loading("Deleting document...");
        try {
            await fetch(`/api/shipments/${params.id}/documents/${docId}`, { method: "DELETE" });
            toast.success("Document deleted", { id: tId });
            await fetchShipment();
        } catch {
            toast.error("Delete failed", { id: tId });
        }
    };


    if (loading) return <div>Loading shipment {params.id}...</div>;
    if (error || !shipment) return <div style={{ color: "hsl(0,72%,72%)" }}>{error || "Not found"}</div>;

    return (
        <div className="animate-fade-in" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: "1rem" }}>
            {/* LEFT COLUMN: Steps & Actions & Financials */}
            <div style={{ minWidth: 0 }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "1.5rem", flexWrap: "wrap", gap: "1rem" }}>
                    <div>
                        <h1 style={{ fontSize: "1.75rem", fontWeight: 700, marginBottom: "0.25rem", color: "hsl(var(--text-primary))" }}>
                            {shipment.clientName}
                        </h1>
                        <div style={{ color: "hsl(var(--text-secondary))", fontFamily: "monospace", fontSize: "0.9rem", display: "flex", alignItems: "center", gap: "0.5rem" }}>
                            <FileText size={14} /> BL: {shipment.blNumber}
                        </div>
                    </div>
                    <div><StatusBadge status={shipment.status} /></div>
                </div>

                <div className="card" style={{ marginBottom: "1rem", overflowX: "auto" }}>
                    <div style={{ minWidth: "500px" }}>
                        <StepWizard
                            currentStatus={shipment.status}
                            isFeriSkipped={(shipment as any).isFeriSkipped}
                        />
                    </div>
                </div>

                {/* STEP PANELS */}
                {shipment.status === ShipmentStatus.NEW && (
                    <div className="card" style={{ marginBottom: "2rem" }}>
                        <h3 style={{ fontSize: "1.1rem", fontWeight: 600, marginBottom: "1rem" }}>Step 2: Add Feri & Proforma Details</h3>
                        <p style={{ color: "hsl(var(--text-secondary))", fontSize: "0.875rem", marginBottom: "1.5rem" }}>
                            Upload Draft Feri & Proforma in the Documents panel, then enter details here.
                        </p>
                        <form onSubmit={(e) => { e.preventDefault(); handleAction("ADD_FERI", { ...feriForm, proformaAmountEUR: Number(feriForm.proformaAmountEUR), commissionEUR: Number(feriForm.commissionEUR) }); }}>
                            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "1rem", marginBottom: "1.5rem" }}>
                                <div className="form-group">
                                    <label>Feri Number</label>
                                    <input required value={feriForm.feriNumber} onChange={e => setFeriForm({ ...feriForm, feriNumber: e.target.value })} />
                                </div>
                                <div className="form-group">
                                    <label>Proforma Number</label>
                                    <input required value={feriForm.proformaNumber} onChange={e => setFeriForm({ ...feriForm, proformaNumber: e.target.value })} />
                                </div>
                                <div className="form-group">
                                    <label>Proforma Amount (EUR)</label>
                                    <input type="number" step="0.01" required value={feriForm.proformaAmountEUR} onChange={e => setFeriForm({ ...feriForm, proformaAmountEUR: e.target.value })} />
                                </div>
                                <div className="form-group">
                                    <label>Commission (EUR)</label>
                                    <input type="number" step="0.01" required value={feriForm.commissionEUR} onChange={e => setFeriForm({ ...feriForm, commissionEUR: Number(e.target.value) })} />
                                </div>
                            </div>
                            <div style={{ display: "flex", gap: "1rem" }}>
                                <button className="btn btn-primary" disabled={actionLoading} style={{ gap: "0.5rem", flex: 1, justifyContent: "center" }}>
                                    <ArrowRight size={18} /> Proceed to Feri Added
                                </button>
                                <button
                                    type="button"
                                    onClick={() => { if (confirm("Skip FERI and jump to AD generation?")) handleAction("SKIP_FERI", {}); }}
                                    className="btn btn-secondary"
                                    disabled={actionLoading}
                                    style={{ gap: "0.5rem", flex: 1, justifyContent: "center" }}
                                >
                                    <ArrowRight size={18} /> Skip FERI Workflow
                                </button>
                            </div>
                        </form>
                    </div>
                )}

                {shipment.status === ShipmentStatus.FERI_ADDED && (
                    <div className="card" style={{ marginBottom: "2rem" }}>
                        <h3 style={{ fontSize: "1.1rem", fontWeight: 600, marginBottom: "1rem" }}>Step 3: Mark as Paid</h3>
                        <p style={{ color: "hsl(var(--text-secondary))", fontSize: "0.875rem", marginBottom: "1.5rem" }}>
                            Upload POP in Documents, then enter the locked EUR→USD exchange rate.
                        </p>
                        <form onSubmit={(e) => { e.preventDefault(); handleAction("MARK_PAID", { exchangeRate: Number(paidForm.exchangeRate) }); }}>
                            <div className="form-group" style={{ marginBottom: "1.5rem", maxWidth: "200px" }}>
                                <label>Exchange Rate (EUR to USD)</label>
                                <input type="number" step="0.000001" required value={paidForm.exchangeRate} onChange={e => setPaidForm({ exchangeRate: e.target.value })} />
                            </div>
                            <button className="btn btn-primary" disabled={actionLoading} style={{ gap: "0.5rem", width: "100%", justifyContent: "center" }}>
                                <CheckCircle2 size={18} /> Save as Paid
                            </button>
                        </form>
                    </div>
                )}

                {shipment.status === ShipmentStatus.PAID && (
                    <div className="card" style={{ marginBottom: "2rem" }}>
                        <h3 style={{ fontSize: "1.1rem", fontWeight: 600, marginBottom: "1rem" }}>Step 4: Generate AD</h3>
                        <p style={{ color: "hsl(var(--text-secondary))", fontSize: "0.875rem", marginBottom: "1.5rem" }}>
                            Upload AD, Facture, Final Feri, & TIO. Then enter final AD details.
                        </p>
                        <form onSubmit={(e) => { e.preventDefault(); handleAction("ADD_AD", { adAmountUSD: Number(adForm.adAmountUSD), tioNumber: adForm.tioNumber }); }}>
                            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "1rem", marginBottom: "1.5rem" }}>
                                <div className="form-group">
                                    <label>AD Amount (USD)</label>
                                    <input type="number" step="0.01" required value={adForm.adAmountUSD} onChange={e => setAdForm({ ...adForm, adAmountUSD: e.target.value })} />
                                </div>
                                <div className="form-group">
                                    <label>TIO Number</label>
                                    <input required value={adForm.tioNumber} onChange={e => setAdForm({ ...adForm, tioNumber: e.target.value })} />
                                </div>
                            </div>
                            <button className="btn btn-primary" disabled={actionLoading} style={{ gap: "0.5rem", width: "100%", justifyContent: "center" }}>
                                <ArrowRight size={18} /> Save AD Final Data
                            </button>
                        </form>
                    </div>
                )}

                {shipment.status === ShipmentStatus.AD_GENERATED && (
                    <div className="card" style={{ marginBottom: "2rem" }}>
                        <h3 style={{ fontSize: "1.1rem", fontWeight: 600, marginBottom: "1rem" }}>Step 5: Complete Shipment</h3>
                        <p style={{ color: "hsl(var(--text-secondary))", fontSize: "0.875rem", marginBottom: "1.5rem" }}>
                            Verify all financials and documents. AD documents can still be replaced.
                        </p>
                        <button className="btn btn-primary" disabled={actionLoading} onClick={() => handleAction("COMPLETE", {})} style={{ gap: "0.5rem", width: "100%", justifyContent: "center" }}>
                            <CheckCircle2 size={18} /> Mark Completed
                        </button>
                    </div>
                )}

                <div className="card">
                    <FinancialSummary shipment={shipment} />
                </div>
            </div>

            {/* RIGHT COLUMN: Documents Side Panel */}
            <div style={{ minWidth: 0 }}>
                <div className="card">
                    <h3 style={{ fontSize: "1rem", fontWeight: 600, marginBottom: "1.5rem", borderBottom: "1px solid hsl(var(--border))", paddingBottom: "0.75rem" }}>
                        Documents
                    </h3>

                    <div style={{ marginBottom: "2rem" }}>
                        <DocumentUpload
                            shipmentId={shipment.id}
                            allowedTypes={(() => {
                                if (shipment.status === ShipmentStatus.NEW) {
                                    return [DocumentType.BL, DocumentType.PACKING_LIST, DocumentType.COMMERCIAL_INVOICE, DocumentType.DRAFT_FERI, DocumentType.PROFORMA];
                                }
                                if (shipment.status === ShipmentStatus.FERI_ADDED) {
                                    return [DocumentType.POP];
                                }
                                if (shipment.status === ShipmentStatus.PAID || shipment.status === ShipmentStatus.AD_GENERATED) {
                                    const types: DocumentType[] = [DocumentType.AD, DocumentType.FACTURE, DocumentType.FINAL_FERI, DocumentType.TIO];
                                    // If FERI was skipped, allow POP here too
                                    if ((shipment as any).isFeriSkipped) {
                                        types.push(DocumentType.POP);
                                    }
                                    return types;
                                }
                                if (shipment.status === ShipmentStatus.COMPLETED) {
                                    return [DocumentType.AD, DocumentType.FACTURE, DocumentType.FINAL_FERI, DocumentType.TIO, DocumentType.POP];
                                }
                                return [];
                            })()}
                            onSuccess={fetchShipment}
                        />
                    </div>

                    <h4 style={{ fontSize: "0.8rem", color: "hsl(var(--text-muted))", textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: "1rem" }}>
                        Files ({shipment.documents.filter(d => !d.isReplaced).length})
                    </h4>

                    <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                        {shipment.documents.length === 0 && (
                            <div style={{ color: "hsl(var(--text-muted))", fontSize: "0.875rem", fontStyle: "italic" }}>No documents uploaded.</div>
                        )}
                        {shipment.documents.map((doc) => (
                            <div
                                key={doc.id}
                                style={{
                                    display: "flex", alignItems: "center", justifyContent: "space-between",
                                    padding: "0.75rem",
                                    background: doc.isReplaced ? "hsl(var(--surface-2) / 0.5)" : "hsl(var(--surface-2))",
                                    border: "1px solid hsl(var(--border))",
                                    borderRadius: "0.5rem",
                                    opacity: doc.isReplaced ? 0.5 : 1
                                }}
                            >
                                <div style={{ overflow: "hidden", flex: 1 }}>
                                    <a href={doc.driveUrl} target="_blank" rel="noopener noreferrer" style={{ display: "block", fontSize: "0.875rem", fontWeight: 500, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis", marginBottom: "0.15rem", color: "hsl(var(--primary))" }}>
                                        {doc.filename}
                                    </a>
                                    <div style={{ fontSize: "0.75rem", color: "hsl(var(--text-muted))", display: "flex", gap: "0.5rem" }}>
                                        <span>{doc.type}</span>
                                        <span>•</span>
                                        <span>{format(new Date(doc.createdAt), "dd MMM")}</span>
                                    </div>
                                </div>
                                {!doc.isReplaced && (
                                    <div style={{ display: "flex", gap: "0.25rem" }}>
                                        <a
                                            href={`/api/shipments/${shipment.id}/documents/${doc.id}/download`}
                                            className="btn-ghost"
                                            style={{ padding: "0.25rem", color: "hsl(var(--text-secondary))" }}
                                            title="Download"
                                        >
                                            <Download size={15} />
                                        </a>
                                        <button onClick={() => deleteDoc(doc.id)} className="btn-ghost" style={{ padding: "0.25rem", color: "hsl(var(--danger))", border: "none" }} title="Delete">
                                            <Trash2 size={15} />
                                        </button>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
