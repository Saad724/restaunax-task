import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { prisma } from "../lib/prisma";

const JWT_SECRET = process.env.JWT_SECRET ?? "default-secret-change-in-production";

interface JwtPayload {
  sub: string;
}

export const authMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const authHeader = req.headers.authorization;
  const token = authHeader?.startsWith("Bearer ")
  ? authHeader.slice(7)
  : null;

  if (!token) {
    res.status(401).json({
      success: false,
      data: null,
      statusCode: 401,
      message: "Invalid or expired token",
    });
    return;
  }

  let decoded: JwtPayload;
  try {
    decoded = jwt.verify(token, JWT_SECRET) as JwtPayload;
  } catch {
    res.status(401).json({
      success: false,
      data: null,
      statusCode: 401,
      message: "Invalid or expired token",
    });
    return;
  }

  const userId = decoded.sub;
  let userError: Error | null = null;
  let user = null;

  try {
    user = await prisma.user.findUnique({
      where: { id: userId },
    });
  } catch (err) {
    userError = err instanceof Error ? err : new Error("User lookup failed");
  }

  if (userError || !user) {
    res.status(401).json({
      success: false,
      data: null,
      statusCode: 401,
      message: "Invalid or expired token",
    });
    return;
  }

  (req as Request & { user: typeof user }).user = user;
  next();
};
