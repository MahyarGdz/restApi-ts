import http from "http";
import "reflect-metadata";
import dotenv from "dotenv";
dotenv.config();
import ExpressApp from "./app";
import { logger } from "./core/logger";
import { AppDataSrc } from "./core/dataSource";
import bookRouter from "./book/book.router";
import appErrHandler from "./core/app.errHandler";



const app = new ExpressApp([bookRouter], appErrHandler).getApp();
const server = http.createServer(app);
const port = process.env.PORT;

async function bootStrap(): Promise<void> {
  try {
    await AppDataSrc.initialize();
    logger.info("The database has been initialized.");
    server.listen(port, () => {
      logger.info(`server is starting on http://localhost:${port}`);
    });
  } catch (error) {
    logger.error(error);
    process.exit(1);
  }
}

bootStrap().catch((e) => logger.error(e));
