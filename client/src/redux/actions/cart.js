import axios from 'axios'

import {
    CART_ADD_ITEM,
    CART_REMOVE_ITEM,
    CART_SAVE_SHIPPING_ADDRESS,
    CART_SAVE_PAYMENT_METHOD,
    CART_RESET_ITEMS,
} from '../actionTypes/cart'
import API_URL from '../url'

export const addToCart = (productID, qty) => async (dispatch, getState) => {
    const { data } = await axios.get(`${API_URL}/api/products/${productID}`)

    dispatch({
        type: CART_ADD_ITEM,
        payload: {
            productID: data._id,
            name: data.name,
            image: data.image,
            price: data.price,
            countInStock: data.countInStock,
            qty,
        },
    })

    // saving the whole cart to local storage
    localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems))
}

export const removeFromCart = (productID) => (dispatch, getState) => {
    dispatch({
        type: CART_REMOVE_ITEM,
        payload: productID,
    })

    localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems))
}

export const saveShippingAddress = (shippingData) => (dispatch) => {
    dispatch({
        type: CART_SAVE_SHIPPING_ADDRESS,
        payload: shippingData,
    })

    localStorage.setItem('shippingAddress', JSON.stringify(shippingData))
}

export const savePaymentMethod = (paymentMethodData) => (dispatch) => {
    dispatch({
        type: CART_SAVE_PAYMENT_METHOD,
        payload: paymentMethodData,
    })
}

export const clearCartItems = () => (dispatch) => {
    dispatch({ type: CART_RESET_ITEMS })
    localStorage.removeItem('cartItems')
}
