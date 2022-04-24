import * as React from 'react';
import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid';
import {IProduct} from "../../types/IProduct";
import {useTypedSelector} from "../../hooks/useTypedSelector";
import {useActions} from "../../hooks/useAppDispatch";
import {useEffect} from "react";

export default function DataTable() {

    const products = useTypedSelector(state => state.productReducer.products)
    const count = useTypedSelector(state => state.productReducer.count)
    const page = useTypedSelector(state => state.productReducer.page)

    console.log(page)
    console.log(products)

    const {setPage, fetchAllProduct} = useActions()

    useEffect(() => {
        fetchAllProduct(page)
    }, [page])

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

    const rows = [
        {
            id: 1,
            title: 'Snow',
            pages: 300,
            format: "format",
            longDescription: "desc",
            shortDescription: "string",
            amount: 400,
            price: 300,
            imageUrl: "url",
            isFavor: true,
            resealeDate: Date.now(),
            authorNames: ["test", "test2", "test3", "test4"],
            genreNames: ["Бизнес и саморазвитие", "Кулинария"],
            publisherName: "name MI"
        },
        {
            id: 2,
            title: 'Snow',
            pages: 300,
            format: "format",
            longDescription: "desc",
            shortDescription: "string",
            amount: 400,
            price: 300,
            imageUrl: "url",
            isFavor: true,
            resealeDate: Date.now(),
            authorNames: ["test", "test2", "test3", "test4"],
            genreNames: ["Бизнес и саморазвитие", "Кулинария"],
            publisherName: "name MI"
        },
        {
            id: 3,
            title: 'Snow',
            pages: 300,
            format: "format",
            longDescription: "desc",
            shortDescription: "string",
            amount: 400,
            price: 300,
            imageUrl: "url",
            isFavor: true,
            resealeDate: Date.now(),
            authorNames: ["test", "test2", "test3", "test4"],
            genreNames: ["Бизнес и саморазвитие", "Кулинария"],
            publisherName: "name MI"
        },
    ];

    return (
        <div style={{ height: 800, width: '100%' }}>
            <DataGrid
                {...products}
                initialState={{
                    pagination: {
                        page: page+ 1
                    }
                }}
                page={page}
                onPageChange={(newPage) => setPage(newPage)}
                rowCount={count}
                rows={products}
                columns={columns}
                paginationMode="server"
                pageSize={10}
                rowsPerPageOptions={[10]}
                checkboxSelection
            />
        </div>
    );
}