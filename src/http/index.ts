import axios from "axios"

const $api = axios.create({
    withCredentials: true,
    baseURL: "https://localhost:44307/api"
})

export default $api