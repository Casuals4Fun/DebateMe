const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const fs = require('fs');
const path = require('path');
const { getMimeType } = require('../utils/getMimeType');

exports.register = async function (fastify, request, reply) {
    try {
        const { email, password, avatar, username, first_name, last_name } = request.body;

        const mimeType = getMimeType(avatar);
        if (!mimeType) {
            return reply.code(400).send({
                success: false,
                message: 'Invalid avatar format.'
            });
        }

        const base64Data = avatar.replace(/^data:image\/\w+;base64,/, '');
        const extension = mimeType.split('/')[1];
        const avatarPath = path.resolve(__dirname, '..', 'avatars', `${username}.${extension}`);
        fs.writeFileSync(avatarPath, base64Data, 'base64');

        const [emailExists] = await fastify.mysql.query('SELECT * FROM users WHERE email = ?', [email]);
        if (emailExists.length > 0) {
            return reply.code(400).send({
                success: false,
                message: 'Account already exists.'
            });
        }

        const [usernameExists] = await fastify.mysql.query('SELECT * FROM users WHERE username = ?', [username]);
        if (usernameExists.length > 0) {
            return reply.code(400).send({
                success: false,
                message: 'Username already exists.'
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const [result] = await fastify.mysql.query('INSERT INTO users (email, password, username, first_name, last_name, avatar) VALUES (?, ?, ?, ?, ?, ?)', [email, hashedPassword, username, first_name, last_name, `${username}.${extension}`]);
        if (result.affectedRows > 0) {
            return reply.code(201).send({
                success: true,
                message: 'User account created successfully.'
            });
        } else {
            return reply.code(500).send({
                success: false,
                message: 'Failed to create user account.'
            });
        }
    } catch (err) {
        console.error(err);
        return reply.code(500).send({
            success: false,
            message: 'Internal Server Error'
        });
    }
}

exports.login = async function (fastify, request, reply) {
    try {
        const { id, password } = request.body;

        const isEmail = id.includes('@');
        const query = isEmail ? 'SELECT * FROM users WHERE email = ?' : 'SELECT * FROM users WHERE username = ?';

        const [user] = await fastify.mysql.query(query, [id]);
        if (!user.length) {
            return reply.code(400).send({
                success: false,
                message: 'Invalid credentials.'
            });
        }

        const userData = user[0];
        const isPasswordValid = await bcrypt.compare(password, userData.password);

        if (!isPasswordValid) {
            return reply.code(400).send({
                success: false,
                message: 'Invalid credentials.'
            });
        }

        const token = jwt.sign({ userId: userData.username }, process.env.JWT_SECRET, { expiresIn: '12h' });

        return reply.code(200).send({
            success: true,
            message: 'Login successful.',
            data: {
                user: {
                    ...(({ password, avatar, ...rest }) => rest)(userData),
                    avatar: `${process.env.SERVER_URL}/avatars/${userData.avatar}`
                },
                token
            }
        });
    } catch (err) {
        console.error(err);
        return reply.code(500).send({
            success: false,
            message: 'Internal Server Error'
        });
    }
}

exports.autoLogin = async function (fastify, request, reply) {
    try {
        const id = request.user.userId;
        const query = 'SELECT * FROM users WHERE username = ?';

        const [user] = await fastify.mysql.query(query, [id]);
        if (!user.length) {
            return reply.code(400).send({
                success: false,
                message: 'Invalid credentials.'
            });
        }
        const userData = user[0];

        return reply.code(200).send({
            success: true,
            message: 'Login successful.',
            data: {
                user: {
                    ...(({ password, avatar, ...rest }) => rest)(userData),
                    avatar: `${process.env.SERVER_URL}/avatars/${userData.avatar}`
                }
            }
        });
    } catch (error) {
        console.error(err);
        return reply.code(500).send({
            success: false,
            message: 'Internal Server Error'
        });
    }
}