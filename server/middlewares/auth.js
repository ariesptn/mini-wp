const jwt = require('jsonwebtoken')
const models = require('../models')

async function authentication(req, res, next) {
    try {
        let decoded = jwt.verify(req.headers.token, process.env.JWT_SECRET)
        if (decoded) {
            let userData = await models.User.findOne({ email: decoded.email })
            if (userData) {
                req.auth = decoded
                next()
            } else {
                throw { message: 'unauthorized user' }
            }
        } else {
            throw { message: 'authentication error' }
        }
    } catch (err) {
        res.status(401).json(err)
        console.log(err)
    }
}

module.exports = { authentication, }
