/**
 * KRA TIMS Integration Utility (Refined - Version 4)
 * 
 * Re-integrating Settings command with the Arg/Args XML structure 
 * to resolve "ClientSettingsNotInitialized" (Code 53).
 */

const BASE_URL = "http://localhost:4444";

export interface TimsSettings {
    ip: string;
    port: number;
}

export interface TimsItem {
    name: string;
    price: number;
    quantity: number;
    vatCode: "A" | "B" | "C" | "D" | "E";
    hsCode?: string;
}

export interface TimsInvoiceData {
    type: "Normal" | "CreditNote" | "DebitNote";
    customerPin?: string;
    invoiceNumber: string;
    items: TimsItem[];
}

export interface TimsResponse {
    success: boolean;
    error?: string;
    data?: any;
}

/**
 * Clean strings for TIMS (No symbols allowed)
 */
function cleanString(str: string): string {
    if (!str) return "";
    return str.replace(/[^a-zA-Z0-9 ]/g, "").substring(0, 36);
}

/**
 * Convert command and data to XML format required by ZFPLabServer
 */
function buildXmlRequest(command: string, data: any = {}): string {
    const args = Object.entries(data)
        .filter(([_, v]) => v !== undefined && v !== null)
        .map(([k, v]) => `<Arg Name="${k}" Value="${v}" />`)
        .join("");

    return `<Command Name="${command}"><Args>${args}</Args></Command>`;
}

/**
 * Simple XML value extractor using Regex
 */
function getXmlValue(xml: string, tag: string): string | null {
    const regex = new RegExp(`<${tag}[^>]*>([^<]+)</${tag}>`, "i");
    const match = xml.match(regex);
    return match ? match[1].trim() : null;
}

/**
 * Extract Value from <Res Name="X" Value="Y" />
 */
function getXmlAttributeValue(xml: string, name: string): string | null {
    const regex = new RegExp(`Name="${name}"[^>]+Value="([^"]+)"`, "i");
    const match = xml.match(regex);
    return match ? match[1] : null;
}

function getResCode(xml: string): number {
    const match = xml.match(/Code="(\d+)"/i);
    return match ? parseInt(match[1]) : -1;
}

async function timsRequest(command: string, data: any = {}): Promise<TimsResponse> {
    try {
        const xmlBody = buildXmlRequest(command, data);
        console.log(`Sending TIMS Request (${command}):`, xmlBody);

        const response = await fetch(`${BASE_URL}`, {
            method: "POST",
            headers: { "Content-Type": "text/plain" },
            body: xmlBody,
        });

        const text = await response.text();
        console.log(`Received TIMS Response (${command}):`, text);

        const code = getResCode(text);

        if (code === 0) {
            return { success: true, data: text };
        } else {
            const errorMsg = getXmlValue(text, "Message") || getXmlAttributeValue(text, "Message") || `Error Code ${code}`;
            return { success: false, error: errorMsg };
        }
    } catch (err: any) {
        return { success: false, error: `Connection failed: ${err.message}` };
    }
}

/**
 * STEP 1: INITIALIZE
 */
export async function initializeTims(): Promise<TimsResponse> {
    try {
        await fetch(BASE_URL, { mode: "no-cors" });
        return { success: true };
    } catch (err: any) {
        return { success: false, error: "ZFPLabServer not found on localhost:4444" };
    }
}

/**
 * STEP 2: SETTINGS (Now required by server Code 53)
 */
export async function setTimsSettings(settings: TimsSettings): Promise<TimsResponse> {
    // Using "Settings" as specified in the error message "First use settings() command"
    return timsRequest("Settings", { 
        IPAddress: settings.ip, 
        Port: settings.port 
    });
}

/**
 * STEP 3: READ STATUS
 */
export async function readTimsStatus(): Promise<TimsResponse> {
    return timsRequest("ReadStatus");
}

/**
 * STEP 4: OPEN RECEIPT
 */
export async function openTimsInvoice(invoice: TimsInvoiceData): Promise<TimsResponse> {
    return timsRequest("OpenReceipt", {
        OptionReceiptFormat: "1", // 1 = Detailed
        TraderSystemInvNum: cleanString(invoice.invoiceNumber)
    });
}

/**
 * STEP 5: SELL ITEM
 */
export async function sellTimsItem(item: TimsItem): Promise<TimsResponse> {
    return timsRequest("SellPLUfromExtDB", {
        NamePLU: cleanString(item.name),
        OptionVATClass: item.vatCode,
        Price: item.price.toFixed(2),
        MeasureUnit: "pcs",
        HSCode: item.hsCode || "",
        HSName: item.hsCode ? "HS Item" : "",
        VATGrRate: "", 
        Quantity: item.quantity.toString(),
        DiscAddP: ""
    });
}

/**
 * STEP 6: READ VAT
 */
export async function readTimsVat(): Promise<TimsResponse> {
    return timsRequest("ReadVAT");
}

/**
 * STEP 7: CLOSE RECEIPT
 */
export async function closeTimsReceipt(): Promise<TimsResponse> {
    return timsRequest("CloseReceipt");
}

/**
 * STEP 8: READ DATE & TIME
 */
export async function readTimsDateTime(): Promise<TimsResponse> {
    return timsRequest("ReadDateTime");
}

/**
 * STEP 9: CLOSE CONNECTION
 */
export async function closeTimsConnection(): Promise<TimsResponse> {
    return timsRequest("CloseConnection");
}

/**
 * FULL INTEGRATION FLOW
 */
export async function processTimsInvoice(
    settings: TimsSettings, 
    invoice: TimsInvoiceData
): Promise<{ success: boolean; error?: string; cuData?: any }> {
    
    // Step 1: Initialize
    const init = await initializeTims();
    if (!init.success) return init;

    // Step 2: Settings (REQUIRED by server even if configured in UI)
    const config = await setTimsSettings(settings);
    if (!config.success) return config;

    // Step 3: Read Status
    const status = await readTimsStatus();
    if (!status.success) return status;

    // Step 4: Open Receipt
    const open = await openTimsInvoice(invoice);
    if (!open.success) return open;

    // Step 5: Sell Items
    for (const item of invoice.items) {
        const sell = await sellTimsItem(item);
        if (!sell.success) {
            await timsRequest("CancelReceipt");
            return sell;
        }
    }

    // Step 6: Read VAT
    const vat = await readTimsVat();
    if (!vat.success) return vat;

    // Step 7: Close Receipt
    const close = await closeTimsReceipt();
    if (!close.success) return close;

    // Step 8: Read Date & Time
    const dt = await readTimsDateTime();

    // Step 9: Close Connection
    await closeTimsConnection();

    return { 
        success: true, 
        cuData: {
            cuInvoiceNumber: getXmlAttributeValue(close.data, "InvoiceNumber") || getXmlAttributeValue(close.data, "CUInvoiceNumber"),
            qrCodeUrl: getXmlAttributeValue(close.data, "QRCodeURL"),
            cuDateTime: getXmlAttributeValue(dt.data, "DateTime"),
            cuSerialNumber: getXmlAttributeValue(status.data, "SerialNumber")
        } 
    };
}
