import Sequelize from "sequelize";
import config from "../config/index";
import User from "./models/user";

const sequelize = new Sequelize(config.DATABASE, config.USERNAME, config.PASSWORD, {
    host: config.HOST,
    dialect: "postgres",
    operatorsAliases: false,

    pool: {
        max: 5,
        min: 0,
        acquire: 3000,
        idle: 0
    }
});

console.log({
    db: config.DATABASE,
    us: config.USERNAME,
    pass: config.PASSWORD
});
const database = {};

database.Sequelize = Sequelize;
database.sequelize = sequelize;

database.User = User(sequelize, Sequelize);
// database.tutorials = require("./tutorial.model.js")(sequelize, Sequelize);

export default database;
