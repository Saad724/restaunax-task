import { itemsMockData } from "../data/mockMenu";
import { prisma } from "../lib/prisma";

const menuSeeder = async () => {
  const menuCheck = await prisma.menu.findMany();
  if (!!menuCheck.length) {
    return;
  }
  const menu = await prisma.menu.createMany({
    data: itemsMockData,
  });

  if (menu.count === 0) {
    throw new Error("Error creating menu");
  }

  console.log("Menu created");
};

const MenuSeeder = {
  menuSeeder,
};

export default MenuSeeder;
