"use client";

import { useEffect, useState, use } from "react";
import { format } from "date-fns";
import {
    Loader2, FileText, CheckCircle2, AlertCircle, Clock,
    ShieldAlert, Upload, Download, Plus, Edit3, X, Check,
    Anchor, Truck, Package, Building, DollarSign, Layers, Eye, MessageSquare
} from "lucide-react";
import Link from "next/link";
import { toast } from "sonner";
import Breadcrumbs from "@/components/well/Breadcrumbs";
import { apis } from "@/lib/api/apis";
import { Modal, Drawer } from "@/components/well/Modal";
import { Input, Select, Textarea, FormSection, FormRow, Button } from "@/components/well/FormControls";
import { HealthBadge, HealthStatus } from "@/components/well/HealthBadge";
import { DataTable, Column } from "@/components/well/DataTable";

const JOURNEY_MILESTONES = [
    { key: "FILE_OPENED", label: "1. File Opened" },
    { key: "ENTRY_PASSED", label: "2. Entry Passed" },
    { key: "VERIFICATION", label: "3. Verification" },
    { key: "RELEASE", label: "4. Release" },
    { key: "DELIVERED", label: "5. Delivered" },
];

const FIELD = ({ label, value, mono = false, color }: { label: string; value: string; mono?: boolean; color?: string }) => (
    <div>
        <div style={{ fontSize: "0.72rem", color: "hsl(var(--text-muted))", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.04em", marginBottom: "0.2rem" }}>{label}</div>
        <div style={{ fontWeight: 600, fontFamily: mono ? "monospace" : undefined, color: color || "hsl(var(--text-primary))" }}>{value || "—"}</div>
    </div>
);

export default function WellShipmentWorkspacePage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = use(params);
    const [shipment, setShipment] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [activeTab, setActiveTab] = useState<"overview" | "containers" | "documents" | "exceptions" | "notes" | "audit">("overview");
    const [saving, setSaving] = useState(false);

    // Drawers & Modals
    const [showUpdateDrawer, setShowUpdateDrawer] = useState(false);
    const [showExceptionDrawer, setShowExceptionDrawer] = useState(false);
    const [showEventDrawer, setShowEventDrawer] = useState(false);
    const [showDocModal, setShowDocModal] = useState(false);
    const [showContainerModal, setShowContainerModal] = useState(false);
    const [editingContainer, setEditingContainer] = useState<any>(null);

    // Forms
    const [updateForm, setUpdateForm] = useState<any>({});
    const [exceptionForm, setExceptionForm] = useState({
        issueType: "Customs delay",
        severity: "MEDIUM",
        description: "",
        expectedResolution: "",
        assignedTo: "Operations Team",
        dueDate: ""
    });
    const [eventForm, setEventForm] = useState({ title: "", stage: "CUSTOMS", description: "", reference: "" });
    const [docFile, setDocFile] = useState<File | null>(null);
    const [docType, setDocType] = useState("BL");
    const [newNoteText, setNewNoteText] = useState("");
    const [submittingNote, setSubmittingNote] = useState(false);

    const handleAddNoteSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!newNoteText.trim()) return;
        setSubmittingNote(true);
        try {
            await apis.well.addNote(id, newNoteText.trim());
            toast.success("Operational note saved");
            setNewNoteText("");
            fetchShipment();
        } catch (err: any) {
            toast.error(err.message || "Failed to add note");
        } finally {
            setSubmittingNote(false);
        }
    };

    const setU = (field: string) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) =>
        setUpdateForm((f: any) => ({ ...f, [field]: e.target.value }));

    const fetchShipment = async () => {
        try {
            const data = await apis.well.getShipment(id);
            setShipment(data);
            setUpdateForm({
                clientName: data.clientName,
                clientRef: data.clientRef || "",
                blNumber: data.blNumber,
                vesselName: data.vesselName || "",
                containerSize: data.containerSize || "",
                status: data.status,
                health: data.health || "ON_TRACK",
                healthReason: data.healthReason || "",
                currentStage: data.currentStage || "VESSEL_ARRIVED",
                assignedOperator: data.assignedOperator || "Operations Team",
                shippingLine: data.shippingLine || "",
                origin: data.origin || "Mombasa Port",
                destination: data.destination || "Nairobi CFS",
                finalDelivery: data.finalDelivery || "",
                transporter: data.transporter || "",
                docRecv: data.docRecv || "",
                entryNumber: data.entryNumber || "",
                tblNtbl: data.tblNtbl || "",
                lastSlingCfs: data.lastSlingCfs || "",
                lodgeCustoms: data.lodgeCustoms ? format(new Date(data.lodgeCustoms), "yyyy-MM-dd") : "",
                entryPassed: data.entryPassed ? format(new Date(data.entryPassed), "yyyy-MM-dd") : "",
                slineCharges: data.slineCharges ? format(new Date(data.slineCharges), "yyyy-MM-dd") : "",
                slinePaid: data.slinePaid ? format(new Date(data.slinePaid), "yyyy-MM-dd") : "",
                ddRecv: data.ddRecv ? format(new Date(data.ddRecv), "yyyy-MM-dd") : "",
                lodgedKpa: data.lodgedKpa ? format(new Date(data.lodgedKpa), "yyyy-MM-dd") : "",
                dateVerified: data.dateVerified ? format(new Date(data.dateVerified), "yyyy-MM-dd") : "",
                eta: data.eta ? format(new Date(data.eta), "yyyy-MM-dd") : "",
                notes: data.notes || ""
            });
        } catch {
            toast.error("Failed to load shipment");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => { fetchShipment(); }, [id]);

    const handleUpdateSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setSaving(true);
        try {
            await apis.well.updateShipment(id, updateForm);
            toast.success("Shipment updated successfully");
            setShowUpdateDrawer(false);
            fetchShipment();
        } catch (err: any) {
            toast.error(err.message || "Update failed");
        } finally {
            setSaving(false);
        }
    };

    const handleQuickStage = async (stageKey: string) => {
        try {
            await apis.well.updateShipment(id, { currentStage: stageKey });
            toast.success(`Stage → ${stageKey}`);
            fetchShipment();
        } catch {
            toast.error("Stage update failed");
        }
    };

    const handleReportException = async (e: React.FormEvent) => {
        e.preventDefault();
        setSaving(true);
        try {
            await apis.well.reportException(id, exceptionForm);
            toast.success("Exception flagged on shipment");
            setShowExceptionDrawer(false);
            setExceptionForm({ issueType: "Customs delay", severity: "MEDIUM", description: "", expectedResolution: "", assignedTo: "Operations Team", dueDate: "" });
            fetchShipment();
        } catch (err: any) {
            toast.error(err.message || "Failed to report");
        } finally {
            setSaving(false);
        }
    };

    const handleResolveException = async (exceptionId: string) => {
        const notes = prompt("Resolution notes (optional):");
        if (notes === null) return;
        try {
            await apis.well.resolveException(exceptionId, notes);
            toast.success("Exception resolved");
            fetchShipment();
        } catch {
            toast.error("Failed to resolve");
        }
    };

    const handleAddEvent = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!eventForm.title) { toast.error("Title required"); return; }
        setSaving(true);
        try {
            await apis.well.addEvent(id, eventForm);
            toast.success("Event logged to timeline");
            setShowEventDrawer(false);
            setEventForm({ title: "", stage: "CUSTOMS", description: "", reference: "" });
            fetchShipment();
        } catch (err: any) {
            toast.error(err.message || "Failed");
        } finally {
            setSaving(false);
        }
    };

    const handleDocUpload = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!docFile) { toast.error("Select a file first"); return; }
        setSaving(true);
        const fd = new FormData();
        fd.append("file", docFile);
        fd.append("type", docType);
        try {
            await apis.well.uploadDocument(id, fd);
            toast.success("Document uploaded");
            setShowDocModal(false);
            setDocFile(null);
            fetchShipment();
        } catch (err: any) {
            toast.error(err.message || "Upload failed");
        } finally {
            setSaving(false);
        }
    };

    const fmt = (d: string | null) => (d ? format(new Date(d), "dd MMM yyyy") : "—");
    const fmtDT = (d: string | null) => (d ? format(new Date(d), "dd MMM yyyy · HH:mm") : "—");
    const fmtInputDate = (d: any) => {
        if (!d) return "";
        try {
            return format(new Date(d), "yyyy-MM-dd");
        } catch {
            return "";
        }
    };

    const openEditContainer = (container?: any) => {
        if (container) {
            setEditingContainer({ ...container });
        } else {
            setEditingContainer({
                containerNumber: "",
                size: "20",
                weight: "",
                dischargeDate: "",
                gateOutDate: "",
                truckDetails: "",
                driverName: "",
                status: "In Transit",
                remarks: ""
            });
        }
        setShowContainerModal(true);
    };

    const handleContainerSave = async (e: React.FormEvent) => {
        e.preventDefault();
        const uType = (editingContainer?.unitType || "container").toLowerCase();
        if (uType === "roro" && !editingContainer?.chassisNumber) {
            toast.error("Chassis number is required for RoRo units");
            return;
        }
        if (uType === "container" && !editingContainer?.containerNumber) {
            toast.error("Container number is required for Container units");
            return;
        }
        if (uType === "grouping_lcl" && !editingContainer?.lclReferenceNumber) {
            toast.error("N° Réf Conteneur is required for Grouping LCL units");
            return;
        }
        setSaving(true);
        try {
            await apis.well.updateShipment(id, {
                containers: [editingContainer]
            });
            toast.success("Cargo unit saved successfully");
            setShowContainerModal(false);
            setEditingContainer(null);
            fetchShipment();
        } catch (err: any) {
            toast.error(err.message || "Failed to save cargo unit details");
        } finally {
            setSaving(false);
        }
    };

    const handleVerifyPayment = async () => {
        setSaving(true);
        try {
            await apis.well.verifyPayment(id);
            toast.success("Payment marked as verified!");
            fetchShipment();
        } catch (err: any) {
            toast.error(err.message || "Failed to verify payment");
        } finally {
            setSaving(false);
        }
    };

    const handleStageAdvance = async (newStage: string) => {
        setSaving(true);
        try {
            await apis.well.updateShipment(id, { currentStage: newStage });
            toast.success(`Shipment stage updated to ${newStage}`);
            fetchShipment();
        } catch (err: any) {
            toast.error(err.message || "Failed to update shipment stage");
        } finally {
            setSaving(false);
        }
    };

    if (loading) return (
        <div style={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: "60vh" }}>
            <Loader2 size={36} className="animate-spin" style={{ color: "hsl(var(--primary))" }} />
        </div>
    );
    if (!shipment) return (
        <div style={{ padding: "3rem", textAlign: "center" }}>
            <h2>Shipment Not Found</h2>
            <Link href="/well/shipments" className="btn btn-primary" style={{ marginTop: "1rem" }}>← Back</Link>
        </div>
    );

    const openExceptions = shipment.exceptions?.filter((e: any) => e.status === "OPEN") || [];
    const currentStageKey = (shipment.currentStage || "FILE_OPENED").toUpperCase();
    let milestoneIdx = 0;
    if (["RELEASE", "RELEASED"].includes(currentStageKey)) {
        milestoneIdx = 3;
    } else if (["VERIFICATION", "VERIFIED", "LINE_PAID", "DO_RECEIVED"].includes(currentStageKey)) {
        milestoneIdx = 2;
    } else if (["ENTRY_PASSED", "CUSTOMS"].includes(currentStageKey)) {
        milestoneIdx = 1;
    } else if (["DELIVERED"].includes(currentStageKey)) {
        milestoneIdx = 4;
    } else {
        milestoneIdx = 0;
    }

    const containerColumns: Column<any>[] = [
        {
            header: "Type",
            accessor: (row) => {
                const u = (row.unitType || "container").toLowerCase();
                return (
                    <span style={{ padding: "0.15rem 0.45rem", borderRadius: "4px", fontSize: "0.7rem", fontWeight: 700, background: "hsl(var(--primary) / 0.12)", color: "hsl(var(--primary))", textTransform: "uppercase" }}>
                        {u}
                    </span>
                );
            }
        },
        {
            header: "Identifier",
            accessor: (row) => {
                const u = (row.unitType || "container").toLowerCase();
                if (u === "roro") return row.chassisNumber || "—";
                if (u === "grouping_lcl") return row.lclReferenceNumber || "—";
                return row.containerNumber || "—";
            },
            mono: true
        },
        {
            header: "Size / Spec",
            accessor: (row) => {
                const u = (row.unitType || "container").toLowerCase();
                if (u === "container") {
                    return `${row.size || "20"}' (${row.containerType || "DRY"})${row.sealNumber ? ` · Seal: ${row.sealNumber}` : ""}`;
                }
                return "—";
            }
        },
        {
            header: "Weight (KG)",
            accessor: (row) => {
                const gross = row.grossWeightKg ?? row.weight;
                const net = row.netWeightKg;
                if (!gross && !net) return "—";
                return `${gross ? `${gross} kg (Gross)` : ""}${net ? ` / ${net} kg (Net)` : ""}`;
            }
        },
        {
            header: "Volume (CBM)",
            accessor: (row) => row.volumeCbm ? `${row.volumeCbm} CBM` : "—"
        },
        { header: "Discharge Date", accessor: (row) => fmt(row.dischargeDate) },
        { header: "Gate Out Date", accessor: (row) => fmt(row.gateOutDate) },
        { header: "Truck / Driver", accessor: (row) => `${row.truckDetails || "—"}${row.driverName ? ` (${row.driverName})` : ""}` },
        { header: "Status", accessor: (row) => <span style={{ padding: "0.15rem 0.4rem", borderRadius: "4px", background: "hsl(var(--surface-3))", fontWeight: 600, fontSize: "0.78rem" }}>{row.status || "In Transit"}</span> },
        {
            header: "Actions",
            accessor: (row) => (
                <div style={{ display: "flex", gap: "0.35rem" }}>
                    <Link
                        href={`/well/containers/${row.id}`}
                        style={{
                            display: "inline-flex",
                            alignItems: "center",
                            gap: "0.3rem",
                            padding: "0.2rem 0.55rem",
                            fontSize: "0.75rem",
                            fontWeight: 600,
                            borderRadius: "4px",
                            background: "hsl(var(--primary) / 0.1)",
                            color: "hsl(var(--primary))",
                            border: "1px solid hsl(var(--primary) / 0.3)",
                            textDecoration: "none"
                        }}
                    >
                        <Eye size={12} /> View
                    </Link>
                    <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => openEditContainer(row)}
                        icon={<Edit3 size={13} />}
                        style={{ padding: "0.2rem 0.5rem", fontSize: "0.78rem" }}
                    >
                        Edit
                    </Button>
                </div>
            )
        }
    ];

    return (
        <div className="animate-fade-in" style={{ paddingBottom: "2rem", overflowX: "hidden", maxWidth: "100%" }}>
            <Breadcrumbs />

            {/* Identity Banner */}
            <div className="card" style={{ padding: "1rem 1.25rem", marginBottom: "1rem", borderLeft: `5px solid ${shipment.health === "BLOCKED" ? "#ef4444" : shipment.health === "ATTENTION" ? "#f97316" : shipment.health === "DELAYED" ? "#f59e0b" : "#10b981"}` }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: "0.75rem" }}>
                    <div>
                        <div style={{ display: "flex", alignItems: "center", gap: "0.6rem", flexWrap: "wrap", marginBottom: "0.25rem" }}>
                            <span style={{ fontSize: "1.4rem", fontWeight: 800, color: "hsl(var(--primary))", fontFamily: "monospace" }}>{shipment.refNumber}</span>
                            <span style={{ padding: "0.15rem 0.55rem", borderRadius: "4px", fontSize: "0.75rem", fontWeight: 700, background: "hsl(var(--primary) / 0.15)", color: "hsl(var(--primary))" }}>
                                STAGE: {shipment.currentStage || "FILE_OPENED"}
                            </span>
                            {shipment.paymentVerifiedAt ? (
                                <span style={{ padding: "0.15rem 0.55rem", borderRadius: "4px", fontSize: "0.75rem", fontWeight: 700, background: "#10b98122", color: "#10b981", border: "1px solid #10b98144" }}>
                                    ✓ Payment Verified ({format(new Date(shipment.paymentVerifiedAt), "dd MMM yyyy")})
                                </span>
                            ) : (
                                <span style={{ padding: "0.15rem 0.55rem", borderRadius: "4px", fontSize: "0.75rem", fontWeight: 700, background: "#f59e0b22", color: "#f59e0b", border: "1px solid #f59e0b44" }}>
                                    Payment Pending
                                </span>
                            )}
                            {openExceptions.length > 0 && (
                                <span style={{ padding: "0.15rem 0.5rem", borderRadius: "4px", fontSize: "0.72rem", fontWeight: 700, background: "rgba(239,68,68,0.15)", color: "#ef4444", border: "1px solid rgba(239,68,68,0.3)" }}>
                                    ⚠ {openExceptions.length} Open Exception{openExceptions.length > 1 ? "s" : ""}
                                </span>
                            )}
                        </div>
                        <div style={{ fontWeight: 700, fontSize: "1rem" }}>{shipment.clientName} <span style={{ fontWeight: 400, color: "hsl(var(--text-muted))", fontSize: "0.85rem" }}>/ {shipment.clientRef || "—"}</span></div>
                        <div style={{ display: "flex", gap: "1.25rem", marginTop: "0.3rem", fontSize: "0.8rem", color: "hsl(var(--text-secondary))", flexWrap: "wrap" }}>
                            <span><strong>B/L:</strong> <span style={{ fontFamily: "monospace" }}>{shipment.blNumber}</span></span>
                            <span><strong>Vessel:</strong> {shipment.vesselName || "—"}</span>
                            <span><strong>ETA:</strong> {fmt(shipment.eta)}</span>
                            <span><strong>Containers:</strong> {shipment.containers?.length || 0} × {shipment.containerSize}</span>
                            <span><strong>Line:</strong> {shipment.shippingLine || "—"}</span>
                        </div>
                    </div>
                    <div style={{ display: "flex", gap: "0.4rem", flexWrap: "wrap" }}>
                        {!shipment.paymentVerifiedAt && (
                            <Button onClick={handleVerifyPayment} size="sm" variant="secondary" icon={<DollarSign size={13} style={{ color: "#10b981" }} />}>
                                Mark Payment Verified
                            </Button>
                        )}
                        {shipment.currentStage === "VERIFICATION" && (
                            <Button onClick={() => handleStageAdvance("RELEASE")} size="sm" variant="primary" icon={<CheckCircle2 size={13} />}>
                                Advance to Release
                            </Button>
                        )}
                        {(shipment.currentStage === "RELEASE" || shipment.currentStage === "RELEASED") && (
                            <Button onClick={() => handleStageAdvance("DELIVERED")} size="sm" variant="primary" icon={<CheckCircle2 size={13} />}>
                                Mark Delivered
                            </Button>
                        )}
                        <Button onClick={() => setShowUpdateDrawer(true)} size="sm" icon={<Edit3 size={13} />}>Update</Button>
                        <Button onClick={() => setShowEventDrawer(true)} variant="secondary" size="sm" icon={<Plus size={13} />}>Log Event</Button>
                        <Button onClick={() => setShowExceptionDrawer(true)} variant="danger" size="sm" icon={<ShieldAlert size={13} />}>Flag Exception</Button>
                        <Button onClick={() => setShowDocModal(true)} variant="ghost" size="sm" icon={<Upload size={13} />}>Upload Doc</Button>
                    </div>
                </div>
                {/* {shipment.healthReason && (
                    <div style={{ marginTop: "0.75rem", padding: "0.5rem 0.85rem", borderRadius: "6px", background: "rgba(239,68,68,0.08)", color: "#ef4444", fontSize: "0.8rem", display: "flex", gap: "0.4rem", border: "1px solid rgba(239,68,68,0.2)" }}>
                        <AlertCircle size={14} style={{ flexShrink: 0, marginTop: "1px" }} />
                        <span><strong>Notice:</strong> {shipment.healthReason}</span>
                    </div>
                )} */}
            </div>

            {/* Open Exception Banner */}
            {openExceptions.length > 0 && (
                <div className="card" style={{ padding: "0.85rem 1rem", marginBottom: "1rem", background: "rgba(239,68,68,0.07)", border: "1px solid rgba(239,68,68,0.25)" }}>
                    <div style={{ fontWeight: 700, color: "#ef4444", display: "flex", alignItems: "center", gap: "0.4rem", marginBottom: "0.5rem", fontSize: "0.88rem" }}>
                        <ShieldAlert size={16} /> Action Required — {openExceptions.length} Open Exception{openExceptions.length > 1 ? "s" : ""}
                    </div>
                    {openExceptions.map((ex: any) => (
                        <div key={ex.id} style={{ padding: "0.6rem 0.85rem", borderRadius: "6px", background: "hsl(var(--surface-1))", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "0.5rem", marginBottom: "0.35rem", border: "1px solid hsl(var(--border))" }}>
                            <div>
                                <div style={{ display: "flex", alignItems: "center", gap: "0.4rem", marginBottom: "0.15rem" }}>
                                    <span style={{ padding: "0.1rem 0.35rem", borderRadius: "3px", fontSize: "0.65rem", fontWeight: 700, background: ex.severity === "CRITICAL" ? "#ef4444" : ex.severity === "HIGH" ? "#f97316" : "#f59e0b", color: "#fff" }}>{ex.severity}</span>
                                    <strong style={{ fontSize: "0.83rem" }}>{ex.issueType}</strong>
                                    <span style={{ fontSize: "0.7rem", color: "hsl(var(--text-muted))" }}>· {fmtDT(ex.createdAt)} by {ex.createdBy}</span>
                                </div>
                                <p style={{ fontSize: "0.8rem", color: "hsl(var(--text-secondary))", margin: 0 }}>{ex.description}</p>
                            </div>
                            <Button onClick={() => handleResolveException(ex.id)} size="sm" icon={<Check size={13} />} style={{ background: "#10b981", height: "30px", fontSize: "0.75rem" }}>Resolve</Button>
                        </div>
                    ))}
                </div>
            )}

            {/* Delivered & Final Scanned Dossier Banner */}
            {(shipment.currentStage || "").toUpperCase() === "DELIVERED" && (
                <div className="card animate-fade-in" style={{ padding: "1rem 1.25rem", marginBottom: "1rem", background: "hsl(var(--primary) / 0.08)", border: "1.5px solid hsl(var(--primary) / 0.35)", borderRadius: "10px" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "0.75rem" }}>
                        <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
                            <div style={{ background: "hsl(var(--primary) / 0.2)", padding: "0.55rem", borderRadius: "8px", color: "hsl(var(--primary))" }}>
                                <FileText size={22} />
                            </div>
                            <div>
                                <div style={{ fontWeight: 700, fontSize: "0.95rem", color: "hsl(var(--text-primary))" }}>
                                    Shipment Delivered — Final Scanned Dossier Handoff
                                </div>
                                <p style={{ fontSize: "0.8rem", color: "hsl(var(--text-secondary))", margin: "0.15rem 0 0 0" }}>
                                    All containers delivered/returned. Scan all final operational documents into one single PDF dossier and upload here for Finance billing workflow.
                                </p>
                            </div>
                        </div>
                        <Button
                            onClick={() => {
                                setDocType("FINAL_SCANNED_DOSSIER");
                                setShowDocModal(true);
                            }}
                            size="sm"
                            variant="primary"
                            icon={<Upload size={14} />}
                        >
                            Upload Final Scanned Dossier
                        </Button>
                    </div>
                </div>
            )}

            {/* Journey Milestone Tracker */}
            <div className="card" style={{ padding: "0.85rem 1rem", marginBottom: "1rem", overflowX: "auto" }}>
                <div style={{ fontSize: "0.7rem", fontWeight: 700, color: "hsl(var(--text-muted))", textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: "0.6rem" }}>Shipment Journey</div>
                <div style={{ display: "flex", alignItems: "flex-start", minWidth: "850px", gap: 0 }}>
                    {JOURNEY_MILESTONES.map((m, idx) => {
                        const isDone = idx < milestoneIdx;
                        const isCurrent = idx === milestoneIdx;
                        return (
                            <div key={m.key} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", position: "relative" }}>
                                {idx > 0 && (
                                    <div style={{ position: "absolute", left: 0, top: "12px", width: "50%", height: "2px", background: isDone || isCurrent ? "hsl(var(--primary))" : "hsl(var(--border))" }} />
                                )}
                                {idx < JOURNEY_MILESTONES.length - 1 && (
                                    <div style={{ position: "absolute", right: 0, top: "12px", width: "50%", height: "2px", background: isDone ? "hsl(var(--primary))" : "hsl(var(--border))" }} />
                                )}
                                <div style={{
                                    width: "26px", height: "26px", borderRadius: "50%", zIndex: 1,
                                    background: isDone ? "hsl(var(--primary))" : isCurrent ? "hsl(var(--primary))" : "hsl(var(--surface-3))",
                                    color: isDone || isCurrent ? "#fff" : "hsl(var(--text-muted))",
                                    display: "flex", alignItems: "center", justifyContent: "center",
                                    fontWeight: 700, fontSize: "0.7rem",
                                    boxShadow: isCurrent ? `0 0 0 3px hsl(var(--primary) / 0.25)` : "none",
                                    transition: "all 0.2s"
                                }}>
                                    {isDone ? <Check size={13} /> : idx + 1}
                                </div>
                                <div style={{ fontSize: "0.65rem", fontWeight: isCurrent ? 700 : 500, color: isCurrent ? "hsl(var(--primary))" : isDone ? "hsl(var(--text-secondary))" : "hsl(var(--text-muted))", marginTop: "0.3rem", textAlign: "center", lineHeight: 1.15 }}>
                                    {m.label}
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>

            {/* Tabs */}
            <div style={{ display: "flex", gap: "0.25rem", borderBottom: "1px solid hsl(var(--border))", marginBottom: "1rem", overflowX: "auto" }}>
                {[
                    { id: "overview", label: "Operational Overview", icon: Layers },
                    { id: "containers", label: `Containers (${shipment.containers?.length || 0})`, icon: Package },
                    { id: "documents", label: `Documents (${shipment.documents?.length || 0})`, icon: FileText },
                    { id: "exceptions", label: `Exceptions (${shipment.exceptions?.length || 0})`, icon: ShieldAlert },
                    { id: "notes", label: `Notes History (${shipment.notesHistory?.length || (shipment.notes ? 1 : 0)})`, icon: MessageSquare },
                    { id: "audit", label: `Timeline (${shipment.events?.length || 0})`, icon: Clock }
                ].map(tab => {
                    const Icon = tab.icon;
                    const active = activeTab === tab.id;
                    return (
                        <button key={tab.id} onClick={() => setActiveTab(tab.id as any)} style={{
                            padding: "0.55rem 0.95rem", fontWeight: 600, fontSize: "0.82rem", whiteSpace: "nowrap",
                            borderTop: "none", borderLeft: "none", borderRight: "none",
                            borderBottom: active ? "2.5px solid hsl(var(--primary))" : "2.5px solid transparent",
                            color: active ? "hsl(var(--primary))" : "hsl(var(--text-secondary))",
                            background: "transparent", borderRadius: "4px 4px 0 0",
                            cursor: "pointer", display: "flex", alignItems: "center", gap: "0.35rem",
                            transition: "color 0.15s"
                        }}>
                            <Icon size={14} /> {tab.label}
                        </button>
                    );
                })}
            </div>

            {/* Tab: Overview Grid */}
            {activeTab === "overview" && (
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: "1.25rem" }}>
                    {[
                        {
                            title: "Shipping Line & D/O", icon: Anchor, fields: [
                                { label: "Shipping Line", value: shipment.shippingLine },
                                { label: "D/O Received", value: fmt(shipment.ddRecv), color: shipment.ddRecv ? "#10b981" : undefined },
                                { label: "Line Charges Date", value: fmt(shipment.slineCharges) },
                                { label: "Line Paid Date", value: fmt(shipment.slinePaid), color: shipment.slinePaid ? "#10b981" : undefined },
                            ]
                        },
                        {
                            title: "Customs Clearance", icon: FileText, fields: [
                                { label: "Entry Number", value: shipment.entryNumber, mono: true, color: "hsl(var(--primary))" },
                                { label: "TBL / N.TBL", value: shipment.tblNtbl },
                                { label: "Lodge Customs", value: fmt(shipment.lodgeCustoms) },
                                { label: "Entry Passed", value: fmt(shipment.entryPassed), color: shipment.entryPassed ? "#10b981" : undefined },
                            ]
                        },
                        {
                            title: "KPA & Port Verification", icon: Building, fields: [
                                { label: "Lodged KPA", value: fmt(shipment.lodgedKpa) },
                                { label: "KPA Verified", value: fmt(shipment.dateVerified), color: shipment.dateVerified ? "#10b981" : undefined },
                                { label: "Doc Recv", value: shipment.docRecv },
                                { label: "Vessel ETA", value: fmt(shipment.eta) },
                            ]
                        },
                        {
                            title: "CFS & Inland Logistics", icon: Truck, fields: [
                                { label: "CFS Station", value: shipment.lastSlingCfs },
                                { label: "Transporter", value: shipment.transporter },
                                { label: "Origin Port", value: shipment.origin },
                                { label: "Final Destination", value: shipment.finalDelivery },
                            ]
                        },
                    ].map(card => {
                        const CardIcon = card.icon;
                        return (
                            <div key={card.title} className="card" style={{ padding: "1.25rem" }}>
                                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1rem", paddingBottom: "0.6rem", borderBottom: "1px solid hsl(var(--border))" }}>
                                    <div style={{ fontWeight: 700, fontSize: "0.9rem", display: "flex", alignItems: "center", gap: "0.5rem" }}>
                                        <CardIcon size={17} style={{ color: "hsl(var(--primary))" }} />{card.title}
                                    </div>
                                    <Button onClick={() => setShowUpdateDrawer(true)} variant="ghost" size="sm">Edit</Button>
                                </div>
                                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.85rem" }}>
                                    {card.fields.map(f => <FIELD key={f.label} {...f} />)}
                                </div>
                            </div>
                        );
                    })}
                </div>
            )}

            {/* Tab: Containers */}
            {activeTab === "containers" && (
                <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", background: "hsl(var(--surface-2))", padding: "0.85rem 1.25rem", borderRadius: "8px", border: "1px solid hsl(var(--border))" }}>
                        <div>
                            <h3 style={{ fontSize: "0.95rem", fontWeight: 700, margin: 0, color: "hsl(var(--text-primary))" }}>Container Tracking & Movement</h3>
                            <p style={{ fontSize: "0.78rem", color: "hsl(var(--text-muted))", margin: "0.15rem 0 0" }}>Update discharge dates, gate out, truck details, driver info, and container statuses</p>
                        </div>
                        <Button size="sm" onClick={() => openEditContainer()} icon={<Plus size={14} />}>
                            Add Container
                        </Button>
                    </div>
                    <DataTable columns={containerColumns} data={shipment.containers || []} keyExtractor={(c) => c.id || c.containerNumber} emptyMessage="No containers registered to this shipment." />
                </div>
            )}

            {/* Tab: Documents */}
            {activeTab === "documents" && (
                <div className="card" style={{ padding: "1.25rem" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1rem" }}>
                        <div style={{ fontWeight: 700 }}>Shipment Documents</div>
                        <Button onClick={() => setShowDocModal(true)} size="sm" icon={<Upload size={14} />}>Upload Document</Button>
                    </div>
                    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))", gap: "1rem" }}>
                        {(!shipment.documents || shipment.documents.length === 0) ? (
                            <div style={{ gridColumn: "1/-1", textAlign: "center", padding: "3rem", color: "hsl(var(--text-muted))" }}>No documents attached.</div>
                        ) : shipment.documents.map((doc: any) => (
                            <div key={doc.id} className="card" style={{ padding: "1rem", background: "hsl(var(--surface-2))", border: "1px solid hsl(var(--border))" }}>
                                <div style={{ display: "flex", gap: "0.5rem", marginBottom: "0.5rem" }}>
                                    <FileText size={20} style={{ color: "hsl(var(--primary))", flexShrink: 0 }} />
                                    <div>
                                        <div style={{ fontWeight: 600, fontSize: "0.85rem" }}>{doc.name}</div>
                                        <div style={{ fontSize: "0.72rem", color: "hsl(var(--text-muted))" }}>{doc.type} · {fmtDT(doc.createdAt)}</div>
                                    </div>
                                </div>
                                <div style={{ display: "flex", gap: "0.5rem", justifyContent: "flex-end", marginTop: "0.75rem" }}>
                                    <a href={doc.path} target="_blank" rel="noopener noreferrer" className="btn btn-ghost btn-sm" style={{ gap: "0.3rem" }}><Eye size={13} /> View</a>
                                    <a href={doc.path} download className="btn btn-primary btn-sm" style={{ gap: "0.3rem" }}><Download size={13} /> Download</a>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* Tab: Exceptions */}
            {activeTab === "exceptions" && (
                <div className="card" style={{ padding: "1.25rem" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1rem" }}>
                        <div style={{ fontWeight: 700 }}>Exceptions Log</div>
                        <Button onClick={() => setShowExceptionDrawer(true)} variant="danger" size="sm" icon={<ShieldAlert size={14} />}>Report Exception</Button>
                    </div>
                    <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
                        {(!shipment.exceptions || shipment.exceptions.length === 0) ? (
                            <div style={{ textAlign: "center", padding: "3rem", color: "hsl(var(--text-muted))" }}>No exceptions recorded. Operations running smoothly.</div>
                        ) : shipment.exceptions.map((ex: any) => (
                            <div key={ex.id} style={{ padding: "1rem", borderRadius: "8px", background: "hsl(var(--surface-2))", borderLeft: `4px solid ${ex.status === "RESOLVED" ? "#10b981" : ex.severity === "CRITICAL" ? "#ef4444" : "#f59e0b"}` }}>
                                <div style={{ display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: "0.5rem" }}>
                                    <div>
                                        <span style={{ padding: "0.15rem 0.4rem", borderRadius: "3px", fontSize: "0.68rem", fontWeight: 700, background: ex.status === "RESOLVED" ? "#10b98133" : "#ef444422", color: ex.status === "RESOLVED" ? "#10b981" : "#ef4444", marginRight: "0.5rem" }}>{ex.status}</span>
                                        <strong>{ex.issueType}</strong>
                                        <span style={{ fontSize: "0.72rem", color: "hsl(var(--text-muted))", marginLeft: "0.5rem" }}>· {fmtDT(ex.createdAt)}</span>
                                    </div>
                                    {ex.status === "OPEN" && (
                                        <Button onClick={() => handleResolveException(ex.id)} size="sm" style={{ background: "#10b981" }}>Mark Resolved</Button>
                                    )}
                                </div>
                                <p style={{ fontSize: "0.83rem", color: "hsl(var(--text-secondary))", marginTop: "0.35rem" }}>{ex.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* Tab: Audit Timeline */}
            {activeTab === "audit" && (
                <div className="card" style={{ padding: "1.25rem" }}>
                    <div style={{ fontWeight: 700, marginBottom: "1.25rem" }}>Chronological Activity Timeline</div>
                    <div style={{ position: "relative", paddingLeft: "1.75rem", borderLeft: "2px solid hsl(var(--border))" }}>
                        {(!shipment.events || shipment.events.length === 0) ? (
                            <div style={{ color: "hsl(var(--text-muted))", padding: "2rem 0" }}>No events recorded yet.</div>
                        ) : shipment.events.map((ev: any) => (
                            <div key={ev.id} style={{ position: "relative", marginBottom: "1.25rem" }}>
                                <div style={{ position: "absolute", left: "-2.1rem", top: "4px", width: "12px", height: "12px", borderRadius: "50%", background: ev.source === "AUTOMATIC" ? "#3b82f6" : "hsl(var(--primary))", border: "2px solid hsl(var(--surface-1))" }} />
                                <div style={{ fontWeight: 700, fontSize: "0.88rem" }}>{ev.title}</div>
                                {ev.description && <div style={{ fontSize: "0.82rem", color: "hsl(var(--text-secondary))", marginTop: "0.15rem" }}>{ev.description}</div>}
                                <div style={{ fontSize: "0.72rem", color: "hsl(var(--text-muted))", marginTop: "0.25rem", display: "flex", gap: "1rem", flexWrap: "wrap" }}>
                                    <span>By {ev.updatedBy}</span><span>{fmtDT(ev.createdAt)}</span>
                                    <span style={{ padding: "0.1rem 0.35rem", borderRadius: "3px", background: ev.source === "AUTOMATIC" ? "#3b82f622" : "hsl(var(--surface-3))", color: ev.source === "AUTOMATIC" ? "#3b82f6" : "hsl(var(--text-muted))", fontWeight: 600 }}>{ev.source}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* Tab: Notes History */}
            {activeTab === "notes" && (
                <div className="card" style={{ padding: "1.25rem" }}>
                    <div style={{ fontWeight: 700, fontSize: "1rem", marginBottom: "1rem", display: "flex", alignItems: "center", gap: "0.5rem" }}>
                        <MessageSquare size={18} style={{ color: "hsl(var(--primary))" }} /> B/L Remarks & Operational Notes History
                    </div>

                    {/* Add Note Form */}
                    <form onSubmit={handleAddNoteSubmit} style={{ marginBottom: "1.5rem", background: "hsl(var(--surface-2))", padding: "1rem", borderRadius: "8px", border: "1px solid hsl(var(--border))" }}>
                        <div style={{ fontWeight: 600, fontSize: "0.83rem", marginBottom: "0.5rem" }}>Add Operational Commentary / Progress Note</div>
                        <textarea
                            value={newNoteText}
                            onChange={(e) => setNewNoteText(e.target.value)}
                            placeholder="Enter operational commentary or B/L progress remark (e.g. vessel expected to arrive 12th Aug, container discharged, awaiting customs assessment doc)..."
                            rows={3}
                            style={{
                                width: "100%",
                                padding: "0.65rem",
                                borderRadius: "6px",
                                border: "1px solid hsl(var(--border))",
                                background: "hsl(var(--surface-1, var(--surface)))",
                                color: "hsl(var(--text-primary))",
                                fontSize: "0.85rem",
                                marginBottom: "0.75rem"
                            }}
                        />
                        <div style={{ display: "flex", justifyContent: "flex-end" }}>
                            <Button type="submit" loading={submittingNote} size="sm" icon={<Plus size={13} />}>
                                Save Operational Note
                            </Button>
                        </div>
                    </form>

                    {/* Timeline Notes List */}
                    <div style={{ position: "relative", paddingLeft: "1.5rem", borderLeft: "2px solid hsl(var(--primary) / 0.3)" }}>
                        {(!shipment.notesHistory || shipment.notesHistory.length === 0) ? (
                            shipment.notes ? (
                                <div style={{ padding: "0.85rem 1rem", borderRadius: "8px", background: "hsl(var(--surface-2))", border: "1px solid hsl(var(--border))" }}>
                                    <div style={{ fontSize: "0.88rem", color: "hsl(var(--text-primary))" }}>{shipment.notes}</div>
                                    <div style={{ fontSize: "0.72rem", color: "hsl(var(--text-muted))", marginTop: "0.3rem" }}>Initial Booking Note</div>
                                </div>
                            ) : (
                                <div style={{ color: "hsl(var(--text-muted))", padding: "1.5rem 0", fontSize: "0.85rem" }}>No operational notes recorded yet. Use the form above to add notes.</div>
                            )
                        ) : (
                            shipment.notesHistory.map((n: any) => (
                                <div key={n.id} style={{ position: "relative", marginBottom: "1rem", padding: "0.85rem 1rem", borderRadius: "8px", background: "hsl(var(--surface-2))", border: "1px solid hsl(var(--border))" }}>
                                    <div style={{ position: "absolute", left: "-1.85rem", top: "14px", width: "10px", height: "10px", borderRadius: "50%", background: "hsl(var(--primary))", border: "2px solid hsl(var(--surface-1))" }} />
                                    <div style={{ fontSize: "0.88rem", fontWeight: 500, color: "hsl(var(--text-primary))", lineHeight: 1.4, whiteSpace: "pre-wrap" }}>
                                        {n.note}
                                    </div>
                                    <div style={{ fontSize: "0.72rem", color: "hsl(var(--text-muted))", marginTop: "0.4rem", display: "flex", gap: "1rem" }}>
                                        <span>By <strong>{n.createdBy || "Operations"}</strong></span>
                                        <span>{fmtDT(n.createdAt)}</span>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                </div>
            )}

            {/* ── DRAWER: Update Shipment ─────────────────────────────── */}
            <Drawer
                open={showUpdateDrawer}
                onClose={() => setShowUpdateDrawer(false)}
                title="Operational Update"
                subtitle={`${shipment.refNumber} — ${shipment.clientName}`}
                width="560px"
                footer={
                    <>
                        <Button type="button" variant="ghost" onClick={() => setShowUpdateDrawer(false)}>Cancel</Button>
                        <Button type="submit" form="update-shipment-form" loading={saving}>Save Operational Update</Button>
                    </>
                }
            >
                <form id="update-shipment-form" onSubmit={handleUpdateSubmit} style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
                    <FormSection title="Status & Stage">
                        <Select label="Journey Milestone Stage" value={updateForm.currentStage} onChange={setU("currentStage")} required>
                            {JOURNEY_MILESTONES.map(m => <option key={m.key} value={m.key}>{m.label}</option>)}
                        </Select>
                        <Select label="Operational Status" value={updateForm.status} onChange={setU("status")} required>
                            <option value="AVA">AVA — Awaiting Docs</option>
                            <option value="FUP">FUP — Follow Up In Progress</option>
                            <option value="FURO">FURO — Released / Charges Paid</option>
                            <option value="PCHARGES">PCHARGES — Port Charges (Finance)</option>
                        </Select>
                        <Select label="Shipment Health" value={updateForm.health} onChange={setU("health")}>
                            <option value="ON_TRACK">✅ On Track</option>
                            <option value="ATTENTION">⚠ Attention Required</option>
                            <option value="DELAYED">🕐 Delayed</option>
                            <option value="BLOCKED">🚫 Blocked</option>
                        </Select>
                        <Input label="Health Reason / Note" value={updateForm.healthReason} onChange={setU("healthReason")} placeholder="Explain the current health status..." />
                    </FormSection>

                    <FormSection title="Customs Clearance">
                        <Input label="Entry Number" value={updateForm.entryNumber} onChange={setU("entryNumber")} placeholder="e.g. 26EKIMMA04095503" mono />
                        <Input label="TBL / N.TBL Status" value={updateForm.tblNtbl} onChange={setU("tblNtbl")} placeholder="TBL or N.TBL" />
                        <Input label="Lodge Customs Date" value={updateForm.lodgeCustoms} onChange={setU("lodgeCustoms")} type="date" />
                        <Input label="Entry Passed Date" value={updateForm.entryPassed} onChange={setU("entryPassed")} type="date" />
                    </FormSection>

                    <FormSection title="Shipping Line">
                        <Input label="Line Charges Date" value={updateForm.slineCharges} onChange={setU("slineCharges")} type="date" />
                        <Input label="Line Paid Date" value={updateForm.slinePaid} onChange={setU("slinePaid")} type="date" />
                        <Input label="D/O Received Date" value={updateForm.ddRecv} onChange={setU("ddRecv")} type="date" />
                        <Input label="Doc Recv (e.g. 2/2 COPIES)" value={updateForm.docRecv} onChange={setU("docRecv")} placeholder="e.g. 2/2 COPIES" />
                    </FormSection>

                    <FormSection title="CFS & Inland Logistics">
                        <Input label="Lodged KPA Date" value={updateForm.lodgedKpa} onChange={setU("lodgedKpa")} type="date" />
                        <Input label="KPA Date Verified" value={updateForm.dateVerified} onChange={setU("dateVerified")} type="date" />
                        <Input label="CFS Station Name" value={updateForm.lastSlingCfs} onChange={setU("lastSlingCfs")} placeholder="e.g. FOCUS / INTERPEL / ICD EMBAKASI" />
                        <Input label="Destination / Nominated CFS" value={updateForm.destination} onChange={setU("destination")} placeholder="e.g. FOCUS / INTERPEL / ICD EMBAKASI" />
                        <Input label="Final Delivery Location" value={updateForm.finalDelivery} onChange={setU("finalDelivery")} placeholder="e.g. FOCUS / INTERPEL / Customer Warehouse" />
                        <Input label="Transporter" value={updateForm.transporter} onChange={setU("transporter")} placeholder="e.g. Bollore Logistics" />
                    </FormSection>
                </form>
            </Drawer>

            {/* ── DRAWER: Report Exception ────────────────────────────── */}
            <Drawer
                open={showExceptionDrawer}
                onClose={() => setShowExceptionDrawer(false)}
                title="Report Operational Exception"
                subtitle="Flag a blocker or issue on this shipment"
                width="520px"
                accentColor="#ef4444"
                footer={
                    <>
                        <Button type="button" variant="ghost" onClick={() => setShowExceptionDrawer(false)}>Cancel</Button>
                        <Button type="submit" form="report-exception-form" variant="danger" loading={saving}>Flag Exception</Button>
                    </>
                }
            >
                <form id="report-exception-form" onSubmit={handleReportException} style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
                    <div style={{ padding: "0.75rem 1rem", borderRadius: "6px", background: "rgba(239,68,68,0.08)", border: "1px solid rgba(239,68,68,0.2)", fontSize: "0.82rem", color: "#ef4444", display: "flex", gap: "0.4rem", alignItems: "center" }}>
                        <AlertCircle size={15} /> Reporting an exception will automatically update the shipment health status.
                    </div>

                    <FormRow>
                        <Select label="Issue Type" value={exceptionForm.issueType} onChange={(e: any) => setExceptionForm(f => ({ ...f, issueType: e.target.value }))} required>
                            <option value="Customs delay">Customs Delay / Query</option>
                            <option value="Missing document">Missing Required Document</option>
                            <option value="Shipping Line hold">Shipping Line Demurrage / Hold</option>
                            <option value="Port/KPA hold">Port / KPA Verification Hold</option>
                            <option value="CFS allocation issue">CFS Allocation Issue</option>
                            <option value="Transporter delay">Transporter / Inland Delay</option>
                            <option value="Other">Other Operational Issue</option>
                        </Select>
                        <Select label="Severity Level" value={exceptionForm.severity} onChange={(e: any) => setExceptionForm(f => ({ ...f, severity: e.target.value }))} required>
                            <option value="LOW">🟡 LOW — Minor notice</option>
                            <option value="MEDIUM">🟠 MEDIUM — Operator action needed</option>
                            <option value="HIGH">🔴 HIGH — Critical timeline risk</option>
                            <option value="CRITICAL">⛔ CRITICAL — Cargo blocked / stopped</option>
                        </Select>
                    </FormRow>

                    <Textarea label="Problem Description" value={exceptionForm.description} onChange={(e: any) => setExceptionForm(f => ({ ...f, description: e.target.value }))} rows={4} placeholder="Describe the issue clearly — what is blocking the shipment?" required />

                    <FormRow>
                        <Input label="Expected Resolution" value={exceptionForm.expectedResolution} onChange={(e: any) => setExceptionForm(f => ({ ...f, expectedResolution: e.target.value }))} placeholder="e.g. Awaiting KRA response" />
                        <Input label="Assigned To" value={exceptionForm.assignedTo} onChange={(e: any) => setExceptionForm(f => ({ ...f, assignedTo: e.target.value }))} placeholder="e.g. Operations Team" />
                    </FormRow>
                </form>
            </Drawer>

            {/* ── DRAWER: Log Event ───────────────────────────────────── */}
            <Drawer
                open={showEventDrawer}
                onClose={() => setShowEventDrawer(false)}
                title="Log Timeline Event"
                subtitle="Record a manual operational update"
                width="480px"
                footer={
                    <>
                        <Button type="button" variant="ghost" onClick={() => setShowEventDrawer(false)}>Cancel</Button>
                        <Button type="submit" form="log-event-form" loading={saving}>Post to Timeline</Button>
                    </>
                }
            >
                <form id="log-event-form" onSubmit={handleAddEvent} style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
                    <Input label="Event Title" value={eventForm.title} onChange={(e: any) => setEventForm(f => ({ ...f, title: e.target.value }))} placeholder="e.g. Physical verification completed at KPA" required />
                    <Select label="Journey Stage" value={eventForm.stage} onChange={(e: any) => setEventForm(f => ({ ...f, stage: e.target.value }))}>
                        {JOURNEY_MILESTONES.map(m => <option key={m.key} value={m.key}>{m.label}</option>)}
                    </Select>
                    <Textarea label="Additional Notes" value={eventForm.description} onChange={(e: any) => setEventForm(f => ({ ...f, description: e.target.value }))} rows={3} placeholder="Optional details or context for this event..." />
                    <Input label="Reference #" value={eventForm.reference} onChange={(e: any) => setEventForm(f => ({ ...f, reference: e.target.value }))} placeholder="e.g. Entry number, letter reference..." />
                </form>
            </Drawer>

            {/* ── MODAL: Document Upload ──────────────────────────────── */}
            <Modal
                open={showDocModal}
                onClose={() => setShowDocModal(false)}
                title="Upload Shipment Document"
                subtitle="Attach an operational document to this cargo file"
                maxWidth="480px"
                footer={
                    <>
                        <Button type="button" variant="ghost" onClick={() => setShowDocModal(false)}>Cancel</Button>
                        <Button type="submit" form="upload-doc-form" loading={saving}>Upload Document</Button>
                    </>
                }
            >
                <form id="upload-doc-form" onSubmit={handleDocUpload} style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
                    <Select label="Document Category" value={docType} onChange={(e: any) => setDocType(e.target.value)} required>
                        <option value="FINAL_SCANNED_DOSSIER">📁 Final Scanned Dossier (All Documents Scanned as One)</option>
                        <option value="BL">Bill of Lading (B/L)</option>
                        <option value="INVOICE">Commercial Invoice</option>
                        <option value="PACKING_LIST">Packing List</option>
                        <option value="COO">Certificate of Origin</option>
                        <option value="CUSTOMS_ENTRY">Customs Entry Copy</option>
                        <option value="DO">Delivery Order (D/O)</option>
                        <option value="CFS_RECEIPT">CFS Receipt</option>
                        <option value="POD">Proof of Delivery (POD)</option>
                        <option value="OTHER">Other</option>
                    </Select>

                    <div>
                        <label style={{ fontSize: "0.78rem", fontWeight: 600, color: "hsl(var(--text-secondary))", display: "block", marginBottom: "0.4rem" }}>
                            Select File <span style={{ color: "#ef4444" }}>*</span>
                        </label>
                        <div
                            style={{ border: "2px dashed hsl(var(--border))", borderRadius: "8px", padding: "1.5rem", textAlign: "center", background: "hsl(var(--surface-2))", cursor: "pointer" }}
                            onClick={() => document.getElementById("doc-file-input")?.click()}
                        >
                            <Upload size={28} style={{ color: "hsl(var(--primary))", margin: "0 auto 0.5rem" }} />
                            {docFile ? (
                                <div>
                                    <div style={{ fontWeight: 700, color: "hsl(var(--text-primary))", fontSize: "0.88rem" }}>{docFile.name}</div>
                                    <div style={{ fontSize: "0.75rem", color: "hsl(var(--text-muted))" }}>{(docFile.size / 1024).toFixed(1)} KB</div>
                                </div>
                            ) : (
                                <>
                                    <div style={{ fontWeight: 600, fontSize: "0.88rem", color: "hsl(var(--text-secondary))" }}>Click to browse or drag & drop</div>
                                    <div style={{ fontSize: "0.75rem", color: "hsl(var(--text-muted))", marginTop: "0.25rem" }}>PDF, DOCX, XLS, JPG, PNG supported</div>
                                </>
                            )}
                        </div>
                        <input id="doc-file-input" type="file" style={{ display: "none" }} onChange={e => setDocFile(e.target.files?.[0] || null)} />
                    </div>
                </form>
            </Modal>

            {/* ── MODAL: Container Update ──────────────────────────────── */}
            <Modal
                open={showContainerModal}
                onClose={() => setShowContainerModal(false)}
                title={editingContainer?.id ? "Update Container Tracking" : "Add Container to Shipment"}
                subtitle={editingContainer?.containerNumber ? `Container #${editingContainer.containerNumber}` : "Register new container"}
                maxWidth="560px"
                footer={
                    <>
                        <Button type="button" variant="ghost" onClick={() => setShowContainerModal(false)}>Cancel</Button>
                        <Button type="submit" form="container-update-form" loading={saving}>Save Container Details</Button>
                    </>
                }
            >
                <form id="container-update-form" onSubmit={handleContainerSave} style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
                    <FormSection title="Cargo Unit Specification">
                        <FormRow>
                            <Select
                                label="Cargo Unit Type"
                                value={editingContainer?.unitType || "container"}
                                onChange={(e: any) => setEditingContainer({ ...editingContainer, unitType: e.target.value })}
                            >
                                <option value="roro">RoRo</option>
                                <option value="container">Container</option>
                                <option value="genco">Genco</option>
                                <option value="bulk_4ft">Bulk 4FT</option>
                                <option value="bulk_05ft">Bulk 0.5FT</option>
                                <option value="grouping_lcl">Grouping LCL</option>
                                <option value="bulk_01kg">Bulk 0.1KG</option>
                            </Select>
                            {(!editingContainer?.unitType || editingContainer?.unitType === "container") && (
                                <Select
                                    label="Container Model / Type"
                                    value={editingContainer?.containerType || "DRY"}
                                    onChange={(e: any) => setEditingContainer({ ...editingContainer, containerType: e.target.value })}
                                >
                                    <option value="DRY">DRY — General Purpose / Dry</option>
                                    <option value="HC">HC — High Cube</option>
                                    <option value="RF">RF — Reefer (Refrigerated)</option>
                                    <option value="OT">OT — Open Top</option>
                                    <option value="FR">FR — Flat Rack</option>
                                    <option value="PL">PL — Platform</option>
                                    <option value="TK">TK — Tank</option>
                                    <option value="VH">VH — Ventilated</option>
                                    <option value="BU">BU — Bulk</option>
                                </Select>
                            )}
                        </FormRow>

                        {/* Identifying Fields per Unit Type */}
                        {editingContainer?.unitType === "roro" && (
                            <Input
                                label="Chassis Number *"
                                required
                                mono
                                value={editingContainer?.chassisNumber || ""}
                                onChange={e => setEditingContainer({ ...editingContainer, chassisNumber: e.target.value.toUpperCase() })}
                                placeholder="e.g. JTMHY7AJ8N4123456"
                            />
                        )}
                        {(!editingContainer?.unitType || editingContainer?.unitType === "container") && (
                            <FormRow>
                                <Input
                                    label="Container Number *"
                                    required
                                    mono
                                    value={editingContainer?.containerNumber || ""}
                                    onChange={e => setEditingContainer({ ...editingContainer, containerNumber: e.target.value.toUpperCase() })}
                                    placeholder="e.g. MSMU3366915"
                                />
                                <Input
                                    label="Seal Number"
                                    value={editingContainer?.sealNumber || ""}
                                    onChange={e => setEditingContainer({ ...editingContainer, sealNumber: e.target.value.toUpperCase() })}
                                    placeholder="e.g. SL482910"
                                />
                                <Select
                                    label="Size"
                                    value={editingContainer?.size || "20"}
                                    onChange={(e: any) => setEditingContainer({ ...editingContainer, size: e.target.value })}
                                >
                                    <option value="10">10'</option>
                                    <option value="20">20'</option>
                                    <option value="40">40'</option>
                                </Select>
                            </FormRow>
                        )}
                        {editingContainer?.unitType === "grouping_lcl" && (
                            <Input
                                label="N° Réf Conteneur *"
                                required
                                value={editingContainer?.lclReferenceNumber || ""}
                                onChange={e => setEditingContainer({ ...editingContainer, lclReferenceNumber: e.target.value.toUpperCase() })}
                                placeholder="e.g. LCL-2026-0417"
                            />
                        )}

                        {/* Shared Weight & Volume Fields */}
                        <FormRow>
                            <Input
                                label="Gross Weight (KG)"
                                type="number"
                                value={editingContainer?.grossWeightKg ?? editingContainer?.weight ?? ""}
                                onChange={e => setEditingContainer({ ...editingContainer, grossWeightKg: e.target.value, weight: e.target.value })}
                                placeholder="e.g. 26680"
                            />
                            <Input
                                label="Net Weight (KG)"
                                type="number"
                                value={editingContainer?.netWeightKg ?? ""}
                                onChange={e => setEditingContainer({ ...editingContainer, netWeightKg: e.target.value })}
                                placeholder="e.g. 25100"
                            />
                            <Input
                                label="Volume (CBM)"
                                type="number"
                                step="0.001"
                                value={editingContainer?.volumeCbm ?? ""}
                                onChange={e => setEditingContainer({ ...editingContainer, volumeCbm: e.target.value })}
                                placeholder="e.g. 28.3"
                            />
                        </FormRow>
                    </FormSection>

                    <FormSection title="Logistics & Movement Tracking">
                        <FormRow>
                            <Input
                                label="Discharge Date"
                                type="date"
                                value={fmtInputDate(editingContainer?.dischargeDate)}
                                onChange={e => setEditingContainer({ ...editingContainer, dischargeDate: e.target.value })}
                            />
                            <Input
                                label="Gate Out Date"
                                type="date"
                                value={fmtInputDate(editingContainer?.gateOutDate)}
                                onChange={e => setEditingContainer({ ...editingContainer, gateOutDate: e.target.value })}
                            />
                        </FormRow>
                        <FormRow>
                            <Input
                                label="Truck Details"
                                value={editingContainer?.truckDetails || ""}
                                onChange={e => setEditingContainer({ ...editingContainer, truckDetails: e.target.value })}
                                placeholder="e.g. KCA 123X / Trailer 99"
                            />
                            <Input
                                label="Driver Name"
                                value={editingContainer?.driverName || ""}
                                onChange={e => setEditingContainer({ ...editingContainer, driverName: e.target.value })}
                                placeholder="e.g. John Doe"
                            />
                        </FormRow>
                        <Select
                            label="Container Status"
                            value={editingContainer?.status || "In Transit"}
                            onChange={(e: any) => setEditingContainer({ ...editingContainer, status: e.target.value })}
                        >
                            <option value="In Transit">In Transit / On Vessel</option>
                            <option value="Discharged">Discharged at Port</option>
                            <option value="In CFS">At CFS / ICD Yard</option>
                            <option value="Gated Out">Gated Out</option>
                            <option value="Delivered">Delivered to Client</option>
                            <option value="Returned Empty">Empty Returned</option>
                        </Select>
                        <Textarea
                            label="Remarks"
                            value={editingContainer?.remarks || ""}
                            onChange={(e: any) => setEditingContainer({ ...editingContainer, remarks: e.target.value })}
                            rows={2}
                            placeholder="Container specific remarks..."
                        />
                    </FormSection>
                </form>
            </Modal>
        </div>
    );
}
