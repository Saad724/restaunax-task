import { Order, CreateOrderRequest, OrderStatus } from "../../../shared/types";
import { prisma } from "../lib/prisma";

const REWARD_POINTS_PER_ORDER = 10;

const getAllOrders = async (
  status?: OrderStatus | undefined,
): Promise<Order[]> => {
  const allOrders: Order[] = await prisma.order.findMany({
    where: status ? { status } : {},
    orderBy: { createdAt: "desc" },
    include: {
      items: true,
      user: true,
    },
  });
  return allOrders;
};

const getOrderById = async (
  id: string,
  userId: string,
): Promise<Order | null> => {
  const order = await prisma.order.findUnique({
    where: { id, userId },
    include: { items: true, user: true },
  });
  return order as Order | null;
};

const createOrder = async (data: CreateOrderRequest): Promise<Order> => {
  if (!data?.userId) {
    throw new Error("User not found!");
  }

  const total = data.items.reduce(
    (sum, item) => sum + item.quantity * item.price,
    0,
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
    include: { items: true, user: true },
  });

  return order as Order;
};

const updateOrderStatus = async (
  id: string,
  status: OrderStatus,
): Promise<Order | null> => {
  const orderDeliveredCheck = await prisma.order.findFirst({
    where: { id, status: "delivered" },
  });

  if (orderDeliveredCheck) {
    throw new Error("Order is already delivered!");
  }

  const order = await prisma.order.update({
    where: { id },
    data: { status },
  });

  if (status === "delivered") {
    await prisma.user.update({
      where: { id: order.userId },
      data: {
        rewardPoints: {
          increment: REWARD_POINTS_PER_ORDER,
        },
      },
    });
  }

  return getOrderById(id, order.userId);
};

const OrderService = {
  getAllOrders,
  getOrderById,
  createOrder,
  updateOrderStatus,
};

export default OrderService;
