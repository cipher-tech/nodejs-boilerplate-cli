"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = __importDefault(require("path"));
const development_1 = __importDefault(require("./env/development"));
const testEnv_1 = __importDefault(require("./env/testEnv"));
const staging_1 = __importDefault(require("./env/staging"));
const production_1 = __importDefault(require("./env/production"));
const defaults = {
    root: path_1.default.normalize(`${__dirname}/..`),
    serviceName: "Node Boilerplate API"
};
const config = {
    development: Object.assign(development_1.default, defaults),
    test: Object.assign(testEnv_1.default, defaults),
    staging: Object.assign(staging_1.default, defaults),
    production: Object.assign(production_1.default, defaults)
}[process.env.NODE_ENV || "development"];
exports.default = config;
