"use client";

import { useEffect, useState, useRef } from "react";
import { useParams } from "next/navigation";
import { jsPDF } from "jspdf";
import html2canvas from "html2canvas";
// Enum replacements for @prisma/client to avoid browser bundle issues
const ShipmentStatus = {
    NEW: "NEW",
    FERI_ADDED: "FERI_ADDED",
    PAID: "PAID",
    AD_GENERATED: "AD_GENERATED",
    COMPLETED: "COMPLETED"
} as const;

const DocumentType = {
    BL: "BL",
    PACKING_LIST: "PACKING_LIST",
    COMMERCIAL_INVOICE: "COMMERCIAL_INVOICE",
    DRAFT_FERI: "DRAFT_FERI",
    PROFORMA: "PROFORMA",
    POP: "POP",
    AD: "AD",
    FACTURE: "FACTURE",
    FINAL_FERI: "FINAL_FERI",
    TIO: "TIO"
} as const;
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
    Package,
    Eye,
    Globe,
    Printer,
    FileCheck
} from "lucide-react";
import { InvoicePrint } from "@/components/InvoicePrint";
import { useSession } from "next-auth/react";
import { processTimsInvoice } from "@/lib/tims";



type FullShipment = any;

export default function ShipmentDetailPage() {
    const params = useParams();
    const invoiceRef = useRef<HTMLDivElement>(null);
    const [shipment, setShipment] = useState<FullShipment | null>(null);
    const [loading, setLoading] = useState(true);
    const [actionLoading, setActionLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    // Form states per step
    const [feriForm, setFeriForm] = useState({ feriNumber: "", proformaNumber: "", proformaAmountEUR: "", commissionEUR: 40 });
    const [paidForm, setPaidForm] = useState({ exchangeRate: "1.23" });
    const [adForm, setAdForm] = useState({ adAmountUSD: "", tioNumber: "" });
    const { data: session } = useSession();
    const [invoiceForm, setInvoiceForm] = useState({
        vesselName: "",
        entryNumber: "",
        roeKsh: "130",
        preparedBy: "MBARAK FARID",
        feriNumber: "",
        blNumber: "",
        customerPin: ""
    });
    const [showInvoiceModal, setShowInvoiceModal] = useState(false);
    const [isTimsEnabled, setIsTimsEnabled] = useState(true);


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

    useEffect(() => {
        if (shipment) {
            setInvoiceForm(prev => ({
                ...prev,
                feriNumber: shipment.feriNumber || "",
                blNumber: shipment.blNumber || "",
                preparedBy: session?.user?.name || prev.preparedBy
            }));
        }
    }, [shipment, session]);

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

    const handleFinalizeInvoice = async () => {
        const tId = toast.loading("Finalizing invoice...");
        setActionLoading(true);
        try {
            let timsData = null;

            if (isTimsEnabled) {
                toast.loading("Communicating with KRA TIMS...", { id: tId });

                // Get official next invoice number
                const numRes = await fetch("/api/invoices/next-number");
                const numData = await numRes.json();
                const officialInvNum = numData.nextNumber || (shipment?.id.slice(-8).toUpperCase());

                const timsResult = await processTimsInvoice(
                    { ip: "192.168.1.103", port: 8000 },
                    {
                        type: "Normal",
                        invoiceNumber: officialInvNum,
                        customerPin: invoiceForm.customerPin,
                        items: [
                            {
                                name: `FERI CHARGES (${invoiceForm.feriNumber})`,
                                price: Number(shipment.totalUSD) * Number(invoiceForm.roeKsh),
                                quantity: 1,
                                vatCode: "E", // Exempt
                                hsCode: shipment.hsCode || "98010000" // HS Code is required for Exempt items
                            }
                        ]
                    }
                );

                if (!timsResult.success) {
                    toast.error(`TIMS Error: ${timsResult.error}`, { id: tId });
                    if (!confirm("TIMS Integration failed. Do you want to finalize without KRA QR code?")) {
                        setActionLoading(false);
                        return;
                    }
                } else {
                    timsData = timsResult.cuData;
                }
            }

            const res = await fetch(`/api/shipments/${params.id}/invoice`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    ...invoiceForm,
                    ...timsData
                }),
            });
            const json = await res.json();
            if (!res.ok) {
                toast.error(json.error || "Failed to finalize invoice", { id: tId });
            } else {
                toast.success("Invoice finalized!", { id: tId });
                setShowInvoiceModal(false);
                await fetchShipment();
            }
        } catch (error) {
            console.error("Finalize error:", error);
            toast.error("Network error", { id: tId });
        } finally {
            setActionLoading(false);
        }
    };

    const handleGeneratePDF = async () => {
        if (!invoiceRef.current) return;
        const tId = toast.loading("Preparing PDF Preview...");

        try {
            // Temporarily unhide the container but keep it visually off-screen to prevent layout flash
            const el = invoiceRef.current;
            el.style.display = "block";
            el.style.position = "absolute";
            el.style.left = "-9999px";

            // Allow the browser to apply layout calculation
            await new Promise((resolve) => setTimeout(resolve, 300));

            const canvas = await html2canvas(el, {
                scale: 2,
                useCORS: true,
                logging: false,
                windowWidth: 1000 // Force standard desktop width
            });

            // Revert state
            el.style.display = "none";
            el.style.position = "static";
            el.style.left = "auto";

            const imgData = canvas.toDataURL("image/png");

            const pdf = new jsPDF({
                orientation: "portrait",
                unit: "mm",
                format: "a4"
            });

            const pdfWidth = pdf.internal.pageSize.getWidth();
            const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

            pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);

            const pdfBlob = pdf.output("blob");
            const blobUrl = URL.createObjectURL(pdfBlob);

            window.open(blobUrl, "_blank");
            toast.success("Preview opened automatically!", { id: tId });
        } catch (error) {
            console.error("PDF gen error:", error);
            toast.error("Failed to generate PDF.", { id: tId });
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


    const openAllDocs = () => {
        const activeDocs = shipment?.documents.filter((d: any) => !d.isReplaced) || [];
        if (activeDocs.length === 0) return toast.error("No documents to open");

        activeDocs.forEach((doc: any, i: any) => {
            // Slight delay to prevent popup blockers in some browsers
            setTimeout(() => {
                window.open(doc.driveUrl, "_blank");
            }, i * 200);
        });
        toast.success(`Opening ${activeDocs.length} documents...`);
    };

    if (loading) return <div>Loading shipment {params.id}...</div>;
    if (error || !shipment) return <div style={{ color: "hsl(0,72%,72%)" }}>{error || "Not found"}</div>;

    return (
        <>
            <div className="animate-fade-in no-print" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: "1rem" }}>
                {/* LEFT COLUMN: Steps & Actions & Financials */}
                <div style={{ minWidth: 0 }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "1.5rem", flexWrap: "wrap", gap: "1rem" }}>
                        <div>
                            <h1 style={{ fontSize: "1.75rem", fontWeight: 700, marginBottom: "0.25rem", color: "hsl(var(--text-primary))" }}>
                                {shipment.clientName}
                            </h1>
                            <div style={{ color: "hsl(var(--text-secondary))", fontSize: "0.9rem", display: "flex", alignItems: "center", gap: "1.25rem", flexWrap: "wrap" }}>
                                <div style={{ display: "flex", alignItems: "center", gap: "0.4rem" }}>
                                    <FileText size={14} /> BL: {shipment.blNumber}
                                </div>
                                <div style={{ display: "flex", alignItems: "center", gap: "0.4rem" }}>
                                    <Package size={14} /> {(shipment as any).containerCount} Containers
                                </div>
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

                    {((shipment.status === ShipmentStatus.PAID) || ((shipment as any).isFeriSkipped && shipment.adAmountUSD === null)) && (
                        <div className="card" style={{ marginBottom: "2rem" }}>
                            <h3 style={{ fontSize: "1.1rem", fontWeight: 600, marginBottom: "1rem" }}>Step 4: Generate AD</h3>
                            <p style={{ color: "hsl(var(--text-secondary))", fontSize: "0.875rem", marginBottom: "1.5rem" }}>
                                Upload AD, Facture, Final Feri, & TIO. Then enter final AD details.
                            </p>
                            <form onSubmit={(e) => { e.preventDefault(); handleAction("ADD_AD", { tioNumber: adForm.tioNumber }); }}>
                                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "1rem", marginBottom: "1.5rem" }}>
                                    <div className="form-group">
                                        <label>AD Amount (USD) — <span style={{ color: "hsl(var(--primary))", fontSize: "0.75rem" }}>Calculated: $20 × {(shipment as any).containerCount}</span></label>
                                        <div style={{ padding: "0.6rem 0.75rem", background: "hsl(var(--surface-2))", border: "1px solid hsl(var(--border))", borderRadius: "0.375rem", fontWeight: 700, fontSize: "1.1rem", color: "hsl(var(--success))" }}>
                                            $ {((shipment as any).containerCount * 20).toFixed(2)}
                                        </div>
                                    </div>
                                    <div className="form-group">
                                        <label>Proforma Number</label>
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

                    {shipment.status === ShipmentStatus.COMPLETED && (
                        <div className="card" style={{ marginBottom: "2rem", border: shipment.invoiceNumber ? "1px solid hsl(var(--success) / 0.5)" : undefined, background: shipment.invoiceNumber ? "hsl(var(--success) / 0.02)" : undefined }}>
                            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1rem" }}>
                                <h3 style={{ fontSize: "1.1rem", fontWeight: 600, margin: 0 }}>Step 6: {shipment.invoiceNumber ? "Invoice Generated" : "Finalize Invoice"}</h3>
                                {shipment.invoiceNumber && <span className="badge badge-completed">Inv: {shipment.invoiceNumber}</span>}
                            </div>
                            <p style={{ color: "hsl(var(--text-secondary))", fontSize: "0.875rem", marginBottom: "1.5rem" }}>
                                {shipment.invoiceNumber
                                    ? "The official invoice has been generated. You can now download or print it."
                                    : "The shipment is marked as complete. The final step is to generate the account invoice receipt."}
                            </p>

                            <div style={{ display: "flex", gap: "1rem" }}>
                                {!shipment.invoiceNumber ? (
                                    <button className="btn btn-primary" onClick={() => setShowInvoiceModal(true)} style={{ gap: "0.5rem", width: "100%", justifyContent: "center" }}>
                                        <FileCheck size={18} /> Generate Invoice Receipt
                                    </button>
                                ) : (
                                    <>
                                        <button onClick={handleGeneratePDF} className="btn btn-primary" style={{ gap: "0.5rem", flex: 1, justifyContent: "center" }}>
                                            <Printer size={18} /> Print / Preview PDF
                                        </button>
                                        <button onClick={() => setShowInvoiceModal(true)} className="btn btn-secondary" style={{ gap: "0.5rem", flex: 1, justifyContent: "center" }}>
                                            Edit Invoice Details
                                        </button>
                                    </>
                                )}
                            </div>
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
                                allowedTypes={[
                                    DocumentType.BL,
                                    DocumentType.PACKING_LIST,
                                    DocumentType.COMMERCIAL_INVOICE,
                                    DocumentType.DRAFT_FERI,
                                    DocumentType.PROFORMA,
                                    DocumentType.POP,
                                    DocumentType.AD,
                                    DocumentType.FACTURE,
                                    DocumentType.FINAL_FERI,
                                    DocumentType.TIO
                                ]}
                                onSuccess={fetchShipment}
                            />
                        </div>

                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1rem" }}>
                            <h4 style={{ fontSize: "0.8rem", color: "hsl(var(--text-muted))", textTransform: "uppercase", letterSpacing: "0.05em", margin: 0 }}>
                                Files ({shipment.documents.filter((d: any) => !d.isReplaced).length})
                            </h4>
                            {shipment.documents.filter((d: any) => !d.isReplaced).length > 1 && (
                                <button
                                    onClick={openAllDocs}
                                    className="btn btn-ghost btn-sm"
                                    style={{ fontSize: "0.75rem", gap: "0.3rem", color: "hsl(var(--primary))", padding: "0.25rem 0.5rem" }}
                                >
                                    <Eye size={14} /> View All
                                </button>
                            )}
                        </div>

                        <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                            {shipment.documents.length === 0 && (
                                <div style={{ color: "hsl(var(--text-muted))", fontSize: "0.875rem", fontStyle: "italic" }}>No documents uploaded.</div>
                            )}
                            {shipment.documents.map((doc: any) => (
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

            {/* INVOICE MODAL */}
            {showInvoiceModal && (
                <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.7)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 1000, padding: "1rem" }} className="no-print">
                    <div className="card" style={{ maxWidth: "500px", width: "100%", boxShadow: "0 20px 50px rgba(0,0,0,0.5)" }}>
                        <h2 style={{ fontSize: "1.25rem", fontWeight: 700, marginBottom: "1.5rem" }}>Finalize Invoice Details</h2>
                        <form onSubmit={(e) => { e.preventDefault(); handleFinalizeInvoice(); }}>
                            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem", marginBottom: "1.5rem" }}>
                                <div className="form-group">
                                    <label>Vessel Name</label>
                                    <input value={invoiceForm.vesselName} onChange={e => setInvoiceForm({ ...invoiceForm, vesselName: e.target.value })} placeholder="Optional" />
                                </div>
                                <div className="form-group">
                                    <label>Entry Number</label>
                                    <input value={invoiceForm.entryNumber} onChange={e => setInvoiceForm({ ...invoiceForm, entryNumber: e.target.value })} placeholder="Optional" />
                                </div>
                                <div className="form-group">
                                    <label>FERI Number</label>
                                    <input value={invoiceForm.feriNumber} onChange={e => setInvoiceForm({ ...invoiceForm, feriNumber: e.target.value })} />
                                </div>
                                <div className="form-group">
                                    <label>BL Number</label>
                                    <input value={invoiceForm.blNumber} onChange={e => setInvoiceForm({ ...invoiceForm, blNumber: e.target.value })} />
                                </div>
                                <div className="form-group">
                                    <label>Customer PIN</label>
                                    <input value={invoiceForm.customerPin} onChange={e => setInvoiceForm({ ...invoiceForm, customerPin: e.target.value })} placeholder="A000000000Z" />
                                </div>
                                <div className="form-group">
                                    <label>ROE (USD to Ksh)</label>
                                    <input type="number" step="0.01" required value={invoiceForm.roeKsh} onChange={e => setInvoiceForm({ ...invoiceForm, roeKsh: e.target.value })} />
                                </div>
                                <div className="form-group" style={{ gridColumn: "span 2" }}>
                                    <label>Prepared By</label>
                                    <input required value={invoiceForm.preparedBy} onChange={e => setInvoiceForm({ ...invoiceForm, preparedBy: e.target.value })} />
                                </div>
                            </div>

                            <div style={{ marginBottom: "1.5rem", display: "flex", alignItems: "center", gap: "0.5rem" }}>
                                <input
                                    type="checkbox"
                                    id="timsToggle"
                                    checked={isTimsEnabled}
                                    onChange={e => setIsTimsEnabled(e.target.checked)}
                                    style={{ width: "auto" }}
                                />
                                <label htmlFor="timsToggle" style={{ margin: 0, fontSize: "0.875rem", cursor: "pointer" }}>
                                    Enable KRA TIMS Integration
                                </label>
                            </div>
                            <div style={{ display: "flex", gap: "1rem" }}>
                                <button type="button" onClick={() => setShowInvoiceModal(false)} className="btn btn-secondary" style={{ flex: 1, justifyContent: "center" }}>Cancel</button>
                                <button type="submit" disabled={actionLoading} className="btn btn-primary" style={{ flex: 1, justifyContent: "center" }}>
                                    {shipment.invoiceNumber ? "Update & Finalize" : "Save & Generate"}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* PRINT ONLY INVOICE */}
            <div ref={invoiceRef} style={{ display: "none" }} className="print-only">
                {shipment.invoiceNumber && <InvoicePrint shipment={shipment} />}
            </div>

            <style jsx global>{`
                @media print {
                    .no-print { display: none !important; }
                    .print-only { display: block !important; }
                    main { padding: 0 !important; margin: 0 !important; }
                }
            `}</style>
        </>
    );
}
