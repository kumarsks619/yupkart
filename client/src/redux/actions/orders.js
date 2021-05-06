import axios from 'axios'

import {
    ORDER_CREATE_REQUEST,
    ORDER_CREATE_SUCCESS,
    ORDER_CREATE_FAIL,
    ORDER_DETAILS_REQUEST,
    ORDER_DETAILS_SUCCESS,
    ORDER_DETAILS_FAIL,
    ORDER_PAY_REQUEST,
    ORDER_PAY_SUCCESS,
    ORDER_PAY_FAIL,
    ORDER_MY_LIST_REQUEST,
    ORDER_MY_LIST_SUCCESS,
    ORDER_MY_LIST_FAIL,
    ORDER_LIST_ALL_REQUEST,
    ORDER_LIST_ALL_SUCCESS,
    ORDER_LIST_ALL_FAIL,
    ORDER_DELIVER_REQUEST,
    ORDER_DELIVER_FAIL,
    ORDER_DELIVER_SUCCESS,
} from '../actionTypes/orders'
import API_URL from '../url'

export const createOrder = (orderData) => async (dispatch, getState) => {
    try {
        dispatch({
            type: ORDER_CREATE_REQUEST,
        })

        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${getState().userLogin.userInfo.token}`,
            },
        }

        const { data } = await axios.post(`${API_URL}/api/orders`, orderData, config)

        dispatch({
            type: ORDER_CREATE_SUCCESS,
            payload: data,
        })
    } catch (err) {
        dispatch({
            type: ORDER_CREATE_FAIL,
            payload:
                err.response && err.response.data.message
                    ? err.response.data.message
                    : err.message,
        })
    }
}

export const getOrderDetails = (orderID) => async (dispatch, getState) => {
    try {
        dispatch({
            type: ORDER_DETAILS_REQUEST,
        })

        const config = {
            headers: {
                Authorization: `Bearer ${getState().userLogin.userInfo.token}`,
            },
        }

        const { data } = await axios.get(`${API_URL}/api/orders/${orderID}`, config)

        dispatch({
            type: ORDER_DETAILS_SUCCESS,
            payload: data,
        })
    } catch (err) {
        dispatch({
            type: ORDER_DETAILS_FAIL,
            payload:
                err.response && err.response.data.message
                    ? err.response.data.message
                    : err.message,
        })
    }
}

export const payOrder = (orderID, paymentResult) => async (dispatch, getState) => {
    try {
        dispatch({
            type: ORDER_PAY_REQUEST,
        })

        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${getState().userLogin.userInfo.token}`,
            },
        }

        const { data } = await axios.put(
            `${API_URL}/api/orders/${orderID}/pay`,
            paymentResult,
            config
        )

        dispatch({
            type: ORDER_PAY_SUCCESS,
            payload: data,
        })
    } catch (err) {
        dispatch({
            type: ORDER_PAY_FAIL,
            payload:
                err.response && err.response.data.message
                    ? err.response.data.message
                    : err.message,
        })
    }
}

export const listMyOrders = () => async (dispatch, getState) => {
    try {
        dispatch({
            type: ORDER_MY_LIST_REQUEST,
        })

        const config = {
            headers: {
                Authorization: `Bearer ${getState().userLogin.userInfo.token}`,
            },
        }

        const { data } = await axios.get(`${API_URL}/api/orders/my-orders`, config)

        dispatch({
            type: ORDER_MY_LIST_SUCCESS,
            payload: data,
        })
    } catch (err) {
        dispatch({
            type: ORDER_MY_LIST_FAIL,
            payload:
                err.response && err.response.data.message
                    ? err.response.data.message
                    : err.message,
        })
    }
}

export const listAllOrders = () => async (dispatch, getState) => {
    try {
        dispatch({
            type: ORDER_LIST_ALL_REQUEST,
        })

        const config = {
            headers: {
                Authorization: `Bearer ${getState().userLogin.userInfo.token}`,
            },
        }

        const { data } = await axios.get(`${API_URL}/api/orders`, config)

        dispatch({
            type: ORDER_LIST_ALL_SUCCESS,
            payload: data,
        })
    } catch (err) {
        dispatch({
            type: ORDER_LIST_ALL_FAIL,
            payload:
                err.response && err.response.data.message
                    ? err.response.data.message
                    : err.message,
        })
    }
}

export const deliverOrder = (orderID) => async (dispatch, getState) => {
    try {
        dispatch({
            type: ORDER_DELIVER_REQUEST,
        })

        const config = {
            headers: {
                Authorization: `Bearer ${getState().userLogin.userInfo.token}`,
            },
        }

        const { data } = await axios.put(
            `${API_URL}/api/orders/${orderID}/deliver`,
            {},
            config
        )

        dispatch({
            type: ORDER_DELIVER_SUCCESS,
            payload: data,
        })
    } catch (err) {
        dispatch({
            type: ORDER_DELIVER_FAIL,
            payload:
                err.response && err.response.data.message
                    ? err.response.data.message
                    : err.message,
        })
    }
}
