import { UserCreateInput } from "../generated/prisma/models";
import { prisma } from "../lib/prisma";

const adminSeed = async () => {
  const adminCheck = await prisma.user.findFirst({
    where: {
      role: "admin",
    },
  });

  if (adminCheck) {
    return;
  }

  const adminSeederData: UserCreateInput = {
    name: "Admin",
    email: "admin@mail.com",
    phone: "+123456789",
    role: "admin",
  };

  const admin = await prisma.user.create({
    data: adminSeederData,
  });

  console.log("admin created", admin);
};

const UserSeeder = {
  adminSeed,
};

export default UserSeeder;
