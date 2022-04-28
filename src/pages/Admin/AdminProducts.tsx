import React, {FC, useEffect} from 'react';
import DataTable from "../../components/Admin/DataTable";
import {useTypedSelector} from "../../hooks/useTypedSelector";
import {GridColDef, GridValueGetterParams} from "@mui/x-data-grid";
import {fetchAllProduct} from "../../redux/actions/product";
import {useActions} from "../../hooks/useAppDispatch";
import ProductForm from "../../components/Admin/ProductForm";

const columns: GridColDef[] = [
    {field: 'id', headerName: 'ID', width: 70},
    {field: 'title', headerName: 'title', width: 130},
    {field: 'pages', headerName: 'pages', type: 'number', width: 130},
    {field: 'format', headerName: 'format', width: 130},
    {field: 'longDescription', headerName: 'longDescription', width: 130},
    {field: 'shortDescription', headerName: 'shortDescription', width: 130},
    {field: 'amount', headerName: 'amount', type: 'number', width: 130},
    {field: 'price', headerName: 'price', type: 'number', width: 130},
    {
        field: 'imageUrl',
        headerName: 'imageUrl',
        width: 130,
        description: 'This column has a value getter and is not sortable.',
        sortable: false
    },
    {
        field: 'isFavor',
        headerName: 'isFavor',
        type: 'boolean',
        width: 130,
        description: 'This column has a value getter and is not sortable.',
        sortable: false
    },
    {
        field: 'resealeDate',
        headerName: 'resealeDate',
        type: 'Date',
        width: 130,
        description: 'This column has a value getter and is not sortable.',
        sortable: false
    },
    {
        field: 'authorNames',
        headerName: 'authorNames',
        type: 'string[]',
        width: 130,
        description: 'This column has a value getter and is not sortable.',
        sortable: false
    },
    {
        field: 'genreNames',
        headerName: 'genreNames',
        type: 'string[]',
        width: 130,
        description: 'This column has a value getter and is not sortable.',
        sortable: false
    },
    {
        field: 'publisherName',
        headerName: 'publisherName',
        width: 130,
        description: 'This column has a value getter and is not sortable.',
        sortable: false
    },
];

const AdminProducts: FC = () => {

    const products = useTypedSelector(state => state.productReducer.products)
    const count = useTypedSelector(state => state.productReducer.count)
    const page = useTypedSelector(state => state.productReducer.page)

    const {setPage, fetchAllProduct} = useActions()

    return (
        <>
            <ProductForm/>
            <DataTable columns={columns} items={products} count={count} page={page} setPage={setPage}
                       fetchItems={fetchAllProduct}/>
        </>
    );
};

export default AdminProducts;