import React from 'react';
import {Link, Outlet} from 'react-router-dom';
import Navbar from '../components/Navbar/Navbar';
import styles from "./MainLayout.module.scss";

const MainLayout = () => {
    return (
        <>
            <Navbar/>
            <div className={styles.wrapper}>
                <nav className={styles.header}>
                    <ul className={styles.header__list}>
                        <li>
                            <Link to="/"> Home page</Link>
                            <Link to="/products"> Products page</Link>
                        </li>
                    </ul>
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