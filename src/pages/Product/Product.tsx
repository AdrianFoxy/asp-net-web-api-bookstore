import React, {useEffect, useState} from 'react';
import {useParams} from "react-router-dom";
import {useRequest} from "../../hooks/useRequest";
import $api from "../../http";
import {IProduct} from "../../types/IProduct";
import {Button, Card, Grid} from "@mui/material";
import styles from "./Product.module.scss"
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import {useActions} from "../../hooks/useAppDispatch";
import {useTypedSelector} from "../../hooks/useTypedSelector";
import RemoveOutlinedIcon from "@mui/icons-material/RemoveOutlined";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";

const Product = () => {

    const {productId} = useParams();

    const [product] = useRequest(async () => {
        return await $api.get<IProduct>(`/Book/get-book-by-id/${productId}`)
    }, [productId])

    const {removeCart, addProduct} = useActions()

    console.log(product)

    const id: string = productId !== undefined ? productId : '';

    const products = useTypedSelector(state => state.cartReducer.products)

    console.log(products)
    console.log(productId)

    const indexCurrentProduct = products.findIndex(product => product.book.id.toString() === productId)

    useEffect(() => {

    }, [])


    if (!product) {
        return <div> Загрузка... </div>
    } else {
        return (
            <Grid sx={{flexGrow: 1}} container spacing={"20px"} style={{marginRight: "20px"}}>
                <Grid item xs={6} height={"100%"}>
                    <Card>
                        <img src={`${process.env.REACT_APP_SERVER_IMAGE_URL}${product.imageUrl}`} alt="book"
                             className={styles.product__img}/>
                    </Card>
                </Grid>
                <Grid item xs={6} height={"100%"}>
                    <Card style={{padding: "20px"}}>
                        <div className={styles.product__border}>
                            <div className={styles.product__title}>
                                {product.title}
                            </div>
                            <div className={styles.product__price}>
                                {product.price} грн.
                            </div>
                            {products.some(product => product.book.id.toString() === productId) ?
                                <div className={styles.product__counters}>
                                    <RemoveOutlinedIcon onClick={() => removeCart(id)}
                                                        style={{cursor: "pointer", marginRight: "5px"}}/>
                                    <div style={{marginRight: "5px"}}>{products[indexCurrentProduct].amount}</div>
                                    <AddOutlinedIcon onClick={() => {
                                        addProduct(id, products)
                                    }}
                                                     style={{cursor: "pointer"}}/>
                                </div> :
                                product.amount <= 0 ? "Нет в наличии" :
                                <Button variant="outlined" onClick={() => addProduct(id, products)}> <ShoppingCartOutlinedIcon/> В
                                    корзину </Button>
                            }
                        </div>
                        {
                            product.authorNames.map((author: string) =>
                                <>
                                    <div className={styles.product__property_name}>
                                        {product.authorNames.length <= 1 ? "Автор" : "Авторы"}
                                    </div>
                                    <div className={styles.product__property}>
                                        {author}
                                    </div>
                                </>
                            )
                        }
                        <div className={styles.product__property_name}>
                            Описание
                        </div>
                        <div className={styles.product__property}>
                            {product.longDescription}
                        </div>
                        <div className={styles.product__block}>
                            <div>
                                <div className={styles.product__property_name}>
                                    Формат
                                </div>
                                <div className={styles.product__property}>
                                    {product.format}
                                </div>
                                <div className={styles.product__property_name}>
                                    Дата выпуска
                                </div>
                                <div className={styles.product__property}>
                                    {new Date(product.releaseDate).toLocaleString("ru", {
                                        year: "numeric",
                                        month: "numeric",
                                        day: "numeric",
                                        timeZone: "UTC"
                                    })}
                                </div>
                            </div>
                            <div>
                                <div className={styles.product__property_name}>
                                    Количество страниц
                                </div>
                                <div className={styles.product__property}>
                                    {product.pages}
                                </div>
                                <div className={styles.product__property_name}>
                                    Издатель
                                </div>
                                <div className={styles.product__property}>
                                    {product.publisherName}
                                </div>
                            </div>
                        </div>
                    </Card>
                </Grid>
            </Grid>
        );
    }
};

export default Product;