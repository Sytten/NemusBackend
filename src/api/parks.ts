import { getManager, Repository } from "typeorm";
import { Park } from "../entity/park";
import { Request, Response } from "express";

export const getParks = async (req: Request, res: Response) => {
  const parksRepository = getManager().getRepository(Park);

  res.send(await parksRepository.find());
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
