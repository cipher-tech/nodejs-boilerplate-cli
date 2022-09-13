import Sequelize from "sequelize";
import config from "../config/index";
import models from "./models";
import User from "./models/user";

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

// console.log(":::::::::::::models models models ::::::", models);
const database = {};

database.Sequelize = Sequelize;
database.sequelize = sequelize;

database.User = User(sequelize, Sequelize);
// database.tutorials = require("./tutorial.model.js")(sequelize, Sequelize);

export default database;
