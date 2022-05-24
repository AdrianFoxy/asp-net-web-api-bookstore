import {AppDispatch} from "../index";
import {cartSlice} from "../reducers/CartSlice";
import $api from "../../http";
import {ICart} from "../../types/ICart";

export const addProduct = (productId: string | number, products: ICart[]) => async (dispatch: AppDispatch) => {
    try {

        if (products.length === 0 ) {
            const response = await $api.post(`/Order/add-item-to-cart?id=${productId}`)
            dispatch(cartSlice.actions.setCart(response.data.shoppingCartItem))
            dispatch(cartSlice.actions.setTotalPrice(response.data.shopCartTotal))
            dispatch(cartSlice.actions.setTotalCount(response.data.totalItems))
            return
        }

        const indexProduct = products.findIndex((product) => product.book.id === Number(productId))

        console.log(indexProduct)

        if (indexProduct === -1) {
            const response = await $api.post(`/Order/add-item-to-cart?id=${productId}`)
            dispatch(cartSlice.actions.setCart(response.data.shoppingCartItem))
            dispatch(cartSlice.actions.setTotalPrice(response.data.shopCartTotal))
            dispatch(cartSlice.actions.setTotalCount(response.data.totalItems))
            return
        }

        if (products[indexProduct].book.amount <= products[indexProduct].amount) {
            return
        } else {
            const response = await $api.post(`/Order/add-item-to-cart?id=${productId}`)
            dispatch(cartSlice.actions.setCart(response.data.shoppingCartItem))
            dispatch(cartSlice.actions.setTotalPrice(response.data.shopCartTotal))
            dispatch(cartSlice.actions.setTotalCount(response.data.totalItems))
        }
    } catch (err) {
        console.log(err)
    }
}

export const fetchCart = () => async (dispatch: AppDispatch) => {
    try {
        const response = await $api.get(`/Order/get-shopping-cart`, {withCredentials: true})
        dispatch(cartSlice.actions.setCart(response.data.shoppingCartItem))
        dispatch(cartSlice.actions.setTotalPrice(response.data.shopCartTotal))
        dispatch(cartSlice.actions.setTotalCount(response.data.totalItems))
    } catch (err) {
        console.log(err)
    }
}

export const removeCart = (productId: string | number) => async (dispatch: AppDispatch) => {
    try {
        const response = await $api.post(`/Order/remove-item-from-cart?id=${productId}`)
        dispatch(cartSlice.actions.setCart(response.data.shoppingCartItem))
        dispatch(cartSlice.actions.setTotalPrice(response.data.shopCartTotal))
        dispatch(cartSlice.actions.setTotalCount(response.data.totalItems))
    } catch (err) {
        console.log(err)
    }
}

export const removeItemCart = (productId: string | number) => async (dispatch: AppDispatch) => {
    try {
        const response = await $api.post(`/Order/remove-all-choosen-items-from-cart?id=${productId}`)

        dispatch(cartSlice.actions.setCart(response.data.shoppingCartItem))
        dispatch(cartSlice.actions.setTotalPrice(response.data.shopCartTotal))
        dispatch(cartSlice.actions.setTotalCount(response.data.totalItems))
    } catch (err) {
        console.log(err)
    }
}