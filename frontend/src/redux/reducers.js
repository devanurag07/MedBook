import { combineReducers } from 'redux';
import Auth from './auth/reducers';
import Course from './course/reducers';
import Queue from './queue/reducers'

export default combineReducers({
    Auth, Course, Queue
});