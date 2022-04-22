import {IGenre} from "../../types/IGenre";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";

interface GenreState {
    genres: IGenre[]
    descriptionGenre: string
}

const initialState: GenreState = {
    genres: [],
    descriptionGenre: ""
}

export const genreSlice = createSlice({
    name: "genre",
    initialState,
    reducers: {
        genresFetching(state, action: PayloadAction<IGenre[]>) {
            state.genres = action.payload
        },
        descriptionGenre(state, action: PayloadAction<string>) {
            state.descriptionGenre = action.payload
        }
    }
})

export default genreSlice.reducer