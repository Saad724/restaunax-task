import { Order } from "../../../shared/types";
import { prisma } from "../lib/prisma";

const getAllOrders = async (status?: string | undefined) => {
  const allOrders: Order[] = await prisma.order.findMany({
    include: {
      items: true,
    },
  });
  return allOrders;
};

const OrderService = {
  getAllOrders,
};

export default OrderService;
