import winston, { format } from "winston";
import Papertrail from "winston-papertrail"; // https://github.com/guzru/winston-sentry#readme

import constants from ".";

const { DOMAIN = "" } = constants;

const logger = (env) => {
    let ret;

    switch (env) {
        case "development":
            if (DOMAIN.includes("localhost")) {
                ret = winston.createLogger({
                    format: format.combine(
                        format.splat(),
                        format.simple()
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
                    format: format.combine(
                        format.splat(),
                        format.simple()
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
                            host: `${process.env.PAPERTRAIL_URL}`.split("\r")[0],
                            port: process.env.PAPERTRAIL_PORT
                        })
                    ],
                    exitOnError: false
                });
            }
            break;
        case "test":
            ret = winston.createLogger({
                format: format.combine(
                    format.splat(),
                    format.simple()
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
        default:
            ret = winston.createLogger({
                format: format.combine(
                    format.splat(),
                    format.simple()
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
        write: (message, encoding) => {
            logger.info(message);
        }
    };

    return ret;
};

export default logger;
