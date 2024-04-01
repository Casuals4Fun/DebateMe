const { register, login, autoLogin } = require('../controllers/auth');
const verifyToken = require('../middleware/verifyToken');

module.exports = async function (fastify, opts) {
    const registerSchema = {
        body: {
            type: 'object',
            properties: {
                email: { type: 'string', format: 'email', minLength: 1 },
                password: { type: 'string', minLength: 6 },
                avatar: { type: 'string', nullable: true },
                username: { type: 'string', minLength: 1 },
                first_name: { type: 'string', minLength: 1 },
                last_name: { type: 'string', minLength: 1 }
            },
            required: ['email', 'password', 'username', 'first_name', 'last_name']
        }
    };

    const loginSchema = {
        body: {
            type: 'object',
            properties: {
                id: { type: 'string', minLength: 1 },
                password: { type: 'string', minLength: 6 }
            },
            required: ['id', 'password']
        }
    };

    fastify.post('/register', {
        schema: registerSchema,
        attachValidation: true
    }, (request, reply) => {
        if (request.validationError) {
            const errors = request.validationError.validation.map(error => {
                console.log(error)
                return {
                    field: error.instancePath.substring(1),
                    message: error.message
                };
            });
            return reply.code(400).send({ success: false, message: 'Validation failed', errors });
        }
        return register(fastify, request, reply);
    });

    fastify.post('/login', {
        schema: loginSchema,
        attachValidation: true
    }, (request, reply) => {
        if (request.validationError) {
            const errors = request.validationError.validation.map(error => {
                return {
                    field: error.instancePath.substring(1),
                    message: error.message
                };
            });
            return reply.code(400).send({ success: false, message: 'Validation failed', errors });
        }
        return login(fastify, request, reply);
    });

    fastify.get('/auto-login', {
        preHandler: verifyToken
    }, async (request, reply) => {
        try {
            return autoLogin(fastify, request, reply);
        } catch (error) {
            if (error.message === 'Authorization header is missing' || error.message === 'Invalid token') {
                return reply.code(401).send({ success: false, message: error.message });
            } else {
                return reply.code(500).send({ success: false, message: 'Internal Server Error' });
            }
        }
    });
}