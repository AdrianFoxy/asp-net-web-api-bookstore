import $api from "../http";

export const cartApi = {
    addProduct(productId: string | number) {
        return $api.post(`/Order/add-item-to-cart?id=${productId}`)
    },
    getCart() {
        return $api.get(`/Order/get-shopping-cart`)
    },
    removeCart(productId: string | number) {
        return $api.post(`/Order/remove-item-from-cart?id=${productId}`)
    },
    removeItemCart(productId: string | number) {
        return $api.post(`/Order/remove-all-choosen-items-from-cart?id=${productId}`)
    }
}