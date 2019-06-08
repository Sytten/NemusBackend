import { Router } from "express";

import authenticationMiddleware from "../middlewares/authentification";
import * as statusController from "./status";
import * as parksController from "./parks";
import * as passesController from "./passes";

export class Api {
  public getRouter(): Router {
    const router: Router = Router();
    router.get("/status", statusController.getStatus);
    router.get("/parks", parksController.getParks);
    router.get("/parks/:parkId/passes", passesController.getPasses);

    // Authenticated paths
    router.use(authenticationMiddleware);
    return router;
  }
}
