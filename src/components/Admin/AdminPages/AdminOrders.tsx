import React, {useEffect} from 'react';
import {GridColDef} from "@mui/x-data-grid";
import {Card, Pagination} from "@mui/material";
import {useTypedSelector} from "../../../hooks/useTypedSelector";
import {useActions} from "../../../hooks/useAppDispatch";
import styles from "../../../pages/Profile/Profile.module.scss";
import {getOrdersAdmin} from "../../../redux/actions/order";
import {Link} from "react-router-dom";

const columns: GridColDef[] = [
    {field: 'address', headerName: 'address', width: 70},
    {field: 'applicationUser', headerName: 'applicationUser', width: 130},
    {field: 'contactEmail', headerName: 'contactEmail', width: 130},
    {field: 'contactName', headerName: 'contactName', width: 130},
    {field: 'contactPhone', headerName: 'contactPhone', width: 130},
    {field: 'delivery', headerName: 'delivery', type: 'Object', width: 130},
    {field: 'fk_DeliveryId', headerName: 'fk_DeliveryId', width: 130},
    {field: 'fk_OrderStatusId', headerName: 'fk_OrderStatusId', width: 130},
    {field: 'id', headerName: 'id', width: 130},
    {field: 'id', headerName: 'id', width: 130},
    // {field: 'book_Author', headerName: 'book_Author', width: 130},
];


const AdminOrders = () => {

    const {orders, page, pageSize, count} = useTypedSelector(state => state.orderReducer)

    const {getOrdersAdmin, setOrderPage, changeOrderStatusToCancelled, changeOrderStatusToApproved, changeOrderStatusToDone} = useActions()

    useEffect(() => {
        getOrdersAdmin(page, pageSize)
    }, [page])

    const handleChange = (event: React.ChangeEvent<unknown>, page: number) => {
        setOrderPage(page)
    };

    const pages = Math.ceil(count / pageSize)

    return (
        <div>
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
                                    <div className={styles.profile__statusWrapper}>
                                        <div>
                                            <label>Сумма заказа </label>
                                            <p>{order.sum}</p>
                                        </div>
                                        {order.orderStatus.id === 2 ?
                                            <div style={{display: "flex", alignItems: "center", gap: "15px"}}>
                                                <div style={{padding: "2px 5px", borderRadius: "5px", border: "1px solid #133337", cursor: "pointer"}}>
                                                    Заказ отменен
                                                </div>
                                            </div> :
                                            <div style={{display: "flex", alignItems: "center", gap: "15px"}}>
                                                <div style={{padding: "2px 5px", borderRadius: "5px", border: "1px solid #EB4C42", cursor: "pointer"}}
                                                     onClick={() => {
                                                         changeOrderStatusToCancelled(order.id)
                                                     }}
                                                >
                                                    Отменить
                                                </div>
                                                <div style={{padding: "2px 5px", borderRadius: "5px", border: "1px solid #1976D2", cursor: "pointer"}}
                                                     onClick={() => {
                                                         changeOrderStatusToApproved(order.id)
                                                     }}
                                                >
                                                    Подтвердить
                                                </div>
                                                <div style={{padding: "2px 5px", borderRadius: "5px", border: "1px solid #5ab134", cursor: "pointer"}}
                                                     onClick={() => {
                                                         changeOrderStatusToDone(order.id)
                                                     }}
                                                >
                                                    Завершить
                                                </div>
                                            </div>
                                        }
                                    </div>
                                </li>
                                <li className={styles.profile__item}>
                                    <label>{order?.delivery?.name}</label>
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

export default AdminOrders;