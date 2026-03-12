import { prisma } from "../lib/prisma";
import { Order } from "../../../shared/types";

const getUserOrders = async (userId: string): Promise<Order[]> => {
  const orders = await prisma.order.findMany({
    where: { userId },
    orderBy: { createdAt: "desc" },
    include: {
      items: true,
      user: true,
    },
  });

  return orders as Order[];
};

const UserService = {
  getUserOrders,
};

export default UserService;

