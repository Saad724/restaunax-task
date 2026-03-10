import OrderService from "../services/OrderServices";
import Utils from "../utils/utils";
import { Request, Response, NextFunction } from "express";
import {
  CreateOrderRequest,
  UpdateOrderStatusRequest,
  OrderStatus,
} from "../../../shared/types";
import { AuthRequest } from "../types/types";

const getAllOrders = async (
  req: Request,
  _res: Response,
  _next: NextFunction,
) => {
  try {
    const { status } = req.query as { status: OrderStatus };
    const orders = await OrderService.getAllOrders(status);
    return Utils.sendResponse(
      true,
      orders,
      200,
      "Orders fetched successfully!",
    );
  } catch (error: unknown) {
    const message =
      error instanceof Error ? error.message : "Failed to fetch orders";
    return Utils.sendResponse(false, null, 500, message);
  }
};

const getOrderById = async (
  req: Request,
  _res: Response,
  _next: NextFunction,
) => {
  try {
    const { id } = req.params;
    const order = await OrderService.getOrderById(id);
    if (order === null) {
      return Utils.sendResponse(false, null, 404, "Order not found");
    }
    return Utils.sendResponse(true, order, 200, "Order fetched successfully!");
  } catch (error: unknown) {
    const message =
      error instanceof Error ? error.message : "Failed to fetch order";
    return Utils.sendResponse(false, null, 500, message);
  }
};

const createOrder = async (
  req: AuthRequest,
  _res: Response,
  _next: NextFunction,
) => {
  try {
    const body = req.body as CreateOrderRequest;
    const user = req.user;
    if (!user) {
      throw new Error("User not found!");
    }

    const order = await OrderService.createOrder({ ...body, userId: user?.id });
    return Utils.sendResponse(true, order, 201, "Order created successfully!");
  } catch (error: unknown) {
    const message =
      error instanceof Error ? error.message : "Failed to create order";
    return Utils.sendResponse(false, null, 500, message);
  }
};

const updateOrderStatus = async (
  req: Request,
  _res: Response,
  _next: NextFunction,
) => {
  try {
    const { id } = req.params;
    const { status } = req.body as UpdateOrderStatusRequest;
    const order = await OrderService.updateOrderStatus(id, status);
    if (order === null) {
      return Utils.sendResponse(false, null, 404, "Order not found");
    }
    return Utils.sendResponse(
      true,
      order,
      200,
      "Order status updated successfully!",
    );
  } catch (error: unknown) {
    const message =
      error instanceof Error ? error.message : "Failed to update order status";
    return Utils.sendResponse(false, null, 500, message);
  }
};

const OrderController = {
  getAllOrders,
  getOrderById,
  createOrder,
  updateOrderStatus,
};

export default OrderController;
