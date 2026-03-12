import { Router, Request, Response, NextFunction } from "express";
import { authMiddleware } from "../middleware/auth-middleware";
import AdminController from "../controllers/AdminController";
import { AuthRequest } from "../types/types";

const router = Router();

/**
 * GET /api/admin/dashboard
 * Admin dashboard stats (counts + chart data)
 */
router.get(
  "/dashboard",
  authMiddleware,
  async (req: Request, res: Response, next: NextFunction) => {
    const { statusCode, ...rest } = await AdminController.getDashboard(
      req as AuthRequest,
      res,
      next,
    );
    res.status(statusCode).json(rest);
  },
);

export default router;

