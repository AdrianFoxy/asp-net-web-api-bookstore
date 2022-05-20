import React, {FC, useEffect} from 'react';
import {useTypedSelector} from "../../hooks/useTypedSelector";
import styles from "./Profile.module.scss"
import {useActions} from "../../hooks/useAppDispatch";
import {Card} from "@mui/material";

const Profile: FC = () => {

    const {user} = useTypedSelector(state => state.userReducer)

    const {orders} = useTypedSelector(state => state.orderReducer)
    console.log(orders)

    const {getOrders} = useActions()

    useEffect(() => {
        getOrders()
    }, [])

    return (
        <div>
            <div className={styles.profile__title}>Личные данные</div>
            <ul className={styles.profile__container}>
                <li className={styles.profile__item}>
                    <label>Фио </label>
                    <p> {user.fullName}</p>
                </li>
                <li className={styles.profile__item}>
                    <label>Электронная почта </label>
                    <p> {user.email}</p>
                </li>
                <li className={styles.profile__item}>
                    <label>Телефон </label>
                    <p> {user.phone}</p>
                </li>
            </ul>
            <div className={styles.profile__title}>Список заказов</div>
            <div>
                {orders.map((order) =>
                    <Card className={styles.profile__items_wrapper}>
                        <ul className={styles.profile__items}>
                            <div className={styles.profile__info}>
                                <li className={styles.profile__item}>
                                    <label>Номер заказа</label>
                                    <p>{order.id}</p>
                                </li>
                                <li className={styles.profile__item}>
                                    <label>Сумма заказа </label>
                                    <p>{order.sum}</p>
                                </li>
                                <li className={styles.profile__item}>
                                    <label>{order.delivery.name}</label>
                                    <p>{order.address}</p>
                                </li>
                            </div>
                            <div className={styles.profile__products}>
                                <label className={styles.profile__label}>Товары</label>
                                <div>
                                    {order.orderItem.map((orderItem) =>
                                        <div className={styles.profile__books}>
                                            <img
                                                src={`${process.env.REACT_APP_SERVER_IMAGE_URL}${orderItem.book.imageUrl}`}
                                                className={styles.profile__orderItem_img}/>
                                            <div>
                                                {orderItem.book.title}
                                            </div>
                                            <div>
                                                Цена {orderItem.book.price}
                                            </div>
                                            <div>
                                                Количество{orderItem.amount}
                                            </div>
                                            <div>
                                                Сумма {orderItem.amount * orderItem.book.price}
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </ul>
                    </Card>
                )}
            </div>
        </div>
    );
};

export default Profile;