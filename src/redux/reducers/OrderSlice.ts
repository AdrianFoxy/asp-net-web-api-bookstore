import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {IOrder} from "../../types/IOrder";

interface OrderState {
    orders: IOrder[]
}

const initialState: OrderState = {
    orders: []
}

export const orderSlice = createSlice({
    name: "order",
    initialState,
    reducers: {
        ordersFetching(state, action: PayloadAction<IOrder[]>) {
            state.orders = action.payload
        }
    }
})

export default orderSlice.reducer