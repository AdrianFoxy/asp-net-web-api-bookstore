import {IGenre} from "../../types/IGenre";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {IGenres} from "../../types/IGenres";

interface GenreState {
    genres: IGenre[]
    descriptionGenre: string
    //
    genresAdmin: IGenres[]
    page: number
    count: number

    typeGenresAdmin: []
    pageTypeGenres: number
    countTypeGenres: number
}

const initialState: GenreState = {
    genres: [],
    descriptionGenre: "",
    //
    genresAdmin: [],
    page: 0,
    count: 0,

    typeGenresAdmin: [],
    pageTypeGenres: 0,
    countTypeGenres: 0

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
        },
        //
        genresAdminFetching(state, action: PayloadAction<IGenres[]>) {
            state.genresAdmin = action.payload
        },
        setPage(state, action: PayloadAction<number>) {
            state.page = action.payload
        },
        setCount(state, action: PayloadAction<number>) {
            state.count = action.payload
        },

        typeGenresFetching(state, action: PayloadAction<[]>) {
            state.typeGenresAdmin = action.payload
        },
        setPageTypeGenres(state, action: PayloadAction<number>) {
            state.pageTypeGenres = action.payload
        },
        setCountTypeGenres(state, action: PayloadAction<number>) {
            state.countTypeGenres = action.payload
        }
    }
})

export default genreSlice.reducer