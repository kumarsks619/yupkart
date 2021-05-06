import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Form, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'

import Loader from '../components/Loader'
import Message from '../components/Message'
import { getUserDetails, updateAnyUser } from '../redux/actions/users'
import FormContainer from '../components/FormContainer'
import { USER_UPDATE_RESET } from '../redux/actionTypes/users'
import Meta from '../components/Meta'

const UserEditScreen = ({ match, history }) => {
    const userID = match.params.userID
    const dispatch = useDispatch()

    const { loading, error, user } = useSelector((state) => state.userDetails)
    const {
        loading: loadingUpdate,
        error: errorUpdate,
        success: successUpdate,
    } = useSelector((state) => state.userUpdate)

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [isAdmin, setIsAdmin] = useState(false)

    useEffect(() => {
        if (successUpdate) {
            dispatch({ type: USER_UPDATE_RESET })
            history.push('/admin/users-list')
        } else {
            if (!user.name || user._id !== userID) {
                dispatch(getUserDetails(userID))
            } else {
                setName(user.name)
                setEmail(user.email)
                setIsAdmin(user.isAdmin)
            }
        }
    }, [dispatch, userID, user, successUpdate, history])

    const handleRegister = (e) => {
        e.preventDefault()
        dispatch(
            updateAnyUser({
                userID,
                name,
                email: user.email === email ? '' : email,
                isAdmin,
            })
        )
    }

    return (
        <>
            <Link to="/admin/users-list" className="btn btn-light my-3">
                Go Back
            </Link>

            <FormContainer>
                <h1>Edit User</h1>
                {loadingUpdate && <Loader />}
                {errorUpdate && <Message variant="danger">{errorUpdate}</Message>}

                {loading ? (
                    <Loader />
                ) : error ? (
                    <Message variant="danger">{error}</Message>
                ) : (
                    <>
                        <Meta title={`Edit ${name}'s Profile | YupKart`} />

                        <Form onSubmit={handleRegister}>
                            <Form.Group controlId="name">
                                <Form.Label>Full Name</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Enter Name"
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
                            <Form.Group controlId="isAdmin">
                                <Form.Check
                                    type="checkbox"
                                    label="Is Admin"
                                    checked={isAdmin}
                                    onChange={(e) => setIsAdmin(e.target.checked)}
                                ></Form.Check>
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

export default UserEditScreen
