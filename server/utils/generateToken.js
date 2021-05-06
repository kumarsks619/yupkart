const jwt = require('jsonwebtoken')

const generateToken = (userID) => jwt.sign({ userID }, process.env.JWT_SECRET, { expiresIn: '1d' })

module.exports = generateToken
