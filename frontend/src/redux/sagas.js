import { all, fork } from "redux-saga/effects";
import authSaga from './auth/saga';
import courseSaga from './course/saga'
import queueSaga from './queue/saga'
export default function* rootSaga() {
  yield all([fork(authSaga), fork(courseSaga), fork(queueSaga)]);
}