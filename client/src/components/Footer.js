import React from 'react'
import { Container, Row, Col } from 'react-bootstrap'

const Footer = () => {
    return (
        <footer>
            <Container>
                <Row>
                    <Col className="text-center py-3">
                        Copyright &copy; YupKart |{' '}
                        <a href="https://www.linkedin.com/in/kumarsks619" target="_blank">
                            VeNoM
                        </a>
                    </Col>
                </Row>
            </Container>
        </footer>
    )
}

export default Footer
