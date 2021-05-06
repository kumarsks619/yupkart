const asyncHandler = require('express-async-handler')

const Order = require('../models/Order')

// @desc    Create new order
// @route   GET /api/orders
// @access  Private
const addOrderItems = asyncHandler(async (req, res) => {
    const {
        orderItems,
        shippingAddress,
        paymentMethod,
        itemsPrice,
        taxPrice,
        shippingPrice,
        totalPrice,
    } = req.body

    if (orderItems && orderItems.length === 0) {
        res.status(400)
        throw new Error('No order items')
    } else {
        const newOrder = new Order({
            userID: req.authUser._id,
            orderItems,
            shippingAddress,
            paymentMethod,
            itemsPrice,
            taxPrice,
            shippingPrice,
            totalPrice,
        })

        const createdOrder = await newOrder.save()
        res.status(201).send(createdOrder)
    }
})

// @desc    Create an order by ID
// @route   GET /api/orders/:orderID
// @access  Private
const getOrderByID = asyncHandler(async (req, res) => {
    const foundOrder = await Order.findById(req.params.orderID).populate(
        'userID',
        'name email'
    )

    if (foundOrder) {
        // checking if the logged in user is either the owner of the order or an admin
        if (
            req.authUser.isAdmin ||
            req.authUser._id.toString() === foundOrder.userID._id.toString()
        ) {
            res.send(foundOrder)
        } else {
            res.status(400)
            throw new Error(
                "You can't access other's orders until or unless you are an admin"
            )
        }
    } else {
        res.status(404)
        throw new Error('Order not found')
    }
})

// @desc    Update order status to Paid
// @route   PUT /api/orders/:orderID/pay
// @access  Private
const updateOrderToPaid = asyncHandler(async (req, res) => {
    const foundOrder = await Order.findById(req.params.orderID)

    if (foundOrder) {
        // checking if the logged in user is the owner of the order
        if (req.authUser._id.toString() === foundOrder.userID.toString()) {
            foundOrder.isPaid = true
            foundOrder.paidAt = Date.now()
            foundOrder.paymentResult = {
                id: req.body.paymentID,
                status: req.body.paymentStatus,
                update_time: req.body.paymentUpdateTime,
                email_address: req.body.paymentEmail,
            }

            const updatedOrder = await foundOrder.save()

            res.send(updatedOrder)
        } else {
            res.status(400)
            throw new Error("You can't pay for other's order")
        }
    } else {
        res.status(404)
        throw new Error('Order not found')
    }
})

// @desc    Update order status to Delivered
// @route   PUT /api/orders/:orderID/deliver
// @access  Private/ADMIN
const updateOrderToDelivered = asyncHandler(async (req, res) => {
    const foundOrder = await Order.findById(req.params.orderID)

    if (foundOrder) {
        // checking if the logged in user is an admin
        if (req.authUser.isAdmin) {
            foundOrder.isDelivered = true
            foundOrder.deliveredAt = Date.now()

            const updatedOrder = await foundOrder.save()

            res.send(updatedOrder)
        } else {
            res.status(400)
            throw new Error('You must be an admin to change the delivered status')
        }
    } else {
        res.status(404)
        throw new Error('Order not found')
    }
})

// @desc    Get logged in user orders
// @route   GET /api/orders/my-orders
// @access  Private
const getMyOrders = asyncHandler(async (req, res) => {
    const foundOrders = await Order.find({ userID: req.authUser._id })
    res.send(foundOrders)
})

// @desc    Get all the orders
// @route   GET /api/orders
// @access  Private/ADMIN
const getAllOrders = asyncHandler(async (req, res) => {
    const foundOrders = await Order.find({}).populate('userID', '_id name')
    res.send(foundOrders)
})

module.exports = {
    addOrderItems,
    getOrderByID,
    updateOrderToPaid,
    updateOrderToDelivered,
    getMyOrders,
    getAllOrders,
}
