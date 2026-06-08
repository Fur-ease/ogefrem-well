/**
 * Financial Service — OGEFREM Representation WELL
 *
 * ALL financial calculations live here. No business logic in UI.
 * All values rounded to 2 decimal places.
 */

export interface FinancialInputs {
    proformaAmountEUR: number;
    commissionEUR: number;
    exchangeRate: number;
    adAmountUSD: number;
}

export interface FinancialResults {
    ferriUSD: number;
    commUSD: number;
    totalUSD: number;
    wellRevenue: number;
    musungoRevenue: number;
    ogefremRevenue: number;
}

function round2(value: number): number {
    return Math.round(value * 100) / 100;
}

/**
 * Calculate all derived financial figures for a shipment.
 *
 * Formulas (per specification):
 *   ferriUSD     = proformaAmountEUR × exchangeRate
 *   commUSD      = commissionEUR × exchangeRate
 *   totalUSD     = (commissionEUR + proformaAmountEUR) × exchangeRate + adAmountUSD
 *   wellRevenue  = commissionEUR × exchangeRate × 0.5 + adAmountUSD × 0.25
 *   musungoRevenue = commissionEUR × exchangeRate × 0.5 + adAmountUSD × 0.25
 *   ogefremRevenue = adAmountUSD × 0.5
 */
export function calculateFinancials(inputs: FinancialInputs): FinancialResults {
    const { proformaAmountEUR, commissionEUR, exchangeRate, adAmountUSD } = inputs;

    const ferriUSD = round2(proformaAmountEUR * exchangeRate);
    const commUSD = round2(commissionEUR * exchangeRate);
    const totalUSD = round2((commissionEUR + proformaAmountEUR) * exchangeRate + adAmountUSD);
    const wellRevenue = round2(commissionEUR * exchangeRate * 0.5 + adAmountUSD * 0.25);
    const musungoRevenue = round2(commissionEUR * exchangeRate * 0.5 + adAmountUSD * 0.25);
    const ogefremRevenue = round2(adAmountUSD * 0.5);

    return {
        ferriUSD,
        commUSD,
        totalUSD,
        wellRevenue,
        musungoRevenue,
        ogefremRevenue,
    };
}

/**
 * Partial calculation available after PAID step (before AD amount is known).
 */
export function calculatePartialFinancials(
    proformaAmountEUR: number,
    commissionEUR: number,
    exchangeRate: number
): { ferriUSD: number; commUSD: number } {
    return {
        ferriUSD: round2(proformaAmountEUR * exchangeRate),
        commUSD: round2(commissionEUR * exchangeRate),
    };
}
