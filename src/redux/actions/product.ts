import {AppDispatch} from "../index";
import $api from "../../http";
import {IProduct} from "../../types/IProduct";
import {productSlice} from "../reducers/ProductSlice";

export const fetchProducts = (genre: string, type: string, page: number = 1, count: number = 10) => async (dispatch: AppDispatch) => {
    try {
        if (type === "type-genre") {
            const response = await $api.get<IProduct[]>(`/Book/get-all-books-by-typegenre/${genre}`, {
                params: {
                    Page: page,
                    ItemsPerPage: count
                }
            })
            const x = JSON.parse(response.headers["x-pagination"])
            dispatch(productSlice.actions.setCount(x.TotalCount))
            dispatch(productSlice.actions.productsFetching(response.data))
        } else if (type === "genre") {
            const response = await $api.get<IProduct[]>(`/Book/get-all-books-by-genre/${genre}`, {
                params: {
                    Page: 1,
                    ItemsPerPage: 10
                }
            })
            const x = JSON.parse(response.headers["x-pagination"])
            dispatch(productSlice.actions.setCount(x.TotalCount))
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
        dispatch(productSlice.actions.setBooksHome(response.data))
    } catch (err) {

    }
}

export const fetchWhatToReadBooks = () => async (dispatch: AppDispatch) => {
    try {
        const response = await $api.get<IProduct[]>(`/Book/get-what-to-read`)
        dispatch(productSlice.actions.setBooksToRead(response.data))
    } catch (err) {

    }
}

export const fetchAllProduct = (page: number = 0) => async (dispatch: AppDispatch) => {
    try {
        const response = await $api.get<IProduct[]>(`/Book/get-all-books-info`, {
            params: {
                Page: page, //?
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

export const setPageDataGrid = (newPage: number) => async (dispatch: AppDispatch) => {
    dispatch(productSlice.actions.setPageDataGrid(newPage))
}

export const createProduct = (product: Object) => async (dispatch: AppDispatch) => {
    try {
        const response = await $api.post(`/Book/add-book`, product)
    } catch (err) {

    }
}

export const setMinPrice = (minPrice: number) => async (dispatch: AppDispatch) => {
    dispatch(productSlice.actions.setMinPrice(minPrice))
}

export const setMaxPrice = (maxPrice: number) => async (dispatch: AppDispatch) => {
    dispatch(productSlice.actions.setMaxPrice(maxPrice))
}

export const setFilteredProducts = (filteredProduct: IProduct[]) => async (dispatch: AppDispatch) => {
    dispatch(productSlice.actions.setFilteredProducts(filteredProduct))
}

export const fetchProduct = (productId: string | undefined) => async (dispatch: AppDispatch) => {
    try {
        const response = await $api.get(`/Book/get-book-by-id/${productId}`)
        dispatch(productSlice.actions.setProduct(response.data))
    } catch (err) {

    }

}

export const searchBooks = (text: string, page: number = 1) => async (dispatch: AppDispatch) =>{
    try {
        const response = await $api.get(`/Book/get-searched-books`, {
            params: {
                Page: page,
                ItemsPerPage: 10,
                searchString: text
            }
        })
        const x = JSON.parse(response.headers["x-pagination"])
        dispatch(productSlice.actions.setSearchedBooks(response.data))
        dispatch(productSlice.actions.setCountS(x.TotalCount))
    } catch (err) {

    }
}

export const setTextSearch = (text: string) => async (dispatch: AppDispatch) => {
    dispatch(productSlice.actions.setTextSearh(text))
}

export const setPageSearch = (page: number) => async (dispatch: AppDispatch) => {
    dispatch(productSlice.actions.setPageS(page))
}