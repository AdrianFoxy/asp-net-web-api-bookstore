import {AppDispatch} from "../index";
import $api from "../../http";
import {IProduct} from "../../types/IProduct";
import {productSlice} from "../reducers/ProductSlice";

export const fetchProducts = (genre: string, type: string) => async (dispatch: AppDispatch) => {
    try {
        if (type === "type-genre") {
            const response = await $api.get<IProduct[]>(`/Book/get-all-books-by-typegenre/${genre}`, {
                params: {
                    Page: 1,
                    ItemsPerPage: 10
                }
            })
            dispatch(productSlice.actions.productsFetching(response.data))
        } else if (type === "genre") {
            const response = await $api.get<IProduct[]>(`/Book/get-all-books-by-genre/${genre}`, {
                params: {
                    Page: 1,
                    ItemsPerPage: 10
                }
            })
            dispatch(productSlice.actions.productsFetching(response.data))
        }

    } catch (err) {

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
    } catch (err) {

    }
}

export const fetchAllProduct = (page: number = 0) => async (dispatch: AppDispatch) => {
    try {
        const response = await $api.get<IProduct[]>(`/Book/get-all-books-info`, {
            params: {
                Page: page + 1,
                ItemsPerPage: 10
            }
        })
        const x = JSON.parse(response.headers["x-pagination"])
        dispatch(productSlice.actions.productsFetching(response.data))
        dispatch(productSlice.actions.setCount(x.TotalCount))
    } catch (err) {

    }
}

export const setPage = (newPage: number) => async (dispatch: AppDispatch) => {
    dispatch(productSlice.actions.setPage(newPage))
}

export const createProduct = (product: Object) => async (dispatch: AppDispatch) => {
    try {
        const response = await $api.post(`/Book/add-book`, product)
    } catch (err) {

    }
}