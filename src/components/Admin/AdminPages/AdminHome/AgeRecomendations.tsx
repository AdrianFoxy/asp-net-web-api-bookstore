import React, {FC} from 'react';
import styles from "./AgeRecomendations.module.scss"
import {IProduct} from "../../../../types/IProduct";
import Card from "@mui/material/Card";

interface AgeRecomendationsProps {
    title: string
    recomendations: IProduct[]
}

const AgeRecomendations: FC<AgeRecomendationsProps> = ({title, recomendations}) => {
    return (
        <>
            <div className={styles.title}>{title}</div>
            {recomendations.length === 0 ?
                <div>Недостаточно заказов для формирования рекомендаций</div> :
                <div className={styles.recomendations}>
                    {recomendations?.map((recomendation) =>
                        <Card className={styles.recomendations__container}>
                            <img className={styles.recomendations__img}
                                 src={`${process.env.REACT_APP_SERVER_IMAGE_URL}${recomendation.imageUrl}`} alt=""/>
                            <div className={styles.recomendations__title}>{recomendation.title}</div>
                            <div className={styles.recomendations__title}>Число продаж {recomendation.numOfSales}</div>
                        </Card>
                    )}
                </div>
            }
        </>
    );
};

export default AgeRecomendations;