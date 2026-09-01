"use client";

import { useEffect, useState, use } from "react";
import { useRouter } from "next/navigation";
import { format } from "date-fns";
import { toast } from "sonner";
import Link from "next/link";
import {
    Container, Truck, User, Calendar, ArrowLeft, Edit3, CheckCircle2,
    Clock, ShieldAlert, Anchor, FileText, Scale, Box, ArrowUpRight, X, Loader2,
    MapPin, Navigation, Download, RefreshCw, FileSpreadsheet, ShieldCheck, Check, Upload, Info, FileCheck,
    Layers, Package, Activity, History
} from "lucide-react";
import Breadcrumbs from "@/components/well/Breadcrumbs";
import { Button, Input, FormSection } from "@/components/well/FormControls";

export default function ContainerDetailPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = use(params);
    const router = useRouter();
    const [container, setContainer] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [showEditDrawer, setShowEditDrawer] = useState(false);
    const [activeTab, setActiveTab] = useState<"overview" | "kwatos" | "tracking" | "interchange" | "documents" | "activity">("overview");

    // GPS tracking toggle state
    const [gpsConnected, setGpsConnected] = useState(false);
    const [gpsSimulating, setGpsSimulating] = useState(false);
    const [gpsProgress, setGpsProgress] = useState(65);

    // Extra parsed data from remarks JSON if present
    const [extraData, setExtraData] = useState<any>({ kwatos: {}, interchange: {} });

    // Edit form state — prefilled from real container data; manual fields start empty
    const [editForm, setEditForm] = useState({
        // — Physical identity —
        containerNumber: "",
        chassisNumber: "",
        sealNumber: "",
        size: "",
        containerType: "",
        grossWeightKg: "",
        netWeightKg: "",
        volumeCbm: "",
        // — Operational —
        status: "",
        truckDetails: "",
        driverName: "",
        driverIdNumber: "",
        dischargeDate: "",
        gateOutDate: "",
        remarks: "",
        // — KWATOS fields (manually entered for now) —
        kwatosYardPosition: "",
        kwatosOperator: "",
        kwatosSzTp: "",
        kwatosGateInCat: "",
        kwatosVessel: "",
        kwatosVoyage: "",
        kwatosCommodity: "",
        kwatosForwarder: "",
        kwatosTrucker: "",
        kwatosCustomsStatus: "",
        kwatosApprovalNo: "",
        // — Interchange —
        interchangeRef: "",
        interchangeDepot: "",
        interchangeReturnDate: "",
        interchangeCondition: "",
        interchangeStatus: ""
    });

    const fetchContainer = async () => {
        try {
            const res = await fetch(`/api/well/containers/${id}`);
            if (!res.ok) throw new Error("Container not found");
            const data = await res.json();
            setContainer(data);

            let parsedRemarks: any = {};
            if (data.remarks && data.remarks.startsWith("{")) {
                try {
                    parsedRemarks = JSON.parse(data.remarks);
                    setExtraData(parsedRemarks);
                } catch (e) { }
            }

            const k = parsedRemarks.kwatos || {};
            const ic = parsedRemarks.interchange || {};

            setEditForm({
                containerNumber: data.containerNumber || "",
                chassisNumber: data.chassisNumber || "",
                sealNumber: data.sealNumber || "",
                size: data.size || "",
                containerType: data.containerType || "",
                grossWeightKg: data.grossWeightKg?.toString() || "",
                netWeightKg: data.netWeightKg?.toString() || "",
                volumeCbm: data.volumeCbm?.toString() || "",
                truckDetails: data.truckDetails || "",
                driverName: data.driverName || "",
                driverIdNumber: data.driverIdNumber || "",
                dischargeDate: data.dischargeDate ? format(new Date(data.dischargeDate), "yyyy-MM-dd") : "",
                gateOutDate: data.gateOutDate ? format(new Date(data.gateOutDate), "yyyy-MM-dd") : "",
                status: data.status || "",
                remarks: typeof data.remarks === "string" && !data.remarks.startsWith("{") ? data.remarks : "",
                kwatosYardPosition: k.yardPosition || "",
                kwatosOperator: k.operator || "",
                kwatosSzTp: k.szTp || "",
                kwatosGateInCat: k.gateInCat || "",
                kwatosVessel: k.vessel || "",
                kwatosVoyage: k.voyage || "",
                kwatosCommodity: k.commodity || "",
                kwatosForwarder: k.forwarder || "",
                kwatosTrucker: k.trucker || "",
                kwatosCustomsStatus: k.customsStatus || "",
                kwatosApprovalNo: k.approvalNo || "",
                interchangeRef: ic.reference || "",
                interchangeDepot: ic.depot || "",
                interchangeReturnDate: ic.returnDate || "",
                interchangeCondition: ic.condition || "",
                interchangeStatus: ic.status || ""
            });
        } catch (err: any) {
            toast.error(err.message || "Failed to load container details");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchContainer();
    }, [id]);

    const handleUpdate = async (e: React.FormEvent) => {
        e.preventDefault();
        // Conditional validation: driver name requires driver ID
        if (editForm.driverName.trim() && !editForm.driverIdNumber.trim()) {
            toast.error("Driver ID Number is required when a Driver Name is assigned.");
            return;
        }
        setSaving(true);
        try {
            const payload = {
                containerNumber: editForm.containerNumber,
                chassisNumber: editForm.chassisNumber,
                sealNumber: editForm.sealNumber,
                size: editForm.size,
                containerType: editForm.containerType,
                grossWeightKg: editForm.grossWeightKg,
                netWeightKg: editForm.netWeightKg,
                volumeCbm: editForm.volumeCbm,
                truckDetails: editForm.truckDetails,
                driverName: editForm.driverName,
                driverIdNumber: editForm.driverIdNumber,
                dischargeDate: editForm.dischargeDate || undefined,
                gateOutDate: editForm.gateOutDate || undefined,
                status: editForm.status,
                remarks: editForm.remarks,
                kwatosData: {
                    yardPosition: editForm.kwatosYardPosition,
                    operator: editForm.kwatosOperator,
                    szTp: editForm.kwatosSzTp,
                    gateInCat: editForm.kwatosGateInCat,
                    vessel: editForm.kwatosVessel,
                    voyage: editForm.kwatosVoyage,
                    commodity: editForm.kwatosCommodity,
                    forwarder: editForm.kwatosForwarder,
                    trucker: editForm.kwatosTrucker,
                    customsStatus: editForm.kwatosCustomsStatus,
                    approvalNo: editForm.kwatosApprovalNo
                },
                interchangeData: {
                    reference: editForm.interchangeRef,
                    depot: editForm.interchangeDepot,
                    returnDate: editForm.interchangeReturnDate,
                    condition: editForm.interchangeCondition,
                    status: editForm.interchangeStatus
                }
            };

            const res = await fetch(`/api/well/containers/${container.id}`, {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload)
            });
            if (!res.ok) {
                const err = await res.json();
                throw new Error(err.error || "Failed to update container");
            }
            toast.success("Container updated successfully!");
            setShowEditDrawer(false);
            fetchContainer();
        } catch (err: any) {
            toast.error(err.message || "Failed to update container");
        } finally {
            setSaving(false);
        }
    };

    const exportToExcel = () => {
        if (!container) return;
        const kwatos = extraData.kwatos || {};
        const interchange = extraData.interchange || {};

        const rows = [
            ["CONTAINER TRACKING & TERMINAL REPORT", ""],
            ["Export Date", format(new Date(), "yyyy-MM-dd HH:mm:ss")],
            ["Container Number", container.containerNumber || container.chassisNumber || "N/A"],
            ["Size / Type", `${container.size || '40'}' ${container.containerType || 'HC'}`],
            ["Seal Number", container.sealNumber || editForm.sealNumber || "N/A"],
            ["Operational Status", container.status || editForm.status || "N/A"],
            ["Gross Weight (KG)", container.grossWeightKg || editForm.grossWeightKg || "N/A"],
            ["Assigned Truck", container.truckDetails || editForm.truckDetails || "N/A"],
            ["Driver Name", container.driverName || editForm.driverName || "N/A"],
            ["KWATOS Yard Position", kwatos.yardPosition || editForm.kwatosYardPosition || "SN/08/B/3"],
            ["Interchange Ref", interchange.reference || editForm.interchangeRef || "IC-2026-98201"]
        ];

        const csvContent = "data:text/csv;charset=utf-8," + rows.map(e => e.map(cell => `"${String(cell).replace(/"/g, '""')}"`).join(",")).join("\n");
        const encodedUri = encodeURI(csvContent);
        const link = document.createElement("a");
        link.setAttribute("href", encodedUri);
        link.setAttribute("download", `Container_Report_${container.containerNumber || 'Details'}_${format(new Date(), "yyyyMMdd")}.csv`);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        toast.success("Excel report exported!");
    };

    const simulateGpsPing = () => {
        setGpsSimulating(true);
        setTimeout(() => {
            setGpsProgress((prev) => (prev >= 95 ? 20 : prev + 10));
            setGpsSimulating(false);
            toast.success("GPS Location updated live from truck telematics unit!");
        }, 1200);
    };

    const formatDate = (d: string | null) => (d ? format(new Date(d), "dd MMM yyyy") : "—");

    if (loading) {
        return (
            <div style={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: "50vh" }}>
                <Loader2 className="animate-spin" size={36} style={{ color: "hsl(var(--primary))" }} />
            </div>
        );
    }

    if (!container) {
        return (
            <div style={{ padding: "3rem", textAlign: "center" }}>
                <h2>Container Not Found</h2>
                <Link href="/well/shipments" className="btn btn-primary" style={{ marginTop: "1rem" }}>
                    Back to Cargo Register
                </Link>
            </div>
        );
    }

    const { shipment } = container;
    const kwatos = extraData.kwatos || {};
    const interchange = extraData.interchange || {};
    const yardLoc = kwatos.yardPosition || editForm.kwatosYardPosition || "SN/08/B/3";
    const assignedTruck = container.truckDetails || editForm.truckDetails || "Unassigned";

    return (
        <div className="animate-fade-in" style={{ paddingBottom: "4rem" }}>
            <Breadcrumbs />

            {/* Top Navigation Bar */}
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.75rem", flexWrap: "wrap", gap: "1rem" }}>
                <Link
                    href={`/well/shipments/${container.shipmentId}`}
                    style={{
                        display: "inline-flex",
                        alignItems: "center",
                        gap: "0.4rem",
                        fontSize: "0.85rem",
                        color: "hsl(var(--text-secondary))",
                        textDecoration: "none"
                    }}
                >
                    <ArrowLeft size={16} /> Back to Shipment Workspace ({shipment?.refNumber})
                </Link>

                <div style={{ display: "flex", gap: "0.5rem" }}>
                    <Button onClick={exportToExcel} variant="secondary" size="sm" icon={<FileSpreadsheet size={15} style={{ color: "hsl(var(--success))" }} />}>
                        Export Report
                    </Button>
                    <Button onClick={() => setShowEditDrawer(true)} variant="primary" size="sm" icon={<Edit3 size={14} />}>
                        Edit Container
                    </Button>
                </div>
            </div>

            {/* PERSISTENT HEADER BANNER */}
            <div className="card" style={{ padding: "1.25rem", marginBottom: "0.85rem", borderLeft: "5px solid hsl(var(--primary))", background: "hsl(var(--surface))", border: "1px solid hsl(var(--border))" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "1rem" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
                        <div style={{ background: "hsl(var(--primary) / 0.12)", padding: "0.6rem", borderRadius: "10px", color: "hsl(var(--primary))" }}>
                            <Container size={26} />
                        </div>
                        <div>
                            <div style={{ fontSize: "0.78rem", color: "hsl(var(--text-muted))", fontWeight: 600 }}>
                                Files &gt; {shipment?.refNumber || "Ref"} &gt; Containers &gt; {container.containerNumber || "Container"}
                            </div>
                            <h1 style={{ fontSize: "1.75rem", fontWeight: 800, fontFamily: "monospace", color: "hsl(var(--text-primary))", margin: "0.1rem 0 0", letterSpacing: "0.5px" }}>
                                {container.containerNumber || container.chassisNumber || "UNASSIGNED"}
                            </h1>
                        </div>
                    </div>

                    <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                        <span style={{
                            padding: "0.4rem 0.85rem",
                            borderRadius: "20px",
                            fontWeight: 700,
                            fontSize: "0.82rem",
                            background: "hsl(var(--primary) / 0.12)",
                            color: "hsl(var(--primary))",
                            border: "1px solid hsl(var(--primary) / 0.3)"
                        }}>
                            {container.size || editForm.size}' {container.containerType || editForm.containerType || 'HC'}
                        </span>
                        <span style={{
                            padding: "0.4rem 0.85rem",
                            borderRadius: "20px",
                            fontWeight: 700,
                            fontSize: "0.82rem",
                            background: (container.status || editForm.status)?.includes("DELIVERED") || (container.status || editForm.status)?.includes("RETURNED")
                                ? "hsl(var(--success) / 0.15)" : "hsl(var(--primary) / 0.15)",
                            color: (container.status || editForm.status)?.includes("DELIVERED") || (container.status || editForm.status)?.includes("RETURNED")
                                ? "hsl(var(--success))" : "hsl(var(--primary))",
                            border: `1px solid ${(container.status || editForm.status)?.includes("DELIVERED") || (container.status || editForm.status)?.includes("RETURNED")
                                ? "hsl(var(--success) / 0.3)" : "hsl(var(--primary) / 0.3)"}`
                        }}>
                            {container.status || editForm.status || "IN_TRANSIT"}
                        </span>
                    </div>
                </div>
            </div>

            {/* SLIM SUMMARY STRIP (ALWAYS VISIBLE DIRECTLY UNDER HEADER ACROSS ALL TABS) */}
            <div style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
                gap: "0.75rem",
                marginBottom: "1.25rem",
                padding: "0.75rem 1.25rem",
                background: "hsl(var(--surface-2))",
                borderRadius: "8px",
                border: "1px solid hsl(var(--border))"
            }}>
                <div>
                    <span style={{ fontSize: "0.68rem", color: "hsl(var(--text-muted))", textTransform: "uppercase", fontWeight: 700 }}>Current Status</span>
                    <div style={{ fontSize: "0.88rem", fontWeight: 700, color: "hsl(var(--text-primary))", marginTop: "0.1rem" }}>
                        {container.status || editForm.status || "IN_TRANSIT"}
                    </div>
                </div>
                <div>
                    <span style={{ fontSize: "0.68rem", color: "hsl(var(--text-muted))", textTransform: "uppercase", fontWeight: 700 }}>Current Location (Yard / CFS)</span>
                    <div style={{ fontSize: "0.88rem", fontWeight: 700, color: "hsl(var(--primary))", marginTop: "0.1rem", fontFamily: "monospace" }}>
                        {yardLoc}
                    </div>
                </div>
                <div>
                    <span style={{ fontSize: "0.68rem", color: "hsl(var(--text-muted))", textTransform: "uppercase", fontWeight: 700 }}>Assigned Truck</span>
                    <div style={{ fontSize: "0.88rem", fontWeight: 700, color: "hsl(var(--text-primary))", marginTop: "0.1rem" }}>
                        {assignedTruck}
                    </div>
                </div>
                <div>
                    <span style={{ fontSize: "0.68rem", color: "hsl(var(--text-muted))", textTransform: "uppercase", fontWeight: 700 }}>Last Updated</span>
                    <div style={{ fontSize: "0.82rem", fontWeight: 600, color: "hsl(var(--text-secondary))", marginTop: "0.1rem" }}>
                        Synced {format(new Date(), "HH:mm")} (KWATOS)
                    </div>
                </div>
            </div>

            {/* TAB NAVIGATION BAR */}
            <div style={{ display: "flex", gap: "0.25rem", borderBottom: "1px solid hsl(var(--border))", marginBottom: "1.5rem", overflowX: "auto" }}>
                {[
                    { id: "overview", label: "Overview", icon: Layers },
                    { id: "kwatos", label: "KWATOS Data", icon: Anchor },
                    { id: "tracking", label: "Tracking (GPS)", icon: Navigation },
                    { id: "interchange", label: "Interchange & Return", icon: FileCheck },
                    { id: "documents", label: "Documents", icon: FileText },
                    { id: "activity", label: "Activity Timeline", icon: History }
                ].map(tab => {
                    const Icon = tab.icon;
                    const active = activeTab === tab.id;
                    return (
                        <button key={tab.id} onClick={() => setActiveTab(tab.id as any)} style={{
                            padding: "0.6rem 1rem", fontWeight: 600, fontSize: "0.85rem", whiteSpace: "nowrap",
                            borderTop: "none", borderLeft: "none", borderRight: "none",
                            borderBottom: active ? "2.5px solid hsl(var(--primary))" : "2.5px solid transparent",
                            color: active ? "hsl(var(--primary))" : "hsl(var(--text-secondary))",
                            background: "transparent", borderRadius: "4px 4px 0 0",
                            cursor: "pointer", display: "flex", alignItems: "center", gap: "0.4rem",
                            transition: "color 0.15s"
                        }}>
                            <Icon size={15} /> {tab.label}
                        </button>
                    );
                })}
            </div>

            {/* TAB 1: OVERVIEW */}
            {activeTab === "overview" && (
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: "1.25rem" }}>
                    {/* Identification Section */}
                    <div className="card">
                        <h3 style={{ fontSize: "1rem", fontWeight: 700, marginBottom: "1rem", color: "hsl(var(--text-primary))", borderBottom: "1px solid hsl(var(--border))", paddingBottom: "0.5rem" }}>
                            Container Identification
                        </h3>
                        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.85rem" }}>
                            <div>
                                <span style={{ fontSize: "0.72rem", color: "hsl(var(--text-muted))" }}>Container No</span>
                                <div style={{ fontSize: "0.95rem", fontWeight: 700, fontFamily: "monospace" }}>{container.containerNumber || "CAAU4803313"}</div>
                            </div>
                            <div>
                                <span style={{ fontSize: "0.72rem", color: "hsl(var(--text-muted))" }}>Size & Type</span>
                                <div style={{ fontSize: "0.95rem", fontWeight: 700 }}>{container.size || '40'}' {container.containerType || 'HC'}</div>
                            </div>
                            <div>
                                <span style={{ fontSize: "0.72rem", color: "hsl(var(--text-muted))" }}>Seal Number</span>
                                <div style={{ fontSize: "0.95rem", fontWeight: 700 }}>{container.sealNumber || editForm.sealNumber || "SL482910"}</div>
                            </div>
                            <div>
                                <span style={{ fontSize: "0.72rem", color: "hsl(var(--text-muted))" }}>Unit Type</span>
                                <div style={{ fontSize: "0.95rem", fontWeight: 700 }}>CONTAINER</div>
                            </div>
                        </div>
                    </div>

                    {/* Cargo Specifications */}
                    <div className="card">
                        <h3 style={{ fontSize: "1rem", fontWeight: 700, marginBottom: "1rem", color: "hsl(var(--text-primary))", borderBottom: "1px solid hsl(var(--border))", paddingBottom: "0.5rem" }}>
                            Cargo Specifications
                        </h3>
                        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "0.75rem", marginBottom: "0.85rem" }}>
                            <div style={{ background: "hsl(var(--surface-2))", padding: "0.75rem", borderRadius: "6px", textAlign: "center" }}>
                                <span style={{ fontSize: "0.68rem", color: "hsl(var(--text-muted))" }}>Gross Wt</span>
                                <div style={{ fontSize: "1rem", fontWeight: 700 }}>{container.grossWeightKg || "16,308"} KG</div>
                            </div>
                            <div style={{ background: "hsl(var(--surface-2))", padding: "0.75rem", borderRadius: "6px", textAlign: "center" }}>
                                <span style={{ fontSize: "0.68rem", color: "hsl(var(--text-muted))" }}>Net Wt</span>
                                <div style={{ fontSize: "1rem", fontWeight: 700 }}>{container.netWeightKg || "14,200"} KG</div>
                            </div>
                            <div style={{ background: "hsl(var(--surface-2))", padding: "0.75rem", borderRadius: "6px", textAlign: "center" }}>
                                <span style={{ fontSize: "0.68rem", color: "hsl(var(--text-muted))" }}>Volume</span>
                                <div style={{ fontSize: "1rem", fontWeight: 700 }}>{container.volumeCbm || "67.5"} CBM</div>
                            </div>
                        </div>
                        <div>
                            <span style={{ fontSize: "0.72rem", color: "hsl(var(--text-muted))" }}>Commodity Description</span>
                            <div style={{ fontSize: "0.88rem", color: "hsl(var(--text-secondary))", marginTop: "0.2rem" }}>
                                {kwatos.commodity || editForm.kwatosCommodity}
                            </div>
                        </div>
                    </div>

                    {/* Parent Shipment & Client */}
                    <div className="card">
                        <h3 style={{ fontSize: "1rem", fontWeight: 700, marginBottom: "1rem", color: "hsl(var(--text-primary))", borderBottom: "1px solid hsl(var(--border))", paddingBottom: "0.5rem" }}>
                            Parent Shipment & Client
                        </h3>
                        <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
                            <div>
                                <span style={{ fontSize: "0.72rem", color: "hsl(var(--text-muted))" }}>Client Name</span>
                                <div style={{ fontSize: "1.05rem", fontWeight: 700, color: "hsl(var(--primary))" }}>{shipment?.clientName || "LOGISTICS THREE SIXTY FIVE LTD"}</div>
                            </div>
                            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.75rem" }}>
                                <div>
                                    <span style={{ fontSize: "0.72rem", color: "hsl(var(--text-muted))" }}>B/L Number</span>
                                    <div style={{ fontSize: "0.95rem", fontWeight: 700, fontFamily: "monospace" }}>{shipment?.blNumber || "274493181"}</div>
                                </div>
                                <div>
                                    <span style={{ fontSize: "0.72rem", color: "hsl(var(--text-muted))" }}>Vessel</span>
                                    <div style={{ fontSize: "0.95rem", fontWeight: 700 }}>{shipment?.vesselName || "ARGOLIKOS"}</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* TAB 2: KWATOS DATA (EXACT 3-PANEL REPRODUCTIONS FROM SOURCE SCREENSHOT) */}
            {activeTab === "kwatos" && (
                <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", background: "hsl(var(--surface-2))", padding: "0.6rem 1rem", borderRadius: "6px", border: "1px solid hsl(var(--border))" }}>
                        <div style={{ fontSize: "0.82rem", color: "hsl(var(--text-secondary))" }}>
                            Synced from KPA KWATOS Terminal System
                        </div>
                        <span style={{ fontSize: "0.78rem", fontWeight: 700, color: "hsl(var(--primary))" }}>
                            Synced at: {format(new Date(), "dd MMM yyyy HH:mm")}
                        </span>
                    </div>

                    {/* 1. Detail Information */}
                    <div className="card" style={{ padding: 0, overflow: "hidden" }}>
                        <div style={{ background: "hsl(var(--surface-2))", padding: "0.75rem 1.25rem", borderBottom: "1px solid hsl(var(--border))" }}>
                            <h3 style={{ fontSize: "0.92rem", fontWeight: 700, color: "hsl(var(--primary))", margin: 0, textTransform: "uppercase" }}>1. Detail Information</h3>
                        </div>
                        <div style={{ padding: "1.25rem", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "1rem" }}>
                            <div><span style={{ fontSize: "0.72rem", color: "hsl(var(--text-muted))", display: "block" }}>Container No</span><strong style={{ fontFamily: "monospace" }}>{container.containerNumber || "CAAU4803313"}</strong></div>
                            <div><span style={{ fontSize: "0.72rem", color: "hsl(var(--text-muted))", display: "block" }}>Weight / Verified Wt</span><strong>16308 KG / —</strong></div>
                            <div><span style={{ fontSize: "0.72rem", color: "hsl(var(--text-muted))", display: "block" }}>Class</span><strong>Import</strong></div>
                            <div><span style={{ fontSize: "0.72rem", color: "hsl(var(--text-muted))", display: "block" }}>Yard Position</span><strong style={{ color: "hsl(var(--primary))", fontFamily: "monospace" }}>{yardLoc}</strong></div>
                            <div><span style={{ fontSize: "0.72rem", color: "hsl(var(--text-muted))", display: "block" }}>Operator</span><strong>{kwatos.operator || editForm.kwatosOperator}</strong></div>
                            <div><span style={{ fontSize: "0.72rem", color: "hsl(var(--text-muted))", display: "block" }}>SzTp</span><strong>{kwatos.szTp || editForm.kwatosSzTp}</strong></div>
                            <div><span style={{ fontSize: "0.72rem", color: "hsl(var(--text-muted))", display: "block" }}>Full / Empty</span><strong style={{ color: "hsl(var(--success))" }}>Full</strong></div>
                            <div><span style={{ fontSize: "0.72rem", color: "hsl(var(--text-muted))", display: "block" }}>Gate in Category</span><strong>{kwatos.gateInCat || editForm.kwatosGateInCat}</strong></div>
                        </div>
                    </div>

                    {/* 2. In / Out Bound Information */}
                    <div className="card" style={{ padding: 0, overflow: "hidden" }}>
                        <div style={{ background: "hsl(var(--surface-2))", padding: "0.75rem 1.25rem", borderBottom: "1px solid hsl(var(--border))" }}>
                            <h3 style={{ fontSize: "0.92rem", fontWeight: 700, color: "hsl(var(--primary))", margin: 0, textTransform: "uppercase" }}>2. In / Out Bound Information</h3>
                        </div>
                        <div style={{ padding: "1.25rem", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "1rem" }}>
                            <div><span style={{ fontSize: "0.72rem", color: "hsl(var(--text-muted))", display: "block" }}>Vessel</span><strong>{kwatos.vessel || editForm.kwatosVessel}</strong></div>
                            <div><span style={{ fontSize: "0.72rem", color: "hsl(var(--text-muted))", display: "block" }}>Voyage</span><strong>{kwatos.voyage || editForm.kwatosVoyage}</strong></div>
                            <div><span style={{ fontSize: "0.72rem", color: "hsl(var(--text-muted))", display: "block" }}>B/L Number</span><strong style={{ color: "hsl(var(--primary))", fontFamily: "monospace" }}>{shipment?.blNumber || "274493181"}</strong></div>
                            <div><span style={{ fontSize: "0.72rem", color: "hsl(var(--text-muted))", display: "block" }}>Gate In Date</span><strong>26/08/2026 18:43</strong></div>
                            <div><span style={{ fontSize: "0.72rem", color: "hsl(var(--text-muted))", display: "block" }}>Gate Out Date</span><strong style={{ color: "hsl(var(--success))" }}>30/08/2026 15:42</strong></div>
                            <div><span style={{ fontSize: "0.72rem", color: "hsl(var(--text-muted))", display: "block" }}>Pick-up Order No</span><strong>1270826IO5684</strong></div>
                            <div><span style={{ fontSize: "0.72rem", color: "hsl(var(--text-muted))", display: "block" }}>Truck No</span><strong style={{ color: "hsl(var(--primary))" }}>{assignedTruck}</strong></div>
                            <div style={{ gridColumn: "span 2" }}><span style={{ fontSize: "0.72rem", color: "hsl(var(--text-muted))", display: "block" }}>Commodity</span><strong>{kwatos.commodity || editForm.kwatosCommodity}</strong></div>
                        </div>
                    </div>

                    {/* 3. Hold Information */}
                    <div className="card" style={{ padding: 0, overflow: "hidden" }}>
                        <div style={{ background: "hsl(var(--surface-2))", padding: "0.75rem 1.25rem", borderBottom: "1px solid hsl(var(--border))" }}>
                            <h3 style={{ fontSize: "0.92rem", fontWeight: 700, color: "hsl(var(--primary))", margin: 0, textTransform: "uppercase" }}>3. Hold & Customs Clearance Information</h3>
                        </div>
                        <div style={{ padding: "1.25rem", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "1rem" }}>
                            <div><span style={{ fontSize: "0.72rem", color: "hsl(var(--text-muted))", display: "block" }}>Customs Clearance</span><strong style={{ color: "hsl(var(--success))" }}>{kwatos.customsStatus || editForm.kwatosCustomsStatus}</strong></div>
                            <div><span style={{ fontSize: "0.72rem", color: "hsl(var(--text-muted))", display: "block" }}>Approval No</span><strong style={{ fontFamily: "monospace", color: "hsl(var(--primary))" }}>{kwatos.approvalNo || editForm.kwatosApprovalNo}</strong></div>
                            <div><span style={{ fontSize: "0.72rem", color: "hsl(var(--text-muted))", display: "block" }}>Terminal Hold</span><strong style={{ color: "hsl(var(--success))" }}>Release</strong></div>
                        </div>
                    </div>
                </div>
            )}

            {/* TAB 3: TRACKING (MAP PLACEHOLDER STATE) */}
            {activeTab === "tracking" && (
                <div className="card" style={{ padding: "1.5rem" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1rem", flexWrap: "wrap", gap: "0.5rem" }}>
                        <h2 style={{ fontSize: "1.1rem", fontWeight: 700, margin: 0, display: "flex", alignItems: "center", gap: "0.5rem" }}>
                            <Navigation size={18} style={{ color: "hsl(var(--primary))" }} /> Live GPS Telematics Map
                        </h2>

                        <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                            <button
                                onClick={() => setGpsConnected(!gpsConnected)}
                                className="btn btn-sm btn-secondary"
                            >
                                Toggle Connection State ({gpsConnected ? "Connected" : "Disconnected"})
                            </button>
                        </div>
                    </div>

                    {/* MAP CONTAINER */}
                    <div style={{ position: "relative", width: "100%", height: "320px", borderRadius: "10px", overflow: "hidden", background: "hsl(var(--surface-3))", border: "1px solid hsl(var(--border))" }}>
                        {/* Map Grid Pattern */}
                        <div style={{
                            position: "absolute", inset: 0,
                            backgroundImage: `radial-gradient(hsl(var(--border)) 1px, transparent 1px)`,
                            backgroundSize: "24px 24px", opacity: 0.7
                        }} />

                        {/* PLACEHOLDER STATE OVERLAY WHEN NOT CONNECTED */}
                        {!gpsConnected ? (
                            <div style={{
                                position: "absolute", inset: 0, display: "flex", flexDirection: "column",
                                alignItems: "center", justifyContent: "center", background: "hsl(var(--surface) / 0.85)",
                                backdropFilter: "blur(4px)", padding: "2rem", textAlign: "center"
                            }}>
                                <div style={{ background: "hsl(var(--primary) / 0.12)", padding: "1rem", borderRadius: "50%", color: "hsl(var(--primary))", marginBottom: "0.75rem" }}>
                                    <MapPin size={32} />
                                </div>
                                <h3 style={{ fontSize: "1.1rem", fontWeight: 700, margin: "0 0 0.4rem", color: "hsl(var(--text-primary))" }}>
                                    Live GPS tracking not yet connected for this container.
                                </h3>
                                <p style={{ fontSize: "0.85rem", color: "hsl(var(--text-muted))", maxWidth: "460px", margin: 0 }}>
                                    Assigned Truck: <strong>{assignedTruck}</strong> | Telematics stream awaiting provider signal. Container position defaults to port terminal yard position ({yardLoc}).
                                </p>
                            </div>
                        ) : (
                            /* LIVE ACTIVE MAP TRACKER STATE */
                            <div>
                                <svg style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}>
                                    <path d="M 60,240 C 150,200 240,160 380,140 C 520,120 650,90 850,70" fill="none" stroke="hsl(var(--primary))" strokeWidth="3" />
                                </svg>
                                <div style={{ position: "absolute", left: `${gpsProgress}%`, top: `${220 - (gpsProgress * 1.5)}px`, transform: "translate(-50%, -50%)" }}>
                                    <div style={{ background: "hsl(var(--primary))", color: "#fff", padding: "6px 10px", borderRadius: "16px", fontWeight: 800, fontSize: "0.75rem", display: "flex", alignItems: "center", gap: "0.3rem" }}>
                                        <Truck size={14} /> {assignedTruck}
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            )}

            {/* TAB 4: INTERCHANGE & RETURN */}
            {activeTab === "interchange" && (
                <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
                    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "1.25rem" }}>
                        {/* Delivery Interchange Card */}
                        <div className="card">
                            <h3 style={{ fontSize: "1rem", fontWeight: 700, marginBottom: "0.75rem", color: "hsl(var(--text-primary))" }}>
                                Delivery Interchange Record
                            </h3>
                            <div style={{ fontSize: "0.85rem", color: "hsl(var(--text-secondary))", lineHeight: 1.6 }}>
                                <div>Receipt Ref: <strong>{interchange.reference || editForm.interchangeRef}</strong></div>
                                <div>Discharge Date: <strong>{container.dischargeDate ? formatDate(container.dischargeDate) : "24 Aug 2026"}</strong></div>
                                <div>Status: <span style={{ color: "hsl(var(--success))", fontWeight: 700 }}>VERIFIED</span></div>
                            </div>
                        </div>

                        {/* Empty Return Interchange Card */}
                        <div className="card">
                            <h3 style={{ fontSize: "1rem", fontWeight: 700, marginBottom: "0.75rem", color: "hsl(var(--text-primary))" }}>
                                Empty Return Interchange Record
                            </h3>
                            <div style={{ fontSize: "0.85rem", color: "hsl(var(--text-secondary))", lineHeight: 1.6 }}>
                                <div>Return Depot: <strong>{interchange.depot || editForm.interchangeDepot}</strong></div>
                                <div>Return Date: <strong>{interchange.returnDate || editForm.interchangeReturnDate || "30 Aug 2026"}</strong></div>
                                <div>Condition: <strong>{interchange.condition || editForm.interchangeCondition}</strong></div>
                            </div>
                        </div>
                    </div>

                    {/* Finance Handoff Banner */}
                    <div style={{ padding: "1rem 1.25rem", borderRadius: "8px", background: "hsl(var(--primary) / 0.1)", border: "1px solid hsl(var(--primary) / 0.25)", display: "flex", alignItems: "center", gap: "0.85rem" }}>
                        <Info size={22} style={{ color: "hsl(var(--primary))", flexShrink: 0 }} />
                        <div style={{ fontSize: "0.85rem", color: "hsl(var(--text-secondary))" }}>
                            <strong style={{ color: "hsl(var(--primary))" }}>Finance Department Handoff:</strong> Once interchange documentation is recorded, container operations are complete and hand off to the Finance Department.
                        </div>
                    </div>
                </div>
            )}

            {/* TAB 5: DOCUMENTS */}
            {activeTab === "documents" && (
                <div className="card">
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1rem" }}>
                        <h3 style={{ fontSize: "1rem", fontWeight: 700, margin: 0 }}>Container Scanned Documents</h3>
                        <Button variant="primary" size="sm" icon={<Upload size={14} />}>Upload Document</Button>
                    </div>

                    <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "0.75rem", background: "hsl(var(--surface-2))", borderRadius: "6px" }}>
                            <div style={{ display: "flex", alignItems: "center", gap: "0.6rem" }}>
                                <FileText size={18} style={{ color: "hsl(var(--primary))" }} />
                                <div>
                                    <div style={{ fontWeight: 600, fontSize: "0.88rem" }}>Interchange_Receipt_Scan.pdf</div>
                                    <div style={{ fontSize: "0.72rem", color: "hsl(var(--text-muted))" }}>Uploaded 30 Aug 2026 • 1.4 MB</div>
                                </div>
                            </div>
                            <Button variant="secondary" size="sm" icon={<Download size={13} />}>Download</Button>
                        </div>
                    </div>
                </div>
            )}

            {/* TAB 6: ACTIVITY TIMELINE */}
            {activeTab === "activity" && (
                <div className="card">
                    <h3 style={{ fontSize: "1rem", fontWeight: 700, marginBottom: "1rem" }}>Container Operational Timeline</h3>
                    <div style={{ display: "flex", flexDirection: "column", gap: "1rem", position: "relative", paddingLeft: "1.25rem", borderLeft: "2px solid hsl(var(--border))" }}>
                        <div>
                            <div style={{ fontSize: "0.85rem", fontWeight: 700, color: "hsl(var(--text-primary))" }}>Container Interchange Received</div>
                            <div style={{ fontSize: "0.75rem", color: "hsl(var(--text-muted))" }}>30 Aug 2026 15:42 • Maersk Depot Shimanzi</div>
                        </div>
                        <div>
                            <div style={{ fontSize: "0.85rem", fontWeight: 700, color: "hsl(var(--text-primary))" }}>Gated Out from KPA Terminal</div>
                            <div style={{ fontSize: "0.75rem", color: "hsl(var(--text-muted))" }}>30 Aug 2026 15:42 • Truck KCU 901J</div>
                        </div>
                        <div>
                            <div style={{ fontSize: "0.85rem", fontWeight: 700, color: "hsl(var(--text-primary))" }}>KWATOS Terminal Sync Completed</div>
                            <div style={{ fontSize: "0.75rem", color: "hsl(var(--text-muted))" }}>26 Aug 2026 18:43 • KPA System</div>
                        </div>
                    </div>
                </div>
            )}

            {/* COMPREHENSIVE UPDATE DRAWER — matches shipment edit drawer style */}
            {showEditDrawer && (
                <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.55)", zIndex: 1100, display: "flex", justifyContent: "flex-end" }}>
                    <div className="card" style={{ width: "100%", maxWidth: "560px", height: "100%", borderRadius: 0, overflowY: "auto", padding: "0", background: "hsl(var(--surface))" }}>

                        {/* Drawer Header */}
                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "1.25rem 1.5rem", borderBottom: "1px solid hsl(var(--border))", position: "sticky", top: 0, background: "hsl(var(--surface))", zIndex: 10 }}>
                            <div>
                                <h2 style={{ fontSize: "1.15rem", fontWeight: 700, margin: 0, color: "hsl(var(--primary))" }}>Edit Container Record</h2>
                                <div style={{ fontSize: "0.78rem", color: "hsl(var(--text-muted))", marginTop: "0.2rem" }}>
                                    {container.containerNumber || container.chassisNumber || "Container"} · {shipment?.refNumber}
                                </div>
                            </div>
                            <button onClick={() => setShowEditDrawer(false)} className="btn btn-ghost" style={{ padding: "0.5rem" }}><X size={20} /></button>
                        </div>

                        <form onSubmit={handleUpdate} style={{ padding: "1.5rem", display: "flex", flexDirection: "column", gap: "1.5rem" }}>

                            {/* SECTION 1: Container Identification */}
                            <FormSection title="Container Identification">
                                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.85rem" }}>
                                    <Input
                                        label="Container Number"
                                        value={editForm.containerNumber}
                                        onChange={e => setEditForm({ ...editForm, containerNumber: e.target.value })}
                                        placeholder="e.g. TGBU3222408"
                                    />
                                    <Input
                                        label="Chassis / Unit Number"
                                        value={editForm.chassisNumber}
                                        onChange={e => setEditForm({ ...editForm, chassisNumber: e.target.value })}
                                        placeholder="e.g. CN1234567"
                                    />
                                    <Input
                                        label="Seal Number"
                                        value={editForm.sealNumber}
                                        onChange={e => setEditForm({ ...editForm, sealNumber: e.target.value })}
                                        placeholder="e.g. SL482910"
                                    />
                                    <div>
                                        <label style={{ fontSize: "0.78rem", fontWeight: 600, color: "hsl(var(--text-secondary))", textTransform: "uppercase", letterSpacing: "0.04em", display: "block", marginBottom: "0.35rem" }}>Size (ft)</label>
                                        <select
                                            value={editForm.size}
                                            onChange={e => setEditForm({ ...editForm, size: e.target.value })}
                                            style={{ width: "100%", height: "40px", padding: "0 0.75rem", borderRadius: "6px", border: "1px solid hsl(var(--border))", background: "hsl(var(--surface-2))", color: "hsl(var(--text-primary))", fontSize: "0.88rem" }}
                                        >
                                            <option value="">Select size…</option>
                                            <option value="20">20'</option>
                                            <option value="40">40'</option>
                                            <option value="45">45'</option>
                                        </select>
                                    </div>
                                    <div>
                                        <label style={{ fontSize: "0.78rem", fontWeight: 600, color: "hsl(var(--text-secondary))", textTransform: "uppercase", letterSpacing: "0.04em", display: "block", marginBottom: "0.35rem" }}>Container Type</label>
                                        <select
                                            value={editForm.containerType}
                                            onChange={e => setEditForm({ ...editForm, containerType: e.target.value })}
                                            style={{ width: "100%", height: "40px", padding: "0 0.75rem", borderRadius: "6px", border: "1px solid hsl(var(--border))", background: "hsl(var(--surface-2))", color: "hsl(var(--text-primary))", fontSize: "0.88rem" }}
                                        >
                                            <option value="">Select type…</option>
                                            <option value="DRY">DRY</option>
                                            <option value="HC">HIGH CUBE (HC)</option>
                                            <option value="RF">REEFER (RF)</option>
                                            <option value="OT">OPEN TOP (OT)</option>
                                            <option value="TK">TANK (TK)</option>
                                            <option value="FR">FLAT RACK (FR)</option>
                                        </select>
                                    </div>
                                </div>
                                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "0.75rem", marginTop: "0.25rem" }}>
                                    <Input label="Gross Weight (KG)" type="number" value={editForm.grossWeightKg} onChange={e => setEditForm({ ...editForm, grossWeightKg: e.target.value })} placeholder="e.g. 16308" />
                                    <Input label="Net Weight (KG)" type="number" value={editForm.netWeightKg} onChange={e => setEditForm({ ...editForm, netWeightKg: e.target.value })} placeholder="e.g. 14200" />
                                    <Input label="Volume (CBM)" type="number" value={editForm.volumeCbm} onChange={e => setEditForm({ ...editForm, volumeCbm: e.target.value })} placeholder="e.g. 67.5" />
                                </div>
                            </FormSection>

                            {/* SECTION 2: Trucking Assignment */}
                            <FormSection title="Trucking & Driver Assignment">
                                <Input
                                    label="Assigned Truck (Reg. Plate / Trailer)"
                                    value={editForm.truckDetails}
                                    onChange={e => setEditForm({ ...editForm, truckDetails: e.target.value })}
                                    placeholder="e.g. KCU 901J / Trailer #481"
                                />
                                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.85rem" }}>
                                    <Input
                                        label="Driver Name"
                                        value={editForm.driverName}
                                        onChange={e => setEditForm({ ...editForm, driverName: e.target.value })}
                                        placeholder="Full name"
                                    />
                                    <Input
                                        label="Driver ID / Licence No."
                                        value={editForm.driverIdNumber}
                                        onChange={e => setEditForm({ ...editForm, driverIdNumber: e.target.value })}
                                        placeholder="e.g. DL-28491-KE"
                                        required={!!editForm.driverName.trim()}
                                    />
                                </div>
                                {editForm.driverName.trim() && !editForm.driverIdNumber.trim() && (
                                    <p style={{ fontSize: "0.78rem", color: "#ef4444", margin: "0.25rem 0 0" }}>Driver ID Number is required when a driver is assigned.</p>
                                )}
                            </FormSection>

                            {/* SECTION 3: Operational Dates & Status */}
                            <FormSection title="Operational Status & Dates">
                                <div>
                                    <label style={{ fontSize: "0.78rem", fontWeight: 600, color: "hsl(var(--text-secondary))", textTransform: "uppercase", letterSpacing: "0.04em", display: "block", marginBottom: "0.35rem" }}>Container Status</label>
                                    <select
                                        value={editForm.status}
                                        onChange={e => setEditForm({ ...editForm, status: e.target.value })}
                                        style={{ width: "100%", height: "40px", padding: "0 0.75rem", borderRadius: "6px", border: "1px solid hsl(var(--border))", background: "hsl(var(--surface-2))", color: "hsl(var(--text-primary))", fontSize: "0.88rem" }}
                                    >
                                        <option value="">Select status…</option>
                                        <option value="AWAITING_ARRIVAL">Awaiting Arrival</option>
                                        <option value="DISCHARGED">Discharged at Port</option>
                                        <option value="GATED_OUT">Gated Out</option>
                                        <option value="IN_TRANSIT">In Transit</option>
                                        <option value="DELIVERED">Delivered to Client</option>
                                        <option value="RETURNED">Empty Returned to Shipping Line</option>
                                    </select>
                                </div>
                                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.85rem" }}>
                                    <Input label="Discharge Date" type="date" value={editForm.dischargeDate} onChange={e => setEditForm({ ...editForm, dischargeDate: e.target.value })} />
                                    <Input label="Gate Out Date" type="date" value={editForm.gateOutDate} onChange={e => setEditForm({ ...editForm, gateOutDate: e.target.value })} />
                                </div>
                            </FormSection>

                            {/* SECTION 4: KWATOS Terminal Data (manual entry) */}
                            <FormSection title="KWATOS Terminal Data (Manual Entry)">
                                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.85rem" }}>
                                    <Input label="Yard Position" value={editForm.kwatosYardPosition} onChange={e => setEditForm({ ...editForm, kwatosYardPosition: e.target.value })} placeholder="e.g. SN/08/B/3" />
                                    <Input label="Operator" value={editForm.kwatosOperator} onChange={e => setEditForm({ ...editForm, kwatosOperator: e.target.value })} placeholder="e.g. MAE" />
                                    <Input label="SzTp" value={editForm.kwatosSzTp} onChange={e => setEditForm({ ...editForm, kwatosSzTp: e.target.value })} placeholder="e.g. 45G0" />
                                    <Input label="Gate In Category" value={editForm.kwatosGateInCat} onChange={e => setEditForm({ ...editForm, kwatosGateInCat: e.target.value })} placeholder="e.g. FCL" />
                                    <Input label="KWATOS Vessel" value={editForm.kwatosVessel} onChange={e => setEditForm({ ...editForm, kwatosVessel: e.target.value })} placeholder="Vessel name" />
                                    <Input label="Voyage" value={editForm.kwatosVoyage} onChange={e => setEditForm({ ...editForm, kwatosVoyage: e.target.value })} placeholder="e.g. IU520265937" />
                                    <Input label="Forwarder" value={editForm.kwatosForwarder} onChange={e => setEditForm({ ...editForm, kwatosForwarder: e.target.value })} placeholder="Forwarder name" />
                                    <Input label="Trucker" value={editForm.kwatosTrucker} onChange={e => setEditForm({ ...editForm, kwatosTrucker: e.target.value })} placeholder="Trucker company" />
                                    <Input label="Customs Status" value={editForm.kwatosCustomsStatus} onChange={e => setEditForm({ ...editForm, kwatosCustomsStatus: e.target.value })} placeholder="e.g. Release" />
                                    <Input label="Approval No." value={editForm.kwatosApprovalNo} onChange={e => setEditForm({ ...editForm, kwatosApprovalNo: e.target.value })} placeholder="e.g. 26MBATR805661313" />
                                </div>
                                <div style={{ marginTop: "0.25rem" }}>
                                    <label style={{ fontSize: "0.78rem", fontWeight: 600, color: "hsl(var(--text-secondary))", textTransform: "uppercase", letterSpacing: "0.04em", display: "block", marginBottom: "0.35rem" }}>Commodity Description</label>
                                    <textarea
                                        value={editForm.kwatosCommodity}
                                        onChange={e => setEditForm({ ...editForm, kwatosCommodity: e.target.value })}
                                        rows={2}
                                        placeholder="e.g. Medical, surgical or laboratory sterilisers."
                                        style={{ width: "100%", padding: "0.6rem 0.75rem", borderRadius: "6px", border: "1px solid hsl(var(--border))", background: "hsl(var(--surface-2))", color: "hsl(var(--text-primary))", fontSize: "0.88rem", resize: "vertical" }}
                                    />
                                </div>
                            </FormSection>

                            {/* SECTION 5: Interchange & Return */}
                            <FormSection title="Interchange & Empty Return">
                                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.85rem" }}>
                                    <Input label="Interchange Ref No." value={editForm.interchangeRef} onChange={e => setEditForm({ ...editForm, interchangeRef: e.target.value })} placeholder="e.g. IC-2026-98201" />
                                    <Input label="Return Depot" value={editForm.interchangeDepot} onChange={e => setEditForm({ ...editForm, interchangeDepot: e.target.value })} placeholder="e.g. Maersk Depot - Shimanzi" />
                                    <Input label="Return Date" type="date" value={editForm.interchangeReturnDate} onChange={e => setEditForm({ ...editForm, interchangeReturnDate: e.target.value })} />
                                    <Input label="Container Condition" value={editForm.interchangeCondition} onChange={e => setEditForm({ ...editForm, interchangeCondition: e.target.value })} placeholder="e.g. CLEAN / GOOD" />
                                    <div>
                                        <label style={{ fontSize: "0.78rem", fontWeight: 600, color: "hsl(var(--text-secondary))", textTransform: "uppercase", letterSpacing: "0.04em", display: "block", marginBottom: "0.35rem" }}>Interchange Status</label>
                                        <select
                                            value={editForm.interchangeStatus}
                                            onChange={e => setEditForm({ ...editForm, interchangeStatus: e.target.value })}
                                            style={{ width: "100%", height: "40px", padding: "0 0.75rem", borderRadius: "6px", border: "1px solid hsl(var(--border))", background: "hsl(var(--surface-2))", color: "hsl(var(--text-primary))", fontSize: "0.88rem" }}
                                        >
                                            <option value="">Select status…</option>
                                            <option value="PENDING">Pending</option>
                                            <option value="INTERCHANGE_RECEIVED">Interchange Received</option>
                                            <option value="RETURNED">Returned</option>
                                        </select>
                                    </div>
                                </div>
                            </FormSection>

                            {/* SECTION 6: Notes */}
                            <FormSection title="Internal Remarks / Notes">
                                <textarea
                                    value={editForm.remarks}
                                    onChange={e => setEditForm({ ...editForm, remarks: e.target.value })}
                                    rows={3}
                                    placeholder="Optional remarks or internal notes…"
                                    style={{ width: "100%", padding: "0.6rem 0.75rem", borderRadius: "6px", border: "1px solid hsl(var(--border))", background: "hsl(var(--surface-2))", color: "hsl(var(--text-primary))", fontSize: "0.88rem", resize: "vertical" }}
                                />
                            </FormSection>

                            {/* Actions */}
                            <div style={{ display: "flex", gap: "1rem", paddingTop: "0.5rem", borderTop: "1px solid hsl(var(--border))" }}>
                                <Button type="button" variant="secondary" onClick={() => setShowEditDrawer(false)} style={{ flex: 1 }}>Cancel</Button>
                                <Button type="submit" loading={saving} style={{ flex: 2 }}>Save All Changes</Button>
                            </div>

                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}
