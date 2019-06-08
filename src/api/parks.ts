import { getManager, Repository } from "typeorm";
import { Park } from "../entity/park";
import { Request, Response } from "express";

export const getParks = async (req: Request, res: Response) => {
  const parksRepository = getManager().getRepository(Park);

  res.send(await parksRepository.find());
};
