import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {IProduct} from "../../types/IProduct";

interface ProductState {
    products: IProduct[]
    page: number
    count: number
}

const initialState: ProductState = {
    products: [],
    page: 0,
    count: 0
}

export const productSlice = createSlice({
    name: "product",
    initialState,
    reducers: {
        productsFetching(state, action: PayloadAction<IProduct[]>) {
            state.products = action.payload
        },
        setCount(state, action: PayloadAction<number>) {
            state.count = action.payload
        },
        setPage(state, action: PayloadAction<number>) {
            state.page = action.payload
        }
    }
})

export default productSlice.reducer