import {AppDispatch} from "../index";
import $api from "../../http";
import {IProduct} from "../../types/IProduct";
import {productSlice} from "../reducers/ProductSlice";
import {productApi} from "../../api/product-api";

export const fetchProducts = (genre: string, type: string, page: number = 1, count: number = 10) => async (dispatch: AppDispatch) => {
    try {
        if (type === "type-genre") {
            const response = await productApi.getBooksTypeGenre(genre, page, count)
            const x = JSON.parse(response.headers["x-pagination"])
            dispatch(productSlice.actions.setCount(x.TotalCount))
            dispatch(productSlice.actions.productsFetching(response.data))
        } else if (type === "genre") {
            const response = await productApi.getBooksGenre(genre)
            const x = JSON.parse(response.headers["x-pagination"])
            dispatch(productSlice.actions.setCount(x.TotalCount))
            dispatch(productSlice.actions.productsFetching(response.data))
        }
    } catch (err) {

    }
}

export const fetchAgeRecomendations = () => async (dispatch: AppDispatch) => {
    try {
        const response = await productApi.getAgeRecomendations()
        dispatch(productSlice.actions.setBooksAgeRecomendations(response.data))
    } catch (err) {

    }
}

export const fetchFavoriteProducts = () => async (dispatch: AppDispatch) => {
    try {
        const response = await productApi.getAllFavoriteBooks()
        dispatch(productSlice.actions.setBooksHome(response.data))
    } catch (err) {

    }
}

export const fetchWhatToReadBooks = () => async (dispatch: AppDispatch) => {
    try {
        const response = await productApi.getWhatToReadBooks()
        dispatch(productSlice.actions.setBooksToRead(response.data))
    } catch (err) {

    }
}

export const fetchAllProduct = (page: number = 0, count: number = 10) => async (dispatch: AppDispatch) => {
    try {
        const response = await productApi.getAllBooksInfo(page, count)
        const x = JSON.parse(response.headers["x-pagination"])
        dispatch(productSlice.actions.productsFetching(response.data))
        dispatch(productSlice.actions.setCount(x.TotalCount))
    } catch (err) {

    }
}

export const fetchAllProductAdmin = (page: number = 0, count: number = 10) => async (dispatch: AppDispatch) => {
    try {
        const response = await productApi.getAllBooksAdmin(page, count)
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
        const response = await productApi.addProduct(product)
    } catch (err) {

    }
}

export const editProduct = (id: number, author: Object) => async (dispatch: AppDispatch) => {
    try {
        const response = await productApi.updateProduct(id, author)
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
        const response = await productApi.getBookById(productId)
        dispatch(productSlice.actions.setProduct(response.data))
    } catch (err) {

    }

}

export const searchBooks = (text: string, page: number = 1) => async (dispatch: AppDispatch) => {
    try {
        const response = await productApi.getSearchedBooks(text, page)
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
        const response = await productApi.deleteProduct(id)
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

export const fetchAgeRecomendationsAdmin = () => async (dispatch: AppDispatch) => {
    try {
        const response = await productApi.getRecommendationsForAge(16)
        dispatch(productSlice.actions.setRecomendations0_16(response.data))
        const response2 = await productApi.getRecommendationsForAge(27)
        dispatch(productSlice.actions.setRecomendations17_27(response2.data))
        const response3 = await productApi.getRecommendationsForAge(35)
        dispatch(productSlice.actions.setRecomendations28_35(response3.data))
        const response4 = await productApi.getRecommendationsForAge(50)
        dispatch(productSlice.actions.setRecomendations36_50(response4.data))
        const response5 = await productApi.getRecommendationsForAge(51)
        dispatch(productSlice.actions.setRecomendations51_10000(response5.data))
    } catch (err) {

    }
}