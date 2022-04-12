import React from 'react';
import styles from "./Products.module.scss"
import {useParams} from "react-router-dom";
import ProductList from "../../components/ProductList/ProductList";

const Products = () => {

    const {genre} = useParams()



    return (
        <div className={styles.products}>
            <h1>{genre}</h1>
            <ProductList/>
        </div>
    );
};

export default Products;