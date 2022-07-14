import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {IOrder} from "../../types/IOrder";

interface OrderState {
    orders: IOrder[]
    page: number
    count: number
    pageSize: number
    lastOrders: IOrder[]
}

const initialState: OrderState = {
    orders: [],
    page: 1,
    count: 0,
    pageSize: 5,
    lastOrders: [],
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
        changeOrderStatus(state, action: PayloadAction<IOrder>) {
            const index = state.orders.findIndex(order => order.id === action.payload.id)
            state.orders.splice(index, 1, action.payload)
            //state.orders.splice(state.orders.findIndex((el) => el.id === action.payload.id), 1, action.payload)
        },
        lastOrdersFetching(state, action: PayloadAction<IOrder[]>) {
            state.lastOrders = action.payload
        },
    }
})

export default orderSlice.reducer