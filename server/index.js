require('dotenv').config()
const express = require('express')
require('colors')
const path = require('path')
const morgan = require('morgan')
const cors = require('cors')

const connectDB = require('./config/db')
const productRoutes = require('./routes/products')
const userRoutes = require('./routes/users')
const orderRoutes = require('./routes/orders')
const uploadRoute = require('./routes/upload')
const passwordResetRoutes = require('./routes/passwordReset')
const { notFoundHandler, errorHandler } = require('./middleware/errorHandler')

connectDB()

const app = express()

// morgan is used to log http requests in the console
if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'))
}

app.use(express.json())
app.use(cors())

app.get('/', (req, res) => {
    res.send('<h1>YupKart backend is up and running...</h1>')
})

app.use('/api/products', productRoutes)
app.use('/api/users', userRoutes)
app.use('/api/orders', orderRoutes)
app.use('/api/upload', uploadRoute)
app.use('/api/password-reset', passwordResetRoutes)

// to get the paypal client ID from backend from the env (just to keep it safe, we put it in the backend)
app.get('/api/config/paypal', (req, res) => res.send(process.env.PAYPAL_CLIENT_ID))

// to make the uploads folder accessible by the browser, we need to make it static
// const __dirname = path.resolve()         // when es6 import syntax is used then we need to do this also
app.use('/uploads', express.static(path.join(__dirname, '/uploads')))

app.use(notFoundHandler)
app.use(errorHandler)

const PORT = process.env.PORT || 5000

app.listen(PORT, () => {
    console.log(`Server running at port: ${PORT}`.bgGreen.bold)
})
