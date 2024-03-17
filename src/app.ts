import express, { Application, Router } from "express";
import cors from "cors";
import morgan from "morgan";
import compress from "compression";

class ExpressApp {
  private readonly app: Application;

  constructor(private routers: Router[], private errorHandler: CallableFunction) {
    this.app = express();
    this.setupPlugins();
    this.setupRouters();
  }

  private setupPlugins() {
    this.app.disable("x-powered-by");
    this.app.use(compress());
    this.app.use(cors({ origin: true }));
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(morgan("dev"));
  }

  private setupRouters() {
    this.routers.forEach((router) => {
      this.app.use(router);
    });
    this.setupErrorHandler();
  }

  private setupErrorHandler() {
    this.errorHandler(this.app);
  }

  public getApp(): Application {
    return this.app;
  }
}

export default ExpressApp;
