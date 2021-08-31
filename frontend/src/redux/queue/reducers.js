
import {
    QUEUE_LIST,
    UPDATE_QUEUE,
    DELETE_QUEUE,
    CREATE_QUEUE,
    SET_QUEUE_DATA,
    SET_QUEUE_ERROR
} from '../../helpers/actionTypes';
const INIT_STATE = {
    queue: []
};
const Queue = (state = INIT_STATE, action) => {
    switch (action.type) {
        case QUEUE_LIST:
            return { ...state, loading: true };
        case SET_QUEUE_DATA:
            return { ...state, queue: state.queue.concat(action.payload) };
        case SET_QUEUE_ERROR:
            return { ...state, error: action.payload };
        default: return { ...state };
    }
}
export default Queue;