import $api from "../http";

export const userApi = {
    getRoleCurrentUser() {
        return $api.get(`/Auth/get-gole-of-current-user`)
    },
    getCurrentUserInfo() {
        return $api.get(`/Auth/get-current-user-info`)
    },
    login(user: Object) {
        return $api.post(`/Auth/Login`, user)
    },
    register(newUser: Object) {
        return $api.post(`Auth/register`, newUser)
    },
    updateUserById(id: string, user: Object) {
        return $api.put(`Auth/update-user-by-id/${id}`, user)
    }
}