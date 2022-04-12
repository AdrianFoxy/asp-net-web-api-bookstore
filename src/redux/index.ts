import {combineReducers, configureStore} from "@reduxjs/toolkit";
import genreReducer from "./reducers/GenreSlice";

const rootReducer = combineReducers({
    genreReducer
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