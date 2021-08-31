import { CREATE_QUEUE, UPDATE_QUEUE, DELETE_QUEUE, SET_QUEUE_DATA, FETCH_QUEUE_DATA, SET_QUEUE_ERROR } from '../../helpers/actionTypes'

export const createQueue = (data, history) => ({
    type: CREATE_QUEUE,
    payload: { data, history }
});
export const updateQueue = (data, history) => ({
    type: UPDATE_QUEUE,
    payload: { data, history }
});
export const deleteQueue = (data, history) => ({
    type: DELETE_QUEUE,
    payload: { data, history }
});
export const setQueueData = (queue) => ({
    type: SET_QUEUE_DATA,
    payload: queue
});
export const fetchQueueData = (queue) => ({
    type: FETCH_QUEUE_DATA,
    payload: queue
});
export const queueActionFailed = (error) => ({
    type: SET_QUEUE_ERROR,
    payload: error
});