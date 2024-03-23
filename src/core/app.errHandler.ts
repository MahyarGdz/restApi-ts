import { Request, Response, NextFunction, Application } from "express";
import { ApplicationError, NotFoundError } from "./errors";
import { logger } from "./logger";

export default function (app: Application): void {
  app.use(() => {
    throw new NotFoundError(
      "The endpoint you try to reach is not exist!" + "\n"
    );
  });

  app.use(
    (
      err: ApplicationError,
      req: Request,
      res: Response,
      next: NextFunction
    ) => {
      if (err instanceof ApplicationError) {
        logger.error(
          `${req.method} ${req.path} == ${err.message} ==> ${err.stack}`
        );
        return res
          .status(err.code)
          .send({ status: "error", message: err.message });
      } else {
        next(err);
      }
    }
  );

  app.use((err: Error, _req: Request, res: Response, _next: NextFunction) => {
    logger.error(`last error catcher ==>${err.message}`);
    res.statusCode = 500;
    return res.end(
      JSON.stringify({
        status: "error",
        message: "somthing went wrong please try again later",
      })
    );
  });
}
