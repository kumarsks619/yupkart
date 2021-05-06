const express = require('express')

const {
    addOrderItems,
    getOrderByID,
    updateOrderToPaid,
    getMyOrders,
    getAllOrders,
    updateOrderToDelivered,
} = require('../controllers/orders')
const { protect, protectAdmin } = require('../middleware/auth')

const router = express.Router()

// @desc    Create new order       |    Get all the orders
// @route   GET /api/orders        |    GET /api/orders
// @access  Private                |    Private/ADMIN
router.route('/').post(protect, addOrderItems).get(protect, protectAdmin, getAllOrders)

// @desc    Get logged in user's orders
// @route   PUT /api/orders/my-orders
// @access  Private
router.route('/my-orders').get(protect, getMyOrders)

// @desc    Create an order by ID
// @route   GET /api/orders/:orderID
// @access  Private
router.route('/:orderID').get(protect, getOrderByID)

// @desc    Update order status to Paid
// @route   PUT /api/orders/:orderID/pay
// @access  Private
router.route('/:orderID/pay').put(protect, updateOrderToPaid)

// @desc    Update order status to Delivered
// @route   PUT /api/orders/:orderID/deliver
// @access  Private/ADMIN
router.route('/:orderID/deliver').put(protect, protectAdmin, updateOrderToDelivered)

module.exports = router
