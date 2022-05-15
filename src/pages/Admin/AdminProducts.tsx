import React, {FC, useEffect} from 'react';
import DataTable from "../../components/Admin/DataTable";
import {useTypedSelector} from "../../hooks/useTypedSelector";
import {GridColDef, GridValueGetterParams} from "@mui/x-data-grid";
import {fetchAllProduct} from "../../redux/actions/product";
import {useActions} from "../../hooks/useAppDispatch";
import ProductForm from "../../components/Admin/ProductForm";

const actionColumn: GridColDef[] = [
    {
        field: "action",
        headerName: "action",
        width: 200,
        renderCell: () => {
            return (
                <div style={{display: "flex", alignItems: "center", gap: "15px"}}>
                    <div style={{padding: "2px 5px", borderRadius: "5px", border: "1px solid #1976D2", cursor: "pointer"}}>View</div>
                    <div style={{padding: "2px 5px", borderRadius: "5px", border: "1px solid #EB4C42", cursor: "pointer"}}>Delete</div>
                </div>
            )
        }
    }
]

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
        field: 'image', headerName: 'image', width: 200, renderCell: (params) => {
            return (
                <div style={{width: "100%"}}>
                    <img src={`${process.env.REACT_APP_SERVER_IMAGE_URL}${params.row.imageUrl}`} alt={"product-image"}
                         style={{width: "50px", height: "50px", borderRadius: "0px", objectFit: "cover", display: "block", margin: "0 auto"}}/>
                </div>
            )
        }
    },
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
            <DataTable columns={columns.concat(actionColumn)} items={products} count={count} page={page} setPage={setPage}
                       fetchItems={fetchAllProduct}/>
        </>
    );
};

export default AdminProducts;