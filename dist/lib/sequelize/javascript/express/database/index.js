"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = __importDefault(require("sequelize"));
const index_1 = __importDefault(require("../config/index"));
const models_1 = __importDefault(require("./models"));
const { DATABASE, USERNAME, PASSWORD, HOST, DATABASE_PORT, DIALECT } = index_1.default;
const sequelize = new sequelize_1.default(DATABASE, USERNAME, PASSWORD, {
    host: HOST,
    dialect: DIALECT,
    port: DATABASE_PORT,
    operatorsAliases: false,
    pool: {
        max: 5,
        min: 0,
        acquire: 3000,
        idle: 0
    }
});
const database = (DatabaseConfig, sequelizeInstance) => {
    const model = {};
    model.Sequelize = sequelize_1.default;
    model.sequelize = sequelize;
    const modelInstances = (0, models_1.default)(DatabaseConfig, sequelizeInstance);
    Object.assign(model, Object.assign({}, modelInstances));
    return model;
};
exports.default = database(sequelize, sequelize_1.default);
