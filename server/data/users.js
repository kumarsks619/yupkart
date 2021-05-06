const bcrypt = require('bcryptjs')

const users = [
    {
        name: 'Admin User',
        email: 'admin@gmail.com',
        password: bcrypt.hashSync('admin', 13),
        isAdmin: true,
    },
    {
        name: 'Batook Singh',
        email: 'batook@gmail.com',
        password: bcrypt.hashSync('12345', 13),
    },
    {
        name: 'Bubble Singh',
        email: 'bubble@gmail.com',
        password: bcrypt.hashSync('12345', 13),
    },
]

module.exports = users
