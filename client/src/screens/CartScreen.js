import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { Row, Col, Form, Button, Image, ListGroup, Card } from 'react-bootstrap'
import Meta from '../components/Meta'

import Message from '../components/Message'
import { addToCart, removeFromCart } from '../redux/actions/cart'

const CartScreen = ({ match, location, history }) => {
    const productID = match.params.productID
    const qty = location.search ? Number(location.search.split('=')[1]) : 1

    const dispatch = useDispatch()
    const { cartItems } = useSelector((state) => state.cart)

    useEffect(() => {
        if (productID) dispatch(addToCart(productID, qty))
    }, [dispatch, productID, qty])

    const handleRemoveFromCart = (productID) => {
        dispatch(removeFromCart(productID))
    }

    const handleCheckout = () => {
        history.push('/login?redirect=shipping')
    }

    return (
        <>
            <Meta title="YupKart | My Cart" />

            <Row>
                <Col md={8}>
                    <h1>Shopping Cart</h1>
                    {cartItems.length === 0 ? (
                        <>
                            <Message>You cart is empty.</Message>
                            <span
                                onClick={() => history.goBack()}
                                className="btn btn-light"
                            >
                                Go Back
                            </span>
                        </>
                    ) : (
                        <ListGroup variant="flush">
                            {cartItems.map((item) => (
                                <ListGroup.Item key={item.productID}>
                                    <Row>
                                        <Col md={2}>
                                            <Image
                                                src={item.image}
                                                alt={item.name}
                                                fluid
                                                rounded
                                            />
                                        </Col>
                                        <Col md={3}>
                                            <Link to={`/product/${item.productID}`}>
                                                {item.name}
                                            </Link>
                                        </Col>
                                        <Col md={2}>${item.price}</Col>
                                        <Col md={2}>
                                            <Form.Control
                                                as="select"
                                                value={item.qty}
                                                onChange={(e) =>
                                                    dispatch(
                                                        addToCart(
                                                            item.productID,
                                                            Number(e.target.value)
                                                        )
                                                    )
                                                }
                                            >
                                                {new Array(item.countInStock)
                                                    .fill(0)
                                                    .map((_, i) => (
                                                        <option key={i + 1} value={i + 1}>
                                                            {i + 1}
                                                        </option>
                                                    ))}
                                            </Form.Control>
                                        </Col>
                                        <Col md={2}>
                                            <Button
                                                type="button"
                                                variant="light"
                                                onClick={() =>
                                                    handleRemoveFromCart(item.productID)
                                                }
                                            >
                                                <i className="fas fa-trash"></i>
                                            </Button>
                                        </Col>
                                    </Row>
                                </ListGroup.Item>
                            ))}
                        </ListGroup>
                    )}
                    {cartItems.length !== 0 && (
                        <Link to="/" className="btn btn-dark my-3">
                            Buy More
                        </Link>
                    )}
                </Col>

                <Col md={4}>
                    <Card>
                        <ListGroup variant="flush">
                            <ListGroup.Item>
                                <h2>
                                    Subtotal (
                                    {cartItems.reduce((acc, curr) => acc + curr.qty, 0)})
                                    items
                                </h2>
                                $
                                {cartItems
                                    .reduce((acc, curr) => acc + curr.qty * curr.price, 0)
                                    .toFixed(2)}
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Button
                                    type="button"
                                    className="btn btn-block"
                                    disabled={cartItems.length === 0}
                                    onClick={handleCheckout}
                                >
                                    Proceed To Checkout
                                </Button>
                            </ListGroup.Item>
                        </ListGroup>
                    </Card>
                </Col>
            </Row>
        </>
    )
}

export default CartScreen
