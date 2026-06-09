"use client";

import { DocumentType } from "@prisma/client";
import { useState, useRef, useEffect } from "react";
import { toast } from "sonner";
import { Upload, FileUp } from "lucide-react";

interface Props {
    shipmentId: string;
    allowedTypes: DocumentType[];
    onSuccess?: () => void;
}

const DOC_LABELS: Record<DocumentType, string> = {
    BL: "Bill of Lading (BL)",
    PACKING_LIST: "Packing List",
    COMMERCIAL_INVOICE: "Commercial Invoice",
    DRAFT_FERI: "Draft Feri",
    PROFORMA: "Proforma",
    POP: "Proof of Payment (POP)",
    AD: "AD Document",
    FACTURE: "Facture",
    FINAL_FERI: "Final Feri",
    TIO: "TIO Document",
};

export function DocumentUpload({ shipmentId, allowedTypes, onSuccess }: Props) {
    const [type, setType] = useState<DocumentType>(allowedTypes[0]);
    const [files, setFiles] = useState<File[]>([]);
    const [uploading, setUploading] = useState(false);
    const fileRef = useRef<HTMLInputElement>(null);

    // Sync current type when allowedTypes changes (e.g. shipment status changes)
    useEffect(() => {
        if (allowedTypes.length > 0) {
            setType(allowedTypes[0]);
        }
    }, [allowedTypes]);

    async function handleUpload(e: React.FormEvent) {
        e.preventDefault();
        if (files.length === 0) return;

        setUploading(true);
        const tId = toast.loading(files.length > 1 ? `Uploading ${files.length} files...` : `Uploading ${DOC_LABELS[type]}...`);

        const formData = new FormData();
        files.forEach(f => formData.append("file", f));
        formData.append("type", type);

        try {
            const res = await fetch(`/api/shipments/${shipmentId}/documents`, {
                method: "POST",
                body: formData,
            });

            const json = await res.json();
            if (!res.ok) {
                toast.error(json.error || "Upload failed", { id: tId });
            } else {
                toast.success(files.length > 1 ? `${files.length} documents uploaded successfully` : `${DOC_LABELS[type]} uploaded successfully`, { id: tId });
                setFiles([]);
                if (fileRef.current) fileRef.current.value = "";
                onSuccess?.();
            }
        } catch {
            toast.error("Network error. Please try again.", { id: tId });
        } finally {
            setUploading(false);
        }
    }

    return (
        <form onSubmit={handleUpload} style={{ display: "flex", flexDirection: "column", gap: "0.875rem" }}>
            <div className="form-group">
                <label htmlFor="doc-type">Document Type</label>
                <select
                    id="doc-type"
                    value={type}
                    onChange={(e) => setType(e.target.value as DocumentType)}
                >
                    {allowedTypes.map((t) => (
                        <option key={t} value={t}>{DOC_LABELS[t]}</option>
                    ))}
                </select>
            </div>

            <div className="form-group">
                <label htmlFor="doc-files">Select Files {type === DocumentType.AD && "(Bulk upload supported)"}</label>
                <input
                    id="doc-files"
                    ref={fileRef}
                    type="file"
                    multiple
                    accept=".pdf,.doc,.docx,.png,.jpg,.jpeg"
                    onChange={(e) => setFiles(Array.from(e.target.files || []))}
                    style={{ cursor: "pointer" }}
                />
            </div>

            {files.length > 0 && (
                <div style={{ marginBottom: "0.5rem" }}>
                    <div style={{ fontSize: "0.75rem", color: "hsl(var(--text-muted))", marginBottom: "0.25rem" }}>Selected:</div>
                    <ul style={{ margin: 0, padding: 0, listStyle: "none", fontSize: "0.8rem", color: "hsl(var(--info))", display: "flex", flexDirection: "column", gap: "0.25rem" }}>
                        {files.map((f, i) => (
                            <li key={i} style={{ whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                                • {f.name}
                            </li>
                        ))}
                    </ul>
                </div>
            )}

            <button
                type="submit"
                className="btn btn-primary"
                disabled={files.length === 0 || uploading}
                style={{ alignSelf: "flex-start", opacity: files.length === 0 || uploading ? 0.6 : 1, gap: "0.5rem" }}
            >
                {uploading ? (
                    "Uploading…"
                ) : (
                    <>
                        <FileUp size={16} />
                        Upload {files.length > 1 ? `${files.length} Files` : "Document"}
                    </>
                )}
            </button>
        </form>
    );
}

