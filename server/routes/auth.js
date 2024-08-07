const { handleGoogleAuth, register, login, autoLogin, recoverAccount, setPassword } = require('../controllers/auth')
const verifyToken = require('../middleware/verifyToken')

module.exports = async function (fastify, opts) {
    const emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+(com|org|net|gov|mil|biz|info|mobi|name|aero|jobs|museum|in|space)))$/
    const usernameRegex = /^[a-zA-Z0-9]+$/
    const nameRegex = /^[a-zA-Z]+$/

    const registerSchema = {
        consumes: ['multipart/form-data'],
        body: {
            type: 'object',
            properties: {
                email: { type: 'string', minLength: 1, maxLength: 255, pattern: emailRegex.source },
                username: { type: 'string', minLength: 1, maxLength: 15, pattern: usernameRegex.source },
                first_name: { type: 'string', minLength: 1, maxLength: 30, pattern: nameRegex.source },
                last_name: { type: 'string', minLength: 1, maxLength: 30, pattern: nameRegex.source },
            },
            required: ['email', 'username', 'first_name', 'last_name']
        }
    }

    const loginSchema = {
        body: {
            type: 'object',
            properties: {
                id: { type: 'string', minLength: 1, maxLength: 255 },
                password: { type: 'string', minLength: 6, maxLength: 255 }
            },
            required: ['id', 'password']
        }
    }

    const recoverSchema = {
        body: {
            type: 'object',
            properties: {
                email: { type: 'string', minLength: 1, maxLength: 255, pattern: emailRegex.source },
                username: { type: 'string', minLength: 1, maxLength: 15, pattern: usernameRegex.source }
            },
            anyOf: [
                { required: ['email'] },
                { required: ['username'] }
            ]
        }
    }

    const setSchema = {
        body: {
            type: 'object',
            properties: {
                token: { type: 'string', minLength: 1 },
                password: { type: 'string', minLength: 1, maxLength: 255 },
            },
            required: ['token', 'password']
        }
    }

    fastify.get('/google/callback', async (request, reply) => {
        return handleGoogleAuth(fastify, request, reply)
    })

    fastify.post('/register', {
        schema: registerSchema,
        attachValidation: true,
        preValidation: fastify.upload.single('avatar'),
    }, (request, reply) => {
        if (request.validationError) {
            const errors = request.validationError.validation.map(error => {
                return {
                    field: error.params.missingProperty || error.instancePath.substring(1),
                    message: error.message
                }
            })
            return reply.code(400).send({ success: false, message: 'Validation failed', errors })
        }
        return register(fastify, request, reply)
    })

    fastify.post('/login', {
        schema: loginSchema,
        attachValidation: true
    }, (request, reply) => {
        if (request.validationError) {
            const errors = request.validationError.validation.map(error => {
                return {
                    field: error.params.missingProperty || error.instancePath.substring(1),
                    message: error.message
                }
            })
            return reply.code(400).send({ success: false, message: 'Validation failed', errors })
        }
        return login(fastify, request, reply)
    })

    fastify.get('/auto-login', {
        preHandler: verifyToken
    }, async (request, reply) => {
        try {
            return autoLogin(fastify, request, reply)
        } catch (error) {
            if (error.message === 'Authorization header is missing' || error.message === 'Invalid token') {
                return reply.code(401).send({ success: false, message: error.message })
            } else {
                return reply.code(500).send({ success: false, message: 'Internal Server Error' })
            }
        }
    })

    fastify.post('/recover-account', {
        schema: recoverSchema,
        attachValidation: true
    }, async (request, reply) => {
        if (request.validationError) {
            const errors = request.validationError.validation.map(error => {
                return {
                    field: error.params.missingProperty || error.instancePath.substring(1),
                    message: error.message
                }
            })
            return reply.code(400).send({ success: false, message: 'Validation failed', errors })
        }
        return recoverAccount(fastify, request, reply)
    })

    fastify.post('/set-password', {
        schema: setSchema,
        attachValidation: true
    }, async (request, reply) => {
        if (request.validationError) {
            const errors = request.validationError.validation.map(error => {
                return {
                    field: error.params.missingProperty || error.instancePath.substring(1),
                    message: error.message
                }
            })
            return reply.code(400).send({ success: false, message: 'Validation failed', errors })
        }
        return setPassword(fastify, request, reply)
    })
}