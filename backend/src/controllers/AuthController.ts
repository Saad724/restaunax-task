import { Request, Response, NextFunction } from "express";
import Utils from "../utils/utils";
import AuthService from "../services/AuthService";
import { RegisterInput, LoginInput } from "../services/AuthService";

const register = async (req: Request, _res: Response, _next: NextFunction) => {
  try {
    const body = req.body as RegisterInput;
    const result = await AuthService.register(body);
    return Utils.sendResponse(
      true,
      result,
      201,
      "User registered successfully!",
    );
  } catch (error: unknown) {
    const message =
      error instanceof Error ? error.message : "Registration failed";
    return Utils.sendResponse(false, null, 409, message);
  }
};

const login = async (req: Request, _res: Response, _next: NextFunction) => {
  try {
    const body = req.body as LoginInput;
    const result = await AuthService.login(body);
    return Utils.sendResponse(true, result, 200, "Login successful!");
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Login failed";
    return Utils.sendResponse(false, null, 401, message);
  }
};

const AuthController = {
  register,
  login,
};

export default AuthController;
