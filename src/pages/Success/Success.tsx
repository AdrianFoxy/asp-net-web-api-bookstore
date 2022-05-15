import React from 'react';
import styles from "./Success.module.scss"
import {Link} from "react-router-dom";

const Success = () => {
    return (
        <div className={styles.success}>
            <div>
                Заказ успешно оформлен
            </div>
            <Link to={"/"}>
                Вернуться на главную
            </Link>
        </div>
    );
};

export default Success;