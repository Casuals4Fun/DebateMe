const { ErrorHandler, catchError } = require('../utils/error')
const { sign } = require('jsonwebtoken')
const { hash, compare } = require('bcrypt')
const { randomBytes } = require('node:crypto')
const { sendMail } = require('../utils/mail')

exports.handleGoogleAuth = async function (fastify, request, reply) {
    try {
        const { token } = await fastify.googleOAuth2.getAccessTokenFromAuthorizationCodeFlow(request, reply)
        const userinfo = await fastify.googleOAuth2.userinfo(token.access_token)

        const cacheKey = `user:${userinfo.email}`
        let user = null

        await fastify.cache.get(cacheKey, async (err, cachedUser) => {
            if (err) throw new ErrorHandler(400, false, 'Failed to get data from cache')

            if (cachedUser) user = cachedUser.item
            else {
                const [db_user] = await fastify.mysql.query('SELECT * FROM users WHERE email=?', [userinfo.email])

                if (db_user.length) {
                    await fastify.cache.set(cacheKey, db_user[0], 432000, (err) => {
                        if (err) throw new ErrorHandler(400, false, 'Failed to set data in cache')
                    })
                    user = db_user[0]
                }
            }
        })

        if (!user) reply.redirect(`${process.env.FRONTEND_URL}/auth?type=signup&user=${encodeURIComponent(JSON.stringify(userinfo))}`)
        const jwt = await new Promise((resolve, reject) => {
            sign({ userId: user.username }, process.env.JWT_SECRET, { expiresIn: '12h' }, (err, token) => {
                if (err) reject(err)
                else resolve(token)
            })
        })
        reply.redirect(`${process.env.FRONTEND_URL}/auth?type=login&token=${jwt}`)
    } catch (error) {
        reply.redirect(`${process.env.FRONTEND_URL}/auth?type=login&error=${encodeURIComponent(error.message)}`)
    }
}

exports.register = async function (fastify, request, reply) {
    const { email, username, first_name, last_name } = request.body

    let avatar = null
    if (request.body.avatar) avatar = request.body.avatar
    else if (request.file) avatar = null

    const connection = await fastify.mysql.getConnection()
    try {
        await connection.beginTransaction()

        const [existingUser] = await connection.query('SELECT * FROM users WHERE username=? OR email=?', [username, email])
        if (existingUser.length) throw new ErrorHandler(400, false, existingUser[0].username === username ? 'Username already taken' : 'Email already exists')

        const token = randomBytes(32).toString('hex')
        const tokenExpiry = new Date(Date.now() + 3600000)

        const tempPassword = await hash(randomBytes(32).toString('hex'), 10)

        const [result] = await connection.query(
            'INSERT INTO users (email, username, first_name, last_name, avatar, password) VALUES (?, ?, ?, ?, ?, ?)',
            [email, username, first_name, last_name, avatar, `temp:${tempPassword}`]
        )

        if (!result.affectedRows) throw new ErrorHandler(400, false, 'Failed to create account')

        await connection.query(
            'INSERT INTO reset (username, token, expiry) VALUES (?, ?, ?) ON DUPLICATE KEY UPDATE token=?, expiry=?',
            [username, token, tokenExpiry, token, tokenExpiry]
        )

        await connection.commit()

        await sendMail(fastify.mailer, {
            to: email,
            subject: 'Account Activation',
            html: `<p>Click the link to activate your account:</p>
                           <p><a href="${process.env.FRONTEND_URL}/auth?type=reset&token=${token}">${process.env.FRONTEND_URL}/auth?type=reset&token=${token}</a></p>`
        })
            .then(_ => {
                reply.status(200).send({
                    success: true,
                    message: 'Please check your email to activate your account.'
                })
            })
            .catch(_ => { throw new ErrorHandler(400, false, 'Failed to send activation mail') })
    } catch (err) {
        await connection.rollback()
        return catchError(reply, err)
    } finally {
        connection.release()
    }
}

exports.login = async function (fastify, request, reply) {
    try {
        const { id, password } = request.body
        const cacheKey = `user:${id}`
        let user = null

        await fastify.cache.get(cacheKey, async (err, cachedUser) => {
            if (err) throw new ErrorHandler(400, false, 'Failed to get data from cache')

            if (cachedUser) user = cachedUser.item
            else {
                const [db_user] = await fastify.mysql.query(`SELECT * FROM users WHERE ${id.includes('@') ? 'email=?' : 'username=?'}`, [id, id])
                if (!db_user.length) throw new ErrorHandler(400, false, 'Account does not exist')

                await fastify.cache.set(cacheKey, db_user[0], 432000, (err) => {
                    if (err) throw new ErrorHandler(400, false, 'Failed to set data in cache')
                })

                user = db_user[0]
            }
        })

        if (user.password.startsWith('temp:')) throw new ErrorHandler(400, false, 'Please check your email to activate your account.')
        const isPasswordValid = await compare(password, user.password)
        if (!isPasswordValid) throw new ErrorHandler(400, false, 'Incorrect password')

        const token = await new Promise((resolve, reject) => {
            sign({ userId: user.username }, process.env.JWT_SECRET, { expiresIn: '12h' }, (err, token) => {
                if (err) reject(err)
                else resolve(token)
            })
        })

        return reply.code(200).send({
            success: true,
            message: 'Login successful',
            data: {
                user: { ...(({ password, reset_token, reset_token_expiry, ...rest }) => rest)(user) },
                token
            }
        })
    } catch (err) {
        return catchError(reply, err)
    }
}

