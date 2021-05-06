import {
    PASSWORD_FORGOT_REQUEST,
    PASSWORD_FORGOT_SUCCESS,
    PASSWORD_FORGOT_FAIL,
    PASSWORD_UPDATE_REQUEST,
    PASSWORD_UPDATE_SUCCESS,
    PASSWORD_UPDATE_FAIL,
} from '../actionTypes/passwordReset'

export const passwordForgotReducer = (state = {}, action) => {
    switch (action.type) {
        case PASSWORD_FORGOT_REQUEST:
            return { loading: true }
        case PASSWORD_FORGOT_SUCCESS:
            return { loading: false, success: true }
        case PASSWORD_FORGOT_FAIL:
            return { loading: false, error: action.payload }
        default:
            return state
    }
}

export const passwordUpdateReducer = (state = {}, action) => {
    switch (action.type) {
        case PASSWORD_UPDATE_REQUEST:
            return { loading: true }
        case PASSWORD_UPDATE_SUCCESS:
            return { loading: false, success: true }
        case PASSWORD_UPDATE_FAIL:
            return { loading: false, error: action.payload }
        default:
            return state
    }
}
