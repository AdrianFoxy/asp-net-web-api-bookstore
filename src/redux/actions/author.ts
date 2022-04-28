import {AppDispatch} from "../index";
import $api from "../../http";
import {authorSlice} from "../reducers/AuthorSlise";


export const fetchAuthors = () => async (dispatch: AppDispatch) => {
    try {
        const response = await $api.get(`/Author/get-all-author`)
        dispatch(authorSlice.actions.authorsFetching(response.data))
    } catch (err) {
        console.log(err)
    }
}

export const fetchAuthorsList = () => async (dispatch: AppDispatch) => {
    try {
        const response = await $api.get(`/Author/get-authors-for-drop-list`)
    } catch (err) {
        console.log(err)
    }
}