import React, { useEffect } from 'react'
import { LinkContainer } from 'react-router-bootstrap'
import { Table, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'

import Loader from '../components/Loader'
import Message from '../components/Message'
import { fetchUsers, deleteUser } from '../redux/actions/users'
import Meta from '../components/Meta'

const UsersListScreen = ({ history }) => {
    const dispatch = useDispatch()
    const { loading, error, users } = useSelector((state) => state.usersList)
    const { userInfo } = useSelector((state) => state.userLogin)
    const { error: errorDelete, success: successDelete } = useSelector(
        (state) => state.userDelete
    )

    useEffect(() => {
        if (userInfo && userInfo.isAdmin) {
            dispatch(fetchUsers())
        } else {
            history.push('/login')
        }
    }, [dispatch, successDelete, userInfo])

    const handleUserDelete = (userID) => {
        if (window.confirm('Are you sure?')) {
            dispatch(deleteUser(userID))
        }
    }

    return (
        <>
            <Meta title="Users | Admin | YupKart" />

            <h1>Users</h1>
            {loading ? (
                <Loader />
            ) : error ? (
                <Message variant="danger">{error}</Message>
            ) : (
                <>
                    {successDelete && <Message variant="success">User Removed</Message>}
                    {errorDelete && <Message variant="danger">{errorDelete}</Message>}
                    <Table striped bordered hover responsive className="table-sm">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>NAME</th>
                                <th>EMAIL</th>
                                <th>ADMIN</th>
                                <th>ACTIONS</th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.map((user) => (
                                <tr key={user._id}>
                                    <td>{user._id}</td>
                                    <td>{user.name}</td>
                                    <td>
                                        <a href={`mailto:${user.email}`}>{user.email}</a>
                                    </td>
                                    <td>
                                        {user.isAdmin ? (
                                            <i
                                                className="fas fa-check"
                                                style={{ color: 'green' }}
                                            ></i>
                                        ) : (
                                            <i
                                                className="fas fa-times"
                                                style={{ color: 'red' }}
                                            ></i>
                                        )}
                                    </td>
                                    <td>
                                        <LinkContainer
                                            to={`/admin/users/${user._id}/edit`}
                                        >
                                            <Button variant="light" className="btn-sm">
                                                <i className="fas fa-edit"></i>
                                            </Button>
                                        </LinkContainer>
                                        <Button
                                            variant="danger"
                                            className="btn-sm"
                                            onClick={() => handleUserDelete(user._id)}
                                        >
                                            <i className="fas fa-trash"></i>
                                        </Button>
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

export default UsersListScreen
