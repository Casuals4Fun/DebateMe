const bcrypt = require('bcrypt');
const { sign } = require('jsonwebtoken');
const { ErrorHandler, catchError } = require('../utils/error');
const { randomBytes } = require('node:crypto');
const { sendMail } = require('../utils/mail');

exports.handleGoogleAuth = async function (fastify, request, reply) {
    try {
        const { token } = await fastify.googleOAuth2.getAccessTokenFromAuthorizationCodeFlow(request, reply);
        const userinfo = await fastify.googleOAuth2.userinfo(token.access_token);

        const [user] = await fastify.mysql.query('SELECT * FROM users WHERE email=?', [userinfo.email]);

        if (user.length > 0) {
            const token = await new Promise((resolve, reject) => {
                sign({ userId: user[0].username }, process.env.JWT_SECRET, { expiresIn: '12h' }, (err, token) => {
                    if (err) reject(err);
                    else resolve(token)
                });
            });
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
        const { email, username, first_name, last_name } = request.body;

        let avatar = null;
        if (request.body.avatar) avatar = request.body.avatar;
        else if (request.file) avatar = null;

        const [emailExists] = await fastify.mysql.query('SELECT * FROM users WHERE email=?', [email]);
        if (emailExists.length > 0) throw new ErrorHandler(400, false, 'Account already exists');

        const [usernameExists] = await fastify.mysql.query('SELECT * FROM users WHERE username=?', [username]);
        if (usernameExists.length > 0) throw new ErrorHandler(400, false, 'Username already exists');

        const token = randomBytes(32).toString('hex');
        const tokenExpiry = new Date(Date.now() + 3600000);

        const tempPassword = await bcrypt.hash(randomBytes(32).toString('hex'), 10);

        const [result] = await fastify.mysql.query(
            'INSERT INTO users (email, username, first_name, last_name, avatar, password, reset_token, reset_token_expiry) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
            [email, username, first_name, last_name, avatar, tempPassword, token, tokenExpiry]
        );

        if (result.affectedRows > 0) {
            await sendMail(fastify.mailer, {
                to: email,
                subject: 'Account Activation',
                html: `<p>Click the link to activate your account:</p>
                       <p><a href="${process.env.FRONTEND_URL}/auth?type=reset&token=${token}">${process.env.FRONTEND_URL}/auth?type=reset&token=${token}</a></p>`
            })
                .then(info => {
                    reply.status(200).send({
                        success: true,
                        message: 'Please check your email to activate your account.'
                    });
                })
                .catch(errors => { throw new ErrorHandler(400, false, 'Something went wrong') });
        } else {
            throw new ErrorHandler(400, false, 'Failed to create user account');
        }
    } catch (err) {
        return catchError(reply, err);
    }
};

exports.login = async function (fastify, request, reply) {
    try {
        const { id, password } = request.body;

        const query = `SELECT * FROM users WHERE ${id.includes('@') ? 'email=?' : 'username=?'}`;

        const [user] = await fastify.mysql.query(query, [id, id]);
        if (!user.length) throw new ErrorHandler(400, false, "Account doesn't exists");

        const isPasswordValid = await bcrypt.compare(password, user[0].password);
        if (!isPasswordValid) throw new ErrorHandler(400, false, 'Incorrect password');

        const token = await new Promise((resolve, reject) => {
            sign({ userId: user[0].username }, process.env.JWT_SECRET, { expiresIn: '12h' }, (err, token) => {
                if (err) reject(err);
                else resolve(token)
            });
        });

        return reply.code(200).send({
            success: true,
            message: 'Login successful',
            data: {
                user: { ...(({ password, ...rest }) => rest)(user[0]) },
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
        const query = 'SELECT * FROM users WHERE username=?';

        const [user] = await fastify.mysql.query(query, [id]);
        if (!user.length) throw new ErrorHandler(400, false, 'Invalid credentials');

        return reply.code(200).send({
            success: true,
            message: 'Login successful',
            data: {
                user: {
                    ...(({ password, ...rest }) => rest)(user[0])
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
        const query = 'SELECT * FROM users WHERE username=?';

        const [user] = await fastify.mysql.query(query, [username]);
        if (user.length) {
            throw new ErrorHandler(400, false, 'Username already taken');
        }

        return reply.code(200).send({
            success: true,
            message: 'Username available',
        });
    } catch (err) {
        return catchError(reply, err);
    }
}

exports.recoverAccount = async function (fastify, request, reply) {
    try {
        const { email, username } = request.body;
        const { mailer } = fastify;

        const [user] = await fastify.mysql.query('SELECT * FROM users WHERE email=? OR username=?', [email, username]);
        if (!user.length) throw new ErrorHandler(400, false, "Account doesn't exist");

        const token = randomBytes(32).toString('hex');
        const tokenExpiry = new Date(Date.now() + 3600000);

        await fastify.mysql.query('UPDATE users SET reset_token=?, reset_token_expiry=? WHERE username=?', [token, tokenExpiry, user[0].username]);

        await sendMail(mailer, {
            to: user[0].email,
            subject: 'Reset Password',
            html: `<p>You requested to reset your password. Click the link to reset:</p>
                   <p><a href="${`${process.env.FRONTEND_URL}/auth?type=reset&token=${token}`}">${`${process.env.FRONTEND_URL}/auth?type=reset&token=${token}`}</a></p>`
        })
            .then(info => {
                reply.status(200).send({
                    success: true,
                    message: `Activation link sent to your email${username ? (': ' + user[0].email) : ''}`
                });
            })
            .catch(errors => { throw new ErrorHandler(400, false, 'Something went wrong') });
    } catch (err) {
        return catchError(reply, err);
    }
};

exports.resetPassword = async (fastify, request, reply) => {
    try {
        const { token, password } = request.body;

        const [user] = await fastify.mysql.query('SELECT * FROM users WHERE reset_token=? AND reset_token_expiry>?', [token, new Date()]);
        if (!user.length) throw new ErrorHandler(400, false, "Invalid or expired token");

        const hashedPassword = await bcrypt.hash(password, 10);

        const [result] = await fastify.mysql.query('UPDATE users SET password=?, reset_token=NULL, reset_token_expiry=NULL WHERE username=?', [hashedPassword, user[0].username]);

        if (result.affectedRows > 0) {
            const token = await new Promise((resolve, reject) => {
                sign({ userId: user[0].username }, process.env.JWT_SECRET, { expiresIn: '12h' }, (err, token) => {
                    if (err) reject(err);
                    else resolve(token)
                });
            });

            reply.status(200).send({
                success: true,
                message: 'Password set successfully',
                data: {
                    user: { ...(({ password, ...rest }) => rest)(user[0]) },
                    token
                }
            });
        } else {
            throw new ErrorHandler(400, false, 'Failed to reset password');
        }
    } catch (err) {
        return catchError(reply, err);
    }
};