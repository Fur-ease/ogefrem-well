import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  const email = "faizghalib71@gmail.com";
  const existing = await prisma.user.findUnique({ where: { email } });

  if (existing) {
    console.log("✅ Admin user already exists — skipping seed.");
    return;
  }

  const hashedPassword = await bcrypt.hash("Admin1234!", 10);

  const user = await prisma.user.create({
    data: {
      email,
      username: "Admin",
      password: hashedPassword,
      role: "ADMIN",
    },
  });

  await prisma.shipment.createMany({
    data: [
      {
        clientName: "MARITIME FREIGHT CO. LTD",
        blNumber: "ADD_BL_NUMBER_HERE_1",
        invoiceDate: new Date("2026-05-02"),
        containerCount: 1,
        feriNumber: "2026OGFKE1802959",
        proformaNumber: "1756713",
        ferriUSD: 270.6,
        commUSD: 49.2,
        adAmountUSD: 40,
        totalUSD: 359.8,
        musungoRevenue: 34.6,
        ogefremRevenue: 20,
        status: "COMPLETED",
      },

      {
        clientName: "MARITIME FREIGHT CO. LTD",
        blNumber: "ADD_BL_NUMBER_HERE_2",
        invoiceDate: new Date("2026-05-02"),
        containerCount: 1,
        feriNumber: "2026OGFKE1802950",
        proformaNumber: "1756704",
        ferriUSD: 135.3,
        commUSD: 49.2,
        adAmountUSD: 20,
        totalUSD: 204.5,
        musungoRevenue: 29.6,
        ogefremRevenue: 10,
        status: "COMPLETED",
      },


    ],
  });

  console.log("🌱 Seeded admin user:");
  console.log(`   Email:    ${user.email}`);
  console.log(`   Password: Admin1234!`);
  console.log(`   Role:     ${user.role}`);
}

main()
  .catch((e) => {
    console.error("Seed error:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
