import { Router } from "express";

import authenticationMiddleware from "../middlewares/authentification";
import * as statusController from "./status";
import * as parksController from "./parks";
import * as passesController from "./passes";
import * as tripsController from "./trips";
import * as usersController from "./users";
import * as notificiationsController from "./notifications";

export class Api {
  public getRouter(): Router {
    const router: Router = Router();
    router.get("/status", statusController.getStatus);
    router.get("/parks", parksController.getParks);
    router.get("/parks/:parkId/passes", passesController.getPasses);
    router.post("/parks/:parkId/danger", parksController.setDangerLevel);
    router.post("/parks/:parkId/notify", notificiationsController.sendNotification);

    router.get("/users", usersController.getUserByEmail);
    router.post("/users", usersController.createUser);
    router.get("/users/:userId", usersController.getUser);
    router.get("/users/:userId/trips", tripsController.getTrips);
    router.post("/users/:userId/trips", tripsController.createTrip);
    router.post("/users/:userId/phone", notificiationsController.registerPhone);

    // Authenticated paths
    router.use(authenticationMiddleware);
    return router;
  }
}
