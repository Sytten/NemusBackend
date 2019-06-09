import { getManager } from "typeorm";
import { User } from "../entity/user";
import { Request, Response } from "express";

export const getUserByEmail = async (req: Request, res: Response) => {
  const usersRepository = getManager().getRepository(User);

  res.send(await usersRepository.findOne({ where: {
    email: req.query.email },
  }));
};

export const getUser = async (req: Request, res: Response) => {
  const usersRepository = getManager().getRepository(User);

  res.send(await usersRepository.findOne({ where: {
    id: req.params.userId },
  }));
};

export const createUser = async (req: Request, res: Response) => {
  const usersRepository = getManager().getRepository(User);

  const user = new User();
  user.firstName = req.body["firstName"];
  user.lastName = req.body["lastName"];
  user.email = req.body["email"];

  await usersRepository.save(user);

  res.sendStatus(201);
};
