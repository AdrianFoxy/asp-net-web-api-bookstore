import React, {useEffect, useState} from 'react';
import {useActions} from "../../hooks/useAppDispatch";
import styles from "../../pages/Profile/Profile.module.scss";
import {useTypedSelector} from "../../hooks/useTypedSelector";
import {Card, TextField} from "@mui/material";
import ShowAdmin from "../../auth/ShowAdmin";
import useDebounce from "../../hooks/useDebounce";

const OrderById = () => {

    const [id, setId] = useState<any>()

    const {getOrderById} = useActions()

    const {orderById, errorOrderById} = useTypedSelector(state => state.orderReducer)

    const debouncedId = useDebounce(id, 1000)

    useEffect(() => {
        if (debouncedId) {
            getOrderById(debouncedId)
        }
    }, [debouncedId])

    console.log(errorOrderById)

    if (orderById) {
        return (
            <div>
                <TextField value={id} onChange={(e) => setId(e.target.value)} placeholder="введите номер заказа"
                           style={{marginBottom: "12px"}} id="outlined-basic" label="Заказ по номеру" variant="outlined"/>
                <Card className={styles.profile__items_wrapper}>
                    <ul className={styles.profile__items}>
                        <div className={styles.profile__info}>
                            <li className={styles.profile__item}>
                                <div className={styles.profile__statusWrapper}>
                                    <div>
                                        <label>Номер заказа</label>
                                        <p>{orderById.id}</p>
                                    </div>
                                    <div>
                                        <label>Статус заказа</label>
                                        <p>{orderById.orderStatus.name}</p>
                                    </div>
                                </div>
                            </li>
                            <li className={styles.profile__item}>
                                <div className={styles.profile__statusWrapper}>
                                    <div>
                                        <label>Сумма заказа </label>
                                        <p>{orderById.sum}</p>
                                    </div>
                                    {orderById.orderStatus.id === 2 ?
                                        <div style={{display: "flex", alignItems: "center", gap: "15px"}}>
                                            <div style={{
                                                padding: "2px 5px",
                                                borderRadius: "5px",
                                                border: "1px solid #133337",
                                                cursor: "pointer"
                                            }}>
                                                Заказ отменен
                                            </div>
                                        </div> :
                                        orderById.orderStatus.id === 3 ?
                                            <div style={{display: "flex", alignItems: "center", gap: "15px"}}>
                                                <div style={{
                                                    padding: "2px 5px",
                                                    borderRadius: "5px",
                                                    border: "1px solid #133337",
                                                    cursor: "pointer"
                                                }}>
                                                    Заказ выполнен
                                                </div>
                                            </div> :
                                            orderById.orderStatus.id === 5 ?
                                                <div style={{display: "flex", alignItems: "center", gap: "15px"}}>
                                                    <div style={{
                                                        padding: "2px 5px",
                                                        borderRadius: "5px",
                                                        border: "1px solid #133337",
                                                        cursor: "pointer"
                                                    }}>
                                                        Заказ в пути
                                                    </div>
                                                </div> :
                                                ""
                                    }
                                </div>
                            </li>
                            <li className={styles.profile__item}>
                                <label>{orderById?.delivery?.name}</label>
                                <p>{orderById.address}</p>
                            </li>
                        </div>
                        <div className={styles.profile__products}>
                            <label className={styles.profile__label}>Товары</label>
                            <div>
                                {orderById.orderItem.map((orderItem) =>
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
            </div>
        )
    } else if (errorOrderById) {
        return <div>
            <TextField value={id} onChange={(e) => setId(e.target.value)} placeholder="введите номер заказа"
                       style={{marginBottom: "12px"}} id="outlined-basic" label="Заказ по номеру" variant="outlined"/>
            <div>
                Заказа с таким id нет
            </div>
        </div>
    } else {
        return  <TextField value={id} onChange={(e) => setId(e.target.value)} placeholder="введите номер заказа"
                           style={{marginBottom: "12px"}} id="outlined-basic" label="Заказ по номеру" variant="outlined"/>
    }
};

export default OrderById;