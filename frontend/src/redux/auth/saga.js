// @flow
import { Cookies } from "react-cookie";
import { all, call, fork, put, takeEvery } from 'redux-saga/effects';
import {
    LOGIN_USER,
    LOGOUT_USER,
    REGISTER_USER,
    FORGET_PASSWORD
} from '../../helpers/actionTypes';

import {
    BASE_URL
} from '../../helpers/constants';


import {
    loginUserSuccess,
    loginUserFailed,
    registerUserSuccess,
    registerUserFailed,
    forgetPasswordSuccess,
    forgetPasswordFailed
} from './actions';
import { postCall } from '../../helpers/axiosUtils'
/**
 * Sets the session
 * @param {*} user 
 */
const setSession = (user) => {
    let cookies = new Cookies();
    if (user) {
        //cookies.set("user", JSON.stringify(user.userDetails), { path: "/" });
        cookies.set("token", user.token, { path: "/" });
    }
    else {
        //cookies.remove("user", { path: "/" });
        cookies.remove("token", { path: "/" });
    }

};
/**
 * Login the user
 * @param {*} payload - username and password 
 */
function* login({ payload: { username, password, history } }) {
    try {
        const response = yield call(postCall, `${BASE_URL}api/common/auth-login/`, {
            username: username,
            password: password
        });
        setSession(response.data);
        yield put(loginUserSuccess(response.data));        
        history.push("/app/dashboard");
    } catch (error) {
        let message;
        message = error.message ? error.message : 'Invalid credentials';
        yield put(loginUserFailed(message));
        setSession(null);
    }
}


/**
 * Logout the user
 * @param {*} param0 
 */
function* logout({ payload: { history } }) {
    try {
        setSession(null);
        yield call(() => {
            history.push("/");
        });
    } catch (error) { }
}

/**
 * Register the user
 */
function* register({ payload: { data, history } }) {
    try {
        const response = yield call(postCall, `${BASE_URL}api/common/verify/`, data);
        setSession(response.data);
        history.push("/app/dashboard");
        yield put(registerUserSuccess(response.data));
    } catch (error) {
        let message;
        switch (error.status) {
            case 500: message = 'Internal Server Error'; break;
            case 401: message = 'Invalid credentials'; break;
            default: message = error;
        }
        yield put(registerUserFailed(message));
    }
}

/**
 * forget password
 */
function* forgetPassword({ payload: { username } }) {
    const options = {
        body: JSON.stringify({ username }),
        method: 'POST',
        headers: { 'Content-Type': 'application/json' }
    };

    try {
        const response = null;
        //const response = yield call(fetchJSON, '/users/password-reset', options);
        yield put(forgetPasswordSuccess(response.message));
    } catch (error) {
        let message;
        switch (error.status) {
            case 500: message = 'Internal Server Error'; break;
            case 401: message = 'Invalid credentials'; break;
            default: message = error;
        }
        yield put(forgetPasswordFailed(message));
    }
}


export function* watchLoginUser() {
    yield takeEvery(LOGIN_USER, login);
}
export function* watchLogoutUser() {
    yield takeEvery(LOGOUT_USER, logout);
}

export function* watchRegisterUser() {
    yield takeEvery(REGISTER_USER, register);
}

export function* watchForgetPassword() {
    yield takeEvery(FORGET_PASSWORD, forgetPassword);
}

function* authSaga() {
    yield all([
        fork(watchLoginUser),
        fork(watchLogoutUser),
        fork(watchRegisterUser),
        fork(watchForgetPassword),
    ]);
}

export default authSaga;