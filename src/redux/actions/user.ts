import {AppDispatch} from "../index";
import {userSlice} from "../reducers/UserSlice";
import {userApi} from "../../api/user-api";

export const checkRole = () => async (dispatch: AppDispatch) => {
    try {
        const response = await userApi.getRoleCurrentUser()
        dispatch(userSlice.actions.setRole(response.data))
        if (response.data === "Guest") {
            dispatch(userSlice.actions.setIsAuth(false))
        } else {
            dispatch(userSlice.actions.setIsAuth(true))
        }
    } catch (err) {

    }
}

export const checkInfo = () => async (dispatch: AppDispatch) => {
    try {
        const response = await userApi.getCurrentUserInfo()
        dispatch(userSlice.actions.setUser(response.data))
        dispatch(userSlice.actions.setIsInitialized(true))
    } catch (err) {

    }
}

export const login = (user: Object) => async (dispatch: AppDispatch) => {
    try {
        const response = await userApi.login(user)
        localStorage.setItem("token", response.data.message)
        await dispatch(checkRole())
        await dispatch(checkInfo())
    } catch (err) {

    }
}

export const registration = (newUser: Object) => async (dispatch: AppDispatch) => {
    try {
        const response = await userApi.register(newUser)
        if (response.status === 200) {
            localStorage.setItem("token", response.data.message)
            await dispatch(checkRole())
            await dispatch(checkInfo())
        }
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

export const changeUserInfo = (id: string, user: Object) => async (dispatch: AppDispatch) => {
    try {
        const response = await userApi.updateUserById(id, user)
        if (response.status === 200) {
            await dispatch(checkInfo())
        }
    } catch (err) {

    }
}

export const changeFullName = (fullName: string) => async (dispatch: AppDispatch) => {
    dispatch(userSlice.actions.changeFullName(fullName))
}

export const changePhone = (fullName: string) => async (dispatch: AppDispatch) => {
    dispatch(userSlice.actions.changePhone(fullName))
}

export const changeEmail = (fullName: string) => async (dispatch: AppDispatch) => {
    dispatch(userSlice.actions.changeEmail(fullName))
}

export const changeDateofBirth = (fullName: string) => async (dispatch: AppDispatch) => {
    dispatch(userSlice.actions.changeDateofBirth(fullName))
}