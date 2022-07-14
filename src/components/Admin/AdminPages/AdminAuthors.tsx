import React, {FC} from 'react';
import {GridColDef} from "@mui/x-data-grid";
import {useTypedSelector} from "../../../hooks/useTypedSelector";
import DataTable from "../DataTable";
import {useActions} from "../../../hooks/useAppDispatch";

const columns: GridColDef[] = [
    {field: 'id', headerName: 'ID', width: 70},
    {field: 'fullName', headerName: 'fullName', width: 230},
    {field: 'nameForUrl', headerName: 'nameForUrl', width: 230},
    {field: 'imageUrl', headerName: 'imageUrl', width: 130},
    {field: 'description', headerName: 'description', width: 730},
    // {field: 'book_Author', headerName: 'book_Author', width: 130},
];

const AdminAuthors: FC = () => {

    const {authors} = useTypedSelector(state => state.authorReducer)
    const {count} = useTypedSelector(state => state.authorReducer)
    const {page} = useTypedSelector(state => state.authorReducer)

    const {fetchAuthors} = useActions()

    return (
        <DataTable columns={columns} items={authors} page={page} count={count} setPage={() => {}} fetchItems={fetchAuthors}/>
    );
};

export default AdminAuthors;