// import { readdirSync } from "fs";
// import { basename as _basename, join } from "path";
// import Sequelize, { DataTypes } from "sequelize";
// import config from "../database";

// const basename = _basename(__filename);
// const env = process.env.NODE_ENV || "development";
// const db = {};

// let sequelize;
//   sequelize = new Sequelize(config.database, config.username, config.password, config);
// console.log("::config::::::::::", config);
// readdirSync(__dirname)
//   .filter(file => {
//     return (file.indexOf(".") !== 0) && (file !== basename) && (file.slice(-3) === ".js");
//   })
//   .forEach(file => {
//     console.log(":::::FINE", file);
//     const model = require(join(__dirname, file))(sequelize, DataTypes);
//     db[model.name] = model;
//   });

// Object.keys(db).forEach(modelName => {
//   if (db[modelName].associate) {
//     db[modelName].associate(db);
//   }
// });

// db.sequelize = sequelize;
// db.Sequelize = Sequelize;

// export default db;

import Sequelize from "sequelize";
import config from "../../config/index";
import User from "./user";

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

const database = {};

database.Sequelize = Sequelize;
database.sequelize = sequelize;

database.User = User(sequelize, Sequelize);
// database.tutorials = require("./tutorial.model.js")(sequelize, Sequelize);

export default database;
