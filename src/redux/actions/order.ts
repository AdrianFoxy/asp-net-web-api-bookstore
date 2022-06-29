import {AppDispatch} from "../index";
import $api from "../../http";
import {orderSlice} from "../reducers/OrderSlice";

export const getOrders = (page: number = 1, count: number = 10) => async (dispatch: AppDispatch) => {
    try {
        const response = await $api.get(`/Order/get-orders-of-user`, {
            params: {
                Page: page,
                ItemsPerPage: count
            }
        })
        const x = JSON.parse(response.headers["x-pagination"])
        dispatch(orderSlice.actions.setOrderCount(x.TotalCount))
        dispatch(orderSlice.actions.ordersFetching(response.data))
    } catch (err) {
        console.log(err)
    }
}

export const setOrderPage = (newPage: number) => async (dispatch: AppDispatch) => {
    dispatch(orderSlice.actions.setOrderPage(newPage))
}