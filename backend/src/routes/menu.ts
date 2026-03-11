import { Router, Request, Response, NextFunction } from "express";
import { authMiddleware } from "../middleware/auth-middleware";
import MenuController from "../controllers/MenuController";

const router = Router();

router.get(
  "/",
  authMiddleware,
  async (req: Request, res: Response, next: NextFunction) => {
    const { statusCode, ...rest } = await MenuController.getMenu(req, res, next);
    res.status(statusCode).json(rest);
  },
);

export default router;

