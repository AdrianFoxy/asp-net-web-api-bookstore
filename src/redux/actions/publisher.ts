import {AppDispatch} from "../index";
import $api from "../../http";
import {publisherSlice} from "../reducers/PublisherSlice";

export const fetchPublishers = (page: number = 0, count: number = 10) => async (dispatch: AppDispatch) => {
    try {
        const response = await $api.get(`Publisher/get-all-publishers`)
        dispatch(publisherSlice.actions.publishersFetching(response.data))
        // const x = JSON.parse(response.headers["x-pagination"])
        // dispatch(genreSlice.actions.setCountTypeGenres(x.TotalCount))
    } catch (err) {

    }
}

export const addPublisher = (publisher: Object) => async (dispatch: AppDispatch) => {
    try {
        const response = await $api.post(`Publisher/add-publisher`, publisher)
        //dispatch(publisherSlice.actions.addPublisher(response.data))
        if (response.status === 200) {
            dispatch(fetchPublishers())
        }
    } catch (err) {

    }
}

export const deletePublisher = (id: number) => async (dispatch: AppDispatch) => {
    try {
        const response = await $api.delete(`Publisher/delete-publisher-by-id/${id}`)
        // if (response.status === 200) {
        //     dispatch(publisherSlice.actions.deletePublisher(id))
        // }
        if (response.status === 200) {
            dispatch(fetchPublishers())
        }

    } catch (err) {

    }
}

export const editPublisher = (id: number, publisher: Object) => async (dispatch: AppDispatch) => {
    try {
        const response = await $api.put(`Publisher/update-publisher-by-id/${id}`, publisher)
        if (response.status === 200) {
            dispatch(fetchPublishers())
        }
    } catch (err) {

    }
}