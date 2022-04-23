import config from "../../config";
import ApiError from "../exceptions/apiError";
import ErrorHandler from "../exceptions/errorObject";

class Response {
    constructor(req, res) {
        this.domain = config.DOMAIN;
        this.environment = config.ENVIRONMENT;
        this.request = req;
        this.response = res;
        this.apiError = ApiError;
        this.currentUrl = `${this.domain}${this.request.originalUrl}`;
    }

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

    errorFormatter(err, req, res, next) {
        let error = err;

        if (!(error instanceof ErrorHandler)) {
            const status = error.status ? 400 : 500;
            const message = error.status === 400 ? "Bad Request" : "Internal Server Error";
            const type = error.status === 400 ? "Bad Request" : "Internal Server Error";

            error = new ErrorHandler({
                status,
                message,
                type,
                currentUrl: this.currentUrl,
                stack: error.stack
            });
        }
        next(error);
    }

    badRequest(message) {
        this.apiError.badRequest(message, this.currentUrl);
    }
}

export default Response;
