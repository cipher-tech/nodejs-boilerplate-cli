import config from "../../config";
import ApiError from "../exceptions/apiError";

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
        this.apiError = new ApiError();
    }

    /**
     * Method to Handles success responses to ensure consistency
     * @param {object} options - {message, data}
     *
     * @returns {object} - success response
     */
    success(options) {
        if (!options || Object.entries(options).length === 0) {
            logger.error("options object required in app/utils/responseHandler.js");
            return new Error("Error: Arguments to the success response handler cannot be empty");
        }
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
}

export default Response;
