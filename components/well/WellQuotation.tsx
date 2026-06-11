"use client";

import React from "react";
import { format } from "date-fns";

interface WellQuotationProps {
    shipment: any;
    quotationAmount: number;
}

export const WellQuotation = ({ shipment, quotationAmount }: WellQuotationProps) => {
    return (
        <div className="quotation-print-container">
            <style jsx>{`
                .quotation-print-container {
                    padding: 30px;
                    background: white;
                    color: black;
                    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
                    width: 210mm;
                    min-height: 297mm;
                    margin: 0 auto;
                    box-shadow: 0 0 20px rgba(0,0,0,0.1);
                    position: relative;
                }

                @media print {
                    .quotation-print-container {
                        padding: 0;
                        margin: 0;
                        width: 100%;
                        min-height: auto;
                        box-shadow: none;
                    }
                }

                .header {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    border-bottom: 2px solid #1e40af;
                    padding-bottom: 20px;
                    margin-bottom: 30px;
                }

                .logo {
                    font-size: 24px;
                    font-weight: 800;
                    color: #1e40af;
                }

                .quotation-title {
                    font-size: 32px;
                    font-weight: 700;
                    text-transform: uppercase;
                    color: #1e40af;
                }

                .info-grid {
                    display: grid;
                    grid-template-columns: 1fr 1fr;
                    gap: 40px;
                    margin-bottom: 40px;
                }

                .info-label {
                    font-size: 12px;
                    font-weight: 600;
                    color: #64748b;
                    text-transform: uppercase;
                    margin-bottom: 4px;
                }

                .info-value {
                    font-size: 16px;
                    font-weight: 600;
                    color: #1e293b;
                }

                .table {
                    width: 100%;
                    border-collapse: collapse;
                    margin-bottom: 40px;
                }

                .table th {
                    background: #f1f5f9;
                    text-align: left;
                    padding: 12px;
                    font-size: 14px;
                    font-weight: 700;
                    border-bottom: 1px solid #e2e8f0;
                }

                .table td {
                    padding: 12px;
                    font-size: 14px;
                    border-bottom: 1px solid #e2e8f0;
                }

                .total-section {
                    display: flex;
                    justify-content: flex-end;
                }

                .total-box {
                    width: 250px;
                    background: #f8fafc;
                    padding: 20px;
                    border-radius: 8px;
                }

                .total-row {
                    display: flex;
                    justify-content: space-between;
                    margin-bottom: 10px;
                }

                .grand-total {
                    font-size: 18px;
                    font-weight: 800;
                    color: #1e40af;
                    margin-top: 10px;
                    padding-top: 10px;
                    border-top: 2px solid #e2e8f0;
                }
            `}</style>

            <div className="header">
                <div className="logo">WESTON LOGISTICS LTD</div>
                <div className="quotation-title">Quotation</div>
            </div>

            <div className="info-grid">
                <div>
                    <div className="info-label">Customer</div>
                    <div className="info-value">{shipment.clientName}</div>

                    <div style={{ marginTop: '20px' }}>
                        <div className="info-label">Shipment Details</div>
                        <div className="info-value">B/L No: {shipment.blNumber}</div>
                        <div className="info-value">Vessel: {shipment.vesselName || 'TBA'}</div>
                        <div className="info-value">Ref: {shipment.refNumber}</div>
                    </div>
                </div>
                <div>
                    <div className="info-label">Date</div>
                    <div className="info-value">{format(new Date(), 'dd MMMM yyyy')}</div>

                    <div style={{ marginTop: '20px' }}>
                        <div className="info-label">Valid Until</div>
                        <div className="info-value">{format(new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), 'dd MMMM yyyy')}</div>
                    </div>
                </div>
            </div>

            <table className="table">
                <thead>
                    <tr>
                        <th>Description</th>
                        <th>Containers</th>
                        <th style={{ textAlign: 'right' }}>Amount</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>
                            Logistics & Handling Charges for {shipment.containerSize} containers
                        </td>
                        <td>{shipment.containerSize}</td>
                        <td style={{ textAlign: 'right' }}>USD {quotationAmount.toFixed(2)}</td>
                    </tr>
                </tbody>
            </table>

            <div className="total-section">
                <div className="total-box">
                    <div className="total-row">
                        <span>Subtotal</span>
                        <span>USD {quotationAmount.toFixed(2)}</span>
                    </div>
                    <div className="total-row">
                        <span>Tax (0%)</span>
                        <span>USD 0.00</span>
                    </div>
                    <div className="total-row grand-total">
                        <span>Total Amount</span>
                        <span>USD {quotationAmount.toFixed(2)}</span>
                    </div>
                </div>
            </div>

            <div style={{ marginTop: '100px', fontSize: '12px', color: '#64748b' }}>
                <p><strong>Terms & Conditions:</strong></p>
                <p>1. Payment is due upon receipt of this quotation.</p>
                <p>2. Prices are subject to change based on market conditions.</p>
                <p>3. This quote is valid for 30 days.</p>
            </div>
        </div>
    );
};
