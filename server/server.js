require('dotenv').config()
const Fastify = require('fastify')
const cors = require('@fastify/cors')
const db = require('./db.js')

const fastify = Fastify({
    bodyLimit: 7 * 1024 * 1024
})

fastify.register(cors, { origin: process.env.FRONTEND_URL })

fastify.decorate('mysql', db)

fastify.addHook('preHandler', async (request, reply) => {
    const apiKey = request.headers['x-api-key']
    if (!apiKey || apiKey !== process.env.API_KEY) {
        reply.redirect(process.env.FRONTEND_URL)
    }
})

fastify.register(require('./routes/auth'), { prefix: '/api/auth' })

fastify.setNotFoundHandler((request, reply) => {
    reply.redirect(process.env.FRONTEND_URL)
})

db.query('SELECT 1')
    .then(() => {
        console.log('Database connected')
        fastify
            .listen({ port: process.env.PORT })
            .then(() => console.log('Server running'))
            .catch(err => {
                console.log('Server Error\n', err)
                process.exit(1)
            });
    })
    .catch(err => {
        console.log('Database Error\n', err)
        process.exit(1)
    })