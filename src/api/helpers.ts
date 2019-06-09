import { getManager, Between, In } from "typeorm";
import { Pass } from "../entity/pass";
import { Trip } from "../entity/trip";
import { addYears, subYears } from "date-fns";

const afterDate = (date: Date) => Between(date, addYears(date, 100));
const beforeDate = (date: Date) => Between(subYears(date, 100), date);

export const getCurrentTrips = async (parkId) => {
  const tripsRepository = getManager().getRepository(Trip);
  const passesRepository = getManager().getRepository(Pass);

  const passes = await passesRepository.find({where: {
    parkId,
  }});

  return await tripsRepository.find({ where: {
    parkId: In(passes),
    startDate: beforeDate(new Date()),
    endDate: afterDate(new Date()),
  }});
};
