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