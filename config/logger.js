import winston, { format } from "winston";
import Papertrail from "winston-papertrail"; // https://github.com/guzru/winston-sentry#readme

import constants from ".";

const { DOMAIN = "" } = constants;
const { combine, timestamp, label, printf, splat, simple } = format;

const logger = (env) => {
    let ret;
    const loggerFormat = printf(({ level, message, label, timestamp }) => (
        `${new Date(timestamp).toGMTString()} [${label}] [${level}] id-${correlationId}: ${message}`
    ));
    switch (env) {
        case "development":
            if (DOMAIN.includes("localhost")) {
                ret = winston.createLogger({
                    format: combine(
                        splat(),
                        simple(),
                        timestamp(),
                        label({ label: env }),
                        loggerFormat
                    ),
                    transports: [
                        new winston.transports.Console({
                            level: "debug",
                            handleExceptions: true,
                            json: false,
                            colorize: true
                        }),
                        new winston.transports.File({
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
            } else {
                ret = winston.createLogger({
                    format: combine(
                        splat(),
                        simple(),
                        timestamp(),
                        label({ label: env }),
                        loggerFormat
                    ),
                    transports: [
                        new winston.transports.Console({
                            level: "debug",
                            handleExceptions: true,
                            json: false,
                            colorize: true
                        }),
                        new winston.transports.File({
                            level: "info",
                            filename: "./server.log",
                            handleExceptions: true,
                            json: false,
                            maxsize: 5242880,
                            maxFiles: 5,
                            colorize: false
                        }),
                        new winston.transports.Papertrail({
                            host: `${constants.PAPERTRAIL_URL}`.split("\r")[0],
                            port: constants.PAPERTRAIL_PORT
                        })
                    ],
                    exitOnError: false
                });
            }
            break;
        case "test":
            ret = winston.createLogger({
                format: combine(
                    splat(),
                    simple(),
                    timestamp(),
                    label({ label: env }),
                    loggerFormat
                ),
                transports: [
                    new winston.transports.File({
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
            ret = winston.createLogger({
                format: combine(
                    splat(),
                    simple(),
                    timestamp(),
                    label({ label: env }),
                    loggerFormat
                ),
                transports: [
                    new winston.transports.File({
                        level: "info",
                        filename: "./server.log",
                        handleExceptions: true,
                        json: false,
                        maxsize: 5242880,
                        maxFiles: 50,
                        colorize: false
                    }),
                    new winston.transports.Papertrail({
                        host: `${constants.PAPERTRAIL_URL}`.split("\r")[0],
                        port: constants.PAPERTRAIL_PORT,
                        app_name: `${constants.NODE_ENV}-api`
                    })
                ],
                exitOnError: false
            });
            break;
        case "production":
            ret = winston.createLogger({
                format: combine(
                    splat(),
                    simple(),
                    timestamp(),
                    label({ label: env }),
                    loggerFormat
                ),
                transports: [
                    new winston.transports.Console({
                        level: "error",
                        handleExceptions: true,
                        json: false,
                        colorize: true
                    }),
                    new winston.transports.File({
                        level: "info",
                        filename: "./server.log",
                        handleExceptions: true,
                        json: false,
                        maxsize: 5242880,
                        maxFiles: 100,
                        colorize: true
                    }),
                    new winston.transports.Papertrail({
                        host: `${constants.PAPERTRAIL_URL}`.split("\r")[0],
                        port: constants.PAPERTRAIL_PORT,
                        app_name: `${constants.NODE_ENV}-api`
                    })
                ],
                exitOnError: false
            });
            break;
        default:
            ret = winston.createLogger({
                format: combine(
                    splat(),
                    simple(),
                    timestamp(),
                    label({ label: env }),
                    loggerFormat
                ),
                transports: [
                    new winston.transports.Console({
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

export default logger;
