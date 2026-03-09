import { Order, CreateOrderRequest, OrderStatus } from "../../../shared/types";
import { prisma } from "../lib/prisma";

const VALID_STATUSES: OrderStatus[] = ["pending", "preparing", "ready", "delivered"];

const getAllOrders = async (status?: string | undefined): Promise<Order[]> => {
  const where = status && VALID_STATUSES.includes(status as OrderStatus)
    ? { status: status as OrderStatus }
    : undefined;

  const allOrders: Order[] = await prisma.order.findMany({
    where,
    include: {
      items: true,
    },
  });
  return allOrders;
};

const getOrderById = async (id: string): Promise<Order | null> => {
  const order = await prisma.order.findUnique({
    where: { id },
    include: { items: true },
  });
  return order as Order | null;
};

const createOrder = async (data: CreateOrderRequest): Promise<Order> => {
  const total = data.items.reduce(
    (sum, item) => sum + item.quantity * item.price,
    0
  );

  const order = await prisma.order.create({
    data: {
      userId: data.userId,
      orderType: data.orderType,
      total,
      items: {
        create: data.items.map((item) => ({
          name: item.name,
          quantity: item.quantity,
          price: item.price,
        })),
      },
    },
    include: { items: true },
  });

  return order as Order;
};

const updateOrderStatus = async (
  id: string,
  status: OrderStatus
): Promise<Order | null> => {
  const order = await prisma.order.updateMany({
    where: { id },
    data: { status },
  });

  if (order.count === 0) {
    return null;
  }

  return getOrderById(id);
};

const OrderService = {
  getAllOrders,
  getOrderById,
  createOrder,
  updateOrderStatus,
};

export default OrderService;
