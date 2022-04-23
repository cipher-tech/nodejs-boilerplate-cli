class ErrorObject extends Error {
    constructor(options) {
        const { status, message, type = "", url = "", stack = null } = options;
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
