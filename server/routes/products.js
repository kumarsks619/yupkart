const express = require('express')

const {
    getProducts,
    getProductByID,
    deleteProduct,
    updateProduct,
    createProduct,
    createProductReview,
    getTopRatedProducts,
} = require('../controllers/products')
const { protect, protectAdmin } = require('../middleware/auth')

const router = express.Router()

// @desc    Fetch all products          |       Create a product
// @route   GET /api/products           |       POST /api/products
// @access  Public                      |       Private/ADMIN
router.route('/').get(getProducts).post(protect, protectAdmin, createProduct)

// @desc    Fetch single product            |  Delete a product                 |  Update a product
// @route   GET /api/products/:productID    |  DELETE /api/products/:productID  |  PUT /api/products/:productID
// @access  Public                          |  Private/ADMIN                    |  Private/ADMIN
router
    .route('/:productID')
    .get(getProductByID)
    .delete(protect, protectAdmin, deleteProduct)
    .put(protect, protectAdmin, updateProduct)

// @desc    Create new review
// @route   POST /api/products/:productID/reviews
// @access  Private
router.route('/:productID/reviews').post(protect, createProductReview)

// @desc    Create top rated products
// @route   GET /api/products/top-rated
// @access  Public
router.route('/rated/top').get(getTopRatedProducts)

module.exports = router
