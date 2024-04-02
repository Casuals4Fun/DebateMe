require('dotenv').config();
const path = require('path');

const http = require('http');
let server;

const serverFactory = (handler, opts) => {
    server = http.createServer((req, res) => {
        handler(req, res);
    });

    return server;
};

const fastify = require('fastify')({
    serverFactory: serverFactory,
    bodyLimit: 7 * 1024 * 1024
});

fastify.register(require('@fastify/cors'), { origin: process.env.FRONTEND_URL })

fastify.register(require('@fastify/static'), {
    root: path.join(__dirname, 'avatars'),
    prefix: '/avatars/',
    wildcard: false,
    redirect: false,
});

fastify.decorate('mysql', require('./db.js'))

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
});

fastify.register(require('./routes/auth'), { prefix: '/api/auth' })

fastify.setNotFoundHandler((request, reply) => {
    reply.redirect(process.env.FRONTEND_URL)
})

fastify.ready(() => {
    server.listen({ port: process.env.PORT }, (err) => {
        if (err) throw err;
        console.log(`Server running on port ${process.env.PORT}`);
    });
});