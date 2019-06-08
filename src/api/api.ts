import { Router } from "express";

import authenticationMiddleware from "../middlewares/authentification";
import * as statusController from "./status";

export class Api {
  public getRouter(): Router {
    const router: Router = Router();
    router.get("/status", statusController.getStatus);

    // Authenticated paths
    router.use(authenticationMiddleware);
    return router;
  }
}
