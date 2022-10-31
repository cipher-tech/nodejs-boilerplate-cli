"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = __importDefault(require("../../config"));
const apiError_1 = __importDefault(require("../exceptions/apiError"));
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
        this.domain = config_1.default.DOMAIN;
        this.environment = config_1.default.ENVIRONMENT;
        this.request = req;
        this.response = res;
        this.apiError = new apiError_1.default();
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
exports.default = Response;
