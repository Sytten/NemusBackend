import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from "typeorm";
import { Park } from "./park";

@Entity()
export class Pass {

  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(type => Park)
  park: Park;

  @Column()
  type: string;

  @Column()
  maxDays: number;

  @Column()
  maxPeople: number;

  @Column()
  fee: number;
}
