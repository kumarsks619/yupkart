import React, { useState } from 'react'
import { Form, Button, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'

import { savePaymentMethod } from '../redux/actions/cart'
import FormContainer from '../components/FormContainer'
import CheckoutStepper from '../components/CheckoutStepper'
import Meta from '../components/Meta'

const PaymentScreen = ({ history }) => {
    const dispatch = useDispatch()
    const { shippingAddress } = useSelector((state) => state.cart)

    if (!shippingAddress) {
        history.push('/shipping')
    }

    const [paymentMethod, setPaymentMethod] = useState('Credit/Debit Card')

    const handlePaymentSubmit = (e) => {
        e.preventDefault()
        dispatch(savePaymentMethod(paymentMethod))
        history.push('/place-order')
    }

    return (
        <>
            <Meta title="Payment Method | YupKart" />

            <FormContainer>
                <CheckoutStepper step1 step2 step3 />
                <h1>Payment Method</h1>
                <Form onSubmit={handlePaymentSubmit}>
                    <Form.Group>
                        <Form.Label as="legend">Select Method</Form.Label>
                        <Col>
                            <Form.Check
                                checked
                                type="radio"
                                label="Credit/Debit Card"
                                id="cardPayment"
                                name="paymentMethod"
                                value="Credit/Debit Card"
                                onChange={(e) => setPaymentMethod(e.target.value)}
                            ></Form.Check>
                            <Form.Check
                                type="radio"
                                label="PayPal"
                                id="PayPal"
                                name="paymentMethod"
                                value="PayPal"
                                onChange={(e) => setPaymentMethod(e.target.value)}
                            ></Form.Check>
                        </Col>
                    </Form.Group>

                    <Button type="submit" variant="primary">
                        Proceed
                    </Button>
                </Form>
            </FormContainer>
        </>
    )
}

export default PaymentScreen
