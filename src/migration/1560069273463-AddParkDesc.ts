import { MigrationInterface, QueryRunner } from "typeorm";

// tslint:disable: max-line-length
export class AddParkDesc1560069273463 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query(`ALTER TABLE "park" ADD "description" character varying NOT NULL DEFAULT ''`);
  }

  public async down(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query(`ALTER TABLE "park" DROP COLUMN "description"`);
  }

}
