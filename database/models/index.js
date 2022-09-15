import { readdirSync } from "fs";
// import { basename as _basename, join } from "path";
// import Sequelize, { DataTypes } from "sequelize";
// import config from "../database";
const makeModels = (sequelize, Sequelize) => {
    const basename = "index.js";
    // const env = process.env.NODE_ENV || "development";
    const models = {};

    const sequelizeModels = readdirSync(__dirname)
        .filter((file) => (file.indexOf(".") !== 0) && (file !== basename) && (file.slice(-3) === ".js"));
    for (let i = 0; i < sequelizeModels.length; i++) {
        let modelName = sequelizeModels[i].slice(0, -3);
        // eslint-disable-next-line security/detect-non-literal-require, import/no-dynamic-require
        const { default: module } = require(`./${modelName}`);
        const instance = module;

        modelName = modelName[0].toUpperCase() + modelName.substring(1);
        models[modelName] = instance(sequelize, Sequelize);
    }
    return models;
};
// Object.keys(models).forEach(modelName => {
//     if (models[modelName].associate) {
//         models[modelName].associate(models);
//     }
// })

export default makeModels;
