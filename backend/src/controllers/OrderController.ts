import OrderService from "../services/OrderServices";
import Utils from "../utils/utils";
import { Request, Response, NextFunction } from "express";
import { CreateOrderRequest, UpdateOrderStatusRequest, OrderStatus } from "../../../shared/types";

const VALID_STATUSES: OrderStatus[] = ["pending", "preparing", "ready", "delivered"];

const getAllOrders = async (req: Request, _res: Response, _next: NextFunction) => {
  try {
    const { status } = req.query as { status: string };
    const orders = await OrderService.getAllOrders(status);
    return Utils.sendResponse(true, orders, 200, "Orders fetched successfully!");
  } catch (error: unknown) {
    throw new Error(error instanceof Error ? error.message : "Failed to fetch orders");
  }
};

const getOrderById = async (req: Request, _res: Response, _next: NextFunction) => {
  try {
    const { id } = req.params;
    const order = await OrderService.getOrderById(id);
    if (order === null) {
      return Utils.sendResponse(false, null, 404, "Order not found");
    }
    return Utils.sendResponse(true, order, 200, "Order fetched successfully!");
  } catch (error: unknown) {
    throw new Error(error instanceof Error ? error.message : "Failed to fetch order");
  }
};

const createOrder = async (req: Request, _res: Response, _next: NextFunction) => {
  try {
    const body = req.body as CreateOrderRequest;
    const order = await OrderService.createOrder(body);
    return Utils.sendResponse(true, order, 201, "Order created successfully!");
  } catch (error: unknown) {
    throw new Error(error instanceof Error ? error.message : "Failed to create order");
  }
};

const updateOrderStatus = async (req: Request, _res: Response, _next: NextFunction) => {
  try {
    const { id } = req.params;
    const { status } = req.body as UpdateOrderStatusRequest;
    if (!status || !VALID_STATUSES.includes(status)) {
      return Utils.sendResponse(false, null, 400, "Invalid or missing status");
    }
    const order = await OrderService.updateOrderStatus(id, status);
    if (order === null) {
      return Utils.sendResponse(false, null, 404, "Order not found");
    }
    return Utils.sendResponse(true, order, 200, "Order status updated successfully!");
  } catch (error: unknown) {
    throw new Error(error instanceof Error ? error.message : "Failed to update order status");
  }
};

const OrderController = {
  getAllOrders,
  getOrderById,
  createOrder,
  updateOrderStatus,
};

export default OrderController;