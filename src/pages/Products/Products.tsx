import React, {useEffect} from 'react';
import styles from "./Products.module.scss"
import {useParams} from "react-router-dom";
import ProductList from "../../components/ProductList/ProductList";
import {useAppDispatch} from "../../hooks/useAppDispatch";
import {fetchProducts, fetchProductsByGenre} from "../../redux/actions/product";
import {useAppSelector} from "../../hooks/useAppSelector";

const Products = () => {

    const {genre} = useParams()

    const dispatch = useAppDispatch()

    const genres = useAppSelector(state => state.genreReducer)

    useEffect(() => {
        if (genre) {
            if (genres.genres.some(genre2 => genre2.name === genre)) {
                dispatch(fetchProducts(genre))
            } else {
                dispatch(fetchProductsByGenre(genre))
            }
        }
    }, [genre, genres])

    const products = useAppSelector(state => state.productReducer.products)

    return (
        <div className={styles.products}>
            <h1 style={{margin: "20px 0"}}>{genre}</h1>
            <ProductList products={products}/>
        </div>
    );
};

export default Products;