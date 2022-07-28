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

export const getOrderById = (id: number) => async (dispatch: AppDispatch) => {
    try {
        const response = await $api.get(`/Order/get-order-by-id/${id}`)
        dispatch(orderSlice.actions.orderByIdFetching(response.data))
        dispatch(orderSlice.actions.setErrorOrderById(false))
    } catch (err) {
        dispatch(orderSlice.actions.orderByIdFetching(null))
        dispatch(orderSlice.actions.setErrorOrderById(true))
    }
}

export const getOrdersAdmin = (page: number = 1, count: number = 10) => async (dispatch: AppDispatch) => {
    try {
        const response = await $api.get(`/Order/get-all-orders-for-admin`, {
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

export const getOrdersForCourier = (page: number = 1, count: number = 10) => async (dispatch: AppDispatch) => {
    try {
        const response = await $api.get(`/Order/get-all-approved-orders-for-admin`, {
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

export const changeOrderStatusToCancelled = (orderId: number) => async (dispatch: AppDispatch) => {
    try {
        const response = await $api.put(`/Order/change-order-status-to-canceled?orderId=${orderId}`)
        dispatch(orderSlice.actions.changeOrderStatus(response.data))
    } catch (err) {

    }
}

export const changeOrderStatusToApproved = (orderId: number) => async (dispatch: AppDispatch) => {
    try {
        const response = await $api.put(`/Order/change-order-status-to-approved`, null, {
            params: {
                orderId: orderId
            }
        })
        dispatch(orderSlice.actions.changeOrderStatus(response.data))
    } catch (err) {

    }
}

export const changeOrderStatusToDone = (orderId: number) => async (dispatch: AppDispatch) => {
    try {
        const response = await $api.put(`/Order/change-order-status-to-done`, null, {
            params: {
                orderId: orderId
            }
        })
        dispatch(orderSlice.actions.changeOrderStatus(response.data))
    } catch (err) {

    }
}

export const changeOrderStatusOnMyWay = (orderId: number) => async (dispatch: AppDispatch) => {
    try {
        const response = await $api.put(`/Order/change-order-status-on-my-way`, null, {
            params: {
                orderId: orderId
            }
        })
        dispatch(orderSlice.actions.changeOrderStatus(response.data))
    } catch (err) {

    }
}

export const changeOrderStatusWaitingAtThePoint = (orderId: number) => async (dispatch: AppDispatch) => {
    try {
        const response = await $api.put(`/Order/change-order-status-waiting-at-the-point`, null, {
            params: {
                orderId: orderId
            }
        })
        dispatch(orderSlice.actions.changeOrderStatus(response.data))
    } catch (err) {

    }
}

export const fetchLastOrders = () => async (dispatch: AppDispatch) => {
    try {
        const response = await $api.get(`/Order/get-last-orders-for-Admin`)
        dispatch(orderSlice.actions.lastOrdersFetching(response.data))
    } catch (err) {

    }
}