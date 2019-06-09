import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from "typeorm";
import { User } from "./user";

@Entity()
export class Phone {

  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(type => User)
  user: User;

  @Column()
  token: string;
}
