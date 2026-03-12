import { Response, NextFunction } from "express";
import Utils from "../utils/utils";
import UserService from "../services/UserService";
import { AuthRequest } from "../types/types";

const getUserOrders = async (
  req: AuthRequest,
  _res: Response,
  _next: NextFunction,
) => {
  try {
    const user = req.user;
    if (!user) {
      return Utils.sendResponse(false, null, 401, "Unauthorized");
    }

    const orders = await UserService.getUserOrders(user.id);
    return Utils.sendResponse(true, orders, 200, "User orders fetched successfully!");
  } catch (error: unknown) {
    console.error("Failed to fetch user orders", error);
    const message =
      error instanceof Error ? error.message : "Failed to fetch user orders";
    return Utils.sendResponse(false, null, 500, message);
  }
};

const UserController = {
  getUserOrders,
};

export default UserController;

