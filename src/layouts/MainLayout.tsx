import React, {useEffect} from 'react';
import {Outlet} from 'react-router-dom';
import PrimarySearchAppBar from '../components/Navbar/PrimarySearchAppBar';
import styles from "./MainLayout.module.scss";
import Navbar from "../components/Navbar/Navbar";
import {useTypedSelector} from "../hooks/useTypedSelector";
import {fetchGenres} from "../redux/actions/genre";
import {useActions} from "../hooks/useAppDispatch";

const MainLayout = () => {

    const genres = useTypedSelector(state => state.genreReducer)
    const {fetchGenres} = useActions()

    useEffect(() => {
        fetchGenres()
    }, [])

    return (
        <>
            <PrimarySearchAppBar/>
            <div className={styles.wrapper}>
                <nav className={styles.header}>
                    <Navbar/>
                </nav>
                <div className={styles.route}>
                    <main>
                        <Outlet/>
                    </main>
                </div>
            </div>
        </>
    );
};

export default MainLayout;