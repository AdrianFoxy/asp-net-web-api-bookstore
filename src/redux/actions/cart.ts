import {AppDispatch} from "../index";
import {cartSlice} from "../reducers/CartSlice";
import {ICart} from "../../types/ICart";


export const addProduct = (product: ICart) => async (dispatch: AppDispatch) => {
    dispatch(cartSlice.actions.addProduct(product))
}