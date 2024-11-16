"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Migrations1731597762714 = void 0;
class Migrations1731597762714 {
    constructor() {
        this.name = 'Migrations1731597762714';
    }
    async up(queryRunner) {
        await queryRunner.query(`CREATE TABLE "deal" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "name" varchar NOT NULL, "description" varchar NOT NULL, "score" integer NOT NULL, "isExhausted" boolean NOT NULL, "createdAt" datetime NOT NULL DEFAULT (datetime('now')))`);
    }
    async down(queryRunner) {
        await queryRunner.query(`DROP TABLE "deal"`);
    }
}
exports.Migrations1731597762714 = Migrations1731597762714;
//# sourceMappingURL=1731597762714-migrations.js.map