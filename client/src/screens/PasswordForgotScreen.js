import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Form, Button, Row, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'

import Loader from '../components/Loader'
import Message from '../components/Message'
import FormContainer from '../components/FormContainer'
import Meta from '../components/Meta'
import { requestForgot } from '../redux/actions/passwordReset'

const PasswordForgotScreen = () => {
    const dispatch = useDispatch()

    const { loading, error, success } = useSelector((state) => state.passwordForgot)

    const [email, setEmail] = useState('')

    const handleForgotSubmit = (e) => {
        e.preventDefault()
        if (email.trim()) {
            dispatch(requestForgot(email))
        }
    }

    useEffect(() => {
        if (success) {
            setEmail('')
        }
    }, [success])

    return (
        <>
            <Meta title="Forgot Password | YupKart" />

            <FormContainer>
                <h1>Forgot Password</h1>

                <Form onSubmit={handleForgotSubmit}>
                    <Form.Group controlId="email">
                        <Form.Label>Email Address</Form.Label>
                        <Form.Control
                            type="email"
                            placeholder="Enter email associated with your account"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        ></Form.Control>
                    </Form.Group>
                    <Button type="submit" variant="primary" className="mb-3">
                        Submit
                    </Button>
                    {loading && <Loader />}
                    {error && <Message variant="danger">{error}</Message>}
                    {success && (
                        <Message variant="success">
                            Go and check your email inbox.
                        </Message>
                    )}
                </Form>

                <Row className="py-3">
                    <Col>
                        <Link to="/login">Sign In</Link>
                        <span className="mx-2">|</span>
                        <Link to="/register">Register</Link>
                    </Col>
                </Row>
            </FormContainer>
        </>
    )
}

export default PasswordForgotScreen
