import { MigrationInterface, QueryRunner } from "typeorm";

export class InitialMigration1731476361640 implements MigrationInterface {
    name = 'InitialMigration1731476361640'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "deal" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "name" varchar NOT NULL, "description" varchar NOT NULL, "bettingHouse" varchar NOT NULL, "affiliate" varchar NOT NULL, "revenueSharePercentage" double NOT NULL, "value" double NOT NULL, "type" varchar NOT NULL, "status" varchar NOT NULL, "currency" varchar NOT NULL, "paymentCycle" varchar NOT NULL, "createdAt" datetime NOT NULL DEFAULT (datetime('now')), "updated" datetime NOT NULL DEFAULT (datetime('now')))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "deal"`);
    }

}
