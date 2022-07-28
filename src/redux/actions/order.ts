import {AppDispatch} from "../index";
import $api from "../../http";
import {orderSlice} from "../reducers/OrderSlice";
import {orderApi} from "../../api/order-api";

export const getOrders = (page: number = 1, count: number = 10) => async (dispatch: AppDispatch) => {
    try {
        const response = await orderApi.getOrders(page, count)
        const x = JSON.parse(response.headers["x-pagination"])
        dispatch(orderSlice.actions.setOrderCount(x.TotalCount))
        dispatch(orderSlice.actions.ordersFetching(response.data))
    } catch (err) {
        console.log(err)
    }
}

export const getOrderById = (id: number) => async (dispatch: AppDispatch) => {
    try {
        const response = await orderApi.getOrderById(id)
        dispatch(orderSlice.actions.orderByIdFetching(response.data))
        dispatch(orderSlice.actions.setErrorOrderById(false))
    } catch (err) {
        dispatch(orderSlice.actions.orderByIdFetching(null))
        dispatch(orderSlice.actions.setErrorOrderById(true))
    }
}

export const getOrdersAdmin = (page: number = 1, count: number = 10) => async (dispatch: AppDispatch) => {
    try {
        const response = await orderApi.getOrdersAdmin(page, count)
        const x = JSON.parse(response.headers["x-pagination"])
        dispatch(orderSlice.actions.setOrderCount(x.TotalCount))
        dispatch(orderSlice.actions.ordersFetching(response.data))
    } catch (err) {
        console.log(err)
    }
}

export const getOrdersForCourier = (page: number = 1, count: number = 10) => async (dispatch: AppDispatch) => {
    try {
        const response = await orderApi.getOrdersForCourier(page, count)
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
        const response = await orderApi.changeOrderStatusToCancelled(orderId)
        dispatch(orderSlice.actions.changeOrderStatus(response.data))
    } catch (err) {

    }
}

export const changeOrderStatusToApproved = (orderId: number) => async (dispatch: AppDispatch) => {
    try {
        const response = await orderApi.changeOrderStatusToApproved(orderId)
        dispatch(orderSlice.actions.changeOrderStatus(response.data))
    } catch (err) {

    }
}

export const changeOrderStatusToDone = (orderId: number) => async (dispatch: AppDispatch) => {
    try {
        const response = await orderApi.changeOrderStatusToDone(orderId)
        dispatch(orderSlice.actions.changeOrderStatus(response.data))
    } catch (err) {

    }
}

export const changeOrderStatusOnMyWay = (orderId: number) => async (dispatch: AppDispatch) => {
    try {
        const response = await orderApi.changeOrderStatusOnMyWay(orderId)
        dispatch(orderSlice.actions.changeOrderStatus(response.data))
    } catch (err) {

    }
}

export const changeOrderStatusWaitingAtThePoint = (orderId: number) => async (dispatch: AppDispatch) => {
    try {
        const response = await orderApi.changeOrderStatusWaitingAtThePoint(orderId)
        dispatch(orderSlice.actions.changeOrderStatus(response.data))
    } catch (err) {

    }
}

export const fetchLastOrders = () => async (dispatch: AppDispatch) => {
    try {
        const response = await orderApi.getLastOrders()
        dispatch(orderSlice.actions.lastOrdersFetching(response.data))
    } catch (err) {

    }
}