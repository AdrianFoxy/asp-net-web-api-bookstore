import {AppDispatch} from "../index";
import $api from "../../http";
import {genreSlice} from "../reducers/GenreSlice";
import { IGenre } from "../../types/IGenre";

export const fetchGenres = () => async (dispatch: AppDispatch) => {
    try {
        const response = await $api.get<IGenre[]>(`TypeGenre/get-all-types-and-genres`)
        dispatch(genreSlice.actions.genresFetching(response.data))
    } catch (error) {

    }
}