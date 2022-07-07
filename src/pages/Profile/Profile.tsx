import React, {FC} from 'react';
import styles from "./Profile.module.scss"
import {Card, Pagination} from "@mui/material";
import {IUser} from "../../types/IUser";
import {IOrder} from "../../types/IOrder";

interface ProfileProps {
    user: IUser
    page: number
    pages: number
    handleChange: (event: React.ChangeEvent<unknown>, page: number) => void
    orders: IOrder[]
}

const Profile: FC<ProfileProps> = (
    {
        user,
        page,
        pages,
        handleChange,
        orders,
    }
) => {
    return (
        <div>
            <div className={styles.profile__title2}>Личные данные</div>
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
            <div className={styles.profile__title_wrapper}>
                <div className={styles.profile__title}>Список заказов</div>
                <Pagination page={page} count={pages} color="primary" onChange={handleChange}/>
            </div>
            <div>
                {orders.map((order) =>
                    <Card className={styles.profile__items_wrapper}>
                        <ul className={styles.profile__items}>
                            <div className={styles.profile__info}>
                                <li className={styles.profile__item}>
                                    <div className={styles.profile__statusWrapper}>
                                        <div>
                                            <label>Номер заказа</label>
                                            <p>{order.id}</p>
                                        </div>
                                        <div>
                                            <label>Статус заказа</label>
                                            <p>{order.orderStatus.name}</p>
                                        </div>
                                    </div>
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
                                                Количество {orderItem.amount}
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
            <Pagination page={page} count={pages} color="primary" onChange={handleChange}/>
        </div>
    );
};

export default Profile;