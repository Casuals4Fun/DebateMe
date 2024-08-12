const { verify } = require('jsonwebtoken')

async function verifyToken(request, reply) {
    const authHeader = request.headers.authorization
    if (!authHeader) throw new Error('Authorization header is missing')

    const token = authHeader.split(' ')[1]
    try {
        const data = await new Promise((resolve, reject) => {
            verify(token, process.env.JWT_SECRET, (err, payload) => {
                if (err) reject(err)
                else resolve(payload)
            })
        })
        request.user = data
    } catch (err) {
        throw new Error('Invalid token')
    }
}

module.exports = verifyToken