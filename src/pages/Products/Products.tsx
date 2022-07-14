import React, {useEffect} from 'react';
import styles from "./Products.module.scss"
import {useParams} from "react-router-dom";
import ProductList from "../../components/ProductList/ProductList";
import {useActions} from "../../hooks/useAppDispatch";
import {fetchAllProduct, fetchProducts} from "../../redux/actions/product";
import {useTypedSelector} from "../../hooks/useTypedSelector";
import {Pagination} from "@mui/material";

const Products = () => {

    const {genre} = useParams()

    const {fetchProducts, setPage, fetchAllProduct} = useActions()

    const genres = useTypedSelector(state => state.genreReducer)

    const {filteredProducts, count, page, pageSize} = useTypedSelector(state => state.productReducer)

    useEffect(() => {
        if (genre) {
            if (genres.genres.length >= 1) {
                if (genres.genres.some(genre2 => genre2.nameEng === genre)) {
                    fetchProducts(genre, "type-genre", page, pageSize)
                } else {
                    fetchProducts(genre, "genre", page, pageSize)
                }
            }
        } else {
            fetchAllProduct(page, pageSize)
        }
    }, [genre, genres, page])

    const handleChange = (event: React.ChangeEvent<unknown>, page: number) => {
        setPage(page)
    };

    const pages = Math.ceil(count / pageSize)

    return (
        <div className={styles.products}>
            <h1 style={{marginBottom: "20px"}}>{genre}</h1>
            {count <= pageSize ?
                ""
                :
                <Pagination count={pages} color="primary" onChange={handleChange}/>
            }
            <div style={{marginBottom: "20px"}}/>
            <ProductList products={filteredProducts}/>

            {/*<div style={{marginTop: "20px"}}>{descriptionGenre}</div>*/}
        </div>
    );
};

export default Products;