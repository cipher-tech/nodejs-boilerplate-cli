"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const express_1 = __importDefault(require("express"));
const file_stream_rotator_1 = __importDefault(require("file-stream-rotator"));
const morgan_1 = __importDefault(require("morgan"));
const express_fileupload_1 = __importDefault(require("express-fileupload"));
const cors_1 = __importDefault(require("cors"));
const logger_1 = __importDefault(require("./logger"));
const routes_1 = __importDefault(require("../routes"));
const _1 = __importDefault(require("."));
const utils_1 = require("../app/utils");
const database_1 = __importDefault(require("../database"));
const apiError_1 = __importDefault(require("../app/exceptions/apiError"));
/**
 * Class contains Express configurations
 *
 * @returns Express config
 */
class ExpressConfig {
    constructor() {
        // instantiates the logger
        this.logger = null;
        // Generate a correlationId from RandomNumberHelper class for grouping logs
        this.correlationId = new utils_1.RandomNumberHelper();
        // Make correlationId a global variable
        global.correlationId = this.correlationId.getConsistentRandomNumber;
        // Sets our log directory and creates the directory if it doesn't exist.
        this.logDirectory = "./log";
        this.checkLogDir = fs_1.default.existsSync(this.logDirectory) || fs_1.default.mkdirSync(this.logDirectory);
        this.router = new routes_1.default();
        this.ApiError = new apiError_1.default();
    }
    /**
     * Method to configure application logger
     * @param {object} app - express app
     */
    configureLogger(app) {
        let accessLogStream;
        // initialize logger for the right environment
        if (app.get("env") === "development") {
            this.logger = (0, logger_1.default)("development");
        }
        else if (app.get("env") === "test") {
            this.logger = (0, logger_1.default)("test");
        }
        else if (app.get("env") === "staging") {
            this.logger = (0, logger_1.default)("staging");
        }
        else if (app.get("env") === "production") {
            this.logger = (0, logger_1.default)("production");
        }
        else {
            this.logger = (0, logger_1.default)();
        }
        // makes logger a global variable so you don't have to import it in your file to use it.
        global.logger = this.logger;
        logger.info("Application starting...");
        logger.debug("Overriding Express logger");
        // checks if the log directory exists and starts streaming logs to the file
        if (this.checkLogDir) {
            accessLogStream = file_stream_rotator_1.default.getStream({
                date_format: "YYYYMMDD",
                filename: `${this.logDirectory}/log-%DATE%.log`,
                frequency: "weekly",
                verbose: false
            });
        }
        app.use((0, morgan_1.default)("combined", { stream: accessLogStream }));
    }
    /**
     * Method to configure application middleware
     * @param {object} app - express app
     */
    configureRoutes(app) {
        // enable cors
        app.use((0, cors_1.default)());
        app.options("*", (0, cors_1.default)());
        // parse json request
        app.use(express_1.default.json());
        // parse urlencoded request
        app.use(express_1.default.urlencoded({ extended: true }));
        // configures our default routes path
        app.use(`/api/${_1.default.API_VERSION}`, this.router.run());
        // Handles exceptions thrown in the application
        app.use(this.ApiError.appError);
        // handle all error instances and returns an errors response
        // eslint-disable-next-line no-unused-vars
        app.use(this.ApiError.genericError);
    }
    configureDatabase() {
        return database_1.default.sequelize.sync();
    }
    /**
     * Main Method that bootstraps and calls all the configuration methods
     * @param {object} app - express app
     */
    run(app) {
        this.configureDatabase();
        // calls the method to configure our logger
        this.configureLogger(app);
        // calls the method to configure our routes
        this.configureRoutes(app);
        // configure route for file upload
        app.use((0, express_fileupload_1.default)({
            limits: { fileSize: 10 * 1024 * 1024 } // 10 MB
        }));
    }
}
// creates a singleton pattern so only one instance of the class exists
exports.default = new ExpressConfig();
