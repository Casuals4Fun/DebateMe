const { register, login } = require('../controllers/auth')

module.exports = async function (fastify, opts) {
    fastify.post('/register', (request, reply) => register(fastify, request, reply));
    fastify.post('/login', (request, reply) => login(fastify, request, reply));
}