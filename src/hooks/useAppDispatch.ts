import {useDispatch} from "react-redux";
import {AppDispatch} from "../redux";
import {bindActionCreators} from "@reduxjs/toolkit";
import {allActionCreators} from "../redux/actions";

export const useAppDispatch = () => useDispatch<AppDispatch>()

export const useActions = () => {
    const dispatch = useAppDispatch()

    return bindActionCreators(allActionCreators, dispatch)
}