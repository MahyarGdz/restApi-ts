import { Request, Response, NextFunction } from "express";
import { ApiError, NotFoundError } from "./app-errors";
import { logger } from "./logger";
import { IErrorResponse } from "../common/interface";
import { ErrorCode } from "../common/enums";

export function notFoundHandler(_req: Request, _res: Response, _next: NextFunction): void {
  const msg = "The endpoint you are trying to reach does not exist!";
  throw new NotFoundError(msg);
}

export function errorHandler(err: Error, req: Request, res: Response, _next: NextFunction) {
  logger.error(`${req.method} ${req.path} - ${err.stack}`);

  logger.error(`Unhandled error: ${err.message}`);
  const errorResponse: IErrorResponse = {
    status: err instanceof ApiError ? err.code : 500,
    success: false,
    error: {
      errorCode: err instanceof ApiError ? err.errorCode : ErrorCode.INTERNAL_SERVER_ERROR,
      message: err instanceof ApiError ? err.message : "Something went wrong. Please try again later.",
      details: err instanceof ApiError ? err.details : [],
    },
  };
  res.status(errorResponse.status).json(errorResponse);
}

export function lastHandler(err: Error, _req: Request, res: Response, _next: NextFunction) {
  logger.error(`Last error catcher: ${err.message}`);
  const errorResponse: IErrorResponse = {
    status: 500,
    success: false,
    error: {
      errorCode: ErrorCode.INTERNAL_SERVER_ERROR,
      message: "Something went wrong. Please try again later.",
      details: [],
    },
  };
  res.status(500).json(errorResponse);
}
