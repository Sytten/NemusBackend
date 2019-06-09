import { MigrationInterface, QueryRunner } from "typeorm";

// tslint:disable: max-line-length
export class AddLots1560047054383 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query(`CREATE TABLE "phone" ("id" SERIAL NOT NULL, "token" character varying NOT NULL, "userId" integer, CONSTRAINT "PK_f35e6ee6c1232ce6462505c2b25" PRIMARY KEY ("id"))`);
    await queryRunner.query(`ALTER TABLE "park" ADD "dangerLevel" character varying NOT NULL default 'GREEN'`);
    await queryRunner.query(`ALTER TABLE "pass" ADD "fee" integer NOT NULL default 0`);
    await queryRunner.query(`ALTER TABLE "user" ADD "email" character varying NOT NULL default ''`);
    await queryRunner.query(`ALTER TABLE "trip" ADD "licensePlate" character varying`);
    await queryRunner.query(`ALTER TABLE "phone" ADD CONSTRAINT "FK_260d7031e6bd9ed4fbcd2dd3ad6" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
  }

  public async down(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query(`ALTER TABLE "phone" DROP CONSTRAINT "FK_260d7031e6bd9ed4fbcd2dd3ad6"`);
    await queryRunner.query(`ALTER TABLE "trip" DROP COLUMN "licensePlate"`);
    await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "email"`);
    await queryRunner.query(`ALTER TABLE "pass" DROP COLUMN "fee"`);
    await queryRunner.query(`ALTER TABLE "park" DROP COLUMN "dangerLevel"`);
    await queryRunner.query(`DROP TABLE "phone"`);
  }
}
