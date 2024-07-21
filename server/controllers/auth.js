const { hash, compare } = require('bcrypt');
const { sign } = require('jsonwebtoken');
const { ErrorHandler, catchError } = require('../utils/error');
const { randomBytes } = require('node:crypto');
const { sendMail } = require('../utils/mail');

exports.handleGoogleAuth = async function (fastify, request, reply) {
    try {
        const { token } = await fastify.googleOAuth2.getAccessTokenFromAuthorizationCodeFlow(request, reply);
        const userinfo = await fastify.googleOAuth2.userinfo(token.access_token);

        const cacheKey = `user:${userinfo.email}`;
        let user = null;

        await fastify.cache.get(cacheKey, async (err, cachedUser) => {
            if (err) throw new ErrorHandler(400, false, 'Failed to get data from cache');

            if (cachedUser) {
                user = cachedUser.item;
                console.log("Getting cache google-auth");
            } else {
                const [db_user] = await fastify.mysql.query('SELECT * FROM users WHERE email=?', [userinfo.email]);

                if (db_user.length > 0) {
                    console.log("Setting cache google-auth");
                    await fastify.cache.set(cacheKey, db_user[0], 432000, (err) => {
                        if (err) throw new ErrorHandler(400, false, 'Failed to set data in cache');
                    });
                    user = db_user[0];
                }
            }
        });

        if (user) {
            const token = await new Promise((resolve, reject) => {
                sign({ userId: user.username }, process.env.JWT_SECRET, { expiresIn: '12h' }, (err, token) => {
                    if (err) reject(err);
                    else resolve(token)
                });
            });
            reply.redirect(`${process.env.FRONTEND_URL}/auth?type=login&token=${token}`);
        } else {
            reply.redirect(`${process.env.FRONTEND_URL}/auth?type=signup&user=${encodeURIComponent(JSON.stringify(userinfo))}`);
        }
    } catch (error) {
        reply.redirect(`${process.env.FRONTEND_URL}/auth?type=login&error=${encodeURIComponent(error.message)}`);
    }
};

exports.register = async function (fastify, request, reply) {
    try {
        const { email, username, first_name, last_name } = request.body;

        let avatar = null;
        if (request.body.avatar) avatar = request.body.avatar;
        else if (request.file) avatar = null;

        const [existingUser] = await fastify.mysql.query('SELECT * FROM users WHERE username=? OR email=?', [username, email]);
        if (existingUser.length > 0) {
            if (existingUser[0].username === username) {
                throw new ErrorHandler(400, false, 'Username already taken');
            } else if (existingUser[0].email === email) {
                throw new ErrorHandler(400, false, 'Email already exists');
            }
        }

        const token = randomBytes(32).toString('hex');
        const tokenExpiry = new Date(Date.now() + 3600000);

        const tempPassword = await hash(randomBytes(32).toString('hex'), 10);

        const [result] = await fastify.mysql.query(
            'INSERT INTO users (email, username, first_name, last_name, avatar, password, reset_token, reset_token_expiry) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
            [email, username, first_name, last_name, avatar, `temp:${tempPassword}`, token, tokenExpiry]
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
                .catch(errors => { throw new ErrorHandler(400, false, 'Failed to send activate mail') });
        } else {
            throw new ErrorHandler(400, false, 'Failed to create account');
        }
    } catch (err) {
        return catchError(reply, err);
    }
};

exports.login = async function (fastify, request, reply) {
    try {
        const { id, password } = request.body;

        let user;
        const cacheKey = `user:${id}`;

        await fastify.cache.get(cacheKey, async (err, cachedUser) => {
            if (err) throw new ErrorHandler(400, false, 'Failed to get data from cache');

            if (cachedUser) {
                user = cachedUser.item;
                console.log("Getting cache login");
            } else {
                const [db_user] = await fastify.mysql.query(`SELECT * FROM users WHERE ${id.includes('@') ? 'email=?' : 'username=?'}`, [id, id]);
                if (!db_user.length) throw new ErrorHandler(400, false, "Account doesn't exist");

                console.log("Setting cache login");
                await fastify.cache.set(cacheKey, db_user[0], 432000, (err) => {
                    if (err) throw new ErrorHandler(400, false, 'Failed to set data in cache');
                });

                user = db_user[0];
            }
        });

        const isPasswordValid = await compare(password, user.password);
        if (!isPasswordValid) throw new ErrorHandler(400, false, 'Incorrect password');

        const token = await new Promise((resolve, reject) => {
            sign({ userId: user.username }, process.env.JWT_SECRET, { expiresIn: '12h' }, (err, token) => {
                if (err) reject(err);
                else resolve(token);
            });
        });

        return reply.code(200).send({
            success: true,
            message: 'Login successful',
            data: {
                user: { ...(({ password, reset_token, reset_token_expiry, ...rest }) => rest)(user) },
                token
            }
        });
    } catch (err) {
        return catchError(reply, err);
    }
};

