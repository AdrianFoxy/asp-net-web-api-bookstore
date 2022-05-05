import React from 'react';
import {useTypedSelector} from "../hooks/useTypedSelector";

const ShowAuth = ({children}: { children: JSX.Element }) => {
    const {isAuth} = useTypedSelector(state => state.userReducer)
    if (isAuth) {
        return children
    } else {
        return null
    }
};

export default ShowAuth;