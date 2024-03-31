const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.register = async function (fastify, request, reply) {
    try {
        const { email, password, avatar, username, firstName, lastName } = request.body;

        const [emailExists] = await fastify.mysql.query('SELECT * FROM users WHERE email = ?', [email]);
        if (emailExists.length > 0) {
            return reply.code(400).send({
                success: true,
                message: 'Account already exists.'
            });
        }

        const [usernameExists] = await fastify.mysql.query('SELECT * FROM users WHERE username = ?', [username]);
        if (usernameExists.length > 0) {
            return reply.code(400).send({
                success: true,
                message: 'Username already exists.'
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const [result] = await fastify.mysql.query('INSERT INTO users (email, password, username, first_name, last_name, avatar) VALUES (?, ?, ?, ?, ?, ?)', [email, hashedPassword, username, firstName, lastName, avatar]);
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
                user: (({ password, ...rest }) => rest)(userData),
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
                user: (({ password, ...rest }) => rest)(userData)
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