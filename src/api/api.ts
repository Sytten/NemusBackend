import { Router } from "express";

import authenticationMiddleware from "../middlewares/authentification";
import * as statusController from "./status";
import * as parksController from "./parks";
import * as passesController from "./passes";
import * as tripsController from "./trips";

export class Api {
  public getRouter(): Router {
    const router: Router = Router();
    router.get("/status", statusController.getStatus);
    router.get("/parks", parksController.getParks);
    router.get("/parks/:parkId/passes", passesController.getPasses);

    router.get("/users/:userId/trips", tripsController.getTrips);
    router.post("/users/:userId/trips", tripsController.createTrip);

    // Authenticated paths
    router.use(authenticationMiddleware);
    return router;
  }
}
