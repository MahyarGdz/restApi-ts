import { Request, Response, NextFunction } from "express";

export const asyncWrapper =
  (controller: CallableFunction) =>
  (req: Request, res: Response, next: NextFunction) => {
    Promise.resolve(controller(req, res, next)).catch(next);
  };
