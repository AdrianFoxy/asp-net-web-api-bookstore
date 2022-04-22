import React, {useEffect} from 'react';
import styles from "./Home.module.scss"
import Slider from "../../components/UI/Slider/Slider";
import ProductList from "../../components/ProductList/ProductList";
import {fetchFavoriteProducts} from "../../redux/actions/product";
import {useAppDispatch} from "../../hooks/useAppDispatch";
import {useTypedSelector} from "../../hooks/useTypedSelector";

const Home = () => {

    const dispatch = useAppDispatch()

    useEffect(() => {
        dispatch(fetchFavoriteProducts())
    }, [])

    const {products} = useTypedSelector(state => state.productReducer)

    return (
        <div className={styles.home__wrapper}>
            <Slider/>
            <div className={styles.home__indent}></div>
            <div className={styles.home__title}><span>Топ продаж </span></div>
            <ProductList products={products}/>
        </div>
    );
};

export default Home;