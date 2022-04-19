class ErrorObject extends Error {
    constructor(status, message, type = "", url = "", stack = null) {
        super(message);
        this.message = message;
        this.status = status;
        this.url = url;
        this.type = type;
        if (stack) {
            this.stack = stack;
        } else {
            this.stack = Error.captureStackTrace(this, this.constructor);
        }
    }
}

export default ErrorObject;
