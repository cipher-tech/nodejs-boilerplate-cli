"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function (o, m, k, k2) {
    if (k2 === undefined)
        k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
        desc = { enumerable: true, get: function () { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function (o, m, k, k2) {
    if (k2 === undefined)
        k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function (o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function (o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule)
        return mod;
    var result = {};
    if (mod != null)
        for (var k in mod)
            if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k))
                __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const winston_1 = __importStar(require("winston"));
const _1 = __importDefault(require("."));
const { DOMAIN = "" } = _1.default;
const { combine, timestamp, label, printf, splat, simple } = winston_1.format;
const logger = (env) => {
    let ret;
    const loggerFormat = printf(({ level, message, label, timestamp }) => (`${new Date(timestamp).toGMTString()} [${label}] [${level}] id-${correlationId}: ${message}`));
    switch (env) {
        case "development":
            if (DOMAIN.includes("localhost")) {
                ret = winston_1.default.createLogger({
                    format: combine(splat(), simple(), timestamp(), label({ label: env }), loggerFormat),
                    transports: [
                        new winston_1.default.transports.Console({
                            level: "debug",
                            handleExceptions: true,
                            json: false,
                            colorize: true
                        }),
                        new winston_1.default.transports.File({
                            level: "info",
                            filename: "./server.log",
                            handleExceptions: true,
                            json: false,
                            maxsize: 5242880,
                            maxFiles: 5,
                            colorize: false
                        })
                    ],
                    exitOnError: false
                });
            }
            else {
                ret = winston_1.default.createLogger({
                    format: combine(splat(), simple(), timestamp(), label({ label: env }), loggerFormat),
                    transports: [
                        new winston_1.default.transports.Console({
                            level: "debug",
                            handleExceptions: true,
                            json: false,
                            colorize: true
                        }),
                        new winston_1.default.transports.File({
                            level: "info",
                            filename: "./server.log",
                            handleExceptions: true,
                            json: false,
                            maxsize: 5242880,
                            maxFiles: 5,
                            colorize: false
                        }),
                        new winston_1.default.transports.Papertrail({
                            host: `${_1.default.PAPERTRAIL_URL}`.split("\r")[0],
                            port: _1.default.PAPERTRAIL_PORT
                        })
                    ],
                    exitOnError: false
                });
            }
            break;
        case "test":
            ret = winston_1.default.createLogger({
                format: combine(splat(), simple(), timestamp(), label({ label: env }), loggerFormat),
                transports: [
                    new winston_1.default.transports.File({
                        level: "info",
                        filename: "./test.log",
                        handleExceptions: true,
                        json: false,
                        maxsize: 5242880,
                        maxFiles: 50,
                        colorize: false
                    })
                ],
                exitOnError: false
            });
            break;
        case "staging":
            ret = winston_1.default.createLogger({
                format: combine(splat(), simple(), timestamp(), label({ label: env }), loggerFormat),
                transports: [
                    new winston_1.default.transports.File({
                        level: "info",
                        filename: "./server.log",
                        handleExceptions: true,
                        json: false,
                        maxsize: 5242880,
                        maxFiles: 50,
                        colorize: false
                    }),
                    new winston_1.default.transports.Papertrail({
                        host: `${_1.default.PAPERTRAIL_URL}`.split("\r")[0],
                        port: _1.default.PAPERTRAIL_PORT,
                        app_name: `${_1.default.NODE_ENV}-api`
                    })
                ],
                exitOnError: false
            });
            break;
        case "production":
            ret = winston_1.default.createLogger({
                format: combine(splat(), simple(), timestamp(), label({ label: env }), loggerFormat),
                transports: [
                    new winston_1.default.transports.Console({
                        level: "error",
                        handleExceptions: true,
                        json: false,
                        colorize: true
                    }),
                    new winston_1.default.transports.File({
                        level: "info",
                        filename: "./server.log",
                        handleExceptions: true,
                        json: false,
                        maxsize: 5242880,
                        maxFiles: 100,
                        colorize: true
                    }),
                    new winston_1.default.transports.Papertrail({
                        host: `${_1.default.PAPERTRAIL_URL}`.split("\r")[0],
                        port: _1.default.PAPERTRAIL_PORT,
                        app_name: `${_1.default.NODE_ENV}-api`
                    })
                ],
                exitOnError: false
            });
            break;
        default:
            ret = winston_1.default.createLogger({
                format: combine(splat(), simple(), timestamp(), label({ label: env }), loggerFormat),
                transports: [
                    new winston_1.default.transports.Console({
                        level: "debug",
                        handleExceptions: true,
                        json: false,
                        colorize: true
                    })
                ],
                exitOnError: false
            });
    }
    ret.stream = {
        write: (message) => {
            logger.info(message);
        }
    };
    return ret;
};
exports.default = logger;
