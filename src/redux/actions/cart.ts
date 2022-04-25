import {AppDispatch} from "../index";
import {cartSlice} from "../reducers/CartSlice";
import {ICart} from "../../types/ICart";
import $api from "../../http";
import Cookies from 'js-cookie'

export const addProduct = (productId: number) => async (dispatch: AppDispatch) => {
    try {
        console.log(document.cookie)
        console.log(Cookies.get(".AspNetCore.Session"))
        const response = await $api.post(`/Order/add-item-to-cart?id=${productId}`)
        console.log(response)
        console.log(Cookies.get(".AspNetCore.Session"))
        dispatch(cartSlice.actions.setCart(response.data))
    } catch (e) {
        console.log(e)
    }
}

// export const addProduct = (productId: number) => async (dispatch: AppDispatch) => {
//     try {
//         const request = new XMLHttpRequest();
//         request.open("POST", `https://localhost:44307/api/Order/add-item-to-cart?id=${productId}`)
//         request.withCredentials = true
//         request.responseType = "text"
//         request.onload = function () {
//             const response = request.response;
//             console.log(response)
//         };
//         request.send();
//     } catch (e) {
//         console.log(e)
//     }
// }

export const fetchCart = () => async (dispatch: AppDispatch) => {
    try {
        const response = await $api.get(`/Order/get-shopping-cart`, {withCredentials: true,})
        console.log(response.config)
        dispatch(cartSlice.actions.setCart(response.data))
    } catch (e) {

    }
}