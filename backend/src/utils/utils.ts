import { Request, Response, NextFunction, RequestHandler } from "express";

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

const wrapAsync = (
  func: (
    req: Request,
    res: Response,
    next: NextFunction,
  ) => void | Promise<any>,
): RequestHandler => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      await func(req, res, next);
    } catch (error) {
      next(error);
    }
  };
};

const Utils = {
  sendResponse,
  wrapAsync,
};

export default Utils;
