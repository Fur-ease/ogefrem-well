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
