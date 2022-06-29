import React from 'react';
import {useParams} from "react-router-dom";
import {useRequest} from "../../hooks/useRequest";
import $api from "../../http";
import {IProduct} from "../../types/IProduct";

const AdminProduct = () => {

    const {productId} = useParams();

    console.log(productId)

    const [product] = useRequest(async () => {
        return await $api.get<IProduct>(`/Book/get-book-by-id/${productId}`)
    }, [productId])

    console.log(product)

    return (
        <div>
            Single product
        </div>
    );
};

export default AdminProduct;