import axios from 'axios';

const postCall = (url, data, options) => {
    return axios.post(
        url, data, options
    )
}
const putCall = (url, data) => {
    return axios.put(
        url, data
    )
}
const getCall = (url, options) => {
    return axios.get(
        url, options
    )
}
const deleteCall = (url, options) => {
    return axios.delete(
        url, options
    )
}
const initialGetCall = (url, options) => {
    return axios.get(
        url, options
    )
}
export { postCall, putCall, getCall, deleteCall, initialGetCall };