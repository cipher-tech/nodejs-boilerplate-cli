"use strict";
// const process.env = require("../process.env");
// run source .env before running "npx sequelize-cli db:migrate" to set environment variables.
module.exports = {
    development: {
        username: process.env.USERNAME,
        password: process.env.PASSWORD,
        database: process.env.DATABASE,
        host: process.env.HOST,
        dialect: "postgres",
        dialectOptions: {
            bigNumberStrings: true
        }
    },
    test: {
        username: process.env.USERNAME,
        password: process.env.PASSWORD,
        database: process.env.DATABASE,
        host: process.env.HOST,
        dialect: "postgres",
        dialectOptions: {
            bigNumberStrings: true
        }
    },
    production: {
        username: process.env.USERNAME,
        password: process.env.PASSWORD,
        database: process.env.DATABASE,
        host: process.env.HOST,
        dialect: "postgres",
        dialectOptions: {
            bigNumberStrings: true
        }
    }
};
