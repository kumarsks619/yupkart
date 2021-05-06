const express = require('express')

const {
    sendPasswordResetEmail,
    receiveNewPassword,
} = require('../controllers/passwordReset')

const router = express.Router()

router.post('/request-reset/:email', sendPasswordResetEmail)
router.post('/receive-new/:userID/:token', receiveNewPassword)

module.exports = router
