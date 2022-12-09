"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.framework = exports.languages = exports.drivers = exports.boilerplateURL = void 0;
exports.boilerplateURL = 'https://github.com/enyata/enyata-node-base.git';
// map drivers to file name
exports.drivers = {
    Sequelize: "sequelize",
    Mongoose: "mongoose",
};
// map languages to file name
exports.languages = {
    JavaScript: "javascript",
    TypeScript: "typescript",
};
exports.framework = {
    Express: "express",
    Koa: "Koa",
};
