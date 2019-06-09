import { getManager, Between } from "typeorm";
import { Trip } from "../entity/trip";
import { Phone } from "../entity/phone";
import { Request, Response } from "express";
import { addYears, subYears } from "date-fns";
import * as rq from "request-promise";

const afterDate = (date: Date) => Between(date, addYears(date, 100));
const beforeDate = (date: Date) => Between(subYears(date, 100), date);

export const registerPhone = async (req: Request, res: Response) => {
  const phonesRepository = getManager().getRepository(Phone);

  const phone = new Phone();
  phone.token = req.body["token"];
  phone.user = req.params.userId;

  await phonesRepository.save(phone);

  res.sendStatus(200);
};

export const sendNotification = async (req: Request, res: Response) => {
  const tripsRepository = getManager().getRepository(Trip);
  const phonesRepository = getManager().getRepository(Phone);

  const trips = await tripsRepository.find({ where: {
    parkId: req.params.parkId,
    startDate: beforeDate(new Date()),
    endDate: afterDate(new Date()),
  }});

  for (const trip of trips) {
    const phones =  await phonesRepository.find({ where: {
      userId: trip.user.id,
    }});

    for (const phone of phones) {
      const options = {
        method: "POST",
        uri: "https://exp.host/--/api/v2/push/send",
        body: {
          to: `ExponentPushToken[${phone.token}]`,
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
