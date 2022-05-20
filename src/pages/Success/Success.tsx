import React from 'react';
import styles from "./Success.module.scss"
import {Link, useLocation} from "react-router-dom";

const Success = () => {

    const {state} = useLocation()

    console.log(state)

    return (
        <div className={styles.success}>
            {state ?
                <>
                    <div>
                        Заказ успешно оформлен
                    </div>
                    <div>
                        Номер вашего заказа {state}
                    </div>
                    <Link to={"/"}>
                        Вернуться на главную
                    </Link>
                </> :
                <div>
                    Successfull. Your order is being prepared...
                </div>
            }
        </div>
    );
};

export default Success;