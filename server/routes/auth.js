const { login } = require('../controllers/auth')

module.exports = async function(fastify, opts) {
    fastify.get('/login', login)
}