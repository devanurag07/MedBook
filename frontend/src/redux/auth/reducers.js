// @flow
import {
    LOGIN_USER,
    LOGIN_USER_SUCCESS,
    LOGIN_USER_FAILED,
    LOGOUT_USER,
    REGISTER_USER,
    REGISTER_USER_SUCCESS,
    REGISTER_USER_FAILED,
    FORGET_PASSWORD,
    FORGET_PASSWORD_SUCCESS,
    FORGET_PASSWORD_FAILED,
    SET_LOADING, SET_BDATA
} from '../../helpers/actionTypes';

import { getLoggedInUser } from '../../helpers/authUtils';
const INIT_STATE = {
    user: getLoggedInUser(),
    loading: false,
    isLoading: false,
    bdata: []
};

const Auth = (state = INIT_STATE, action) => {
    switch (action.type) {
        case LOGIN_USER:
            return { ...state, loading: true };
        case LOGIN_USER_SUCCESS:
            return { ...state, user: action.payload, loading: false, login_error: null };
        case LOGIN_USER_FAILED:
            return { ...state, login_error: action.payload, loading: false };
        case REGISTER_USER:
            return { ...state, loading: true };
        case REGISTER_USER_SUCCESS:
            return { ...state, user: action.payload, loading: false, registerError: null };
        case REGISTER_USER_FAILED:
            return { ...state, registerError: action.payload, loading: false };
        case LOGOUT_USER:
            return { ...state, user: null };
        case FORGET_PASSWORD:
            return { ...state, loading: true };
        case FORGET_PASSWORD_SUCCESS:
            return { ...state, passwordResetStatus: action.payload, loading: false, error: null };
        case FORGET_PASSWORD_FAILED:
            return { ...state, error: action.payload, loading: false };
        case SET_LOADING:
            return { ...state, isLoading: action.payload };
        case SET_BDATA:
            return { ...state, bdata: action.payload };
        default: return { ...state };
    }
}

export default Auth;