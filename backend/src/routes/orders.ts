import { Router, Request, Response, NextFunction } from "express";
import { celebrate } from "celebrate";
import OrderController from "../controllers/OrderController";
import {
  listOrdersQuerySchema,
  getOrderByIdParamsSchema,
  createOrderBodySchema,
  updateOrderStatusSchema,
} from "../validations/OrderValidationSchema";
import { authMiddleware } from "../middleware/auth-middleware";
import { AuthRequest } from "../types/types";

const router = Router();

/**
 * GET /api/orders
 * List all orders, optionally filtered by status
 * Query params: ?status=pending (optional)
 */
router.get(
  "/",
  authMiddleware,
  celebrate(listOrdersQuerySchema),
  async (_req: Request, res: Response, next: NextFunction) => {
    const { statusCode, ...allOrders } = await OrderController.getAllOrders(_req, res, next);
    res.status(statusCode).json(allOrders);
  }
);

/**
 * GET /api/orders/:id
 * Get a specific order by ID
 */
router.get(
  "/:id",
  celebrate(getOrderByIdParamsSchema),
  async (req: Request, res: Response, next: NextFunction) => {
    const { statusCode, ...rest } = await OrderController.getOrderById(req, res, next);
    res.status(statusCode).json(rest);
  }
);

/**
 * POST /api/orders
 * Create a new order
 */
router.post(
  "/",
  authMiddleware,
  celebrate(createOrderBodySchema),
  async (req: AuthRequest, res: Response, next: NextFunction) => {
    const { statusCode, ...rest } = await OrderController.createOrder(req, res, next);
    res.status(statusCode).json(rest);
  }
);

/**
 * PATCH /api/orders/:id
 * Update an order's status
 */
router.patch(
  "/:id",
  celebrate(updateOrderStatusSchema),
  async (req: Request, res: Response, next: NextFunction) => {
    const { statusCode, ...rest } = await OrderController.updateOrderStatus(req, res, next);
    res.status(statusCode).json(rest);
  }
);

export default router;
