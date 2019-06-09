import { MigrationInterface, QueryRunner } from "typeorm";

export class AddImages1560037562342 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<any> {
    // tslint:disable-next-line: max-line-length
    await queryRunner.query(`ALTER TABLE "park" ADD "imageTag" character varying NOT NULL DEFAULT ''`);
  }

  public async down(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query(`ALTER TABLE "park" DROP COLUMN "imageTag"`);
  }

}
