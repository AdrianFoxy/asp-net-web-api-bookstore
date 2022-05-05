import {useTypedSelector} from "../hooks/useTypedSelector";
import {useLocation, Navigate} from "react-router-dom";

export const RequireAuth = ({children}: { children: JSX.Element }) => {
    const {isAuth} = useTypedSelector(state => state.userReducer)
    const location = useLocation()

    if (isAuth) {
        return <Navigate to="/" state={{from: location}} replace/>
    } else {
        return children
    }
}