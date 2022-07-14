import React from 'react';
import {GridColDef} from "@mui/x-data-grid";
import {useTypedSelector} from "../../../hooks/useTypedSelector";
import {useActions} from "../../../hooks/useAppDispatch";
import DataTable from "../DataTable";
import TypeGenreForm from "../TypeGenreForm";
import {deleteTypeGenre} from "../../../redux/actions/genre";
import ModalTypeGenres from "./ModalTypeGenres";

const columns: GridColDef[] = [
    {field: 'id', headerName: 'ID', width: 70},
    {field: 'name', headerName: 'name', width: 280},
    {field: 'nameForUrl', headerName: 'nameForUrl', width: 230},
    {field: 'description', headerName: 'description', width: 800}
];

const AdminTypeGenres = () => {

    const typeGenresAdmin = useTypedSelector(state => state.genreReducer.typeGenresAdmin)

    const {fetchTypeGenres, deleteTypeGenre} = useActions()

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
                            deleteTypeGenre(params.row.id)
                        }} style={{padding: "2px 5px", borderRadius: "5px", border: "1px solid #EB4C42", cursor: "pointer"}}>Delete</div>
                        <ModalTypeGenres id={params.row.id}>

                        </ModalTypeGenres>
                    </div>
                )
            }
        }
    ]

    return (
        <div>
            <TypeGenreForm/>
            <DataTable columns={columns.concat(actionColumn)} items={typeGenresAdmin} count={10} page={1} setPage={() => {}} fetchItems={fetchTypeGenres}/>
        </div>
    );
};

export default AdminTypeGenres;