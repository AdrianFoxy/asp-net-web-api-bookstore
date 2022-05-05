import React from 'react';
import {useTypedSelector} from "../hooks/useTypedSelector";

const ShowAdmin = ({children}: { children: JSX.Element }) => {
    const {role} = useTypedSelector(state => state.userReducer)
    if (role === "Admin") {
        return children
    } else {
        return null
    }
};

export default ShowAdmin;