import {AppDispatch} from "../index";
import {cartSlice} from "../reducers/CartSlice";
import {ICart} from "../../types/ICart";
import {cartApi} from "../../api/cart-api";

export const addProduct = (productId: string | number, products: ICart[]) => async (dispatch: AppDispatch) => {
    try {

        if (products.length === 0 ) {
            const response = await cartApi.addProduct(productId)
            dispatch(cartSlice.actions.setCart(response.data.shoppingCartItem))
            dispatch(cartSlice.actions.setTotalPrice(response.data.shopCartTotal))
            dispatch(cartSlice.actions.setTotalCount(response.data.totalItems))
            return
        }

        const indexProduct = products.findIndex((product) => product.book.id === Number(productId))

        if (indexProduct === -1) {
            const response = await cartApi.addProduct(productId)
            dispatch(cartSlice.actions.setCart(response.data.shoppingCartItem))
            dispatch(cartSlice.actions.setTotalPrice(response.data.shopCartTotal))
            dispatch(cartSlice.actions.setTotalCount(response.data.totalItems))
            return
        }

        if (products[indexProduct].book.amount <= products[indexProduct].amount) {
            return
        } else {
            const response = await cartApi.addProduct(productId)
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
        const response = await cartApi.getCart()
        dispatch(cartSlice.actions.setCart(response.data.shoppingCartItem))
        dispatch(cartSlice.actions.setTotalPrice(response.data.shopCartTotal))
        dispatch(cartSlice.actions.setTotalCount(response.data.totalItems))
    } catch (err) {
        console.log(err)
    }
}

export const removeCart = (productId: string | number) => async (dispatch: AppDispatch) => {
    try {
        const response = await cartApi.removeCart(productId)
        dispatch(cartSlice.actions.setCart(response.data.shoppingCartItem))
        dispatch(cartSlice.actions.setTotalPrice(response.data.shopCartTotal))
        dispatch(cartSlice.actions.setTotalCount(response.data.totalItems))
    } catch (err) {
        console.log(err)
    }
}

export const removeItemCart = (productId: string | number) => async (dispatch: AppDispatch) => {
    try {
        const response = await cartApi.removeItemCart(productId)
        dispatch(cartSlice.actions.setCart(response.data.shoppingCartItem))
        dispatch(cartSlice.actions.setTotalPrice(response.data.shopCartTotal))
        dispatch(cartSlice.actions.setTotalCount(response.data.totalItems))
    } catch (err) {
        console.log(err)
    }
}