exports.autoLogin = async function (fastify, request, reply) {
    try {
        const id = request.user.userId;

        const cacheKey = `user:${id}`;
        let user = null;

        await fastify.cache.get(cacheKey, async (err, cachedUser) => {
            if (err) throw new ErrorHandler(400, false, 'Failed to get data from cache');

            if (cachedUser) {
                user = cachedUser.item;
                console.log("Getting cache auto-login");
            } else {
                const [db_user] = await fastify.mysql.query('SELECT * FROM users WHERE username=?', [id]);
                if (!db_user.length) throw new ErrorHandler(400, false, 'Invalid credentials');

                console.log("Setting cache auto-login");
                await fastify.cache.set(cacheKey, db_user[0], 432000, (err) => {
                    if (err) throw new ErrorHandler(400, false, 'Failed to set data in cache');
                });
                user = db_user[0];
            }
        });

        return reply.code(200).send({
            success: true,
            message: 'Login successful',
            data: {
                user: { ...(({ password, reset_token, reset_token_expiry, ...rest }) => rest)(user) }
            }
        });
    } catch (err) {
        return catchError(reply, err);
    }
}

exports.checkUsername = async function (fastify, request, reply) {
    try {
        const { username } = request.body;

        const [user] = await fastify.mysql.query('SELECT * FROM users WHERE username=?', [username]);
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

        const [user] = await fastify.mysql.query('SELECT * FROM users WHERE email=? OR username=?', [email, username]);
        if (!user.length) throw new ErrorHandler(400, false, "Account doesn't exist");

        const token = randomBytes(32).toString('hex');
        const tokenExpiry = new Date(Date.now() + 3600000);

        await fastify.mysql.query('UPDATE users SET reset_token=?, reset_token_expiry=? WHERE username=?', [token, tokenExpiry, user[0].username]);

        await sendMail(fastify.mailer, {
            to: user[0].email,
            subject: 'Reset Password',
            html: `<p>You requested to reset your password. Click the link to reset:</p>
                   <p><a href="${`${process.env.FRONTEND_URL}/auth?type=reset&token=${token}`}">${`${process.env.FRONTEND_URL}/auth?type=reset&token=${token}`}</a></p>`
        })
            .then(info => {
                reply.status(200).send({
                    success: true,
                    message: `Reset password link sent to your email${username ? (': ' + user[0].email) : ''}`
                });
            })
            .catch(errors => { throw new ErrorHandler(400, false, 'Failed to send reset password mail') });
    } catch (err) {
        return catchError(reply, err);
    }
};

exports.resetPassword = async (fastify, request, reply) => {
    try {
        const { token, password } = request.body;

        const [user] = await fastify.mysql.query('SELECT * FROM users WHERE reset_token=? AND reset_token_expiry>?', [token, new Date()]);
        if (!user.length) throw new ErrorHandler(400, false, "Invalid or expired token");

        const hashedPassword = await hash(password, 10);

        const [result] = await fastify.mysql.query('UPDATE users SET password=?, reset_token=NULL, reset_token_expiry=NULL WHERE username=?', [hashedPassword, user[0].username]);

        if (result.affectedRows > 0) {
            const updatedUser = { ...user[0], password: hashedPassword };
            const cacheKeys = [`user:${updatedUser.username}`, `user:${updatedUser.email}`];

            await Promise.all(cacheKeys.map(cacheKey =>
                fastify.cache.set(cacheKey, updatedUser, 432000, (err) => {
                    if (err) throw new ErrorHandler(400, false, 'Failed to set data in cache');
                })
            ));

            const token = await new Promise((resolve, reject) => {
                sign({ userId: updatedUser.username }, process.env.JWT_SECRET, { expiresIn: '12h' }, (err, token) => {
                    if (err) reject(err);
                    else resolve(token);
                });
            });

            reply.status(200).send({
                success: true,
                message: 'Password set successfully',
                data: {
                    user: { ...(({ password, reset_token, reset_token_expiry, ...rest }) => rest)(updatedUser) },
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