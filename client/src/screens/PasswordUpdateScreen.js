import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Form, Button, Row, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'

import Loader from '../components/Loader'
import Message from '../components/Message'
import FormContainer from '../components/FormContainer'
import Meta from '../components/Meta'
import { updatePassword } from '../redux/actions/passwordReset'

const PasswordUpdateScreen = ({ match }) => {
    const { userID, token } = match.params
    const dispatch = useDispatch()

    const { loading, error, success } = useSelector((state) => state.passwordUpdate)

    const [newPassword, setNewPassword] = useState('')
    const [confirmNewPassword, setConfirmNewPassword] = useState('')
    const [localError, setLocalError] = useState('')

    const handleForgotSubmit = (e) => {
        e.preventDefault()
        if (newPassword === confirmNewPassword) {
            dispatch(updatePassword(userID, token, newPassword))
        } else {
            setLocalError('Passwords not matched!!!')
        }
    }

    useEffect(() => {
        if (success) {
            setNewPassword('')
            setConfirmNewPassword('')
            setLocalError('')
        }
    }, [success])

    return (
        <>
            <Meta title="Forgot Password | YupKart" />

            <FormContainer>
                <h1>Forgot Password</h1>

                <Form onSubmit={handleForgotSubmit}>
                    <Form.Group controlId="newPassword">
                        <Form.Label>New Password</Form.Label>
                        <Form.Control
                            type="password"
                            placeholder="Enter new password"
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                        ></Form.Control>
                    </Form.Group>
                    <Form.Group controlId="confirmNewPassword">
                        <Form.Label>Confirm New Password</Form.Label>
                        <Form.Control
                            type="password"
                            placeholder="Confirm new password"
                            value={confirmNewPassword}
                            onChange={(e) => setConfirmNewPassword(e.target.value)}
                        ></Form.Control>
                    </Form.Group>
                    <Button type="submit" variant="primary" className="mb-3">
                        Submit
                    </Button>
                    {loading && <Loader />}
                    {error && <Message variant="danger">{error}</Message>}
                    {localError && <Message variant="danger">{localError}</Message>}
                    {success && (
                        <Message variant="success">
                            Password updated successfully! Proceed to{' '}
                            <Link to="/login">login</Link>.
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

export default PasswordUpdateScreen
