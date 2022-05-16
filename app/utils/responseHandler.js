import { ValidationError } from "joi";
import config from "../../config";
import ApiError from "../exceptions/apiError";
import ErrorHandler from "../exceptions/errorObject";

/**
 * Applications response handler class
 * Handles both success and error responses using well defined methods
 * @param {object} req express request object
 * @param {object} res express response object
 *
 * @returns {object} response
 */
class Response {
    constructor(req, res) {
        this.domain = config.DOMAIN;
        this.environment = config.ENVIRONMENT;
        this.request = req;
        this.response = res;
        this.apiError = ApiError;
        this.currentUrl = `${this.domain}${this.request.originalUrl}`;
    }

    /**
     * Method to Handles success responses to ensure consistency
     * @param {object} options - {message, data}
     *
     * @returns {object} - success response
     */
    success(options) {
        if (Object.entries(options).length === 0) { return new Error("Error: Object (data) is required!"); }
        const { message, data } = options;
        const currentUrl = `${this.domain}${this.request.originalUrl}`;
        const status = "success";

        const response = {
            currentUrl,
            message,
            data,
            status
        };

        return this.response.status(200).json(response);
    }

    /**
     * Method for formatting error responses to ensure consistency
     * @param {object} err error object
     * @param {object} req express request object
     * @param {object} res express response object
     * @param {function} next express function to pass on to the next middleware
     *
     * @returns {function} next()
     */
    errorFormatter(err, req, res, next) {
        let error = err;
        if (!(error instanceof ErrorHandler)) {
            let status = error.status ? 400 : 500;
            let message = error.status === 400 ? "Bad Request" : "Internal Server Error";
            let type = error.status === 400 ? "Bad Request" : "Internal Server Error";

            // check if error is from Joi validation package and set properties accordingly
            if (error instanceof ValidationError) {
                const { details } = error;
                status = 400;
                message = details[0].message;
                type = "Validation error";
            }
            error = new ErrorHandler({
                status,
                message,
                type,
                url: this.currentUrl,
                stack: error.stack
            });
        }
        next(error);
    }

    /**
    * Custom Method to return bad request status(400) response to the client
    * @param {string} message the message to return to the client on error
    */
    badRequest(message) {
        this.apiError.badRequest(message, this.currentUrl);
    }
}

export default Response;
