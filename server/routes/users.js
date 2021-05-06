const express = require('express')

const {
    authUser,
    registerUser,
    getUserProfile,
    updateUserProfile,
    getUsers,
    deleteUser,
    getUserByID,
    updateAnyUser,
} = require('../controllers/users')
const { protect, protectAdmin } = require('../middleware/auth')

const router = express.Router()

// @desc    Auth user and get token
// @route   POST /api/users/login
// @access  Public
router.route('/login').post(authUser)

// @desc    Get a user's profile        |       Update a user's profile
// @route   GET /api/users/profile      |       PUT /api/users/profile
// @access  Private                     |       Private
router.route('/profile').get(protect, getUserProfile).put(protect, updateUserProfile)

// @desc    Create a new user           |       Get all users
// @route   POST /api/users             |       GET api/users
// @access  Public                      |       Private/ADMIN
router.route('/').post(registerUser).get(protect, protectAdmin, getUsers)

// @desc    Delete a user
// @route   DELETE /api/users/:userID
// @access  Private/ADMIN
router
    .route('/:userID')
    .delete(protect, protectAdmin, deleteUser)
    .get(protect, protectAdmin, getUserByID)
    .put(protect, protectAdmin, updateAnyUser)

module.exports = router
