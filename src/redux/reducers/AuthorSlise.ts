import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {IProduct} from "../../types/IProduct";

interface AuthorState {
    authors: any[]
    page: number
    count: number
    author: any
    authorName: string
    booksAuthor: IProduct[]
}

const initialState: AuthorState = {
    authors: [],
    page: 0,
    count: 0,
    author: {},
    authorName: "",
    booksAuthor: []
}

export const authorSlice = createSlice({
    name: "author",
    initialState,
    reducers: {
        authorsFetching(state, action: PayloadAction<any[]>) {
            state.authors = action.payload
        },
        authorFetching(state, action: PayloadAction<Object>) {
            state.author = action.payload
        },
        setAuthorName(state, action: PayloadAction<string>) {
            state.authorName = action.payload
        },
        booksAuthorFetching(state, action: PayloadAction<IProduct[]>) {
            state.booksAuthor = action.payload
        }
    }
})

export default authorSlice.reducer