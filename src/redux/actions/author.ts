import {AppDispatch} from "../index";
import $api from "../../http";
import {authorSlice} from "../reducers/AuthorSlise";
import {fetchGenresAdmin} from "./genre";
import {authorApi} from "../../api/author-api";


export const fetchAuthors = () => async (dispatch: AppDispatch) => {
    try {
        //const response = await $api.get(`/Author/get-all-author`)
        const response = await authorApi.getAuthors()
        dispatch(authorSlice.actions.authorsFetching(response.data))
    } catch (err) {
        console.log(err)
    }
}

export const fetchAuthorsList = () => async (dispatch: AppDispatch) => {
    try {
        //const response = await $api.get(`/Author/get-authors-for-drop-list`)
        const response = await authorApi.getAuthorsList()
    } catch (err) {
        console.log(err)
    }
}

export const addAuthor = (author: Object) => async (dispatch: AppDispatch) => {
    try {
        //const response = await $api.post(`/Author/add-author`, author)
        const response = await authorApi.addAuthor(author)
        if (response.status === 200) {
            dispatch(fetchAuthors())
        }
    } catch (err) {

    }
}

export const deleteAuthor = (id: number) => async (dispatch: AppDispatch) => {
    try {
        //const response = await $api.delete(`/Author/delete-author-by-id/${id}`)
        const response = await authorApi.deleteAuthor(id)
        if (response.status === 200) {
            dispatch(fetchAuthors())
        }

    } catch (err) {

    }
}

export const editAuthor = (id: number, author: Object) => async (dispatch: AppDispatch) => {
    try {
        //const response = await $api.put(`/Author/update-author-by-id/${id}`, author)
        const response = await authorApi.editAuthor(id, author)
        if (response.status === 200) {
            dispatch(fetchAuthors())
        }
    } catch (err) {

    }
}

export const getAuthorByName = (name: string) => async (dispatch: AppDispatch) => {
    try {
        //const response = await $api.get(`/Author/get-author-by-name/${name}`)
        const response = await authorApi.getAuthorByName(name)
        dispatch(authorSlice.actions.authorFetching(response.data))
    } catch (err) {

    }
}

export const setAuthorName = (name: string) => async (dispatch: AppDispatch) => {
    dispatch(authorSlice.actions.setAuthorName(name))
}

export const getBooksAuthor = (nameUrl: string) => async (dispatch: AppDispatch) => {
    try {
        // const response = await $api.get(`/Book/get-all-books-by-author/${nameUrl}`, {
        //     params: {
        //         Page: 1,
        //         ItemsPerPage: 10
        //     }
        // })
        const response = await authorApi.getBooksAuthor(nameUrl)
        dispatch(authorSlice.actions.booksAuthorFetching(response.data))
    } catch (err) {

    }
}