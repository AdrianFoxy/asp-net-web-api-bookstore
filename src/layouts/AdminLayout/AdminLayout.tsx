import React, {FC} from 'react';
import styles from "./AdminLayout.module.scss";
import {Outlet} from "react-router-dom";
import MiniDrawer from "../../components/Admin/UI/Menu";

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