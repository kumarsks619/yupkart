const jwt = require('jsonwebtoken')
const asyncHandler = require('express-async-handler')

const User = require('../models/User')

const protect = asyncHandler(async (req, res, next) => {
    let token
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            token = req.headers.authorization.split(' ')[1]
            const decodedToken = jwt.verify(token, process.env.JWT_SECRET)
            req.authUser = await User.findById(decodedToken.userID).select('-password')

            next()
        } catch (err) {
            console.error(err.message)
            res.status(401)
            throw new Error('Not authorized, Invalid/Expired token!!! Login again.')
        }
    }

    if (!token) {
        res.status(401)
        throw new Error('Not authorized, No token')
    }
})

const protectAdmin = (req, res, next) => {
    if (req.authUser && req.authUser.isAdmin) {
        next()
    } else {
        res.status(401)
        throw new Error('Not authorized as an admin')
    }
}

module.exports = { protect, protectAdmin }
