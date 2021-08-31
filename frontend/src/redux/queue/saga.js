import {
    QUEUE_LIST,
    SET_QUEUE_DATA,
    UPDATE_QUEUE,
    DELETE_QUEUE,
    CREATE_QUEUE,
    FETCH_QUEUE_DATA,
} from '../../helpers/actionTypes';
import { setQueueData, queueActionFailed } from './actions'
import { all, call, fork, put, takeEvery } from 'redux-saga/effects';
import { getCall, postCall } from '../../helpers/axiosUtils'
import {
    BASE_URL
} from '../../helpers/constants';
/**
 * Fetech Queue Data
 */
function* getQueueData() {
    const response = yield call(getCall, `${BASE_URL}categories/all`);
    yield put(setQueueData(response.data));
}
/**
 * Create Category
 */
function* createQueue({ payload: { data, history } }) {
    try {
        const response = yield call(postCall, `${BASE_URL}queue/`, data);
        yield put(setQueueData(response.data));
    }
    catch (error) {
        let message;
        message = error.message ? error.message : 'Invalid Data';
        yield put(queueActionFailed({ type: 'create', message: message }));
    }
}
export function* watchQueueData() {
    yield takeEvery(FETCH_QUEUE_DATA, getQueueData);
}
export function* watchCreateQueue() {
    yield takeEvery(CREATE_QUEUE, createQueue);
}
function* queueSaga() {
    yield all([
        fork(watchQueueData),
        fork(watchCreateQueue),
    ]);
}

export default queueSaga;