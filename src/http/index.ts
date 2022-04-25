import axios from "axios"
import Cookies from 'js-cookie'

const $api = axios.create({
    withCredentials: true,
    baseURL: "https://localhost:44307/api"
})

// $api.interceptors.request.use((config) => {
//     //config.headers?[".AspNetCore.Session"] = ``
//
//     if (Cookies.get(".AspNetCore.Session")) {
//         // @ts-ignore
//         config.headers['.AspNetCore.Session']= `${Cookies.get('token')}`
//     }
// })

export default $api