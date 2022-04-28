import {createSlice, PayloadAction} from "@reduxjs/toolkit";

interface AuthorState {
    authors: any[]
    page: number
    count: number
}

const initialState: AuthorState = {
    authors: [],
    page: 0,
    count: 0
}

export const authorSlice = createSlice({
    name: "author",
    initialState,
    reducers: {
        authorsFetching(state, action: PayloadAction<any[]>) {
            state.authors = action.payload
        }
    }
})

export default authorSlice.reducer