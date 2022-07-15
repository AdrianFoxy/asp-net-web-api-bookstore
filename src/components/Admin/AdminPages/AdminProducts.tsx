import React, {FC} from 'react';
import DataTable from "../DataTable";
import {useTypedSelector} from "../../../hooks/useTypedSelector";
import {GridColDef} from "@mui/x-data-grid";
import {useActions} from "../../../hooks/useAppDispatch";
import ProductForm from "../ProductForm";
import { Link } from 'react-router-dom';
import {editPublisher} from "../../../redux/actions/publisher";
import {fetchAllProductAdmin} from "../../../redux/actions/product";
import ModalProduct from "./ModalProduct";

const columns: GridColDef[] = [
    {field: 'id', headerName: 'ID', width: 70},
    {field: 'title', headerName: 'title', width: 130},
    {field: 'pages', headerName: 'pages', type: 'number', width: 130},
    {field: 'format', headerName: 'format', width: 130},
    {field: 'shortDescription', headerName: 'shortDescription', width: 130},
    {field: 'longDescription', headerName: 'longDescription', width: 130},
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
        field: 'releaseDate',
        headerName: 'releaseDate',
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
    const pageDataGrid = useTypedSelector(state => state.productReducer.pageDataGrid)

    const {deleteProduct, setPageDataGrid, fetchAllProduct, fetchAllProductAdmin} = useActions()

    const actionColumn: GridColDef[] = [
        {
            field: "action",
            headerName: "action",
            width: 200,
            renderCell: (params) => {
                return (
                    <div style={{display: "flex", alignItems: "center", gap: "15px"}}>
                        <div style={{padding: "2px 5px", borderRadius: "5px", border: "1px solid #1976D2", cursor: "pointer"}}>
                            <Link to={`/admin/product/${params.row.id}`}>
                                View
                            </Link>
                        </div>
                        <div onClick={(e) => {
                            e.stopPropagation()
                            // @ts-ignore
                            deleteProduct(params.row.id).then((r: any) => {
                                if (r) {
                                    fetchAllProductAdmin(page)
                                }
                            })
                        }} style={{padding: "2px 5px", borderRadius: "5px", border: "1px solid #EB4C42", cursor: "pointer"}}>Delete</div>
                        <ModalProduct id={params.row.id}>

                        </ModalProduct>
                    </div>
                )
            }
        }
    ]

    return (
        <>
            <ProductForm/>
            <DataTable columns={columns.concat(actionColumn)} items={products} count={count} page={pageDataGrid} setPage={setPageDataGrid}
                       fetchItems={fetchAllProductAdmin}/>
        </>
    );
};

export default AdminProducts;