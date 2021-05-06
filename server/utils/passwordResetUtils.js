const nodemailer = require('nodemailer')

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_LOGIN,
        pass: process.env.EMAIL_PASSWORD,
    },
})

const getPasswordResetURL = (user, token) =>
    `${process.env.CLIENT_URL}/password-reset/${user._id}/${token}`

const resetPasswordTemplate = (user, url) => {
    const from = process.env.EMAIL_LOGIN
    const to = user.email
    const subject = '🌻 YupKart Password Reset 🌻'
    const html = `
  <p>Hey ${user.name},</p>
  <p>We heard that you lost your YupKart password. Sorry about that!</p>
  <p>But don’t worry! You can use the following link to reset your password:</p>
  <a href=${url}>${url}</a>
  <p>If you don’t use this link within 1 hour, it will expire.</p>
  <p>Thanks & Regards!</p>
  <p>-WanderLust</p>
  `

    return { from, to, subject, html }
}

module.exports = {
    transporter,
    getPasswordResetURL,
    resetPasswordTemplate,
}
