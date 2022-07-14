import {IPublisher} from "../../types/IPublisher";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {deletePublisher} from "../actions/publisher";

interface PublisherState {
    publishers: IPublisher[]
}

const initialState: PublisherState = {
    publishers: []
}

export const publisherSlice = createSlice({
    name: "genre",
    initialState,
    reducers: {
        publishersFetching(state, action: PayloadAction<IPublisher[]>) {
            state.publishers = action.payload
        },
        // addPublisher(state, action: PayloadAction<IPublisher>) {
        //     state.publishers.push({name: action.payload.name, id: state.publishers[state.publishers.length - 1]?.id + 1})
        // },
        // deletePublisher(state, action: PayloadAction<number>) {
        //     const index = state.publishers.findIndex(publisher => publisher.id === action.payload)
        //     state.publishers.splice(index, 1)
        // }
    }
})

export default publisherSlice.reducer