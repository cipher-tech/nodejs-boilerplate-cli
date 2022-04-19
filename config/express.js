import fs from "fs";
import express from "express";
import FileStreamRotator from "file-stream-rotator";
import morgan from "morgan";
import fileUpload from "express-fileupload";
import cors from "cors";

import loggerInit from "./logger";
import Response from "../app/utils/responseHandler";
import ApiError from "../app/exceptions/apiError";

class ExpressConfig {
    constructor() {
        this.logger = null;
        this.logDirectory = "./log";
        this.checkLogDir = fs.existsSync(this.logDirectory) || fs.mkdirSync(this.logDirectory);
    }

    configureLogger(app) {
        let accessLogStream;

        // initialize logger with the right for the right environment
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

    configureRoutes(app) {
        // enable cors
        app.use(cors());
        app.options("*", cors());

        // parse json request
        app.use(express.json());

        // parse urlencoded request
        app.use(express.urlencoded({ extended: true }));

        app.get("/", (req, res) => {
            const response = new Response(req, res);
            response.success({
                message: "OKAY",
                data: []
            });
        });

        // format Unhandled errors
        app.use((err, req, res, next) => {
            const response = new Response(req, res);
            response.errorFormatter(err, req, res, next);
        });

        // handle errors
        app.use((err, req, res, next) => {
            this.logger.error("An error occured: ", err);
            res.status(err.status || 500)
                .json({
                    message: err.message,
                    status: err.status,
                    url: err.url,
                    type: err.type
                });
        });
    }

    run(app) {
        this.configureLogger(app);
        this.configureRoutes(app);
        app.use(fileUpload({
            limits: { fileSize: 10 * 1024 * 1024 } // 10 MB
        }));
    }
}

// creates a singleton pattern so only one instance of the class exists
export default new ExpressConfig();
