// lib/api/apis.ts

async function handleResponse(res: Response) {
    if (!res.ok) {
        let error = "An error occurred";
        try {
            const data = await res.json();
            error = data.error || error;
        } catch (e) {
            // If it's not JSON, try text
            try {
                const text = await res.text();
                error = text || error;
            } catch (e2) { }
        }
        throw new Error(error);
    }
    const contentType = res.headers.get("content-type");
    if (contentType && contentType.includes("application/json")) {
        const json = await res.json();
        return json.data !== undefined ? json.data : json;
    }
    // Return blob for files (DOCX, XLSX, PDF)
    return res.blob();
}

export const apis = {
    reports: {
        getSummary: (month: string) => fetch(`/api/reports/summary?month=${month}`).then(handleResponse),
        exportDocx: (month: string) => fetch("/api/reports/export", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ month }),
        }).then(handleResponse),
        exportExcel: (month: string) => fetch("/api/reports/export-excel", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ month }),
        }).then(handleResponse),
        exportReconciliation: (month: string) => fetch("/api/reports/reconciliation", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ month }),
        }).then(handleResponse),
        previewIIF: (month: string) => fetch("/api/reports/preview-iif", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ month }),
        }).then(handleResponse),
        exportIIF: (month: string) => fetch("/api/reports/export-iif", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ month }),
        }).then(handleResponse),
    },
    shipments: {
        getShipment: (id: string) => fetch(`/api/shipments/${id}`).then(handleResponse),
        createShipment: (data: any) => fetch("/api/shipments", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data),
        }).then(handleResponse),
        updateShipment: (id: string, action: string, payload: any) => fetch(`/api/shipments/${id}`, {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ action, ...payload }),
        }).then(handleResponse),
        uploadDocument: (id: string, formData: FormData) => fetch(`/api/shipments/${id}/documents`, {
            method: "POST",
            body: formData,
        }).then(handleResponse),
        deleteDocument: (id: string, docId: string) => fetch(`/api/shipments/${id}/documents/${docId}`, {
            method: "DELETE",
        }).then(handleResponse),
        finalizeInvoice: (id: string, data: any) => fetch(`/api/shipments/${id}/invoice`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data),
        }).then(handleResponse),
        getNextInvoiceNumber: () => fetch("/api/invoices/next-number").then(handleResponse),
    },
    well: {
        getShipments: (params?: Record<string, string | boolean | undefined>) => {
            const query = new URLSearchParams();
            if (params) {
                Object.entries(params).forEach(([key, val]) => {
                    if (val !== undefined && val !== null && val !== "") {
                        query.set(key, String(val));
                    }
                });
            }
            const url = query.toString() ? `/api/well/shipments?${query.toString()}` : "/api/well/shipments";
            return fetch(url).then(handleResponse);
        },
        getShipment: (id: string) => fetch(`/api/well/shipments/${id}`).then(handleResponse),
        updateShipment: (id: string, data: any) => fetch(`/api/well/shipments/${id}`, {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data),
        }).then(handleResponse),
        createShipment: (data: any) => fetch("/api/well/shipments", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data),
        }).then(handleResponse),
        addEvent: (id: string, eventData: any) => fetch(`/api/well/shipments/${id}/events`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(eventData),
        }).then(handleResponse),
        addNote: (id: string, note: string) => fetch(`/api/well/shipments/${id}/notes`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ note }),
        }).then(handleResponse),
        getNotes: (id: string) => fetch(`/api/well/shipments/${id}/notes`).then(handleResponse),
        verifyPayment: (id: string) => fetch(`/api/well/shipments/${id}/verify-payment`, {
            method: "POST"
        }).then(handleResponse),
        reportException: (id: string, exceptionData: any) => fetch(`/api/well/shipments/${id}/exceptions`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(exceptionData),
        }).then(handleResponse),
        resolveException: (exceptionId: string, notes?: string) => fetch(`/api/well/exceptions/${exceptionId}/resolve`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ notes }),
        }).then(handleResponse),
        uploadDocument: (id: string, formData: FormData) => fetch(`/api/well/shipments/${id}/documents`, {
            method: "POST",
            body: formData,
        }).then(handleResponse),
        deleteDocument: (id: string, docId: string) => fetch(`/api/well/shipments/${id}/documents/${docId}`, {
            method: "DELETE",
        }).then(handleResponse),
        exportShipment: (id: string) => fetch(`/api/well/shipments/${id}/export`).then(handleResponse),
        getClients: (q?: string) => {
            const url = q ? `/api/well/clients?q=${encodeURIComponent(q)}` : "/api/well/clients";
            return fetch(url).then(handleResponse);
        },
        getClientShipments: (name: string) => fetch(`/api/well/clients/${name}/shipments`).then(handleResponse),
        payFinance: (id: string, data: any) => fetch(`/api/well/finance/${id}/pay`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data),
        }).then(handleResponse),
        getCargo: () => fetch("/api/well/cargo").then(handleResponse),
        exportCargo: () => fetch("/api/well/cargo/export").then(handleResponse),
        getAnalytics: () => fetch("/api/well/analytics").then(handleResponse),
    },
    users: {
        getUsers: () => fetch("/api/users").then(handleResponse),
        createUser: (data: any) => fetch("/api/users", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data),
        }).then(handleResponse),
        updateUser: (id: string, data: any) => fetch(`/api/users/${id}`, {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data),
        }).then(handleResponse),
        deleteUser: (id: string) => fetch(`/api/users/${id}`, {
            method: "DELETE",
        }).then(handleResponse),
        getProfile: () => fetch("/api/user/profile").then(handleResponse),
        updateProfile: (data: any) => fetch("/api/user/profile", {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data),
        }).then(handleResponse),
    },
    auth: {
        forgotPassword: (email: string) => fetch("/api/auth/forgot-password", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email }),
        }).then(handleResponse),
        resetPassword: (data: any) => fetch("/api/auth/reset-password", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data),
        }).then(handleResponse),
    },
    analytics: {
        get: (months: number) => fetch(`/api/analytics?months=${months}`).then(handleResponse),
    },
    activityLogs: {
        list: (limit = 200) => fetch(`/api/activity-logs?limit=${limit}`).then(handleResponse),
    }
};
