require('dotenv').config()
require('colors')

const users = require('./data/users')
const products = require('./data/products')
const User = require('./models/User')
const Product = require('./models/Product')
const Order = require('./models/Order')
const connectDB = require('./config/db')

connectDB()

const importData = async () => {
    try {
        await Order.deleteMany()
        await Product.deleteMany()
        await User.deleteMany()

        const createdUsers = await User.insertMany(users)
        const adminUser = createdUsers[0]
        const sampleProducts = products.map((product) => ({
            ...product,
            user: adminUser._id,
        }))
        await Product.insertMany(sampleProducts)

        console.log('Database Reset and Imported successfully!'.green.inverse)
        process.exit()
    } catch (err) {
        console.error(`${err}`.red.inverse)
        process.exit(1)
    }
}

const destroyData = async () => {
    try {
        await Order.deleteMany()
        await Product.deleteMany()
        await User.deleteMany()

        console.log('Database Destroyed!'.red.inverse)
        process.exit()
    } catch (err) {
        console.error(`${err}`.red.inverse)
        process.exit(1)
    }
}

process.argv[2] === '-d' ? destroyData() : importData()
