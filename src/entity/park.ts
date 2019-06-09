import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Park {

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ type: "float" })
  latitude: number;

  @Column({ type: "float" })
  longitude: number;

  @Column()
  imageTag: string;

  @Column()
  dangerLevel: string;

  @Column()
  rating: number;

  @Column()
  address: string;

  @Column()
  website: string;

  @Column()
  number: string;
}
