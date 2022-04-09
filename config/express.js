import fs from "fs";
import FileStreamRotator from "file-stream-rotator";
import morgan from "morgan";
import fileUpload from "express-fileupload";

import loggerInit from "./logger";

class ExpressConfig {
    constructor() {
        this.logDirectory = "./log";
        this.checkLogDir = fs.existsSync(this.logDirectory) || fs.mkdirSync(this.logDirectory);
    }

    configureLogger(app) {
        let accessLogStream;
        let logger;

        // initialize logger with the right for the right environment
        if (app.get("env") === "development") {
            logger = loggerInit("development");
        } else if (app.get("env") === "test") {
            logger = loggerInit("test");
        } else if (app.get("env") === "staging") {
            logger = loggerInit("staging");
        } else if (app.get("env") === "production") {
            logger = loggerInit("production");
        } else {
            logger = loggerInit();
        }

        // makes logger a global variable so you don't have to import it in your file to use it.
        global.logger = logger;
        logger.info("Application starting...");
        logger.debug("Overriding Express logger");

        if (this.checkLogDir) {
            accessLogStream = FileStreamRotator.getStream({
                date_format: "YYYYMMDD",
                filename: `${this.logDirectory}/kafene-%DATE%.log`,
                frequency: "weekly",
                verbose: false
            });
        }

        app.use(morgan("combined", { stream: accessLogStream }));
    }

    run(app) {
        this.configureLogger(app);

        app.use(fileUpload({
            limits: { fileSize: 10 * 1024 * 1024 } // 10 MB
        }));
    }
}

// creates a singleton pattern so only one instance of the class exists
export default new ExpressConfig();
