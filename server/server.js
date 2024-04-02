require('dotenv').config()
const Fastify = require('fastify')
const path = require('path')
const db = require('./db.js')
const fastifyOauth2 = require('@fastify/oauth2');

const fastify = Fastify({ bodyLimit: 7 * 1024 * 1024 })

fastify.register(require('@fastify/cors'), { origin: process.env.FRONTEND_URL })

fastify.register(require('@fastify/static'), {
    root: path.join(__dirname, 'avatars'),
    prefix: '/avatars/',
    wildcard: false,
    redirect: false,
});

fastify.decorate('mysql', db)

fastify.register(fastifyOauth2, {
    name: 'googleOAuth2',
    scope: 'https://www.googleapis.com/auth/userinfo.profile https://www.googleapis.com/auth/userinfo.email',
    credentials: {
        client: {
            id: process.env.GOOGLE_CLIENT_ID,
            secret: process.env.GOOGLE_CLIENT_SECRET
        }
    },
    startRedirectPath: '/api/auth/google',
    callbackUri: process.env.GOOGLE_REDIRECT_URI,
    discovery: {
        issuer: 'https://accounts.google.com'
    }
});

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