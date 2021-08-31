import { CREATE_CATEGORY, UPDATE_CATEGORY, DELETE_CATEGORY, SET_CATEGORY_DATA, FETCH_CATEGORY_DATA, SET_CATEGORY_ERROR, FETCH_PARENT_CATEGORY_DATA, SET_PARENT_CATEGORY_DATA } from '../../helpers/actionTypes'

export const createCategory = (data, history) => ({
    type: CREATE_CATEGORY,
    payload: { data, history }
});
export const updateCategory = (data, history) => ({
    type: UPDATE_CATEGORY,
    payload: { data, history }
});
export const deleteCategory = (data, history) => ({
    type: DELETE_CATEGORY,
    payload: { data, history }
});
export const setCategoryData = (category) => ({
    type: SET_CATEGORY_DATA,
    payload: category
});
export const fetchCategoryData = (category) => ({
    type: FETCH_CATEGORY_DATA,
    payload: category
});
export const fetchParentCategoryData = (category) => ({
    type: FETCH_PARENT_CATEGORY_DATA,
    payload: category
});
export const setParentCategoryData = (category) => ({
    type: SET_PARENT_CATEGORY_DATA,
    payload: category
});
export const categoryActionFailed = (error) => ({
    type: SET_CATEGORY_ERROR,
    payload: error
});