import { Router, Request, Response, NextFunction } from "express";
import { authMiddleware } from "../middleware/auth-middleware";
import UserController from "../controllers/UserController";
import { AuthRequest } from "../types/types";

const router = Router();

router.get(
  "/orders",
  authMiddleware,
  async (req: Request, res: Response, next: NextFunction) => {
    const { statusCode, ...rest } = await UserController.getUserOrders(
      req as AuthRequest,
      res,
      next,
    );
    res.status(statusCode).json(rest);
  },
);

export default router;

