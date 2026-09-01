import { prisma } from "../lib/prisma";

async function clearWellData() {
    console.log("Cleaning WELL Cargo OS operational data...");

    await prisma.wellShipmentNote.deleteMany({});
    console.log("Cleared WellShipmentNote");

    await prisma.wellEvent.deleteMany({});
    console.log("Cleared WellEvent");

    await prisma.wellException.deleteMany({});
    console.log("Cleared WellException");

    await prisma.wellDocument.deleteMany({});
    console.log("Cleared WellDocument");

    await prisma.wellContainer.deleteMany({});
    console.log("Cleared WellContainer");

    await prisma.wellShipment.deleteMany({});
    console.log("Cleared WellShipment");

    await prisma.wellRefCounter.upsert({
        where: { id: 1 },
        update: { lastRef: 1750 },
        create: { id: 1, lastRef: 1750 },
    });
    console.log("Reset WellRefCounter to 1750 (next shipment gets WELL/1751)");

    console.log("WELL Data successfully reset!");
}

clearWellData()
    .catch((e) => {
        console.error("Error clearing WELL data:", e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
