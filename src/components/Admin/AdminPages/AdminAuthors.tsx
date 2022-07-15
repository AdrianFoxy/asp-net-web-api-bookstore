import React, {FC} from 'react';
import {GridColDef} from "@mui/x-data-grid";
import {useTypedSelector} from "../../../hooks/useTypedSelector";
import DataTable from "../DataTable";
import {useActions} from "../../../hooks/useAppDispatch";
import AuthorForm from "../AuthorForm";
import ModalAuthor from "./ModalAuthor";

const columns: GridColDef[] = [
    {field: 'id', headerName: 'ID', width: 70},
    {field: 'fullName', headerName: 'fullName', width: 230},
    {field: 'nameForUrl', headerName: 'nameForUrl', width: 230},
    {
        field: 'image', headerName: 'image', width: 200, renderCell: (params) => {
            return (
                <div style={{width: "100%"}}>
                    <img src={`${process.env.REACT_APP_SERVER_IMAGE_URL}${params.row.imageUrl}`} alt={"author-image"}
                         style={{width: "50px", height: "50px", borderRadius: "0px", objectFit: "cover", display: "block", margin: "0 auto"}}/>
                </div>
            )
        }
    },
    {field: 'imageUrl', headerName: 'imageUrl', width: 130},
    {field: 'description', headerName: 'description', width: 530},
    // {field: 'book_Author', headerName: 'book_Author', width: 130},
];

const AdminAuthors: FC = () => {

    const {authors} = useTypedSelector(state => state.authorReducer)
    const {count} = useTypedSelector(state => state.authorReducer)
    const {page} = useTypedSelector(state => state.authorReducer)

    const {fetchAuthors, deleteAuthor} = useActions()

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
                            deleteAuthor(params.row.id)
                        }} style={{
                            padding: "2px 5px",
                            borderRadius: "5px",
                            border: "1px solid #EB4C42",
                            cursor: "pointer"
                        }}>Delete
                        </div>
                        <ModalAuthor id={params.row.id}>

                        </ModalAuthor>
                    </div>
                )
            }
        }
    ]

    return (
        <div>
            <AuthorForm/>
            <DataTable columns={columns.concat(actionColumn)} items={authors} page={page} count={count} setPage={() => {
            }} fetchItems={fetchAuthors}/>
        </div>
    );
};

export default AdminAuthors;