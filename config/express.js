import fs from "fs";
import express from "express";
import FileStreamRotator from "file-stream-rotator";
import morgan from "morgan";
import fileUpload from "express-fileupload";
import cors from "cors";

import loggerInit from "./logger";
import Response from "../app/utils/responseHandler";
import Router from "../routes";
import config from ".";

/**
 * Class contains Express configurations
 *
 * @returns Express config
 */
class ExpressConfig {
    constructor() {
        // instantiates the logger
        this.logger = null;

        // Sets our log directory and creates the directory if it doesn't exist.
        this.logDirectory = "./log";
        this.checkLogDir = fs.existsSync(this.logDirectory) || fs.mkdirSync(this.logDirectory);

        this.router = new Router();
    }

    /**
     * Method to configure application logger
     * @param {object} app - express app
     */
    configureLogger(app) {
        let accessLogStream;

        // initialize logger for the right environment
        if (app.get("env") === "development") {
            this.logger = loggerInit("development");
        } else if (app.get("env") === "test") {
            this.logger = loggerInit("test");
        } else if (app.get("env") === "staging") {
            this.logger = loggerInit("staging");
        } else if (app.get("env") === "production") {
            this.logger = loggerInit("production");
        } else {
            this.logger = loggerInit();
        }

        // makes logger a global variable so you don't have to import it in your file to use it.
        global.logger = this.logger;
        logger.info("Application starting...");
        logger.debug("Overriding Express logger");

        // checks if the log directory exists and starts streaming logs to the file
        if (this.checkLogDir) {
            accessLogStream = FileStreamRotator.getStream({
                date_format: "YYYYMMDD",
                filename: `${this.logDirectory}/log-%DATE%.log`,
                frequency: "weekly",
                verbose: false
            });
        }
        app.use(morgan("combined", { stream: accessLogStream }));
    }

    /**
     * Method to configure application middleware
     * @param {object} app - express app
     */
    configureRoutes(app) {
        // enable cors
        app.use(cors());
        app.options("*", cors());

        // parse json request
        app.use(express.json());

        // parse urlencoded request
        app.use(express.urlencoded({ extended: true }));

        // configures our default routes path
        app.use(`/api/${config.API_VERSION}`, this.router.run());

        // format Unhandled errors
        app.use((err, req, res, next) => {
            const response = new Response(req, res);

            // Calls the error formatter to format the errors that were not handled by the app.
            response.errorFormatter(err, req, res, next);
        });

        // handle all error instances and returns an errors response
        app.use((err, req, res, next) => {
            this.logger.error("An error occurred");
            this.logger.error(err.stack);
            res.status(err.status || 500)
                .json({
                    message: err.message,
                    status: err.status,
                    url: err.url,
                    type: err.type
                });
        });
    }

    /**
     * Main Method that bootstraps and calls all the configuration methods
     * @param {object} app - express app
     */
    run(app) {
        // calls the method to configure our logger
        this.configureLogger(app);

        // calls the method to configure our routes
        this.configureRoutes(app);

        // configure route for file upload
        app.use(fileUpload({
            limits: { fileSize: 10 * 1024 * 1024 } // 10 MB
        }));
    }
}

// creates a singleton pattern so only one instance of the class exists
export default new ExpressConfig();
