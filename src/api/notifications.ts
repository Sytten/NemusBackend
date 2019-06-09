import { getManager } from "typeorm";
import { Phone } from "../entity/phone";
import { Request, Response } from "express";
import * as rq from "request-promise";
import { getCurrentTrips } from "./helpers";

export const registerPhone = async (req: Request, res: Response) => {
  const phonesRepository = getManager().getRepository(Phone);

  let phone = await phonesRepository.findOne({where: {
    token: req.body["token"],
  }});

  if (phone !== undefined) {
    res.sendStatus(200);;
    return;
  }

  phone = new Phone();
  phone.token = req.body["token"];
  phone.user = req.params.userId;

  await phonesRepository.save(phone);

  res.sendStatus(200);
};

export const sendNotification = async (req: Request, res: Response) => {
  const phonesRepository = getManager().getRepository(Phone);

  const trips = await getCurrentTrips(req.params.parkId);

  for (const trip of trips) {
    const phones =  await phonesRepository.find({ where: {
      userId: trip.user,
    }});

    for (const phone of phones) {
      const options = {
        method: "POST",
        uri: "https://exp.host/--/api/v2/push/send",
        body: {
          to: phone.token,
          title: "Alert for your current trip!",
          body: `The fire alert changed to ${req.body.status}`,
        },
        headers: {
          host: "exp.host",
          accept: "application/json",
          "accept-encoding": "gzip, deflate",
          "content-type": "application/json",
        },
        json: true,
      };

      rq(options);
    }
  }

  res.sendStatus(200);
};
