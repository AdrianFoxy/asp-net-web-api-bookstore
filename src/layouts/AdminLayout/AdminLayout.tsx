import React, {FC} from 'react';
import ClippedDrawer from "../../components/UI/BurgerAdmin";
import styles from "./AdminLayout.module.scss";
import {Outlet} from "react-router-dom";
import PrimarySearchAppBar from "../../components/Navbar/PrimarySearchAppBar";
import Navbar from '../../components/Navbar/Navbar';
import MiniDrawer from "../../components/UI/Admin/Menu";

const AdminLayout: FC = () => {
    return (
        <>
            <div className={styles.wrapper}>
                <nav className={styles.header}>
                    <MiniDrawer/>
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

export default AdminLayout;