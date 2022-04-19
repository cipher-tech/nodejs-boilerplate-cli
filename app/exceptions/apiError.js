import ErrorObject from "./errorObject";

class ApiError {
    constructor() {
        this.message = "Internal Server Error";
        this.status = 500;
        this.type = "Internal Server Error";
        this.url = "";
    }

    badRequest(message, url) {
        this.url = url;
        this.message = message;
        this.type = "Bad Request";
        this.status = 400;
        const error = new ErrorObject(this.status, this.message, this.type, this.url);
        throw error;
    }
}

export default new ApiError();
