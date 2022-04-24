import React, {useEffect} from 'react';
import styles from "./Products.module.scss"
import {useParams} from "react-router-dom";
import ProductList from "../../components/ProductList/ProductList";
import {useAppDispatch} from "../../hooks/useAppDispatch";
import {fetchProducts} from "../../redux/actions/product";
import {useTypedSelector} from "../../hooks/useTypedSelector";
import {fetchDescriptionGenre} from "../../redux/actions/genre";

const Products = () => {

    const {genre} = useParams()

    const dispatch = useAppDispatch()

    const genres = useTypedSelector(state => state.genreReducer)

    useEffect(() => {
        if (genre) {
            if (genres.genres.some(genre2 => genre2.nameEng === genre)) {
                dispatch(fetchProducts(genre, "type-genre"))
            } else {
                dispatch(fetchProducts(genre, "genre"))
            }
        }
    }, [genre, genres])

    const products = useTypedSelector(state => state.productReducer.products)
    const descriptionGenre = useTypedSelector(state => state.genreReducer.descriptionGenre)

    useEffect(() => {
        if (genre) {
            if (genres.genres.some(genre2 => genre2.nameEng === genre)) {
                dispatch(fetchDescriptionGenre(genre, "type-genre"))
            } else {
                dispatch(fetchDescriptionGenre(genre, "genre"))
            }
        }
    }, [genre])

    return (
        <div className={styles.products}>
            <h1 style={{margin: "20px 0"}}>{genre}</h1>
            <ProductList products={products}/>
            <div style={{marginTop: "20px"}}>{descriptionGenre}</div>
        </div>
    );
};

export default Products;