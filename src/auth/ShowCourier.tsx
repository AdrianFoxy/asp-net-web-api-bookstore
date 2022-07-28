import React from 'react';
import {useTypedSelector} from "../hooks/useTypedSelector";

const ShowCourier = ({children}: { children: JSX.Element }) => {
    const {role} = useTypedSelector(state => state.userReducer)
    if (role === "Deliveryman" || role === "Admin") {
        return children
    } else {
        return null
    }
};

export default ShowCourier;