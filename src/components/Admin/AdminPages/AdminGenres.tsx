import React from 'react';
import {GridColDef} from "@mui/x-data-grid";
import {useActions} from "../../../hooks/useAppDispatch";
import DataTable from "../DataTable";
import {useTypedSelector} from "../../../hooks/useTypedSelector";
import ModalGenres from "./ModalGenres";

const columns: GridColDef[] = [
    {field: 'id', headerName: 'ID', width: 70},
    {field: 'name', headerName: 'name', width: 230},
    {field: 'nameForUrl', headerName: 'nameForUrl', width: 230},
    {field: 'description', headerName: 'description', width: 530},
    {field: 'typeGenreName', headerName: 'typeGenreName', width: 230}
];

const AdminGenres = () => {

    const genres = useTypedSelector(state => state.genreReducer.genresAdmin)
    const count = useTypedSelector(state => state.genreReducer.count)
    const page = useTypedSelector(state => state.genreReducer.page)

    const {fetchGenresAdmin, setPageGenres, deleteGenre} = useActions()

    const actionColumn: GridColDef[] = [
        {
            field: "action",
            headerName: "action",
            width: 200,
            renderCell: (params) => {
                return (
                    <div style={{display: "flex", alignItems: "center", gap: "15px"}}>
                        <div onClick={(e) => {
                            e.stopPropagation()
                            deleteGenre(params.row.id)
                        }} style={{padding: "2px 5px", borderRadius: "5px", border: "1px solid #EB4C42", cursor: "pointer"}}>Delete</div>
                        <ModalGenres id={params.row.id}>

                        </ModalGenres>
                    </div>
                )
            }
        }
    ]

    return (
        <div>
            Genre
            <DataTable columns={columns.concat(actionColumn)} items={genres} count={count} page={page} setPage={setPageGenres} fetchItems={fetchGenresAdmin}/>
        </div>
    );
};

export default AdminGenres;