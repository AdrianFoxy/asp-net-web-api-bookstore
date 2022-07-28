import {AppDispatch} from "../index";
import $api from "../../http";
import {genreSlice} from "../reducers/GenreSlice";
import {IGenre} from "../../types/IGenre";
import {genreApi} from "../../api/genre-api";

export const fetchGenres = () => async (dispatch: AppDispatch) => {
    try {
        const response = await genreApi.getGenres()
        dispatch(genreSlice.actions.genresFetching(response.data))
    } catch (error) {

    }
}

export const fetchDescriptionGenre = (genre: string, type: string) => async (dispatch: AppDispatch) => {
    try {
        if (type === "type-genre") {
            const response = await genreApi.getDescriptionTypeGenre(genre)
            dispatch(genreSlice.actions.descriptionGenre(response.data.description))
        } else if (type === "genre") {
            const response = await genreApi.getDescriptionGenre(genre)
            dispatch(genreSlice.actions.descriptionGenre(response.data.description))
        }
    } catch (error) {

    }
}

export const fetchGenresAdmin = (page: number = 0, count: number = 10) => async (dispatch: AppDispatch) => {
    try {
        const response = await genreApi.getGenresAdmin(page, count)
        dispatch(genreSlice.actions.genresAdminFetching(response.data))
        const x = JSON.parse(response.headers["x-pagination"])
        dispatch(genreSlice.actions.setCount(x.TotalCount))
    } catch (err) {

    }
}

export const setPageGenres = (newPage: number) => async (dispatch: AppDispatch) => {
    dispatch(genreSlice.actions.setPage(newPage))
}

export const fetchTypeGenres = (page: number = 0, count: number = 10) => async (dispatch: AppDispatch) => {
    try {
        const response = await genreApi.getTypeGenresAdmin()
        dispatch(genreSlice.actions.typeGenresFetching(response.data))
        // const x = JSON.parse(response.headers["x-pagination"])
        // dispatch(genreSlice.actions.setCountTypeGenres(x.TotalCount))
    } catch (err) {

    }
}

export const setPageTypeGenres = (newPage: number) => async (dispatch: AppDispatch) => {
    dispatch(genreSlice.actions.setPageTypeGenres(newPage))
}

export const addTypeGenre = (typeGenre: Object) => async (dispatch: AppDispatch) => {
    try {
        const response = await genreApi.addTypeGenre(typeGenre)
        if (response.status === 200) {
            dispatch(fetchTypeGenres())
        }
    } catch (err) {

    }
}

export const deleteTypeGenre = (id: number) => async (dispatch: AppDispatch) => {
    try {
        const response = await genreApi.deleteTypeGenre(id)
        if (response.status === 200) {
            dispatch(fetchTypeGenres())
        }

    } catch (err) {

    }
}

export const editTypeGenre = (id: number, typeGenre: Object) => async (dispatch: AppDispatch) => {
    try {
        const response = await genreApi.updateTypeGenre(id, typeGenre)
        if (response.status === 200) {
            dispatch(fetchTypeGenres())
        }
    } catch (err) {

    }
}

export const addGenre = (genre: Object) => async (dispatch: AppDispatch) => {
    try {
        const response = await genreApi.addGenre(genre)
        if (response.status === 200) {
            dispatch(fetchGenresAdmin())
        }
    } catch (err) {

    }
}

export const deleteGenre = (id: number) => async (dispatch: AppDispatch) => {
    try {
        const response = await genreApi.deleteGenre(id)
        if (response.status === 200) {
            dispatch(fetchGenresAdmin())
        }

    } catch (err) {

    }
}

export const editGenre = (id: number, genre: Object) => async (dispatch: AppDispatch) => {
    try {
        const response = await genreApi.updateGenre(id, genre)
        if (response.status === 200) {
            dispatch(fetchGenresAdmin())
        }
    } catch (err) {

    }
}