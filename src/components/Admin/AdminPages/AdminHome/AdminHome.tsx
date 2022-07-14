import React, {FC, useEffect} from 'react';
import {useActions} from "../../../../hooks/useAppDispatch";
import {useTypedSelector} from "../../../../hooks/useTypedSelector";
import styles from "./AdminHome.module.scss"
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import {Button, CardActionArea, CardActions} from '@mui/material';
import AgeRecomendations from "./AgeRecomendations";

const AdminHome: FC = () => {

    const {fetchLastOrders, fetchAgeRecomendationsAdmin} = useActions()

    useEffect(() => {
        fetchLastOrders()
        fetchAgeRecomendationsAdmin()
    }, [])

    const {lastOrders} = useTypedSelector(state => state.orderReducer)
    const {recomendations0_16, recomendations17_27, recomendations28_35, recomendations36_50, recomendations51_10000} = useTypedSelector(state => state.productReducer)
    console.log(recomendations0_16, recomendations17_27, recomendations28_35, recomendations36_50, recomendations51_10000)
    return (
        <div>
            <div className={styles.title}>Последние заказы</div>
            <div className={styles.orders__container}>
                {lastOrders.map((lastOrder) =>
                    <Card sx={{maxWidth: 345, marginRight: 3}}>
                        <div className={styles.g}>
                            <div className={styles.m}>
                                <Typography gutterBottom variant="h5" component="div">
                                    Заказ № {lastOrder.id}
                                </Typography>
                                <div className={`${styles.orders__infoContainer} ${styles.border}`}>
                                    <Typography variant="body2" color="text.secondary" component="div">
                                        <p>Сумма заказа</p>
                                        {lastOrder.sum}
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary" component="div">
                                        {lastOrder.orderStatus.name}
                                    </Typography>
                                </div>
                                <div className={styles.border}>
                                    <Typography variant="body2" color="text.secondary" component="div">
                                        <div className={styles.delivery}>
                                            <p>Тип доставки</p>
                                            <p>{lastOrder.delivery.name}</p>
                                        </div>
                                    </Typography>
                                    {lastOrder.delivery.id === 2 &&
                                    <Typography variant="body2" color="text.secondary" component="div">
                                        <div className={styles.delivery}>
                                            <p>Адрес</p>
                                            <p>{lastOrder.address}</p>
                                        </div>
                                    </Typography>
                                    }
                                </div>
                            </div>
                            <div className={styles.orders__items}>
                                {lastOrder.orderItem.map((item) =>
                                    <div className={styles.m}>
                                        <img className={styles.orders__img}
                                             src={`${process.env.REACT_APP_SERVER_IMAGE_URL}${item.book.imageUrl}`}
                                             alt="order-img"/>
                                        <Typography variant="body2" color="text.secondary"
                                                    component="div"> {item.book.title} </Typography>
                                        <Typography variant="body2" color="text.secondary"
                                                    component="div"> Цена {item.amount * item.book.price} </Typography>
                                        <Typography variant="body2" color="text.secondary"
                                                    component="div"> х{item.amount} </Typography>
                                    </div>
                                )}
                            </div>
                        </div>
                    </Card>
                )}
            </div>
            <AgeRecomendations title="Группа 0-16" recomendations={recomendations0_16}/>
            <AgeRecomendations title="Группа 17_27" recomendations={recomendations17_27}/>
            <AgeRecomendations title="Группа 28_35" recomendations={recomendations28_35}/>
            <AgeRecomendations title="Группа 36_50" recomendations={recomendations36_50}/>
            <AgeRecomendations title="Группа 51_10000" recomendations={recomendations51_10000}/>
        </div>
    );
};

export default AdminHome;