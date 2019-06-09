import { getManager, Repository } from "typeorm";
import { Trip } from "../entity/trip";
import { Request, Response } from "express";

export const getTrips = async (req: Request, res: Response) => {
  const tripsRepository = getManager().getRepository(Trip);

  const trips = await tripsRepository.find({ where: {
    userId: req.params.userId },
    relations: ["pass", "pass.park"],
  });

  res.send(trips);
};

export const createTrip = async (req: Request, res: Response) => {
  const tripsRepository = getManager().getRepository(Trip);

  const trip = new Trip();
  trip.endDate = new Date(req.body["endDate"]);
  trip.startDate = new Date(req.body["startDate"]);
  trip.pass = req.body["passId"];
  trip.user = req.params.userId;
  trip.numberPeople = req.body["numberPeople"];

  if (!!req.body["licensePlate"]) {
    trip.licensePlate = req.body["licensePlate"];
  }

  await tripsRepository.save(trip);

  res.sendStatus(201);
};
