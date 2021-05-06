import React, { useEffect } from 'react'
import { LinkContainer } from 'react-router-bootstrap'
import { Table, Button, Row, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'

import Loader from '../components/Loader'
import Message from '../components/Message'
import { fetchProducts, deleteProduct, createProduct } from '../redux/actions/products'
import { PRODUCT_CREATE_RESET } from '../redux/actionTypes/products'
import Paginate from '../components/Paginate'
import Meta from '../components/Meta'

const ProductsListScreen = ({ history, match }) => {
    const pageNum = match.params.pageNum || 1

    const dispatch = useDispatch()

    const { loading, error, products, totalPages } = useSelector(
        (state) => state.productsList
    )
    const { userInfo } = useSelector((state) => state.userLogin)
    const {
        loading: loadingDelete,
        error: errorDelete,
        success: successDelete,
    } = useSelector((state) => state.productDelete)
    const {
        loading: loadingCreate,
        error: errorCreate,
        success: successCreate,
        product: createdProduct,
    } = useSelector((state) => state.productCreate)

    useEffect(() => {
        dispatch({ type: PRODUCT_CREATE_RESET })

        if (!userInfo || !userInfo.isAdmin) {
            history.push('/login')
        }

        if (successCreate) {
            history.push(`/admin/products/${createdProduct._id}/edit`)
        } else {
            dispatch(fetchProducts('', pageNum))
        }
    }, [dispatch, history, userInfo, successDelete, successCreate, pageNum])

    const handleProductCreate = () => {
        dispatch(createProduct())
    }

    const handleProductDelete = (productID) => {
        if (window.confirm('Are you sure?')) {
            dispatch(deleteProduct(productID))
        }
    }

    return (
        <>
            <Meta title="Products | Admin | YupKart" />

            <Row className="align-items-center">
                <Col>
                    <h1>Products</h1>
                </Col>
                <Col className="text-right">
                    <Button className="my-3" onClick={handleProductCreate}>
                        <i className="fas fa-plus"></i> Create Product
                    </Button>
                </Col>
            </Row>

            {loadingDelete && <Loader />}
            {successDelete && <Message variant="success">Product Removed</Message>}
            {errorDelete && <Message variant="danger">{errorDelete}</Message>}

            {loadingCreate && <Loader />}
            {errorCreate && <Message variant="danger">{errorCreate}</Message>}

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
                                <th>NAME</th>
                                <th>PRICE</th>
                                <th>CATEGORY</th>
                                <th>BRAND</th>
                                <th>ACTIONS</th>
                            </tr>
                        </thead>
                        <tbody>
                            {products.map((product) => (
                                <tr key={product._id}>
                                    <td>{product._id}</td>
                                    <td>{product.name}</td>
                                    <td>${product.price}</td>
                                    <td>{product.category}</td>
                                    <td>{product.brand}</td>
                                    <td>
                                        <LinkContainer
                                            to={`/admin/products/${product._id}/edit`}
                                        >
                                            <Button variant="light" className="btn-sm">
                                                <i className="fas fa-edit"></i>
                                            </Button>
                                        </LinkContainer>
                                        <Button
                                            variant="danger"
                                            className="btn-sm"
                                            onClick={() =>
                                                handleProductDelete(product._id)
                                            }
                                        >
                                            <i className="fas fa-trash"></i>
                                        </Button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>

                    <Paginate totalPages={totalPages} pageNum={pageNum} isAdmin={true} />
                </>
            )}
        </>
    )
}

export default ProductsListScreen
