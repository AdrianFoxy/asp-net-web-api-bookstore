import {combineReducers, configureStore} from "@reduxjs/toolkit";
import genreReducer from "./reducers/GenreSlice";
import productReducer from "./reducers/ProductSlice";
import cartReducer from "./reducers/CartSlice";
import authorReducer from "./reducers/AuthorSlise"
import userReducer from "./reducers/UserSlice"
import orderReducer from "./reducers/OrderSlice"
import publisherReducer from "./reducers/PublisherSlice"
import { FLUSH, PAUSE, PERSIST, PURGE, REGISTER, REHYDRATE, persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'

const persistConfig = {
    key: 'root',
    storage,
    whitelist: ["cartReducer"]
}

const rootReducer = combineReducers({
    genreReducer,
    productReducer,
    cartReducer,
    authorReducer,
    userReducer,
    orderReducer,
    publisherReducer
})

const persistedReducer = persistReducer(persistConfig, rootReducer)

export const setupStore = () => {
    return configureStore({
        reducer: persistedReducer,
        middleware: (getDefaultMiddleware) =>
            getDefaultMiddleware({
                serializableCheck: {
                    ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
                },
            }),
    })
}

const store = setupStore()

export const persistor = persistStore(store)

export default store

export type RootState = ReturnType<typeof rootReducer>
export type AppStore = ReturnType<typeof setupStore>
export type AppDispatch = AppStore["dispatch"]