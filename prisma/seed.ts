import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  const usersToSeed = [
    { email: "faizghalib71@gmail.com", username: "Faiz", pass: "Admin1234!", role: "ADMIN", department: "ADMIN" },
    { email: "admin@ogefrem.com", username: "Admin", pass: "Admin1234!", role: "ADMIN", department: "ADMIN" },
    { email: "well@ogefrem.com", username: "Well Staff", pass: "Well1234!", role: "USER", department: "WELL" },
    { email: "ogefrem@ogefrem.com", username: "Ogefrem Staff", pass: "Ogefrem1234!", role: "USER", department: "OGEFREM" },
  ];

  for (const u of usersToSeed) {
    const existing = await prisma.user.findUnique({ where: { email: u.email } });
    if (!existing) {
      const hashedPassword = await bcrypt.hash(u.pass, 10);
      await prisma.user.create({
        data: {
          email: u.email,
          username: u.username,
          password: hashedPassword,
          role: u.role,
          department: u.department,
        },
      });
      console.log(`✅ Seeded user: ${u.email} | Dept: ${u.department}`);
    } else {
      console.log(`⚠️ User already exists: ${u.email}`);
    }
  }

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

  console.log("🌱 Seeded users successfully.");
}

main()
  .catch((e) => {
    console.error("Seed error:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
