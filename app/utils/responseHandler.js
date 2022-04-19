import config from "../../config";
import ApiError from "../exceptions/errorObject";

class Response {
    constructor(req, res) {
        this.domain = config.DOMAIN;
        this.environment = config.ENVIRONMENT;
        this.request = req;
        this.response = res;
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
        const currentUrl = `${this.domain}${this.request.originalUrl}`;

        if (!(error instanceof ApiError)) {
            const status = error.status ? 400 : 500;
            const message = error.status === 400 ? "Bad Request" : "Internal Server Error";
            const type = error.status === 400 ? "Bad Request" : "Internal Server Error";

            error = new ApiError(status, message, type, currentUrl, err.stack);
        }
        next(error);
    }
}

export default Response;
