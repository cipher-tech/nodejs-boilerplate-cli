import {
    StatusCodes,
    getReasonPhrase
} from "http-status-codes";
import { ValidationError } from "joi";

/**
 * @description Applications Error object class
 * Used to format and return error messages
 *
 * @returns  {object} ApiError class
 */
class ApiError extends Error {
    constructor(code, message) {
        super(message);
        // const stack = Error.captureStackTrace(this, this.constructor);
        this.code = code;
    }

    /**
     * Method to handle intentionally thrown exceptions.
     * @param {object} err express error object
     * @param {object} req express request object
     * @param {object} res express response object
     * @param {function} next express middleware next object
     */
    appError(err, req, res, next) {
        let { code } = err;
        if (code && typeof code === "number") {
            logger.error(`
            status - ${code}
            message - ${err.message} 
            url - ${req.originalUrl} 
            method - ${req.method} 
            IP - ${req.ip}
            Error Stack - ${err.stack}
          `);

            res.status(err.status || 500)
                .json({
                    message: err.message,
                    status: code,
                    url: req.originalUrl,
                    type: getReasonPhrase(code || 500)
                });
            // check if error is from JOI validator package
        } else if (err instanceof ValidationError) {
            const { details } = err;
            const status = 400;
            code = 400;
            const { message } = details[0];
            logger.error(`
                status - ${status}
                message - ${message} 
                url - ${req.originalUrl} 
                method - ${req.method} 
                IP - ${req.ip}
                Error Stack - ${err.stack}
          `);

            res.status(err.status || 500)
                .json({
                    message,
                    status: code,
                    url: req.originalUrl,
                    type: getReasonPhrase(code || 500)
                });
        } else {
            next(err);
        }
    }

    /**
     * Generic error response handler of internal and unhandled exceptions.
     *
     * @param  {Object}   err
     * @param  {Object}   req
     * @param  {Object}   res
     * @param  {Function} next
     */
    genericError(err, req, res, next) {
        const message = "An error occurred, we are looking into it.";
        const status = StatusCodes.INTERNAL_SERVER_ERROR;
        const url = req.originalUrl;

        logger.error(`
        status - ${status}
        message - ${message} 
        url - ${url} 
        method - ${req.method} 
        IP - ${req.ip}
        Error Stack - ${err.stack}
      `);

        res.status(err.status || 500)
            .json({
                message,
                status,
                url,
                type: getReasonPhrase(StatusCodes.INTERNAL_SERVER_ERROR)
            });
    }
}

export default ApiError;
