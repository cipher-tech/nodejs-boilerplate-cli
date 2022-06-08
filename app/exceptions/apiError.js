import {
    StatusCodes,
    getReasonPhrase
} from "http-status-codes";
import { ValidationError } from "joi";

/**
 * @description Applications Error object class
 * Used to format all error messages
 *
 * @returns  {object} ApiError class
 */
class ApiError extends Error {
    constructor(code, message) {
        console.log("code, message code, message", code, message);
        super(message);
        // const stack = Error.captureStackTrace(this, this.constructor);
        this.code = code;
    }

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
            // throw new Error(err);
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
        const message = getReasonPhrase(StatusCodes.INTERNAL_SERVER_ERROR);
        const status = StatusCodes.INTERNAL_SERVER_ERROR;
        const url = req.originalUrl;

        console.log("::::::::INSTANCE::::::::33e3e3e");
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
                type: message
            });
    }

    badRequest(message, url = "") {
        this.url = url;
        this.message = message;
        this.type = getReasonPhrase(StatusCodes.BAD_REQUEST);
        this.status = StatusCodes.BAD_REQUEST;
        const error = new ApiError({
            status: this.status,
            message: this.message,
            type: this.type,
            url: this.url
        });
        throw error;
    }
}

export default ApiError;
