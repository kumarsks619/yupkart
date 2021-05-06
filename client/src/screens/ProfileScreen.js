import React, { useState, useEffect } from 'react'
import { Form, Button, Row, Col, Table } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { LinkContainer } from 'react-router-bootstrap'

import Loader from '../components/Loader'
import Message from '../components/Message'
import { getUserDetails, updateUserProfile } from '../redux/actions/users'
import { listMyOrders } from '../redux/actions/orders'
import Meta from '../components/Meta'

const ProfileScreen = ({ history }) => {
    const dispatch = useDispatch()
    const { userInfo } = useSelector((state) => state.userLogin)
    const { loading, error, user } = useSelector((state) => state.userDetails)
    const { error: updateError, success } = useSelector(
        (state) => state.userProfileUpdate
    )
    const { loading: loadingOrders, error: errorOrders, orders } = useSelector(
        (state) => state.orderMyList
    )

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [message, setMessage] = useState(null)

    // to check if a user is logged in or not
    useEffect(() => {
        if (!userInfo) history.push('/login')
        else {
            dispatch(getUserDetails('profile'))
            dispatch(listMyOrders())
        }
    }, [dispatch, history, userInfo])

    // to check if the profile details are set or not
    useEffect(() => {
        if (!user || !user.name) {
            dispatch(getUserDetails('profile'))
        } else {
            setName(user.name)
            setEmail(user.email)
        }
    }, [dispatch, user])

    // to re-fetch the user's profile details after the profile is updated successfully
    useEffect(() => {
        if (success) dispatch(getUserDetails('profile'))
    }, [success])

    const handleProfileUpdate = (e) => {
        e.preventDefault()
        if (password !== confirmPassword) setMessage('Passwords do not match')
        else {
            setMessage('')
            dispatch(
                updateUserProfile({
                    userID: user.userID,
                    name,
                    email: userInfo.email === email ? '' : email,
                    password,
                })
            )
        }
    }

    return (
        <>
            <Meta title={`${name}'s Profile | YupKart`} />

            <Row>
                <Col md={3}>
                    <h2>User Profile</h2>

                    {message && <Message variant="danger">{message}</Message>}
                    {error && <Message variant="danger">{error}</Message>}
                    {updateError && <Message variant="danger">{updateError}</Message>}
                    {success && (
                        <Message variant="success">Profile updated successfully.</Message>
                    )}
                    {loading && <Loader />}

                    <Form onSubmit={handleProfileUpdate}>
                        <Form.Group controlId="name">
                            <Form.Label>Full Name</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter Your Name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            ></Form.Control>
                        </Form.Group>
                        <Form.Group controlId="email">
                            <Form.Label>Email Address</Form.Label>
                            <Form.Control
                                type="email"
                                placeholder="Enter Email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            ></Form.Control>
                        </Form.Group>
                        <Form.Group controlId="password">
                            <Form.Label>Password</Form.Label>
                            <Form.Control
                                type="password"
                                placeholder="Enter Password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            ></Form.Control>
                        </Form.Group>
                        <Form.Group controlId="confirmPassword">
                            <Form.Label>Confirm Password</Form.Label>
                            <Form.Control
                                type="password"
                                placeholder="Re-enter the Password"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                            ></Form.Control>
                        </Form.Group>
                        <Button type="submit" variant="primary">
                            Update
                        </Button>
                    </Form>
                </Col>
                <Col md={9}>
                    <h2>My Orders</h2>
                    {loadingOrders ? (
                        <Loader />
                    ) : errorOrders ? (
                        <Message variant="danger">{errorOrders}</Message>
                    ) : orders.length === 0 ? (
                        <Message variant="info">You have no orders.</Message>
                    ) : (
                        <Table striped bordered hover responsive className="table-sm">
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>DATE</th>
                                    <th>TOTAL</th>
                                    <th>PAID</th>
                                    <th>DELIVERED</th>
                                    <th>DETAILS</th>
                                </tr>
                            </thead>
                            <tbody>
                                {orders.map((order) => (
                                    <tr key={order._id}>
                                        <td>{order._id}</td>
                                        <td>{order.createdAt.substring(0, 10)}</td>
                                        <td>${order.totalPrice}</td>
                                        <td>
                                            {order.isPaid ? (
                                                <>
                                                    <i
                                                        className="fas fa-check"
                                                        style={{ color: 'green' }}
                                                    ></i>
                                                    {order.paidAt.substring(0, 10)}{' '}
                                                </>
                                            ) : (
                                                <i
                                                    className="fas fa-times"
                                                    style={{ color: 'red' }}
                                                ></i>
                                            )}
                                        </td>
                                        <td>
                                            {order.isDelivered ? (
                                                <>
                                                    <i
                                                        className="fas fa-check"
                                                        style={{ color: 'green' }}
                                                    ></i>
                                                    {order.deliveredAt.substring(0, 10)}
                                                </>
                                            ) : (
                                                <i
                                                    className="fas fa-times"
                                                    style={{ color: 'red' }}
                                                ></i>
                                            )}
                                        </td>
                                        <td>
                                            <LinkContainer to={`/orders/${order._id}`}>
                                                <Button
                                                    variant="light"
                                                    className="btn-sm"
                                                >
                                                    Details
                                                </Button>
                                            </LinkContainer>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </Table>
                    )}
                </Col>
            </Row>
        </>
    )
}

export default ProfileScreen
