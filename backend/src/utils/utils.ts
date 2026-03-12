import { Request, Response, NextFunction } from "express";
import { isCelebrateError } from "celebrate";

type SendResponse<T> = {
  success: boolean;
  data: T | null;
  statusCode: number;
  message: string;
};

const sendResponse = <T>(
  success: boolean,
  data: T | null,
  statusCode: number,
  message: string,
): SendResponse<T> => {
  return {
    success,
    data,
    statusCode,
    message,
  };
};

const errorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  if (isCelebrateError(err)) {
    for (const [, value] of err.details) {
      return res.status(400).json({
        success: false,
        message: value.message.replace(/"/g, ""),
      });
    }
  }

  return res.status(err.statusCode || 500).json({
    success: false,
    message: err.message || "Internal server error",
  });
};

const Utils = {
  sendResponse,
  errorHandler,
};

export default Utils;
