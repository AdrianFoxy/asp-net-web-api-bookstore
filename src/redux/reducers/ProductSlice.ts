import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {IProduct} from "../../types/IProduct";

interface ProductState {
    products: IProduct[]
    //
    booksHome: IProduct[]
    booksToRead: IProduct[]
    booksAgeRecomendations: IProduct[]
    //
    searchedBooks: IProduct[]
    pageS: number
    countS: number
    pageSizeS: number
    textSearch: string
    //
    page: number
    count: number
    pageSize: number
    pageDataGrid: number
    minPrice: number
    maxPrice: number
    filteredProducts: IProduct[],
    product: IProduct | null
    //
    recomendations0_16: IProduct[]
    recomendations17_27: IProduct[]
    recomendations28_35: IProduct[]
    recomendations36_50: IProduct[]
    recomendations51_10000: IProduct[]
}

const initialState: ProductState = {
    products: [],
    //
    booksHome: [],
    booksToRead: [],
    booksAgeRecomendations: [],
    //
    searchedBooks: [],
    pageS: 1,
    countS: 0,
    pageSizeS: 10,
    textSearch: "",
    //
    page: 1,
    count: 0,
    pageSize: 40,
    pageDataGrid: 0,
    minPrice: 0,
    maxPrice: 1000,
    filteredProducts: [],
    product: null,
    //
    recomendations0_16: [],
    recomendations17_27: [],
    recomendations28_35: [],
    recomendations36_50: [],
    recomendations51_10000: [],
}

export const productSlice = createSlice({
    name: "product",
    initialState,
    reducers: {
        productsFetching(state, action: PayloadAction<IProduct[]>) {
            state.products = action.payload
        },
        //
        setBooksHome(state, action: PayloadAction<IProduct[]>) {
            state.booksHome = action.payload
        },
        setBooksToRead(state, action: PayloadAction<IProduct[]>) {
            state.booksToRead = action.payload
        },
        setBooksAgeRecomendations(state, action: PayloadAction<IProduct[]>) {
            state.booksAgeRecomendations = action.payload
        },
        //
        setSearchedBooks(state, action: PayloadAction<IProduct[]>) {
            state.searchedBooks = action.payload
        },
        setPageS(state, action: PayloadAction<number>) {
            state.pageS = action.payload
        },
        setCountS(state, action: PayloadAction<number>) {
            state.countS = action.payload
        },
        setPageSizeS(state, action: PayloadAction<number>) {
            state.pageSizeS = action.payload
        },
        setTextSearh(state, action: PayloadAction<string>) {
            state.textSearch = action.payload
        },
        //
        setCount(state, action: PayloadAction<number>) {
            state.count = action.payload
        },
        setPage(state, action: PayloadAction<number>) {
            state.page = action.payload
        },
        setPageDataGrid(state, action: PayloadAction<number>) {
            state.pageDataGrid = action.payload
        },
        setMinPrice(state, action: PayloadAction<number>) {
            state.minPrice = action.payload
        },
        setMaxPrice(state, action: PayloadAction<number>) {
            state.maxPrice = action.payload
        },
        setFilteredProducts(state, action: PayloadAction<IProduct[]>) {
            state.filteredProducts = action.payload
        },
        setProduct(state, action: PayloadAction<IProduct>) {
            state.product = action.payload
        },
        //
        setRecomendations0_16(state, action: PayloadAction<IProduct[]>) {
            state.recomendations0_16 = action.payload
        },
        setRecomendations17_27(state, action: PayloadAction<IProduct[]>) {
            state.recomendations17_27 = action.payload
        },
        setRecomendations28_35(state, action: PayloadAction<IProduct[]>) {
            state.recomendations28_35 = action.payload
        },
        setRecomendations36_50(state, action: PayloadAction<IProduct[]>) {
            state.recomendations36_50 = action.payload
        },
        setRecomendations51_10000(state, action: PayloadAction<IProduct[]>) {
            state.recomendations51_10000 = action.payload
        },
    }
})

export default productSlice.reducer