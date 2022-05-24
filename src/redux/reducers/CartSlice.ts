import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {ICart} from "../../types/ICart";

interface CartState {
    products: ICart[],
    totalPrice: number
    totalCount: number
}

const initialState: CartState = {
    products: [],
    totalPrice: 0,
    totalCount: 0
}

export const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        // addProduct(state, action: PayloadAction<ICart>) {
        //     const index = state.products.findIndex(product => product.id === action.payload.id)
        //     if (index !== -1) {
        //         const product = state.products.find(product => product.id === action.payload.id)
        //         if (product) {
        //             product.quantity++
        //         }
        //     } else {
        //         state.products = [...state.products, action.payload]
        //     }
        //     state.totalPrice = state.totalPrice + action.payload.price
        //     state.totalCount = state.totalCount + action.payload.quantity
        // },
        setCart(state, action: PayloadAction<ICart[]>) {
            state.products = action.payload
        },
        setTotalPrice(state, action: PayloadAction<number>) {
            state.totalPrice = action.payload
        },
        setTotalCount(state, action: PayloadAction<number>) {
            state.totalCount = action.payload
        }
    }
})

export default cartSlice.reducer