import { MigrationInterface, QueryRunner } from "typeorm";

// tslint:disable: max-line-length
export class AddParkInfo1560049838831 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query(`ALTER TABLE "park" ADD "rating" integer NOT NULL default 5`);
    await queryRunner.query(`ALTER TABLE "park" ADD "address" character varying NOT NULL default ''`);
    await queryRunner.query(`ALTER TABLE "park" ADD "website" character varying NOT NULL default ''`);
    await queryRunner.query(`ALTER TABLE "park" ADD "number" character varying NOT NULL default ''`);
  }

  public async down(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query(`ALTER TABLE "park" DROP COLUMN "number" default ''`);
    await queryRunner.query(`ALTER TABLE "park" DROP COLUMN "website" default ''`);
    await queryRunner.query(`ALTER TABLE "park" DROP COLUMN "address" default ''`);
    await queryRunner.query(`ALTER TABLE "park" DROP COLUMN "rating" default ''`);
  }

}
