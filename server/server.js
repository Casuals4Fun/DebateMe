require('dotenv').config()
const Fastify = require('fastify')
const cors = require('@fastify/cors')
const db = require('./db.js')

const fastify = Fastify()

fastify.register(cors, {
    origin: '*'
})

fastify.decorate('mysql', db)

fastify.get('/', async function handler(request, reply) {
    reply.redirect(process.env.FRONTEND_URL)
})

fastify.get('/api', async function handler(request, reply) {
    reply.redirect(process.env.FRONTEND_URL)
})

fastify.get('/favicon.ico', async (request, reply) => {
    reply.code(204).send()
})

fastify.register(require('./routes/auth'), { prefix: '/api/auth' })

fastify.setNotFoundHandler((request, reply) => {
    reply.redirect(process.env.FRONTEND_URL)
})

fastify
    .listen({ port: process.env.PORT })
    .then(() => console.log('Server running...'))
    .catch(err => {
        console.log(err)
        process.exit(1)
    });