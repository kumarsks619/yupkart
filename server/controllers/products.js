const asyncHandler = require('express-async-handler')

const Product = require('../models/Product')

// @desc    Fetch all products
// @route   GET /api/products?keyword=<KEYWORD>
// @access  Public
const getProducts = asyncHandler(async (req, res) => {
    const pageSize = 10 // number of products per page
    const pageNum = Number(req.query.pageNum) || 1

    const keyword = req.query.keyword
        ? {
              name: {
                  $regex: req.query.keyword, // regular expression
                  $options: 'i', // case in-sensitive option
              },
          }
        : {}

    const countOfProducts = await Product.countDocuments({ ...keyword }) // total number of products
    const foundProducts = await Product.find({ ...keyword })
        .limit(pageSize) // number of products to fetch
        .skip(pageSize * (pageNum - 1)) // to fetch next products

    res.send({
        foundProducts,
        totalPages: Math.ceil(countOfProducts / pageSize),
    })
})

// @desc    Fetch single product
// @route   GET /api/products/:productID
// @access  Public
const getProductByID = asyncHandler(async (req, res) => {
    const foundProduct = await Product.findById(req.params.productID)
    if (foundProduct) res.send(foundProduct)
    else {
        res.status(404)
        throw new Error('Product NOT found')
    }
})

// @desc    Delete a product
// @route   DELETE /api/products/:productID
// @access  Private/ADMIN
const deleteProduct = asyncHandler(async (req, res) => {
    const foundProduct = await Product.findById(req.params.productID)
    if (foundProduct) {
        await foundProduct.remove()
        res.send({ message: 'Product removed' })
    } else {
        res.status(404)
        throw new Error('Product NOT found')
    }
})

// @desc    Create a product
// @route   POST /api/products
// @access  Private/ADMIN
const createProduct = asyncHandler(async (req, res) => {
    const newProduct = new Product({
        name: 'Sample Name',
        price: 0,
        user: req.authUser._id,
        image: '/images/sample.jpg',
        brand: 'Sample Brand',
        category: 'Sample Category',
        countInStock: 0,
        numOfReviews: 0,
        description: 'Sample Description',
    })

    const createdProduct = await newProduct.save()
    res.status(201).send(createdProduct)
})

// @desc    Update a product
// @route   PUT /api/products/:productID
// @access  Private/ADMIN
const updateProduct = asyncHandler(async (req, res) => {
    const { name, price, description, image, brand, category, countInStock } = req.body

    const foundProduct = await Product.findById(req.params.productID)

    if (foundProduct) {
        foundProduct.name = name
        foundProduct.price = price
        foundProduct.image = image
        foundProduct.brand = brand
        foundProduct.category = category
        foundProduct.description = description
        foundProduct.countInStock = countInStock

        const updatedProduct = await foundProduct.save()
        res.send(updatedProduct)
    } else {
        res.status(404)
        throw new Error('Product not found')
    }
})

// @desc    Create new review
// @route   POST /api/products/:productID/reviews
// @access  Private
const createProductReview = asyncHandler(async (req, res) => {
    const { rating, comment } = req.body

    const foundProduct = await Product.findById(req.params.productID)

    if (foundProduct) {
        const alreadyReviewed = foundProduct.reviews.find(
            (review) => review.user.toString() === req.authUser._id.toString()
        )

        if (alreadyReviewed) {
            res.status(400)
            throw new Error('Product already reviewed')
        }

        const review = {
            name: req.authUser.name,
            rating: Number(rating),
            comment,
            user: req.authUser._id,
        }

        foundProduct.reviews.push(review)

        foundProduct.numReviews = foundProduct.reviews.length

        // calculating the overall rating for the product
        foundProduct.rating =
            foundProduct.reviews.reduce((acc, curr) => curr.rating + acc, 0) /
            foundProduct.reviews.length

        await foundProduct.save()

        res.status(201).send({ message: 'Review added' })
    } else {
        res.status(404)
        throw new Error('Product not found')
    }
})

// @desc    Create top rated products
// @route   GET /api/products/top-rated
// @access  Public
const getTopRatedProducts = asyncHandler(async (req, res) => {
    const foundProducts = await Product.find({}).sort({ rating: -1 }).limit(3)

    res.send(foundProducts)
})

module.exports = {
    getProducts,
    getProductByID,
    deleteProduct,
    createProduct,
    updateProduct,
    createProductReview,
    getTopRatedProducts,
}
