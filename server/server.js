require('dotenv').config()
const path = require('path')

const http = require('http')
let server

const serverFactory = (handler, opts) => {
    return server = http.createServer((req, res) => handler(req, res))
}

const fastify = require('fastify')({
    serverFactory: serverFactory,
    bodyLimit: 7 * 1024 * 1024
})

fastify.register(require('@fastify/cors'), { origin: "*" })

fastify.register(require('@fastify/multipart'))
const multer = require('fastify-multer')
const upload = multer({ storage: multer.memoryStorage() })
fastify.decorate('upload', upload)

fastify.decorate('mysql', require('./db'))

fastify.register(require('@fastify/oauth2'), {
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
})

fastify.register(require('fastify-mailer'), {
    defaults: { from: `${process.env.EMAIL_USER} <${process.env.EMAIL_ADDRESS}>` },
    transport: {
        host: 'smtp.gmail.com',
        port: 465,
        secure: true,
        auth: {
            user: process.env.EMAIL_ADDRESS,
            pass: process.env.EMAIL_PASSWORD
        }
    }
})

fastify.get('/api', (request, reply) => reply.code(200).send('DebateMe server running...'))

fastify.register(require('./routes/auth'), { prefix: '/api/auth' })

fastify.setNotFoundHandler((request, reply) => {
    reply.redirect(process.env.FRONTEND_URL)
})

fastify.ready(() => {
    server.listen({ port: process.env.PORT }, (err) => {
        if (err) throw err
        console.log(`Server running on port ${process.env.PORT}`)
    })
})