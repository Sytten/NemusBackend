import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from "typeorm";
import { Pass } from "./pass";
import { User } from "./user";

@Entity()
export class Trip {

  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(type => User)
  user: User;

  @ManyToOne(type => Pass)
  pass: Pass;

  @Column()
  startDate: Date;

  @Column()
  endDate: Date;

  @Column()
  numberPeople: number;

  @Column({nullable: true})
  licensePlate?: string | null;
}
