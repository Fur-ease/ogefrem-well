"use client";

import React from "react";
import { format } from "date-fns";
import { QRCodeSVG } from "qrcode.react";
import { type Shipment } from "@prisma/client";

interface InvoicePrintProps {
    shipment: any;
}

export const InvoicePrint = ({ shipment }: InvoicePrintProps) => {
    if (!shipment.invoiceNumber) return null;

    const totalKsh = Number(shipment.totalUSD || 0) * Number(shipment.roeKsh || 0);

    return (
        <div className="invoice-print-container">
            <style jsx>{`
                .invoice-print-container {
                    padding: 40px;
                    background: white;
                    color: black;
                    font-family: 'Times New Roman', serif;
                    width: 210mm; /* A4 width */
                    min-height: 297mm;
                    margin: 0 auto;
                    font-size: 11px;
                }

                @media print {
                    .invoice-print-container {
                        padding: 0;
                        margin: 0;
                        width: 100%;
                    }
                    body {
                        background: white !important;
                    }
                }

                .header-image-container {
                    width: 100%;
                    margin-bottom: 5px;
                }

                .header-image {
                    width: 100%;
                    height: auto;
                    display: block;
                }

                .invoice-title {
                    text-align: center;
                    font-size: 32px;
                    font-weight: 800;
                    text-transform: uppercase;
                    margin: 10px 0 20px 0;
                    letter-spacing: 5px;
                    color: #000;
                }

                .metadata-section {
                    display: grid;
                    grid-template-columns: 1.2fr 1fr;
                    gap: 15px;
                    margin-bottom: 10px;
                }

                .meta-left {
                    display: flex;
                    flex-direction: column;
                }

                .meta-right {
                    display: flex;
                    flex-direction: column;
                }

                .meta-box {
                    border: 1px solid #000;
                    display: flex;
                    flex-direction: column;
                    overflow: hidden;
                    margin-bottom: -1px;
                }

                .meta-label {
                    background: #eee;
                    border-bottom: 1px solid #000;
                    padding: 3px 8px;
                    font-size: 10px;
                    font-weight: 800;
                    text-transform: uppercase;
                }

                .meta-value {
                    padding: 8px;
                    font-size: 11px;
                    font-weight: 700;
                    min-height: 25px;
                    color: #000;
                }

                .meta-grid-row {
                    display: grid;
                    border: 1px solid #000;
                    margin-bottom: -1px;
                }

                .grid-3 { grid-template-columns: 1fr 1fr 1fr; }
                .grid-2 { grid-template-columns: 1fr 1fr; }

                .grid-cell {
                    border-right: 1px solid #000;
                    display: flex;
                    flex-direction: column;
                }
                .grid-cell:last-child { border-right: none; }

                .data-table {
                    width: 100%;
                    border-collapse: collapse;
                    border: 1.5px solid #000;
                    margin-top: 10px;
                }

                .data-table th {
                    background: #eee;
                    padding: 8px 5px;
                    font-size: 11px;
                    border: 1px solid #000;
                    text-transform: uppercase;
                    font-weight: 900;
                }

                .data-table td {
                    border: 1px solid #000;
                    padding: 10px 8px;
                    vertical-align: top;
                    font-size: 12px;
                    color: #000;
                    font-weight: 600;
                }

                .footer-flex {
                    display: flex;
                    justify-content: space-between;
                    margin-top: 20px;
                }

                .signatures {
                    flex: 1;
                    display: flex;
                    flex-direction: column;
                    gap: 30px;
                }

                .sig-line {
                    display: flex;
                    gap: 10px;
                    align-items: flex-end;
                }
                .sig-label {
                    font-weight: 800;
                    width: 110px;
                    font-size: 10px;
                    text-transform: uppercase;
                }
                .sig-value {
                    border-bottom: 1px solid #000;
                    flex: 1;
                    font-weight: 700;
                    padding-bottom: 2px;
                    min-height: 15px;
                }

                .totals-box {
                    width: 250px;
                }

                .total-row {
                    display: flex;
                    border: 1.5px solid #000;
                    border-top: none;
                }
                .total-row:first-child {
                    border-top: 1.5px solid #000;
                }

                .total-label {
                    flex: 1;
                    background: #eee;
                    padding: 10px 10px;
                    font-weight: 800;
                    text-transform: uppercase;
                    border-right: 1.5px solid #000;
                    font-size: 14px;
                }

                .total-val {
                    width: 120px;
                    padding: 10px 10px;
                    text-align: right;
                    font-weight: 900;
                    font-size: 12px;
                }

                .final-total {
                    font-size: 18px;
                }

                .qr-section {
                    margin-top: 15px;
                    display: flex;
                    gap: 20px;
                    align-items: center;
                }

                .qr-meta {
                    font-size: 10px;
                    color: #000;
                    line-height: 1.4;
                    font-weight: 700;
                }
            `}</style>

            <div className="header-image-container">
                <img src="/RecieptHeader.png" alt="Receipt Header" className="header-image" />
            </div>

            <div className="invoice-title">Invoice</div>

            <div className="metadata-section">
                <div className="meta-left">
                    <div className="meta-box" style={{ flex: 1 }}>
                        <div className="meta-label">Invoice To</div>
                        <div className="meta-value" style={{ fontSize: '14px', padding: '15px 10px' }}>{shipment.clientName}</div>
                        <div style={{ marginTop: 'auto', borderTop: '1px solid #000', display: 'flex' }}>
                            <div className="meta-label" style={{ borderBottom: 'none', borderRight: '1px solid #000', width: '100px' }}>Cust VAT Reg.</div>
                            <div className="meta-value" style={{ minHeight: 'auto', padding: '4px 8px' }}></div>
                        </div>
                    </div>
                </div>
                <div className="meta-right">
                    <div className="meta-grid-row grid-3">
                        <div className="grid-cell">
                            <div className="meta-label">Company VAT Reg</div>
                            <div className="meta-value" style={{ minHeight: 'auto', padding: '4px 8px' }}>P051153426Z</div>
                        </div>
                        <div className="grid-cell">
                            <div className="meta-label">Tax Date</div>
                            <div className="meta-value" style={{ minHeight: 'auto', padding: '4px 8px' }}>
                                {shipment.invoiceDate ? format(new Date(shipment.invoiceDate), 'dd/MM/yyyy') : format(new Date(), 'dd/MM/yyyy')}
                            </div>
                        </div>
                        <div className="grid-cell">
                            <div className="meta-label">Invoice No.</div>
                            <div className="meta-value" style={{ minHeight: 'auto', padding: '4px 8px' }}>
                                {shipment.cuInvoiceNumber || shipment.invoiceNumber}
                            </div>
                        </div>
                    </div>
                    <div className="meta-grid-row grid-2" style={{ width: '100%' }}>
                        <div className="grid-cell">
                            <div className="meta-label">B/L NO.</div>
                            <div className="meta-value" style={{ minHeight: 'auto', padding: '6px 8px' }}>{shipment.blNumber}</div>
                        </div>
                        <div className="grid-cell">
                            <div className="meta-label">WELL NO.</div>
                            <div className="meta-value" style={{ minHeight: 'auto', padding: '6px 8px' }}>{shipment.id.slice(-8).toUpperCase()}</div>
                        </div>
                    </div>
                    <div className="meta-grid-row grid-3">
                        <div className="grid-cell">
                            <div className="meta-label">ROE:</div>
                            <div className="meta-value" style={{ textAlign: 'center', minHeight: 'auto', padding: '4px' }}>{shipment.roeKsh?.toString() || '130'}</div>
                        </div>
                        <div className="grid-cell">
                            <div className="meta-label">VESSEL NAME</div>
                            <div className="meta-value" style={{ textAlign: 'center', minHeight: 'auto', padding: '4px' }}>{shipment.vesselName || '—'}</div>
                        </div>
                        <div className="grid-cell">
                            <div className="meta-label">ENTRY</div>
                            <div className="meta-value" style={{ textAlign: 'center', minHeight: 'auto', padding: '4px' }}>{shipment.entryNumber || '—'}</div>
                        </div>
                    </div>
                </div>
            </div>

            <table className="data-table">
                <thead>
                    <tr>
                        <th style={{ width: '100px' }}>Item</th>
                        <th>Description</th>
                        <th style={{ width: '100px' }}>HS CODE</th>
                        <th style={{ width: '100px' }}>Amount</th>
                        <th style={{ width: '60px' }}>VAT</th>
                    </tr>
                </thead>
                <tbody>
                    <tr style={{ height: '300px' }}>
                        <td style={{ textAlign: 'center', fontWeight: 'bold' }}>TRANSIT</td>
                        <td style={{ padding: '15px 10px' }}>
                            <div style={{ fontWeight: 'bold', marginBottom: '8px', textTransform: 'uppercase' }}>
                                FERI & CERTIFICATE OF DESTINATION CHARGES {shipment.containerCount}X40FT CNTR ({shipment.feriNumber || 'N/A'})
                            </div>
                            <div style={{ color: '#000', fontSize: '11px' }}>
                                Shipment Tracking BL: {shipment.blNumber}
                            </div>
                        </td>
                        <td style={{ textAlign: 'center' }}>{shipment.hsCode || '0010.22.00'}</td>
                        <td style={{ textAlign: 'center', fontWeight: 'bold' }}>{Number(shipment.totalUSD).toFixed(2)}</td>
                        <td style={{ textAlign: 'center' }}>{shipment.vatPercentage || '0'}%</td>
                    </tr>
                </tbody>
            </table>

            <div className="footer-flex">
                <div className="signatures">
                    <div className="sig-line">
                        <div className="sig-label">PREPARED BY:</div>
                        <div className="sig-value">{shipment.preparedBy}</div>
                    </div>
                    <div className="sig-line">
                        <div className="sig-label">CHECKED:</div>
                        <div className="sig-value"></div>
                    </div>
                    <div className="sig-line">
                        <div className="sig-label">AUTHORISED:</div>
                        <div className="sig-value" style={{ position: 'relative' }}>
                            <img src="https://i.ibb.co/V9mH9cK/signature.png" alt="Signature" style={{ position: 'absolute', bottom: '0', left: '20px', height: '50px', display: 'none' }} />
                        </div>
                    </div>

                    <div className="qr-section">
                        <QRCodeSVG
                            value={shipment.qrCodeUrl || `https://itax.kra.go.ke/KRA-Portal/complianceMonitoring.htm?actionCode=validateInvoice&inv=${shipment.invoiceNumber}`}
                            size={70}
                            level="H"
                        />
                        <div className="qr-meta">
                            {shipment.cuInvoiceNumber || shipment.invoiceNumber?.padStart(10, '0')}<br />
                            {shipment.cuDateTime ? format(new Date(shipment.cuDateTime), 'yyyy/MM/dd HH:mm a') : format(new Date(), 'yyyy/MM/dd HH:mm a')}<br />
                            {shipment.cuSerialNumber && (
                                <>
                                    CU Serial: {shipment.cuSerialNumber}<br />
                                </>
                            )}
                            Total - Ksh {totalKsh.toFixed(2)}
                        </div>
                    </div>
                </div>

                <div className="totals-box">
                    <div className="total-row">
                        <div className="total-label">Subtotal</div>
                        <div className="total-val">USD {Number(shipment.totalUSD).toFixed(2)}</div>
                    </div>
                    <div className="total-row">
                        <div className="total-label">VAT Total</div>
                        <div className="total-val">USD 0.00</div>
                    </div>
                    <div className="total-row final-total">
                        <div className="total-label" style={{ fontWeight: '900' }}>Total</div>
                        <div className="total-val" style={{ fontWeight: '900' }}>USD {Number(shipment.totalUSD).toFixed(2)}</div>
                    </div>
                </div>
            </div>
        </div>
    );
};
