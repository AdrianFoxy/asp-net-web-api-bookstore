import React, {FC} from 'react';
import {useTypedSelector} from "../../hooks/useTypedSelector";
import {Link} from "react-router-dom";
import styles from "./Cart.module.scss"

const Cart: FC = () => {

    const products = useTypedSelector(state => state.cartReducer.products)
    console.log(products)
    const totalPrice = useTypedSelector(state => state.cartReducer.totalPrice)
    const totalCount = useTypedSelector(state => state.cartReducer.totalCount)

    return (
        <div>
            <Link to={"/"}>
                На главную
            </Link>
            <div>
                Корзина ({totalCount})
            </div>
            <div className={styles.cart__wrapper}>
                <div className={styles.cart__items}>
                    {products.map((product) =>
                        <div className={styles.cart__item}>
                            <img className={styles.cart__img} src={`${process.env.REACT_APP_SERVER_IMAGE_URL}${product.imageUrl}`} alt="product-img"/>
                            <div style={{width: "50%"}}>
                                <div className={styles.cart__item_info}>
                                    <div>
                                        {product.name}
                                    </div>
                                    <div>
                                        counter
                                    </div>
                                    <div>
                                        full price
                                    </div>
                                    <div>
                                        delete
                                    </div>
                                </div>
                                <div>
                                    {product.price} грн./шт
                                </div>
                            </div>
                        </div>
                    )}
                </div>
                <div className={styles.cart__total}>
                    {totalPrice}
                </div>
            </div>
        </div>
    );
};

export default Cart;