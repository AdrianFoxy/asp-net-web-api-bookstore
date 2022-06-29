import React from 'react';
import {Outlet} from 'react-router-dom';
import PrimarySearchAppBar from '../components/Navbar/PrimarySearchAppBar';
import styles from "./MainLayout.module.scss";
import Navbar from "../components/Navbar/Navbar";
import BasicBreadcrumbs from "../components/Breadcrumbs/Breadcrumbs";

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
                        <BasicBreadcrumbs/>
                        <Outlet/>
                    </main>
                </div>
            </div>
        </>
    );
};

export default MainLayout;