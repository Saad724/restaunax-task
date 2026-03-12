import { Router, Request, Response, NextFunction } from "express";
import { celebrate } from "celebrate";
import AuthController from "../controllers/AuthController";
import { registerBodySchema, loginBodySchema } from "../validations/AuthValidationSchema";

const router = Router();

router.post(
  "/register",
  celebrate(registerBodySchema),
  async (req: Request, res: Response, next: NextFunction) => {
    const { statusCode, ...rest } = await AuthController.register(req, res, next);
    res.status(statusCode).json(rest);
  }
);

router.post(
  "/login",
  celebrate(loginBodySchema),
  async (req: Request, res: Response, next: NextFunction) => {
    const { statusCode, ...rest } = await AuthController.login(req, res, next);
    res.status(statusCode).json(rest);
  }
);

export default router;
