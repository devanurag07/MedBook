import {
    CATEGORY_LIST,
    SET_CATEGORY_DATA,
    UPDATE_CATEGORY,
    DELETE_CATEGORY,
    CREATE_CATEGORY,
    FETCH_CATEGORY_DATA,
    FETCH_PARENT_CATEGORY_DATA
} from '../../helpers/actionTypes';
import { setCategoryData, categoryActionFailed, setParentCategoryData } from './actions'
import { all, call, fork, put, takeEvery } from 'redux-saga/effects';
import { getCall, postCall } from '../../helpers/axiosUtils'
import {
    BASE_URL
} from '../../helpers/constants';
/**
 * Fetech Category Data
 */
function* getCategoryData() {
    const response = yield call(getCall, `${BASE_URL}categories/all`);
    yield put(setCategoryData(response.data));
}
/**
 * Fetech Category Data
 */
function* getParentCategoryData() {
    const response = yield call(getCall, `${BASE_URL}categories/getParentCategory`);
    yield put(setParentCategoryData(response.data));
}
/**
 * Create Category
 */
function* createCategory({ payload: { data, history } }) {
    try {
        const response = yield call(postCall, `${BASE_URL}categories/create`, data);
        yield put(setCategoryData(response.data));
    }
    catch (error) {
        let message;
        message = error.message ? error.message : 'Invalid Data';
        yield put(categoryActionFailed({ type: 'create', message: message }));
    }
}
export function* watchCategoryData() {
    yield takeEvery(FETCH_CATEGORY_DATA, getCategoryData);
}
export function* watchCreateCategory() {
    yield takeEvery(CREATE_CATEGORY, createCategory);
}
export function* watchFetchParentCategoryData() {
    yield takeEvery(FETCH_PARENT_CATEGORY_DATA, getParentCategoryData);
}
function* courseSaga() {
    yield all([
        fork(watchCategoryData),
        fork(watchCreateCategory),
        fork(watchFetchParentCategoryData),
    ]);
}

export default courseSaga;