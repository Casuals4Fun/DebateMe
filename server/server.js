require('dotenv').config()
const Fastify = require('fastify')
const db = require('./db.js')

const fastify = Fastify({
    bodyLimit: 7 * 1024 * 1024
})

fastify.register(require('@fastify/cors'), { origin: process.env.FRONTEND_URL })

fastify.decorate('mysql', db)

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