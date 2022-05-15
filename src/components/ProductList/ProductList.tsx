import React, {FC} from 'react';
import styles from "./ProductList.module.scss";
import {Card} from "@mui/material";
import {IProduct} from "../../types/IProduct";
import ShoppingCartCheckoutIcon from '@mui/icons-material/ShoppingCartCheckout';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import DeleteForeverOutlinedIcon from '@mui/icons-material/DeleteForeverOutlined';
import {Link} from "react-router-dom";
import Button from "../UI/Button";
import {useActions} from "../../hooks/useAppDispatch";

interface ProductListProps {
    products: IProduct[]
}

const ProductList: FC<ProductListProps> = ({products}) => {

    const {addProduct} = useActions()

    return (
        <div className={styles.products__container}>
            {products.map((product) =>
                <Card key={product.id} className={styles.products__card}>
                    <Link to={"/product"}>
                        <img src={`${process.env.REACT_APP_SERVER_IMAGE_URL}${product.imageUrl}`} alt={"product-image"}
                             className={styles.products__img}/>
                        <div style={{marginBottom: "10px"}}>
                            {product.title}
                        </div>
                    </Link>
                    <div style={{marginBottom: "10px"}}>
                        {product.authorNames.map((authorName) =>
                            <div>
                                {authorName}
                            </div>
                        )}
                    </div>
                    <div style={{marginBottom: "10px"}}>
                        {product.price} грн.
                    </div>
                    <div className={styles.products__more}>
                        <div className={styles.products__admin}>
                            <DeleteForeverOutlinedIcon className={styles.products__delete_btn}/>
                            <EditOutlinedIcon className={styles.products__change_btn}/>
                        </div>
                        <Link to={`/product/${product.id}`} className={styles.products__link}> Подробнее </Link>
                        <Button onClick={() => addProduct(
                            product.id
                        )} className={styles.products__btn}> В
                            корзину <ShoppingCartCheckoutIcon/> </Button>
                    </div>
                </Card>
            )}
        </div>
    );
};

export default ProductList;