import { MigrationInterface, QueryRunner } from "typeorm";

export class Migrations1731597762714 implements MigrationInterface {
    name = 'Migrations1731597762714'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "deal" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "name" varchar NOT NULL, "description" varchar NOT NULL, "score" integer NOT NULL, "isExhausted" boolean NOT NULL, "createdAt" datetime NOT NULL DEFAULT (datetime('now')))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "deal"`);
    }

}
