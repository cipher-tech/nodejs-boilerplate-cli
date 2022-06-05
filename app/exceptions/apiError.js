import {
    StatusCodes,
    getReasonPhrase
} from "http-status-codes";
/**
 * @description Applications Error object class
 * Used to format all error messages
 *
 * @returns  {object} ApiError class
 */
class ApiError extends Error {
    constructor(...options) {
        const argumentLength = options.length;

        if ((argumentLength === 1) && (typeof options === "object")) {
            const { status, message, type = "", stack = null } = options[0];
            super(message);
            this.message = message;
            this.status = status || StatusCodes.INTERNAL_SERVER_ERROR;
            this.type = type || getReasonPhrase(500);
            if (stack) {
                this.stack = stack;
            } else {
                this.stack = Error.captureStackTrace(this, this.constructor);
            }
        } else if ((argumentLength > 1) && (typeof options[0] === "number") && (typeof options[1] === "string")) {
            const status = options[0] || StatusCodes.INTERNAL_SERVER_ERROR;
            const message = options[1] || getReasonPhrase(StatusCodes.INTERNAL_SERVER_ERROR);
            const originalError = options[2];

            super(message);
            this.message = message;
            this.status = status;
            this.type = getReasonPhrase(this.status);
            if (originalError) {
                this.stack = options[2].stack;
            } else {
                this.stack = Error.captureStackTrace(this, this.constructor);
            }
        } else {
            super(getReasonPhrase(StatusCodes.INTERNAL_SERVER_ERROR));
            this.message = getReasonPhrase(StatusCodes.INTERNAL_SERVER_ERROR);
            this.status = StatusCodes.INTERNAL_SERVER_ERROR;
            this.type = getReasonPhrase(StatusCodes.INTERNAL_SERVER_ERROR);
            this.stack = Error.captureStackTrace(this, this.constructor);
        }
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
