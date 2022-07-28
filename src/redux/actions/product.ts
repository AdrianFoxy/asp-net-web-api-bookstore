import {AppDispatch} from "../index";
import $api from "../../http";
import {IProduct} from "../../types/IProduct";
import {productSlice} from "../reducers/ProductSlice";
import {fetchAuthors} from "./author";

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

export const fetchAgeRecomendations = () => async (dispatch: AppDispatch) => {
    try {
        const response = await $api.get(`/Book/get-age-recommendations(authorizedOnly)`)
        dispatch(productSlice.actions.setBooksAgeRecomendations(response.data))
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

export const fetchAllProduct = (page: number = 0, count: number = 10) => async (dispatch: AppDispatch) => {
    try {
        const response = await $api.get<IProduct[]>(`/Book/get-all-books-info`, {
            params: {
                Page: page, //?
                ItemsPerPage: count
            }
        })
        const x = JSON.parse(response.headers["x-pagination"])
        dispatch(productSlice.actions.productsFetching(response.data))
        dispatch(productSlice.actions.setCount(x.TotalCount))
    } catch (err) {

    }
}

export const fetchAllProductAdmin = (page: number = 0, count: number = 10) => async (dispatch: AppDispatch) => {
    try {
        const response = await $api.get<IProduct[]>(`/Book/get-all-books-info`, {
            params: {
                Page: page + 1, //?
                ItemsPerPage: count
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

export const editProduct = (id: number, author: Object) => async (dispatch: AppDispatch) => {
    try {
        const response = await $api.put(`/Book/update-book-by-id/${id}`, author)
        if (response.status === 200) {

        }
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

export const searchBooks = (text: string, page: number = 1) => async (dispatch: AppDispatch) => {
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

export const deleteProduct = (id: number) => async (dispatch: AppDispatch): Promise<any> => {
    try {
        const response = await $api.delete(`/Book/delete-book-by-id/${id}`)
        if (response.status === 200) {
            return new Promise((resolve, reject) => {
                resolve(true)
            })
        }
    } catch (err) {
        dispatch(productSlice.actions.setError(true))
    }
}

export const deleteError = () => async (dispatch: AppDispatch) => {
    dispatch(productSlice.actions.deleteError(false))
}

//const wrapDispatchWithLog = (fn: any) => (dispatch: AppDispatch) => fn(dispatch).then((r: any) => console.log(r))

export const fetchAgeRecomendationsAdmin = () => async (dispatch: AppDispatch) => {
    try {
        const response = await $api.get(`/Book/get-recommendations-for-input-age-group(Admin)?age=16`)
        dispatch(productSlice.actions.setRecomendations0_16(response.data))
        const response2 = await $api.get(`/Book/get-recommendations-for-input-age-group(Admin)?age=27`)
        dispatch(productSlice.actions.setRecomendations17_27(response2.data))
        const response3 = await $api.get(`/Book/get-recommendations-for-input-age-group(Admin)?age=35`)
        dispatch(productSlice.actions.setRecomendations28_35(response3.data))
        const response4 = await $api.get(`/Book/get-recommendations-for-input-age-group(Admin)?age=50`)
        dispatch(productSlice.actions.setRecomendations36_50(response4.data))
        const response5 = await $api.get(`/Book/get-recommendations-for-input-age-group(Admin)?age=51`)
        dispatch(productSlice.actions.setRecomendations51_10000(response5.data))
    } catch (err) {

    }
}