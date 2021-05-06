import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Form, Button, Row, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'

import Loader from '../components/Loader'
import Message from '../components/Message'
import { login } from '../redux/actions/users'
import FormContainer from '../components/FormContainer'
import CheckoutStepper from '../components/CheckoutStepper'
import Meta from '../components/Meta'

const LoginScreen = ({ location, history }) => {
    const dispatch = useDispatch()
    const { loading, error, userInfo } = useSelector((state) => state.userLogin)

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const redirect = location.search ? location.search.split('=')[1] : '/'

    useEffect(() => {
        if (userInfo) history.push(redirect)
    }, [history, userInfo, redirect])

    const handleLogin = (e) => {
        e.preventDefault()
        dispatch(login(email, password))
    }

    return (
        <>
            <Meta title="Sign In | YupKart" />

            <FormContainer>
                {redirect === 'shipping' && <CheckoutStepper step1 />}

                <h1>Sign In</h1>

                {error && <Message variant="danger">{error}</Message>}
                {loading && <Loader />}

                <Form onSubmit={handleLogin}>
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
                    <Button type="submit" variant="primary">
                        Sign In
                    </Button>
                </Form>

                <Row className="py-3">
                    <Col>
                        New Customer?{' '}
                        <Link
                            to={redirect ? `/register?redirect=${redirect}` : '/register'}
                        >
                            Register
                        </Link>
                        <span className="mx-2">|</span>
                        <Link to="/password-reset/forgot">Forgot Password?</Link>
                    </Col>
                </Row>
            </FormContainer>
        </>
    )
}

export default LoginScreen
