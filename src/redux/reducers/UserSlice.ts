import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {IUser} from "../../types/IUser";

interface UserState {
    isInitialized: boolean
    isAuth: boolean
    role: string
    user: IUser
}

const initialState: UserState = {
    isInitialized: false,
    isAuth: false,
    role: "guest",
    user: {phone: "", email: "", fullName: "", id: ""}
}

export const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        login(state, action: PayloadAction<number>) {

        },
        setRole(state, action: PayloadAction<string>) {
            state.role = action.payload
        },
        setUser(state, action: PayloadAction<IUser>) {
            state.user = action.payload
        },
        setIsInitialized(state, action: PayloadAction<boolean>) {
            state.isInitialized = action.payload
        },
        setIsAuth(state, action: PayloadAction<boolean>) {
            state.isAuth = action.payload
        }
    }
})

export default userSlice.reducer