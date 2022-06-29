import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {IOrder} from "../../types/IOrder";

interface OrderState {
    orders: IOrder[]
    page: number
    count: number
    pageSize: number
}

const initialState: OrderState = {
    orders: [],
    page: 1,
    count: 0,
    pageSize: 5,
}

export const orderSlice = createSlice({
    name: "order",
    initialState,
    reducers: {
        ordersFetching(state, action: PayloadAction<IOrder[]>) {
            state.orders = action.payload
        },
        setOrderCount(state, action: PayloadAction<number>) {
            state.count = action.payload
        },
        setOrderPage(state, action: PayloadAction<number>) {
            state.page = action.payload
        },
    }
})

export default orderSlice.reducer