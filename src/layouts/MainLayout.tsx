import React from 'react';
import {Outlet} from 'react-router-dom';
import PrimarySearchAppBar from '../components/Navbar/PrimarySearchAppBar';
import styles from "./MainLayout.module.scss";
import Navbar from "../components/Navbar/Navbar";

const MainLayout = () => {
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