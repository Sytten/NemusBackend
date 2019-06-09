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
}
