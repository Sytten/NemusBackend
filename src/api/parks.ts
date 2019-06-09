import { getManager } from "typeorm";
import { Park } from "../entity/park";
import { Request, Response } from "express";
import { getCurrentTrips } from "./helpers";

export const getParks = async (req: Request, res: Response) => {
  const parksRepository = getManager().getRepository(Park);

  res.send(await parksRepository.find());
};

export const getPark = async (req: Request, res: Response) => {
  const parksRepository = getManager().getRepository(Park);
  res.send(await parksRepository.findOne({where: {
    id: req.params.parkId,
  }}));
};

export const setDangerLevel = async (req: Request, res: Response) => {
  const parksRepository = getManager().getRepository(Park);

  const park = await parksRepository.findOne({where: {
    id: req.params.parkId,
  }});

  park.dangerLevel = req.body["dangerLevel"];

  parksRepository.save(park);

  res.sendStatus(200);
};

export const getPeople = async (req: Request, res: Response) => {
  const trips = await getCurrentTrips(req.params.parkId);

  res.send({ total: trips.map(t => t.numberPeople).reduce((a, b) => a + b, 0) });
};
