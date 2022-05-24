import slide1 from "../../../assets/img/slide1.png";
import slide2 from "../../../assets/img/slide2.jpg";
import slide3 from "../../../assets/img/slide3.jpg";
import slide4 from "../../../assets/img/slide4.jpg";
import styles from "./Slider.module.scss"
import React, {useEffect, useState} from 'react';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

declare module 'react' {
    interface CSSProperties {
        [key: `--${string}`]: string | number
    }
}

const Slider = () => {

    const sliderItems = [
        {
            id: 1,
            img: slide1,
        },
        {
            id: 2,
            img: slide2,
        },
        {
            id: 3,
            img: slide3,
        },
        {
            id: 4,
            img: slide4,
        }
    ]

    const [slideIndex, setSlideIndex] = useState(1)

    const sliderClick: (direction: string) => void = (direction: string): void => {
        if (direction === "left") {
            if (slideIndex !== 1) {
                setSlideIndex(slideIndex - 1)
            } else if (slideIndex === 1) {
                setSlideIndex(sliderItems.length)
            }
        } else if (direction === "right") {
            if (slideIndex !== sliderItems.length) {
                setSlideIndex(slideIndex + 1)
            } else if (slideIndex === sliderItems.length) {
                setSlideIndex(1)
            }
        }
    }

    useEffect(() => {
        const intervalId = setInterval(() => {
            sliderClick("right")
        }, 5000)
        return () => clearInterval(intervalId)
    }, [slideIndex]);
    
    return (
        <div>
            <div className={styles.slider__wrapper}>
                <div className={`${styles.slider__arrow_wrapper} ${styles.slider__arrow_wrapper_prev}`}
                     onClick={() => sliderClick("left")}>
                    <ArrowBackIosNewIcon className={styles.slider__arrow}/>
                </div>
                {sliderItems.map((item, index) =>
                    <div key={item.id}
                         className={slideIndex === index + 1 ? `${styles.slider__slide} ${styles.active_anim}` : `${styles.slider__slide}`}>
                        <img src={item.img} className={styles.slider__img} alt={"slider"}/>
                    </div>
                )}
                <div className={`${styles.slider__arrow_wrapper} ${styles.slider__arrow_wrapper_next}`}
                     onClick={() => sliderClick("right")}>
                    <ArrowForwardIosIcon className={styles.slider__arrow}/>
                </div>
            </div>
        </div>
    );
};

export default Slider;