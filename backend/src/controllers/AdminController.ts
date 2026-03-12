import { Response, NextFunction } from "express";
import Utils from "../utils/utils";
import AdminService from "../services/AdminService";
import { AuthRequest } from "../types/types";

const getDashboard = async (
  req: AuthRequest,
  _res: Response,
  _next: NextFunction,
) => {
  try {
    const user = req.user;
    if (!user) {
      return Utils.sendResponse(false, null, 401, "Unauthorized");
    }

    if (user.role !== "admin") {
      return Utils.sendResponse(false, null, 403, "Forbidden");
    }

    const stats = await AdminService.getDashboardStats();
    return Utils.sendResponse(true, stats, 200, "Dashboard fetched successfully!");
  } catch (error: unknown) {
    console.error("Failed to fetch dashboard stats", error);
    const message =
      error instanceof Error ? error.message : "Failed to fetch dashboard";
    return Utils.sendResponse(false, null, 500, message);
  }
};

const AdminController = {
  getDashboard,
};

export default AdminController;

