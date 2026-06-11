"use client";

interface Props {
    shipment: any;
}

function Stat({ label, value, highlight }: { label: string; value: string; highlight?: boolean }) {
    return (
        <div className="stat-card">
            <div style={{ fontSize: "0.7rem", fontWeight: 600, color: "hsl(215,12%,45%)", letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: "0.375rem" }}>
                {label}
            </div>
            <div style={{ fontSize: highlight ? "1.5rem" : "1.125rem", fontWeight: 700, color: highlight ? "hsl(213,94%,65%)" : "hsl(210,20%,96%)" }}>
                {value}
            </div>
        </div>
    );
}

function fmt(v: unknown, decimals = 2): string {
    if (v === null || v === undefined) return "—";
    const n = parseFloat(String(v));
    if (isNaN(n)) return "—";
    return n.toFixed(decimals);
}

export function FinancialSummary({ shipment }: Props) {
    const hasRateData = shipment.exchangeRate !== null;
    const hasAdData = shipment.adAmountUSD !== null;
    const isSkipped = (shipment as any).isFeriSkipped;

    if (!hasRateData && !isSkipped) {
        return (
            <div style={{ textAlign: "center", padding: "1.5rem" }}>
                <p style={{ color: "hsl(215,15%,55%)", fontSize: "0.875rem" }}>
                    Financial figures will appear after the shipment is marked as <strong style={{ color: "hsl(145,65%,55%)" }}>Paid</strong>.
                </p>
            </div>
        );
    }

    return (
        <div>
            <h3 style={{ fontSize: "0.875rem", fontWeight: 600, color: "hsl(215,15%,65%)", letterSpacing: "0.06em", textTransform: "uppercase", marginBottom: "1rem" }}>
                Financial Summary
            </h3>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(155px, 1fr))", gap: "0.75rem" }}>
                <Stat label="Proforma EUR" value={`€ ${fmt(shipment.proformaAmountEUR)}`} />
                <Stat label="Commission EUR" value={`€ ${fmt(shipment.commissionEUR)}`} />
                <Stat label="Exchange Rate" value={fmt(shipment.exchangeRate, 4)} />
                <Stat label="Ferri USD" value={`$ ${fmt(shipment.ferriUSD)}`} />
                <Stat label="Comm USD" value={`$ ${fmt(shipment.commUSD)}`} />
                {hasAdData && (
                    <>
                        <Stat label="AD USD" value={`$ ${fmt(shipment.adAmountUSD)}`} />
                        <Stat label="Total USD" value={`$ ${fmt(shipment.totalUSD)}`} highlight />
                        <Stat label="WELL Revenue" value={`$ ${fmt(shipment.wellRevenue)}`} />
                        <Stat label="OGEFREM Rev" value={`$ ${fmt(shipment.ogefremRevenue)}`} />
                        <Stat label="Musongo Rev" value={`$ ${fmt(shipment.musungoRevenue)}`} />
                    </>
                )}
            </div>
        </div>
    );
}
