import {IGenre} from "../../types/IGenre";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";

interface GenreState {
    genres: IGenre[]
}

const initialState: GenreState = {
    genres: []
}

export const genreSlice = createSlice({
    name: "genre",
    initialState,
    reducers: {
        genresFetching(state, action: PayloadAction<IGenre[]>) {
            state.genres = action.payload
        },
    }
})

export default genreSlice.reducer