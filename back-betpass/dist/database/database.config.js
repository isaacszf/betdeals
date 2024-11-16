"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.dbConfig = void 0;
const typeorm_1 = require("typeorm");
exports.dbConfig = {
    type: 'sqlite',
    database: 'db.sqlite',
    entities: ['dist/../**/*.entity.js'],
    migrations: ['dist/database/migrations/*.js'],
};
const dataSource = new typeorm_1.DataSource(exports.dbConfig);
exports.default = dataSource;
//# sourceMappingURL=database.config.js.map