import { prisma } from "../lib/prisma";

const getMenu = async () => {
  const menuItems = await prisma.menu.findMany({
    orderBy: { createdAt: "desc" },
  });

  return menuItems;
};

const MenuService = {
  getMenu,
};

export default MenuService;

