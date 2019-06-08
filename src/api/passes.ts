import { getManager, Repository } from "typeorm";
import { Pass } from "../entity/pass";
import { Request, Response } from "express";

export const getPasses = async (req: Request, res: Response) => {
  const passesRepository = getManager().getRepository(Pass);

  res.send(await passesRepository.find({ where: {
    parkId: req.params.parkId },
  }));
};
