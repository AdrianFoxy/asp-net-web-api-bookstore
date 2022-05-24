import {AppDispatch} from "../index";
import $api from "../../http";
import {orderSlice} from "../reducers/OrderSlice";

export const getOrders = () => async (dispatch: AppDispatch) => {
    try {
        const response = await $api.get(`/Order/get-orders-of-user`, {
            params: {
                Page: 1,
                ItemsPerPage: 20
            }
        })
        dispatch(orderSlice.actions.ordersFetching(response.data))
    } catch (err) {
        console.log(err)
    }
}