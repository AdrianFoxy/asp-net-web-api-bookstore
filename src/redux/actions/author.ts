import {AppDispatch} from "../index";
import {authorSlice} from "../reducers/AuthorSlise";
import {authorApi} from "../../api/author-api";

export const fetchAuthors = () => async (dispatch: AppDispatch) => {
    try {
        const response = await authorApi.getAuthors()
        dispatch(authorSlice.actions.authorsFetching(response.data))
    } catch (err) {
        console.log(err)
    }
}

export const fetchAuthorsList = () => async (dispatch: AppDispatch) => {
    try {
        const response = await authorApi.getAuthorsList()
    } catch (err) {
        console.log(err)
    }
}

export const addAuthor = (author: Object) => async (dispatch: AppDispatch) => {
    try {
        const response = await authorApi.addAuthor(author)
        if (response.status === 200) {
            dispatch(fetchAuthors())
        }
    } catch (err) {

    }
}

export const deleteAuthor = (id: number) => async (dispatch: AppDispatch) => {
    try {
        const response = await authorApi.deleteAuthor(id)
        if (response.status === 200) {
            dispatch(fetchAuthors())
        }

    } catch (err) {

    }
}

export const editAuthor = (id: number, author: Object) => async (dispatch: AppDispatch) => {
    try {
        const response = await authorApi.updateAuthor(id, author)
        if (response.status === 200) {
            dispatch(fetchAuthors())
        }
    } catch (err) {

    }
}

export const getAuthorByName = (name: string) => async (dispatch: AppDispatch) => {
    try {
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
        const response = await authorApi.getBooksAuthor(nameUrl)
        dispatch(authorSlice.actions.booksAuthorFetching(response.data))
    } catch (err) {

    }
}