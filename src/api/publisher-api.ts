import $api from "../http";

export const publisherApi = {
    getAllPublishers() {
        return $api.get(`Publisher/get-all-publishers`)
    },
    addPublisher(publisher: Object) {
        return $api.post(`Publisher/add-publisher`, publisher)
    },
    deletePublisher(id: number) {
        return $api.delete(`Publisher/delete-publisher-by-id/${id}`)
    },
    updatePublisher(id: number, publisher: Object) {
        return $api.put(`Publisher/update-publisher-by-id/${id}`, publisher)
    }
}