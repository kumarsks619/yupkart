import React, { useEffect } from 'react'
import { LinkContainer } from 'react-router-bootstrap'
import { Table, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'

import Loader from '../components/Loader'
import Message from '../components/Message'
import { listAllOrders } from '../redux/actions/orders'
import Meta from '../components/Meta'

const OrdersListScreen = ({ history }) => {
    const dispatch = useDispatch()
    const { loading, error, orders } = useSelector((state) => state.orderListAll)
    const { userInfo } = useSelector((state) => state.userLogin)

    useEffect(() => {
        if (userInfo && userInfo.isAdmin) {
            dispatch(listAllOrders())
        } else {
            history.push('/login')
        }
    }, [dispatch, userInfo])

    return (
        <>
            <Meta title="Orders | Admin | YupKart" />

            <h1>Orders</h1>
            {loading ? (
                <Loader />
            ) : error ? (
                <Message variant="danger">{error}</Message>
            ) : (
                <>
                    <Table striped bordered hover responsive className="table-sm">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>USER</th>
                                <th>DATE</th>
                                <th>TOTAL</th>
                                <th>PAID</th>
                                <th>DELIVERED</th>
                                <th>ACTION</th>
                            </tr>
                        </thead>
                        <tbody>
                            {orders.map((order) => (
                                <tr key={order._id}>
                                    <td>{order._id}</td>
                                    <td>{order.userID && order.userID.name}</td>
                                    <td>{order.createdAt.substring(0, 10)}</td>
                                    <td>${order.totalPrice}</td>
                                    <td>
                                        {order.isPaid ? (
                                            <>
                                                <i
                                                    className="fas fa-check"
                                                    style={{ color: 'green' }}
                                                ></i>
                                                {order.paidAt.substring(0, 10)}
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
                                            <Button variant="light" className="btn-sm">
                                                Details
                                            </Button>
                                        </LinkContainer>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                </>
            )}
        </>
    )
}

export default OrdersListScreen
