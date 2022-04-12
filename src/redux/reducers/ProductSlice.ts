import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {IProduct} from "../../types/IProduct";

interface ProductState {
    products: IProduct[]
}

const initialState: ProductState = {
    products: []
}

export const productSlice = createSlice({
    name: "product",
    initialState,
    reducers: {
        productsFetching(state, action: PayloadAction<IProduct[]>) {
            state.products = action.payload
        }
    }
})

export default productSlice.reducer