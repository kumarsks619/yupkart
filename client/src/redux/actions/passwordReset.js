import axios from 'axios'

import {
    PASSWORD_FORGOT_REQUEST,
    PASSWORD_FORGOT_SUCCESS,
    PASSWORD_FORGOT_FAIL,
    PASSWORD_UPDATE_REQUEST,
    PASSWORD_UPDATE_SUCCESS,
    PASSWORD_UPDATE_FAIL,
} from '../actionTypes/passwordReset'
import API_URL from '../url'

export const requestForgot = (email) => async (dispatch) => {
    try {
        dispatch({ type: PASSWORD_FORGOT_REQUEST })

        await axios.post(`${API_URL}/api/password-reset/request-reset/${email}`)

        dispatch({
            type: PASSWORD_FORGOT_SUCCESS,
        })
    } catch (err) {
        dispatch({
            type: PASSWORD_FORGOT_FAIL,
            payload:
                err.response && err.response.data.message
                    ? err.response.data.message
                    : err.message,
        })
    }
}

export const updatePassword = (userID, token, newPassword) => async (dispatch) => {
    try {
        dispatch({ type: PASSWORD_UPDATE_REQUEST })

        await axios.post(`${API_URL}/api/password-reset/receive-new/${userID}/${token}`, {
            password: newPassword,
        })

        dispatch({
            type: PASSWORD_UPDATE_SUCCESS,
        })
    } catch (err) {
        dispatch({
            type: PASSWORD_UPDATE_FAIL,
            payload:
                err.response && err.response.data.message
                    ? err.response.data.message
                    : err.message,
        })
    }
}
