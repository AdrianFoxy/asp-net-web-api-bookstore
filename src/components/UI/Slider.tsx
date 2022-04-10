import slide1 from "../../assets/img/slide1.png";
import styles from "../../pages/Home/Home.module.scss";
import React from 'react';

const Slider = () => {
    return (
        <div>
            <img src={slide1} className={styles.slider__img} alt={"slider"}/>
        </div>
    );
};

export default Slider;