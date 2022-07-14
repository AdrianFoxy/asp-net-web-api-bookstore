import {AppDispatch} from "../index";
import $api from "../../http";
import {genreSlice} from "../reducers/GenreSlice";
import {IGenre} from "../../types/IGenre";

export const fetchGenres = () => async (dispatch: AppDispatch) => {
    try {
        const response = await $api.get<IGenre[]>(`TypeGenre/get-all-types-and-genres-eng`)
        dispatch(genreSlice.actions.genresFetching(response.data))
    } catch (error) {

    }
}

export const fetchDescriptionGenre = (genre: string, type: string) => async (dispatch: AppDispatch) => {
    try {
        if (type === "type-genre") {
            const response = await $api.get(`TypeGenre/get-type-genre-description/${genre}`)
            dispatch(genreSlice.actions.descriptionGenre(response.data.description))
        } else if (type === "genre") {
            const response = await $api.get(`Genre/get-genre-description/${genre}`)
            dispatch(genreSlice.actions.descriptionGenre(response.data.description))
        }
    } catch (error) {

    }
}

export const fetchGenresAdmin = (page: number = 0, count: number = 10) => async (dispatch: AppDispatch) => {
    try {
        const response = await $api.get(`Genre/get-all-genres-pagination`, {
            params: {
                Page: page + 1,
                ItemsPerPage: count
            }
        })
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
        const response = await $api.get(`TypeGenre/get-all-type-genres`)
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
        const response = await $api.post(`TypeGenre/add-typegenre`, typeGenre)
        if (response.status === 200) {
            dispatch(fetchTypeGenres())
        }
    } catch (err) {

    }
}

export const deleteTypeGenre = (id: number) => async (dispatch: AppDispatch) => {
    try {
        const response = await $api.delete(`TypeGenre/delete-typegenre-by-id/${id}`)
        if (response.status === 200) {
            dispatch(fetchTypeGenres())
        }

    } catch (err) {

    }
}

export const editTypeGenre = (id: number, typeGenre: Object) => async (dispatch: AppDispatch) => {
    try {
        const response = await $api.put(`TypeGenre/update-typegenre-by-id/${id}`, typeGenre)
        if (response.status === 200) {
            dispatch(fetchTypeGenres())
        }
    } catch (err) {

    }
}

export const addGenre = (genre: Object) => async (dispatch: AppDispatch) => {
    try {
        const response = await $api.post(`Genre/add-genre`, genre)
        if (response.status === 200) {
            dispatch(fetchGenresAdmin())
        }
    } catch (err) {

    }
}

export const deleteGenre = (id: number) => async (dispatch: AppDispatch) => {
    try {
        const response = await $api.delete(`Genre/delete-genre-by-id/${id}`)
        if (response.status === 200) {
            dispatch(fetchGenresAdmin())
        }

    } catch (err) {

    }
}

export const editGenre = (id: number, genre: Object) => async (dispatch: AppDispatch) => {
    try {
        const response = await $api.put(`Genre/update-genre-by-id/${id}`, genre)
        if (response.status === 200) {
            dispatch(fetchGenresAdmin())
        }
    } catch (err) {

    }
}