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
    SET_LOADING,
    SET_BDATA
} from '../../helpers/actionTypes';

export const loginUser = (username, password, history) => ({
    type: LOGIN_USER,
    payload: { username, password, history }
});

export const loginUserSuccess = (user: any) => ({
    type: LOGIN_USER_SUCCESS,
    payload: user
});

export const loginUserFailed = (error: any) => ({
    type: LOGIN_USER_FAILED,
    payload: error
});

export const registerUser = (data, history) => ({
    type: REGISTER_USER,
    payload: { data, history }
});

export const registerUserSuccess = (user: any) => ({
    type: REGISTER_USER_SUCCESS,
    payload: user
});

export const registerUserFailed = (error: any) => ({
    type: REGISTER_USER_FAILED,
    payload: error
});

export const logoutUser = (history: any) => ({
    type: LOGOUT_USER,
    payload: { history }
});

export const forgetPassword = (username: any) => ({
    type: FORGET_PASSWORD,
    payload: { username }
});

export const forgetPasswordSuccess = (passwordResetStatus: any) => ({
    type: FORGET_PASSWORD_SUCCESS,
    payload: passwordResetStatus
});

export const forgetPasswordFailed = (error: any) => ({
    type: FORGET_PASSWORD_FAILED,
    payload: error
});
export const setLoadingData = (loadingStatus: any) => ({
    type: SET_LOADING,
    payload: loadingStatus
});
export const setBData = (data) => ({
    type: SET_BDATA,
    payload: data
});