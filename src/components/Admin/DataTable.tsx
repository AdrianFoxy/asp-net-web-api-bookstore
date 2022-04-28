import * as React from 'react';
import {DataGrid, GridColDef, GridValueGetterParams} from '@mui/x-data-grid';
import {useEffect} from "react";

const DataTable = ({
                       columns,
                       items,
                       count,
                       page,
                       setPage,
                       fetchItems
                   }: { columns: any[], items: any[], count: number, page: number, setPage: (newPage: number) => void, fetchItems: (page: number) => void }) => {

    useEffect(() => {
        fetchItems(page)
    }, [page])

    return (
        <div style={{height: 650, width: '100%'}}>
            <DataGrid
                {...items}
                initialState={{
                    pagination: {
                        page: page + 1
                    }
                }}
                page={page}
                onPageChange={(newPage) => setPage(newPage)}
                rowCount={count}
                rows={items}
                columns={columns}
                paginationMode="server"
                pageSize={10}
                rowsPerPageOptions={[10]}
                checkboxSelection
            />
        </div>
    );
}

export default DataTable