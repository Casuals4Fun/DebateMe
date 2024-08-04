class ErrorHandler extends Error {
    constructor(statusCode, success, message) {
        super(message)
        this.statusCode = statusCode
        this.success = success
        Error.captureStackTrace(this, this.constructor)
    }
}

function catchError(reply, err) {
    if (err instanceof ErrorHandler) {
        return reply.code(err.statusCode).send({
            success: err.success,
            message: err.message
        })
    } else {
        return reply.code(500).send({
            success: false,
            message: 'Internal Server Error'
        })
    }
}

module.exports = { ErrorHandler, catchError }