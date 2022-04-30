import React, {FC} from 'react';
import {useTypedSelector} from "../../hooks/useTypedSelector";
import {Link} from "react-router-dom";
import styles from "./Cart.module.scss"
import DeleteForeverOutlinedIcon from '@mui/icons-material/DeleteForeverOutlined';
import RemoveOutlinedIcon from '@mui/icons-material/RemoveOutlined';
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';
import {useActions} from "../../hooks/useAppDispatch";
import {addProduct} from "../../redux/actions/cart";
import {Button, Card, TextField} from "@mui/material";

const Cart: FC = () => {

    const products = useTypedSelector(state => state.cartReducer.products)
    const totalPrice = useTypedSelector(state => state.cartReducer.totalPrice)
    const totalCount = useTypedSelector(state => state.cartReducer.totalCount)

    const {removeCart, addProduct} = useActions()

    return (
        <div>
            <Link to={"/"} className={styles.cart__back}>
                <span>
                    На главную
                </span>
            </Link>
            <div className={styles.cart__title}>
                Корзина ({totalCount})
            </div>
            <div className={styles.cart__wrapper}>
                <Card className={styles.cart__items}>
                    {products.map((product) =>
                        <div className={styles.cart__item}>
                            <img className={styles.cart__img}
                                 src={`${process.env.REACT_APP_SERVER_IMAGE_URL}${product.imageUrl}`}
                                 alt="product-img"/>
                            <div style={{width: "100%"}}>
                                <div className={styles.cart__item_info}>
                                    <div className={styles.cart__item_w}>
                                        {product.name}
                                    </div>
                                    <div className={`${styles.cart__item_w} ${styles.cart__item_sw}`}>
                                        <RemoveOutlinedIcon onClick={() => removeCart(product.id)} style={{cursor: "pointer"}}/>
                                        {product.quantity}
                                        <AddOutlinedIcon onClick={() => addProduct(product.id)} style={{cursor: "pointer"}}/>
                                    </div>
                                    <div className={styles.cart__item_w}>
                                        {product.price * product.quantity} грн.
                                    </div>
                                    <div className={styles.cart__item_w}>
                                        <DeleteForeverOutlinedIcon style={{cursor: "pointer"}}/>
                                    </div>
                                </div>
                                <div>
                                    {product.price} грн./шт
                                </div>
                            </div>
                        </div>
                    )}
                </Card>
                <div className={styles.cart__total_wrapper}>
                    <Card className={styles.cart__total}>
                        <div className={styles.cart__total_pr}>
                            Введите промокод
                        </div>
                        <TextField label="Промокод" variant="outlined" focused className={styles.cart__total_input}/>
                    </Card>
                    <Card className={styles.cart__total}>
                        <div className={styles.cart__total_price}>
                            <div>
                                Итого:
                            </div>
                            <div>
                                {totalPrice} грн.
                            </div>
                        </div>
                        <Button variant="outlined">Оформить заказ</Button>
                    </Card>
                </div>
            </div>
        </div>
    );
};

export default Cart;