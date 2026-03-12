import bcrypt from "bcrypt";
import { prisma } from "../lib/prisma";

const SALT_ROUNDS = Number(process.env.SALT_ROUNDS) || 10;

const adminSeed = async () => {
  const adminCheck = await prisma.user.findFirst({
    where: {
      role: "admin",
    },
  });

  if (adminCheck) {
    return;
  }

  const hashedPassword = await bcrypt.hash("admin123", SALT_ROUNDS);

  const admin = await prisma.user.create({
    data: {
      name: "Admin",
      email: "admin@mail.com",
      phone: "+123456789",
      password: hashedPassword,
      role: "admin",
    },
  });

  console.log("admin created", admin);
};

const UserSeeder = {
  adminSeed,
};

export default UserSeeder;
