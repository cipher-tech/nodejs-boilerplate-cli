import config from "../config";

// run source .env before running "npx sequelize-cli db:migrate" to set environment variables.

module.exports = {
    development: {
        username: config.USERNAME,
        password: config.PASSWORD,
        database: config.DATABASE,
        host: config.HOST,
        dialect: config.DIALECT,
        dialectOptions: {
            bigNumberStrings: true
        }
    },
    test: {
        username: config.USERNAME,
        password: config.PASSWORD,
        database: config.DATABASE,
        host: config.HOST,
        dialect: config.DIALECT,
        dialectOptions: {
            bigNumberStrings: true
        }
    },
    production: {
        username: config.USERNAME,
        password: config.PASSWORD,
        database: config.DATABASE,
        host: config.HOST,
        dialect: config.DIALECT,
        dialectOptions: {
            bigNumberStrings: true
        }
    }
};
