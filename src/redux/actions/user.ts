import {AppDispatch} from "../index";
import $api from "../../http";
import {userSlice} from "../reducers/UserSlice";

export const checkRole = () => async (dispatch: AppDispatch) => {
    try {
        const response = await $api.get(`/Auth/get-gole-of-current-user`)
        dispatch(userSlice.actions.setRole(response.data))
        if (response.data === "NotAuthorized") {
            dispatch(userSlice.actions.setIsAuth(false))
        } else {
            dispatch(userSlice.actions.setIsAuth(true))
        }
    } catch (err) {

    }
}

export const checkInfo = () => async (dispatch: AppDispatch) => {
    try {
        const response = await $api.get(`/Auth/get-current-user-info`)
        dispatch(userSlice.actions.setUser(response.data))
        dispatch(userSlice.actions.setIsInitialized(true))
    } catch (err) {

    }
}

export const login = (user: Object) => async (dispatch: AppDispatch) => {
    try {
        const response = await $api.post(`/Auth/Login`, user)
        console.log(response.data.message)
        localStorage.setItem("token", response.data.message)
        await dispatch(checkRole())
        await dispatch(checkInfo())
    } catch (err) {

    }
}

export const registration = (newUser: Object) => async (dispatch: AppDispatch) => {
    try {
        const response = await $api.post(`Auth/register`, newUser)
        console.log(response)
        localStorage.setItem("token", response.data.message)
    } catch (err) {

    }
}

export const logout = () => async (dispatch: AppDispatch) => {
    try {
        localStorage.removeItem("token")
        await dispatch(checkRole())
        await dispatch(checkInfo())
    } catch (err) {

    }
}