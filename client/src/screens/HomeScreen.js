import React, { useEffect } from 'react'
import { Row, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

import Product from '../components/Product'
import { fetchProducts } from '../redux/actions/products'
import Loader from '../components/Loader'
import Message from '../components/Message'
import Paginate from '../components/Paginate'
import ProductCarousel from '../components/ProductCarousel'
import Meta from '../components/Meta'

const HomeScreen = ({ match }) => {
    const keyword = match.params.keyword
    const pageNum = match.params.pageNum || 1

    const dispatch = useDispatch()

    const { loading, error, products, totalPages } = useSelector(
        (state) => state.productsList
    )

    useEffect(() => {
        dispatch(fetchProducts(keyword, pageNum))
    }, [dispatch, keyword, pageNum])

    return (
        <>
            <Meta />

            {!keyword ? (
                <ProductCarousel />
            ) : (
                <Link to="/" className="btn btn-light">
                    Go Back
                </Link>
            )}

            <h1>Latest Products</h1>
            {loading ? (
                <Loader />
            ) : error ? (
                <Message variant={'danger'}>{error}</Message>
            ) : (
                <>
                    {products.length === 0 && <Message>No products found.</Message>}

                    <Row>
                        {products.map((product) => (
                            <Col sm={12} md={6} lg={4} xl={3} key={product._id}>
                                <Product product={product} />
                            </Col>
                        ))}
                    </Row>

                    <Paginate
                        totalPages={totalPages}
                        pageNum={pageNum}
                        keyword={keyword ? keyword : ''}
                    />
                </>
            )}
        </>
    )
}

export default HomeScreen
