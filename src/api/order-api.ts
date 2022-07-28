import $api from "../http";

export const orderApi = {
    getOrders(page: number, count: number) {
        return $api.get(`/Order/get-orders-of-user`, {
            params: {
                Page: page,
                ItemsPerPage: count
            }
        })
    },
    getOrderById(id: number) {
        return $api.get(`/Order/get-order-by-id/${id}`)
    },
    getOrdersAdmin(page: number, count: number) {
        return $api.get(`/Order/get-all-orders-for-admin`, {
            params: {
                Page: page,
                ItemsPerPage: count
            }
        })
    },
    getOrdersForCourier(page: number, count: number) {
        return $api.get(`/Order/get-all-approved-orders-for-admin`, {
            params: {
                Page: page,
                ItemsPerPage: count
            }
        })
    },
    changeOrderStatusToCancelled(orderId: number) {
        return $api.put(`/Order/change-order-status-to-canceled?orderId=${orderId}`)
    },
    changeOrderStatusToApproved(orderId: number) {
        return $api.put(`/Order/change-order-status-to-approved`, null, {
            params: {
                orderId: orderId
            }
        })
    },
    changeOrderStatusToDone(orderId: number) {
        return $api.put(`/Order/change-order-status-to-done`, null, {
            params: {
                orderId: orderId
            }
        })
    },
    changeOrderStatusOnMyWay(orderId: number) {
        return $api.put(`/Order/change-order-status-on-my-way`, null, {
            params: {
                orderId: orderId
            }
        })
    },
    changeOrderStatusWaitingAtThePoint(orderId: number) {
        return $api.put(`/Order/change-order-status-waiting-at-the-point`, null, {
            params: {
                orderId: orderId
            }
        })
    },
    getLastOrders() {
        return $api.get(`/Order/get-last-orders-for-Admin`)
    }
}