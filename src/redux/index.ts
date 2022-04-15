import {combineReducers, configureStore} from "@reduxjs/toolkit";
import genreReducer from "./reducers/GenreSlice";
import productReducer from "./reducers/ProductSlice";

const rootReducer = combineReducers({
    genreReducer,
    productReducer
})

export const setupStore = () => {
    return configureStore({
        reducer: rootReducer
    })
}

const store = setupStore()

export default store

export type RootState = ReturnType<typeof rootReducer>
export type AppStore = ReturnType<typeof setupStore>
export type AppDispatch = AppStore["dispatch"]