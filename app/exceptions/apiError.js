import ErrorObject from "./errorObject";

/**
 * Applications Error handler class
 * contains error responses
 *
 * @returns {object} ApiError class
 */
class ApiError {
    constructor() {
        this.message = "Internal Server Error";
        this.status = 500;
        this.type = "Internal Server Error";
        this.url = "";
    }

    /**
   * Method to return bad request status(400) response to the client
   * @param {string} message the message to return to the client on error
   * @returns {object} Error object
   */
    badRequest(message, url = "") {
        this.url = url;
        this.message = message;
        this.type = "Bad Request";
        this.status = 400;
        const error = new ErrorObject({
            status: this.status,
            message: this.message,
            type: this.type,
            url: this.url
        });
        throw error;
    }
}

export default new ApiError();
