import {AppDispatch} from "../index";
import {cartSlice} from "../reducers/CartSlice";
import $api from "../../http";

export const addProduct = (productId: number) => async (dispatch: AppDispatch) => {
    try {
        const response = await $api.post(`/Order/add-item-to-cart?id=${productId}`)
        let myArray = []
        for (let i = 0; i < response.data.shoppingCartItem.length; i++) {
            myArray.push({
                id: response.data.shoppingCartItem[i].book.id,
                name: response.data.shoppingCartItem[i].book.name,
                imageUrl: response.data.shoppingCartItem[i].book.imageUrl,
                price: response.data.shoppingCartItem[i].book.price,
                quantity: response.data.shoppingCartItem[i].amount
            })
        }
        dispatch(cartSlice.actions.setCart(myArray))
        dispatch(cartSlice.actions.setTotalPrice(response.data.shopCartTotal))
        dispatch(cartSlice.actions.setTotalCount(response.data.totalItems))
    } catch (e) {
        console.log(e)
    }
}

export const fetchCart = () => async (dispatch: AppDispatch) => {
    try {
        const response = await $api.get(`/Order/get-shopping-cart`, {withCredentials: true})
        let myArray = []
        for (let i = 0; i < response.data.shoppingCartItem.length; i++) {
            myArray.push({
                id: response.data.shoppingCartItem[i].book.id,
                name: response.data.shoppingCartItem[i].book.name,
                imageUrl: response.data.shoppingCartItem[i].book.imageUrl,
                price: response.data.shoppingCartItem[i].book.price,
                quantity: response.data.shoppingCartItem[i].amount
            })
        }
        dispatch(cartSlice.actions.setCart(myArray))
        dispatch(cartSlice.actions.setTotalPrice(response.data.shopCartTotal))
        dispatch(cartSlice.actions.setTotalCount(response.data.totalItems))
    } catch (e) {
        console.log(e)
    }
}