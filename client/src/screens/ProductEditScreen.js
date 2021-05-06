import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Form, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'

import Loader from '../components/Loader'
import Message from '../components/Message'
import { fetchProduct, updateProduct } from '../redux/actions/products'
import FormContainer from '../components/FormContainer'
import { PRODUCT_UPDATE_RESET } from '../redux/actionTypes/products'
import Meta from '../components/Meta'
import API_URL from '../redux/url'

const ProductEditScreen = ({ match, history }) => {
    const productID = match.params.productID
    const dispatch = useDispatch()

    const { loading, error, product } = useSelector((state) => state.productDetails)
    const {
        loading: loadingUpdate,
        error: errorUpdate,
        success: successUpdate,
    } = useSelector((state) => state.productUpdate)

    const [name, setName] = useState('')
    const [price, setPrice] = useState(0)
    const [image, setImage] = useState('')
    const [brand, setBrand] = useState('')
    const [category, setCategory] = useState('')
    const [description, setDescription] = useState('')
    const [countInStock, setCountInStock] = useState(0)
    const [isUploading, setIsUploading] = useState(false)

    useEffect(() => {
        if (successUpdate) {
            dispatch({ type: PRODUCT_UPDATE_RESET })
            history.push('/admin/products-list')
        } else {
            if (!product || !product.name || product._id !== productID) {
                dispatch(fetchProduct(productID))
            } else {
                setName(product.name)
                setPrice(product.price)
                setImage(product.image)
                setBrand(product.brand)
                setCategory(product.category)
                setDescription(product.description)
                setCountInStock(product.countInStock)
            }
        }
    }, [dispatch, productID, product, successUpdate])

    const handleImageUpload = async (e) => {
        const file = e.target.files[0]
        const formData = new FormData()
        formData.append('image', file)
        setIsUploading(true)

        try {
            const config = {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            }

            const { data } = await axios.post(`${API_URL}/api/upload`, formData, config)

            setImage(data)
            setIsUploading(false)
        } catch (err) {
            console.error(err)
            setIsUploading(false)
        }
    }

    const handleProductUpdate = (e) => {
        e.preventDefault()
        dispatch(
            updateProduct({
                productID,
                name,
                price,
                image: `${API_URL}${image}`,
                brand,
                category,
                description,
                countInStock,
            })
        )
    }

    return (
        <>
            <Link to="/admin/products-list" className="btn btn-light my-3">
                Go Back
            </Link>

            <FormContainer>
                <h1>Edit Product</h1>

                {loadingUpdate && <Loader />}
                {errorUpdate && <Message variant="danger">{errorUpdate}</Message>}

                {loading ? (
                    <Loader />
                ) : error ? (
                    <Message variant="danger">{error}</Message>
                ) : (
                    <>
                        <Meta title={`Edit ${product.name} | YupKart`} />

                        <Form onSubmit={handleProductUpdate}>
                            <Form.Group controlId="name">
                                <Form.Label>Product Name</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Enter Product Name"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                ></Form.Control>
                            </Form.Group>

                            <Form.Group controlId="price">
                                <Form.Label>Price</Form.Label>
                                <Form.Control
                                    type="number"
                                    placeholder="Enter Price"
                                    value={price}
                                    onChange={(e) => setPrice(e.target.value)}
                                ></Form.Control>
                            </Form.Group>

                            <Form.Group controlId="image">
                                <Form.Label>Image</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Enter Image URL"
                                    value={image}
                                    onChange={(e) => setImage(e.target.value)}
                                ></Form.Control>
                                <Form.File
                                    id="image-file"
                                    label="Choose an image"
                                    custom
                                    onChange={handleImageUpload}
                                ></Form.File>
                                {isUploading && <Loader />}
                            </Form.Group>

                            <Form.Group controlId="brand">
                                <Form.Label>Brand</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Enter Brand"
                                    value={brand}
                                    onChange={(e) => setBrand(e.target.value)}
                                ></Form.Control>
                            </Form.Group>

                            <Form.Group controlId="category">
                                <Form.Label>Category</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Enter Category"
                                    value={category}
                                    onChange={(e) => setCategory(e.target.value)}
                                ></Form.Control>
                            </Form.Group>

                            <Form.Group controlId="description">
                                <Form.Label>Description</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Enter Brief Description"
                                    value={description}
                                    onChange={(e) => setDescription(e.target.value)}
                                ></Form.Control>
                            </Form.Group>

                            <Form.Group controlId="countInStock">
                                <Form.Label>Count in Stock</Form.Label>
                                <Form.Control
                                    type="number"
                                    placeholder="Enter Count in Stock"
                                    value={countInStock}
                                    onChange={(e) => setCountInStock(e.target.value)}
                                ></Form.Control>
                            </Form.Group>

                            <Button type="submit" variant="primary">
                                Update
                            </Button>
                        </Form>
                    </>
                )}
            </FormContainer>
        </>
    )
}

export default ProductEditScreen
