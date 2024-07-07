const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { ErrorHandler, catchError } = require('../utils/ErrorHandler');

exports.handleGoogleAuth = async function (fastify, request, reply) {
    try {
        const { token } = await fastify.googleOAuth2.getAccessTokenFromAuthorizationCodeFlow(request, reply);
        const userinfo = await fastify.googleOAuth2.userinfo(token.access_token);

        const [user] = await fastify.mysql.query('SELECT * FROM users WHERE email = ?', [userinfo.email]);

        if (user.length > 0) {
            const token = jwt.sign({ userId: user[0].username }, process.env.JWT_SECRET, { expiresIn: '12h' });

            reply.redirect(`${process.env.FRONTEND_URL}/auth?type=login&token=${token}`);
        } else {
            reply.redirect(`${process.env.FRONTEND_URL}/auth?type=signup&user=${encodeURIComponent(JSON.stringify(userinfo))}`);
        }
    } catch (error) {
        reply.redirect(`${process.env.FRONTEND_URL}/auth?type=error&message=${encodeURIComponent(error.message)}`);
    }
}

exports.register = async function (fastify, request, reply) {
    try {
        const { email, password, username, first_name, last_name } = request.body;

        let avatar = null;
        if (request.body.avatar) avatar = request.body.avatar;
        else if (request.file) avatar = null;

        const [emailExists] = await fastify.mysql.query('SELECT * FROM users WHERE email = ?', [email]);
        if (emailExists.length > 0) throw new ErrorHandler(400, false, 'Account already exists.');

        const [usernameExists] = await fastify.mysql.query('SELECT * FROM users WHERE username = ?', [username]);
        if (usernameExists.length > 0) throw new ErrorHandler(400, false, 'Username already exists.');

        const hashedPassword = await bcrypt.hash(password, 10);

        const [result] = await fastify.mysql.query(
            'INSERT INTO users (email, password, username, first_name, last_name, avatar) VALUES (?, ?, ?, ?, ?, ?)',
            [email, hashedPassword, username, first_name, last_name, avatar]
        );

        if (result.affectedRows > 0) {
            const token = jwt.sign({ userId: username }, process.env.JWT_SECRET, { expiresIn: '12h' });
            return reply.code(201).send({
                success: true,
                message: 'Account created successfully',
                data: {
                    user: { email, avatar, username, first_name, last_name },
                    token
                }
            });
        } else throw new ErrorHandler(500, false, 'Failed to create user account.');
    } catch (err) {
        return catchError(reply, err);
    }
}

exports.login = async function (fastify, request, reply) {
    try {
        const { id, password } = request.body;

        const isEmail = id.includes('@');
        const query = isEmail ? 'SELECT * FROM users WHERE email = ?' : 'SELECT * FROM users WHERE username = ?';

        const [user] = await fastify.mysql.query(query, [id]);
        if (!user.length) throw new ErrorHandler(400, false, 'Invalid credentials.');

        const userData = user[0];
        const isPasswordValid = await bcrypt.compare(password, userData.password);

        if (!isPasswordValid) throw new ErrorHandler(400, false, 'Incorrect password.');

        const token = jwt.sign({ userId: userData.username }, process.env.JWT_SECRET, { expiresIn: '12h' });

        return reply.code(200).send({
            success: true,
            message: 'Login successful',
            data: {
                user: {
                    ...(({ password, ...rest }) => rest)(userData)
                },
                token
            }
        });
    } catch (err) {
        return catchError(reply, err);
    }
}

exports.autoLogin = async function (fastify, request, reply) {
    try {
        const id = request.user.userId;
        const query = 'SELECT * FROM users WHERE username = ?';

        const [user] = await fastify.mysql.query(query, [id]);
        if (!user.length) throw new ErrorHandler(400, false, 'Invalid credentials.');

        const userData = user[0];

        return reply.code(200).send({
            success: true,
            message: 'Login successful',
            data: {
                user: {
                    ...(({ password, ...rest }) => rest)(userData)
                }
            }
        });
    } catch (err) {
        return catchError(reply, err);
    }
}

exports.checkUsername = async function (fastify, request, reply) {
    try {
        const { username } = request.body;
        const query = 'SELECT * FROM users WHERE username =?';

        const [user] = await fastify.mysql.query(query, [username]);
        if (user.length) {
            throw new ErrorHandler(400, false, 'Username already taken.');
        }

        return reply.code(200).send({
            success: true,
            message: 'Username available',
        });
    } catch (err) {
        return catchError(reply, err);
    }
}