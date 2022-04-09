import path from "path";

import development from "./env/development";
import test from "./env/test";
import staging from "./env/staging";
import production from "./env/production";

const defaults = {
    root: path.normalize(`${__dirname}/..`),
    serviceName: "Node Boilerplate API"
};

const config = {
    development: Object.assign(development, defaults),
    test: Object.assign(test, defaults),
    staging: Object.assign(staging, defaults),
    production: Object.assign(production, defaults)
}[process.env.NODE_ENV || "development"];

export default config;
