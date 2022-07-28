import axios from "axios"

const $api = axios.create({
    withCredentials: true,
    baseURL: "https://localhost:44307/api"
})

$api.interceptors.request.use((config) => {
    if (config.headers) {
        config.headers.authorization = `Bearer ${localStorage.getItem('token')}`
        return config
    }
})

export enum ResultCodesEnum {
    Success = 0,
    Error = 1
}

export type APIResponseType<D ={}, RC = ResultCodesEnum> = {
    data: D
    messages: Array<string>
    resultCode: RC
}

export default $api