exports.autoLogin = async function (fastify, request, reply) {
    try {
        const id = request.user.userId
        const cacheKey = `user:${id}`
        let user = null

        await fastify.cache.get(cacheKey, async (err, cachedUser) => {
            if (err) throw new ErrorHandler(400, false, 'Failed to get data from cache')

            if (cachedUser) user = cachedUser.item
            else {
                const [db_user] = await fastify.mysql.query('SELECT * FROM users WHERE username=?', [id])
                if (!db_user.length) throw new ErrorHandler(400, false, 'Invalid credentials')

                await fastify.cache.set(cacheKey, db_user[0], 432000, (err) => {
                    if (err) throw new ErrorHandler(400, false, 'Failed to set data in cache')
                })
                user = db_user[0]
            }
        })

        return reply.code(200).send({
            success: true,
            message: 'Login successful',
            data: {
                user: { ...(({ password, reset_token, reset_token_expiry, ...rest }) => rest)(user) }
            }
        })
    } catch (err) {
        return catchError(reply, err)
    }
}

exports.recoverAccount = async function (fastify, request, reply) {
    const { email, username } = request.body

    const connection = await fastify.mysql.getConnection()
    try {
        await connection.beginTransaction()

        const [user] = await connection.query(`SELECT * FROM users WHERE ${username ? 'username' : 'email'}=?`, username || email)
        if (!user.length) throw new ErrorHandler(400, false, 'Account does not exist')

        const token = randomBytes(32).toString('hex')
        const tokenExpiry = new Date(Date.now() + 3600000)

        await connection.query(
            'INSERT INTO reset (username, token, expiry) VALUES (?, ?, ?) ON DUPLICATE KEY UPDATE token=?, expiry=?',
            [user[0].username, token, tokenExpiry, token, tokenExpiry]
        )

        await connection.commit()

        await sendMail(fastify.mailer, {
            to: user[0].email,
            subject: 'Reset Password',
            html: `<p>You requested to reset your password. Click the link to reset:</p>
                   <p><a href="${`${process.env.FRONTEND_URL}/auth?type=reset&token=${token}`}">${`${process.env.FRONTEND_URL}/auth?type=reset&token=${token}`}</a></p>`
        })
            .then(_ => {
                reply.status(200).send({
                    success: true,
                    message: `Reset password link sent to your email${username ? (': ' + user[0].email) : ''}`
                })
            })
            .catch(_ => { throw new ErrorHandler(400, false, 'Failed to send reset password mail') })
    } catch (err) {
        await connection.rollback()
        return catchError(reply, err)
    } finally {
        connection.release()
    }
}

exports.setPassword = async (fastify, request, reply) => {
    const { token, password } = request.body

    const connection = await fastify.mysql.getConnection()
    try {
        await connection.beginTransaction()

        const [reset] = await connection.query('SELECT * FROM reset WHERE token=? AND expiry>?', [token, new Date()])
        if (!reset.length) throw new ErrorHandler(400, false, 'Invalid or expired token')

        const hashedPassword = await hash(password, 10)

        await connection.query('UPDATE users SET password=? WHERE username=?', [hashedPassword, reset[0].username])
        await connection.query('DELETE FROM reset WHERE username=?', [reset[0].username])

        const [updatedUser] = await connection.query('SELECT * FROM users WHERE username=?', [reset[0].username])
        if (!updatedUser.length) throw new ErrorHandler(400, false, 'Account does not exists')

        const cacheKeys = [`user:${updatedUser[0].username}`, `user:${updatedUser[0].email}`]
        await Promise.all(cacheKeys.map(cacheKey =>
            fastify.cache.set(cacheKey, updatedUser[0], 432000, (err) => {
                if (err) throw new ErrorHandler(400, false, 'Failed to set data in cache')
            })
        ))

        const jwt = await new Promise((resolve, reject) => {
            sign({ userId: updatedUser[0].username }, process.env.JWT_SECRET, { expiresIn: '12h' }, (err, token) => {
                if (err) reject(err)
                else resolve(token)
            })
        })

        await connection.commit()

        reply.status(200).send({
            success: true,
            message: 'Password set successfully',
            data: {
                user: { ...(({ password, ...rest }) => rest)(updatedUser[0]) },
                token: jwt
            }
        })
    } catch (err) {
        await connection.rollback()
        return catchError(reply, err)
    } finally {
        connection.release()
    }
}