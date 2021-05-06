const asyncHandler = require('express-async-handler')

const User = require('../models/User')
const generateToken = require('../utils/generateToken')

// @desc    Auth user and get token
// @route   POST /api/users/login
// @access  Public
const authUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body

    const foundUser = await User.findOne({ email })

    if (foundUser && (await foundUser.matchPassword(password))) {
        res.send({
            userID: foundUser._id,
            name: foundUser.name,
            email: foundUser.email,
            isAdmin: foundUser.isAdmin,
            token: generateToken(foundUser._id),
        })
    } else {
        res.status(401)
        throw new Error('Invalid email or password')
    }
})

// @desc    Create a new user
// @route   POST /api/users
// @access  Public
const registerUser = asyncHandler(async (req, res) => {
    const { name, email, password } = req.body

    const userExists = await User.findOne({ email })

    if (userExists) {
        res.status(400)
        throw new Error('Email already exists')
    }

    const newUser = await User.create({
        name,
        email,
        password,
    })

    if (newUser) {
        res.status(201).send({
            userID: newUser._id,
            name: newUser.name,
            email: newUser.email,
            isAdmin: newUser.isAdmin,
            token: generateToken(newUser._id),
        })
    } else {
        res.status(400)
        throw new Error('Invalid user data')
    }
})

// @desc    Get a user's profile
// @route   GET /api/users/profile
// @access  Private
const getUserProfile = asyncHandler(async (req, res) => {
    const foundUser = await User.findById(req.authUser._id)

    if (foundUser) {
        res.send({
            userID: foundUser._id,
            name: foundUser.name,
            email: foundUser.email,
            isAdmin: foundUser.isAdmin,
        })
    } else {
        res.status(404)
        throw new Error('User NOT found')
    }
})

// @desc    Update a user's profile
// @route   PUT /api/users/profile
// @access  Private
const updateUserProfile = asyncHandler(async (req, res) => {
    const foundUser = await User.findById(req.authUser._id)

    if (foundUser) {
        foundUser.name = req.body.name || foundUser.name

        if (req.body.email) {
            const userExists = await User.findOne({ email: req.body.email })

            if (userExists) {
                res.status(400)
                throw new Error('Email already exists')
            }

            foundUser.email = req.body.email
        }

        if (req.body.password) {
            foundUser.password = req.body.password
        }

        const updatedUser = await foundUser.save()

        res.send({
            userID: updatedUser._id,
            name: updatedUser.name,
            email: updatedUser.email,
            isAdmin: updatedUser.isAdmin,
            token: generateToken(updatedUser._id),
        })
    } else {
        res.status(404)
        throw new Error('User NOT found')
    }
})

// @desc    Get all users
// @route   GET /api/users
// @access  Private/ADMIN
const getUsers = asyncHandler(async (req, res) => {
    const foundUsers = await User.find({})
    res.send(foundUsers)
})

// @desc    Delete a user
// @route   DELETE /api/users/:userID
// @access  Private/ADMIN
const deleteUser = asyncHandler(async (req, res) => {
    const foundUser = await User.findById(req.params.userID)

    if (foundUser) {
        await foundUser.remove()
        res.send({ message: 'User removed' })
    } else {
        res.status(404)
        throw new Error('User not found')
    }
})

// @desc    Get a user's details by userID
// @route   GET /api/users/:userID
// @access  Private/ADMIN
const getUserByID = asyncHandler(async (req, res) => {
    const foundUser = await User.findById(req.params.userID).select('-password')

    if (foundUser) {
        res.send(foundUser)
    } else {
        res.status(404)
        throw new Error('User not found')
    }
})

// @desc    Update any user's details by Admin
// @route   PUT /api/users/:userID
// @access  Private/ADMIN
const updateAnyUser = asyncHandler(async (req, res) => {
    const foundUser = await User.findById(req.params.userID)

    if (foundUser) {
        foundUser.name = req.body.name || foundUser.name
        foundUser.isAdmin = req.body.isAdmin

        if (req.body.email) {
            const userExists = await User.findOne({ email: req.body.email })

            if (userExists) {
                res.status(400)
                throw new Error('Email already exists')
            }

            foundUser.email = req.body.email
        }

        const updatedUser = await foundUser.save()

        res.send({
            userID: updatedUser._id,
            name: updatedUser.name,
            email: updatedUser.email,
            isAdmin: updatedUser.isAdmin,
        })
    } else {
        res.status(404)
        throw new Error('User NOT found')
    }
})

module.exports = {
    authUser,
    registerUser,
    getUserProfile,
    updateUserProfile,
    getUsers,
    deleteUser,
    getUserByID,
    updateAnyUser,
}
