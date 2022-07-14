import React, {useEffect} from 'react';
import styles from "./Home.module.scss"
import Slider from "../../components/UI/Slider/Slider";
import ProductList from "../../components/ProductList/ProductList";
import {useActions} from "../../hooks/useAppDispatch";
import {useTypedSelector} from "../../hooks/useTypedSelector";

const Home = () => {

    const {fetchFavoriteProducts, fetchWhatToReadBooks, fetchAgeRecomendations} = useActions()

    useEffect(() => {
        fetchFavoriteProducts()
        fetchWhatToReadBooks()
        fetchAgeRecomendations()
    }, [])

    const {booksHome, booksToRead, booksAgeRecomendations} = useTypedSelector(state => state.productReducer)

    return (
        <div className={styles.home__wrapper}>
            <Slider/>
            <div className={styles.home__indent}/>
            <div className={styles.home__title}><span>Топ продаж </span></div>
            <ProductList products={booksHome}/>
            <div className={styles.home__indent}/>
            <div className={styles.home__title}><span>Рекомендуем </span></div>
            <ProductList products={booksToRead}/>
            {booksAgeRecomendations.length === 0 ?
                ""
                :
                <>
                    <div className={styles.home__indent}/>
                    <div className={styles.home__title}><span>Рекомендации по возрасту </span></div>
                    <ProductList products={booksAgeRecomendations}/>
                </>
            }
        </div>
    );
};

export default Home;