import Sequelize from "sequelize";
import config from "../config/index";
import makeModels from "./models";

const { DATABASE,
    USERNAME,
    PASSWORD,
    HOST,
    DATABASE_PORT,
    DIALECT } = config;

const sequelize = new Sequelize(DATABASE, USERNAME, PASSWORD, {
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

    model.Sequelize = Sequelize;
    model.sequelize = sequelize;

    const modelInstances = makeModels(DatabaseConfig, sequelizeInstance);
    Object.assign(model, { ...modelInstances });
    return model;
};

export default database(sequelize, Sequelize);
