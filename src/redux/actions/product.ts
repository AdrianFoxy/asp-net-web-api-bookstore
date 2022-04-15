import {AppDispatch} from "../index";
import $api from "../../http";
import { IProduct } from "../../types/IProduct";
import {productSlice} from "../reducers/ProductSlice";

export const fetchProducts = (genre: string) => async (dispatch: AppDispatch) => {
    try {
        const response = await $api.get<IProduct[]>(`/Book/get-all-books-by-typegenre/Prikladnaya-literatura`, {
            params: {
                Page: 1,
                ItemsPerPage: 10
            }
        })
        dispatch(productSlice.actions.productsFetching(response.data))
    } catch (error) {

    }
}

export const fetchProductsByGenre = (genre: string) => async (dispatch: AppDispatch) => {
    try {
        const response = await $api.get<IProduct[]>(`/Book/get-all-books-by-genre/litRPG`, {
            params: {
                Page: 1,
                ItemsPerPage: 10
            }
        })
        dispatch(productSlice.actions.productsFetching(response.data))
    } catch (error) {

    }
}