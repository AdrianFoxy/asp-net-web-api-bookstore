import {useTypedSelector} from "../hooks/useTypedSelector";
import {useLocation, Navigate} from "react-router-dom";

export const RequireAdmin = ({children}: { children: JSX.Element }) => {
    const {role} = useTypedSelector(state => state.userReducer)
    const location = useLocation()

    if (role === "Admin") {
        return children
    } else {
        return <Navigate to="/" state={{from: location}} replace/>
    }
}