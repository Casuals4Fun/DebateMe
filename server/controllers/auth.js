const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const fs = require('fs');
const path = require('path');
const { getMimeType } = require('../utils/getMimeType');
const ErrorHandler = require('../utils/ErrorHandler');

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
        const { email, password, avatar, username, first_name, last_name } = request.body;

        const [emailExists] = await fastify.mysql.query('SELECT * FROM users WHERE email = ?', [email]);
        if (emailExists.length > 0) throw new ErrorHandler(400, false, 'Account already exists.');

        const [usernameExists] = await fastify.mysql.query('SELECT * FROM users WHERE username = ?', [username]);
        if (usernameExists.length > 0) throw new ErrorHandler(400, false, 'Username already exists.');

        let avatarPath = null;
        if (avatar) {
            const isBase64 = avatar.startsWith('data:image');
            if (!isBase64) avatarPath = avatar;
            else {
                const mimeType = getMimeType(avatar);
                if (!mimeType) throw new ErrorHandler(400, false, 'Invalid avatar format.');

                const base64Data = avatar.replace(/^data:image\/\w+;base64,/, '');
                const extension = mimeType.split('/')[1];
                const timestamp = new Date().toISOString().replace(/:/g, '-').replace('T', '_').split('.')[0];
                const uniqueFilename = `${username}_${timestamp}.${extension}`;
                const fullPath = path.resolve(__dirname, '..', 'avatars', uniqueFilename);
                fs.writeFileSync(fullPath, base64Data, 'base64');
                avatarPath = uniqueFilename;
            }
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const [result] = await fastify.mysql.query('INSERT INTO users (email, password, username, first_name, last_name, avatar) VALUES (?, ?, ?, ?, ?, ?)', [email, hashedPassword, username, first_name, last_name, avatarPath]);

        if (result.affectedRows > 0) {
            const token = jwt.sign({ userId: username }, process.env.JWT_SECRET, { expiresIn: '12h' });
            return reply.code(201).send({
                success: true,
                message: 'Account created successfully.',
                data: {
                    user: { email, avatar: avatarPath, username, first_name, last_name },
                    token
                }
            });
        } else throw new ErrorHandler(500, false, 'Failed to create user account.');
    } catch (err) {
        if (err instanceof ErrorHandler) {
            return reply.code(err.statusCode).send({
                success: err.success,
                message: err.message
            });
        } else {
            console.error(err);
            return reply.code(500).send({
                success: false,
                message: 'Internal Server Error'
            });
        }
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

        let avatarUrl = null;
        if (userData.avatar) {
            if (userData.avatar.startsWith('http')) avatarUrl = userData.avatar;
            else avatarUrl = `${process.env.SERVER_URL}/avatars/${userData.avatar}`;
        }

        const token = jwt.sign({ userId: userData.username }, process.env.JWT_SECRET, { expiresIn: '12h' });

        return reply.code(200).send({
            success: true,
            message: 'Login successful.',
            data: {
                user: {
                    ...(({ password, ...rest }) => rest)(userData),
                    avatar: avatarUrl
                },
                token
            }
        });
    } catch (err) {
        if (err instanceof ErrorHandler) {
            return reply.code(err.statusCode).send({
                success: err.success,
                message: err.message
            });
        } else {
            console.error(err);
            return reply.code(500).send({
                success: false,
                message: 'Internal Server Error'
            });
        }
    }
}

exports.autoLogin = async function (fastify, request, reply) {
    try {
        const id = request.user.userId;
        const query = 'SELECT * FROM users WHERE username = ?';

        const [user] = await fastify.mysql.query(query, [id]);
        if (!user.length) throw new ErrorHandler(400, false, 'Invalid credentials.');

        const userData = user[0];

        let avatarUrl = null;
        if (userData.avatar) {
            if (userData.avatar.startsWith('http')) avatarUrl = userData.avatar;
            else avatarUrl = `${process.env.SERVER_URL}/avatars/${userData.avatar}`;
        }

        return reply.code(200).send({
            success: true,
            message: 'Login successful.',
            data: {
                user: {
                    ...(({ password, ...rest }) => rest)(userData),
                    avatar: avatarUrl
                }
            }
        });
    } catch (error) {
        if (err instanceof ErrorHandler) {
            return reply.code(err.statusCode).send({
                success: err.success,
                message: err.message
            });
        } else {
            console.error(err);
            return reply.code(500).send({
                success: false,
                message: 'Internal Server Error'
            });
        }
    }
}