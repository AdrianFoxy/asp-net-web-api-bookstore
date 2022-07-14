import React, {FC, useEffect} from 'react';
import {useTypedSelector} from "../../hooks/useTypedSelector";
import {useActions} from "../../hooks/useAppDispatch";
import Profile from "./Profile";
import {useNavigate} from "react-router-dom";

const ProfileContainer: FC = () => {

    const navigate = useNavigate()

    const {user} = useTypedSelector(state => state.userReducer)

    const {orders, page, pageSize, count} = useTypedSelector(state => state.orderReducer)

    const {getOrders, setOrderPage, changeOrderStatusToCancelled} = useActions()

    useEffect(() => {
        getOrders(page, pageSize)
    }, [page])

    const handleChange = (event: React.ChangeEvent<unknown>, page: number) => {
        setOrderPage(page)
    };

    const pages = Math.ceil(count / pageSize)

    return (
        <Profile page={page} orders={orders} user={user} handleChange={handleChange} pages={pages}
                 changeOrderStatusToCancelled={changeOrderStatusToCancelled} navigate={navigate}/>
    );
};

export default ProfileContainer;