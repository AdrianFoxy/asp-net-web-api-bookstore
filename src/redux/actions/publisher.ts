import {AppDispatch} from "../index";
import {publisherSlice} from "../reducers/PublisherSlice";
import {publisherApi} from "../../api/publisher-api";

export const fetchPublishers = (page: number = 0, count: number = 10) => async (dispatch: AppDispatch) => {
    try {
        const response = await publisherApi.getAllPublishers()
        dispatch(publisherSlice.actions.publishersFetching(response.data))
        // const x = JSON.parse(response.headers["x-pagination"])
        // dispatch(genreSlice.actions.setCountTypeGenres(x.TotalCount))
    } catch (err) {

    }
}

export const addPublisher = (publisher: Object) => async (dispatch: AppDispatch) => {
    try {
        const response = await publisherApi.addPublisher(publisher)
        //dispatch(publisherSlice.actions.addPublisher(response.data))
        if (response.status === 200) {
            dispatch(fetchPublishers())
        }
    } catch (err) {

    }
}

export const deletePublisher = (id: number) => async (dispatch: AppDispatch) => {
    try {
        const response = await publisherApi.deletePublisher(id)
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
        const response = await publisherApi.updatePublisher(id, publisher)
        if (response.status === 200) {
            dispatch(fetchPublishers())
        }
    } catch (err) {

    }
}