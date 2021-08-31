
import {
    CATEGORY_LIST,
    UPDATE_CATEGORY,
    DELETE_CATEGORY,
    CREATE_CATEGORY,
    SET_CATEGORY_DATA,
    SET_PARENT_CATEGORY_DATA,
    SET_CATEGORY_ERROR
} from '../../helpers/actionTypes';
const INIT_STATE = {
    category: [],
    dropdownData: []
};
const Course = (state = INIT_STATE, action) => {
    switch (action.type) {
        case CATEGORY_LIST:
            return { ...state, loading: true };
        case SET_CATEGORY_DATA:
            return { ...state, category: state.category.concat(action.payload) };
        case SET_PARENT_CATEGORY_DATA:
            return { ...state, dropdownData: action.payload };
        case SET_CATEGORY_ERROR:
            return { ...state, error: action.payload };
        default: return { ...state };
    }
}
export default Course;