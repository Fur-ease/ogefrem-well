-- CreateEnum
CREATE TYPE "ShipmentStatus" AS ENUM ('NEW', 'FERI_ADDED', 'PAID', 'AD_GENERATED', 'COMPLETED');

-- CreateEnum
CREATE TYPE "DocumentType" AS ENUM ('BL', 'PACKING_LIST', 'COMMERCIAL_INVOICE', 'DRAFT_FERI', 'PROFORMA', 'POP', 'AD', 'FACTURE', 'FINAL_FERI', 'TIO');

-- CreateTable
CREATE TABLE "Shipment" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "clientName" TEXT NOT NULL,
    "blNumber" TEXT NOT NULL,
    "status" "ShipmentStatus" NOT NULL DEFAULT 'NEW',
    "feriNumber" TEXT,
    "proformaNumber" TEXT,
    "proformaAmountEUR" DECIMAL(18,4),
    "commissionEUR" DECIMAL(18,4),
    "exchangeRate" DECIMAL(18,6),
    "adAmountUSD" DECIMAL(18,4),
    "tioNumber" TEXT,
    "ferriUSD" DECIMAL(18,2),
    "commUSD" DECIMAL(18,2),
    "totalUSD" DECIMAL(18,2),
    "wellRevenue" DECIMAL(18,2),
    "musungoRevenue" DECIMAL(18,2),
    "ogefremRevenue" DECIMAL(18,2),

    CONSTRAINT "Shipment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Document" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "shipmentId" TEXT NOT NULL,
    "type" "DocumentType" NOT NULL,
    "filename" TEXT NOT NULL,
    "driveFileId" TEXT NOT NULL,
    "driveUrl" TEXT NOT NULL,
    "version" INTEGER NOT NULL DEFAULT 1,
    "isReplaced" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "Document_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Shipment_blNumber_key" ON "Shipment"("blNumber");

-- CreateIndex
CREATE INDEX "Document_shipmentId_idx" ON "Document"("shipmentId");

-- CreateIndex
CREATE INDEX "Document_shipmentId_type_idx" ON "Document"("shipmentId", "type");

-- AddForeignKey
ALTER TABLE "Document" ADD CONSTRAINT "Document_shipmentId_fkey" FOREIGN KEY ("shipmentId") REFERENCES "Shipment"("id") ON DELETE CASCADE ON UPDATE CASCADE;
