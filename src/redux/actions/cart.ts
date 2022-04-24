import {AppDispatch} from "../index";
import {cartSlice} from "../reducers/CartSlice";
import {ICart} from "../../types/ICart";
import $api from "../../http";


export const addProduct = (productId: number) => async (dispatch: AppDispatch) => {
    try {
        const response = await $api.post(`/Order/add-item-to-cart?id=${productId}`)
        console.log(response)
    } catch (e) {
        console.log(e)
    }
}

export const fetchCart = () => async (dispatch: AppDispatch) => {
    try {
        const response = await $api.get(`/Order/get-shopping-cart`)
        console.log(response)
    } catch (e) {

    }
}