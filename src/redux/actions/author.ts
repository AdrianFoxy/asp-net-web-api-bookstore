import {AppDispatch} from "../index";
import $api from "../../http";
import {authorSlice} from "../reducers/AuthorSlise";
import {fetchGenresAdmin} from "./genre";


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

export const addAuthor = (author: Object) => async (dispatch: AppDispatch) => {
    try {
        const response = await $api.post(`/Author/add-author`, author)
        if (response.status === 200) {
            dispatch(fetchAuthors())
        }
    } catch (err) {

    }
}

export const deleteAuthor = (id: number) => async (dispatch: AppDispatch) => {
    try {
        const response = await $api.delete(`/Author/delete-author-by-id/${id}`)
        if (response.status === 200) {
            dispatch(fetchAuthors())
        }

    } catch (err) {

    }
}

export const editAuthor = (id: number, author: Object) => async (dispatch: AppDispatch) => {
    try {
        const response = await $api.put(`/Author/update-author-by-id/${id}`, author)
        if (response.status === 200) {
            dispatch(fetchAuthors())
        }
    } catch (err) {

    }
}