import { readdirSync } from "fs";

const makeModels = (sequelize, Sequelize) => {
    const basename = "index.js";
    const models = {};

    const sequelizeModels = readdirSync(__dirname)
        .filter((file) => (file.indexOf(".") !== 0) && (file !== basename) && (file.slice(-3) === ".js"));
    for (let i = 0; i < sequelizeModels.length; i++) {
        let modelName = sequelizeModels[i].slice(0, -3);
        let modelFullName = sequelizeModels[i];

        let { default: module } = require(`./${modelName}`) || require(`./${modelFullName}`) ;
        if(!module){
            module  = require(`./${modelName}`) || require(`./${modelFullName}`) ;
        }
        if(!module){
            return
        }
        const instance = module;

        modelName = modelName[0].toUpperCase() + modelName.substring(1);
        models[modelName] = instance(sequelize, Sequelize);
    }
    return models;
};

export default makeModels;
