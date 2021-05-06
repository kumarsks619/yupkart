import axios from 'axios'

import {
    PRODUCTS_LIST_REQUEST,
    PRODUCTS_LIST_SUCCESS,
    PRODUCTS_LIST_FAIL,
    PRODUCT_DETAILS_REQUEST,
    PRODUCT_DETAILS_SUCCESS,
    PRODUCT_DETAILS_FAIL,
    PRODUCT_DELETE_REQUEST,
    PRODUCT_DELETE_SUCCESS,
    PRODUCT_DELETE_FAIL,
    PRODUCT_CREATE_REQUEST,
    PRODUCT_CREATE_SUCCESS,
    PRODUCT_CREATE_FAIL,
    PRODUCT_UPDATE_REQUEST,
    PRODUCT_UPDATE_SUCCESS,
    PRODUCT_UPDATE_FAIL,
    PRODUCT_CREATE_REVIEW_REQUEST,
    PRODUCT_CREATE_REVIEW_SUCCESS,
    PRODUCT_CREATE_REVIEW_FAIL,
    PRODUCT_TOP_RATED_REQUEST,
    PRODUCT_TOP_RATED_SUCCESS,
    PRODUCT_TOP_RATED_FAIL,
} from '../actionTypes/products'
import API_URL from '../url'

export const fetchProducts = (keyword = '', pageNum = '') => async (dispatch) => {
    try {
        dispatch({ type: PRODUCTS_LIST_REQUEST })

        const { data } = await axios.get(
            `${API_URL}/api/products?keyword=${keyword}&pageNum=${pageNum}`
        )

        dispatch({
            type: PRODUCTS_LIST_SUCCESS,
            payload: data,
        })
    } catch (err) {
        dispatch({
            type: PRODUCTS_LIST_FAIL,
            payload:
                err.response && err.response.data.message
                    ? err.response.data.message
                    : err.message,
        })
    }
}

export const fetchProduct = (productID) => async (dispatch) => {
    try {
        dispatch({ type: PRODUCT_DETAILS_REQUEST })

        const { data } = await axios.get(`${API_URL}/api/products/${productID}`)

        dispatch({
            type: PRODUCT_DETAILS_SUCCESS,
            payload: data,
        })
    } catch (err) {
        dispatch({
            type: PRODUCT_DETAILS_FAIL,
            payload:
                err.response && err.response.data.message
                    ? err.response.data.message
                    : err.message,
        })
    }
}

export const deleteProduct = (productID) => async (dispatch, getState) => {
    try {
        dispatch({
            type: PRODUCT_DELETE_REQUEST,
        })

        const config = {
            headers: {
                Authorization: `Bearer ${getState().userLogin.userInfo.token}`,
            },
        }

        await axios.delete(`${API_URL}/api/products/${productID}`, config)

        dispatch({ type: PRODUCT_DELETE_SUCCESS })
    } catch (err) {
        dispatch({
            type: PRODUCT_DELETE_FAIL,
            payload:
                err.response && err.response.data.message
                    ? err.response.data.message
                    : err.message,
        })
    }
}

export const createProduct = () => async (dispatch, getState) => {
    try {
        dispatch({
            type: PRODUCT_CREATE_REQUEST,
        })

        const config = {
            headers: {
                Authorization: `Bearer ${getState().userLogin.userInfo.token}`,
            },
        }

        const { data } = await axios.post(`${API_URL}/api/products`, {}, config)

        dispatch({
            type: PRODUCT_CREATE_SUCCESS,
            payload: data,
        })
    } catch (err) {
        dispatch({
            type: PRODUCT_CREATE_FAIL,
            payload:
                err.response && err.response.data.message
                    ? err.response.data.message
                    : err.message,
        })
    }
}

export const updateProduct = (productData) => async (dispatch, getState) => {
    try {
        dispatch({
            type: PRODUCT_UPDATE_REQUEST,
        })

        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${getState().userLogin.userInfo.token}`,
            },
        }

        const { data } = await axios.put(
            `${API_URL}/api/products/${productData.productID}`,
            productData,
            config
        )

        dispatch({
            type: PRODUCT_UPDATE_SUCCESS,
            payload: data,
        })
    } catch (err) {
        dispatch({
            type: PRODUCT_UPDATE_FAIL,
            payload:
                err.response && err.response.data.message
                    ? err.response.data.message
                    : err.message,
        })
    }
}

export const createProductReview = (productID, reviewData) => async (
    dispatch,
    getState
) => {
    try {
        dispatch({
            type: PRODUCT_CREATE_REVIEW_REQUEST,
        })

        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${getState().userLogin.userInfo.token}`,
            },
        }

        await axios.post(
            `${API_URL}/api/products/${productID}/reviews`,
            reviewData,
            config
        )

        dispatch({ type: PRODUCT_CREATE_REVIEW_SUCCESS })
    } catch (err) {
        dispatch({
            type: PRODUCT_CREATE_REVIEW_FAIL,
            payload:
                err.response && err.response.data.message
                    ? err.response.data.message
                    : err.message,
        })
    }
}

export const fetchTopRatedProducts = () => async (dispatch) => {
    try {
        dispatch({ type: PRODUCT_TOP_RATED_REQUEST })

        const { data } = await axios.get(`${API_URL}/api/products/rated/top`)

        dispatch({
            type: PRODUCT_TOP_RATED_SUCCESS,
            payload: data,
        })
    } catch (err) {
        dispatch({
            type: PRODUCT_TOP_RATED_FAIL,
            payload:
                err.response && err.response.data.message
                    ? err.response.data.message
                    : err.message,
        })
    }
}
