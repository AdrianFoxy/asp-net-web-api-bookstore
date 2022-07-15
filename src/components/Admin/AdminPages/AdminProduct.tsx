import React from 'react';
import {useParams} from "react-router-dom";
import {useRequest} from "../../../hooks/useRequest";
import $api from "../../../http";
import {IProduct} from "../../../types/IProduct";
import {Card, Grid} from "@mui/material";
import styles from "../../../pages/Product/Product.module.scss";
import {useActions} from "../../../hooks/useAppDispatch";

const AdminProduct = () => {

    const {productId} = useParams();

    const [product] = useRequest(async () => {
        return await $api.get<IProduct>(`/Book/get-book-by-id/${productId}`)
    }, [productId])

    const {editProduct} = useActions()

    if (!product) {
        return <div> Загрузка... </div>
    } else {
        return (
            <Grid sx={{flexGrow: 1}} container spacing={"20px"}>
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

export default AdminProduct;