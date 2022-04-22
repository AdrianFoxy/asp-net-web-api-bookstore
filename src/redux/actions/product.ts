import {AppDispatch} from "../index";
import $api from "../../http";
import { IProduct } from "../../types/IProduct";
import {productSlice} from "../reducers/ProductSlice";

export const fetchProducts = (genre: string) => async (dispatch: AppDispatch) => {
    try {
        const response = await $api.get<IProduct[]>(`/Book/get-all-books-by-typegenre/${genre}`, {
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
        const response = await $api.get<IProduct[]>(`/Book/get-all-books-by-genre/${genre}`, {
            params: {
                Page: 1,
                ItemsPerPage: 10
            }
        })
        dispatch(productSlice.actions.productsFetching(response.data))
    } catch (error) {

    }
}

export const fetchFavoriteProducts = () => async (dispatch: AppDispatch) => {
    try {
        const response = await $api.get<IProduct[]>(`/Book/get-all-favorite-books`, {
            params: {
                Page: 1,
                ItemsPerPage: 10
            }
        })
        dispatch(productSlice.actions.productsFetching(response.data))
    } catch (error) {

    }
}