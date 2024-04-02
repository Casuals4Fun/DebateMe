class ErrorHandler extends Error {
    constructor(statusCode, success, message) {
        super(message);
        this.statusCode = statusCode;
        this.success = success;
        Error.captureStackTrace(this, this.constructor);
    }
}

module.exports = ErrorHandler;