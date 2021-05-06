import React, { useEffect } from 'react'
import { Button, Row, Col, ListGroup, Image, Card } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

import CheckoutStepper from '../components/CheckoutStepper'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { createOrder } from '../redux/actions/orders'
import { clearCartItems } from '../redux/actions/cart'
import Meta from '../components/Meta'

const PlaceOrderScreen = ({ history }) => {
    const dispatch = useDispatch()
    const { cartItems, shippingAddress, paymentMethod } = useSelector(
        (state) => state.cart
    )
    const { loading, error, order, success } = useSelector((state) => state.orderCreate)

    const addDecimals = (num) => (Math.round(num * 100) / 100).toFixed(2)

    // calculating various prices
    const itemsPrice = cartItems.reduce((acc, curr) => acc + curr.price * curr.qty, 0)
    const prices = {
        itemsPrice: addDecimals(itemsPrice.toFixed(2)),
        shippingPrice: addDecimals(itemsPrice > 500 ? 0 : 50),
        taxPrice: addDecimals(Number((0.15 * itemsPrice).toFixed(2))),
    }
    const totalPrice = addDecimals(
        Number(prices.itemsPrice) + Number(prices.shippingPrice) + Number(prices.taxPrice)
    )

    useEffect(() => {
        if (success) {
            history.push(`/orders/${order._id}`)
        }
    }, [history, success])

    const handlePlaceOrder = () => {
        dispatch(
            createOrder({
                orderItems: cartItems,
                shippingAddress,
                paymentMethod,
                itemsPrice: prices.itemsPrice,
                shippingPrice: prices.shippingPrice,
                taxPrice: prices.taxPrice,
                totalPrice,
            })
        )
        dispatch(clearCartItems())
    }

    return (
        <>
            <Meta title="Order Summary | YupKart" />

            <CheckoutStepper step1 step2 step3 step4 />
            <Row>
                <Col md={8}>
                    <ListGroup variant="flush">
                        <ListGroup.Item>
                            <h2>Shipping Address</h2>
                            <p>
                                <strong>Address: </strong>
                                {shippingAddress.address}, {shippingAddress.city} -
                                {shippingAddress.postalCode}, {shippingAddress.country}
                            </p>
                        </ListGroup.Item>

                        <ListGroup.Item>
                            <h2>Payment Method</h2>
                            <p>
                                <strong>Method: </strong>
                                {paymentMethod}
                            </p>
                        </ListGroup.Item>

                        <ListGroup.Item>
                            <h2>Ordered Items</h2>
                            {cartItems.length === 0 ? (
                                <Message>Your cart is empty</Message>
                            ) : (
                                <ListGroup variant="flush">
                                    {cartItems.map((item, index) => (
                                        <ListGroup.Item key={index}>
                                            <Row>
                                                <Col md={1}>
                                                    <Image
                                                        src={item.image}
                                                        alt={item.name}
                                                        fluid
                                                        rounded
                                                    />
                                                </Col>
                                                <Col>
                                                    <Link
                                                        to={`/product/${item.productID}`}
                                                    >
                                                        {item.name}
                                                    </Link>
                                                </Col>
                                                <Col md={4}>
                                                    {item.qty} x ${item.price} = $
                                                    {Number(
                                                        item.qty * item.price
                                                    ).toFixed(2)}
                                                </Col>
                                            </Row>
                                        </ListGroup.Item>
                                    ))}
                                </ListGroup>
                            )}
                        </ListGroup.Item>
                    </ListGroup>
                </Col>

                <Col md={4}>
                    <Card>
                        <ListGroup variant="flush">
                            <ListGroup.Item>
                                <h2>Order Summary</h2>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Row>
                                    <Col>Items</Col>
                                    <Col>${prices.itemsPrice}</Col>
                                </Row>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Row>
                                    <Col>Shipping</Col>
                                    <Col>${prices.shippingPrice}</Col>
                                </Row>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Row>
                                    <Col>Tax</Col>
                                    <Col>${prices.taxPrice}</Col>
                                </Row>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Row>
                                    <Col>Total</Col>
                                    <Col>${totalPrice}</Col>
                                </Row>
                            </ListGroup.Item>

                            {error && (
                                <ListGroup.Item>
                                    <Message variant="danger">{error}</Message>
                                </ListGroup.Item>
                            )}

                            {loading && <Loader />}

                            <ListGroup.Item>
                                <Button
                                    type="button"
                                    className="btn-block"
                                    disabled={cartItems.length === 0}
                                    onClick={handlePlaceOrder}
                                >
                                    Place Order
                                </Button>
                            </ListGroup.Item>
                        </ListGroup>
                    </Card>
                </Col>
            </Row>
        </>
    )
}

export default PlaceOrderScreen
