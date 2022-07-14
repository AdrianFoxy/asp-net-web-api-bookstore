import React, {useState} from 'react';
import {useActions} from "../../../hooks/useAppDispatch";
import {useTypedSelector} from "../../../hooks/useTypedSelector";
import DataTable from "../DataTable";
import {GridColDef} from "@mui/x-data-grid";
import PublisherForm from "../PublisherForm";
import ModalPublisher from "./ModalPublisher";

const columns: GridColDef[] = [
    {field: 'id', headerName: 'ID', width: 70},
    {field: 'name', headerName: 'name', width: 230}
];

const AdminPublishers = () => {

    const publishers = useTypedSelector(state => state.publisherReducer.publishers)

    const {fetchPublishers, deletePublisher} = useActions()

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
                            deletePublisher(params.row.id)
                        }} style={{padding: "2px 5px", borderRadius: "5px", border: "1px solid #EB4C42", cursor: "pointer"}}>Delete</div>
                        <ModalPublisher id={params.row.id}>

                        </ModalPublisher>
                    </div>
                )
            }
        }
    ]

    return (
        <div>
            <PublisherForm/>
            <DataTable columns={columns.concat(actionColumn)} items={publishers} count={10} page={1} setPage={() => {}} fetchItems={fetchPublishers}/>
        </div>
    );
};

export default AdminPublishers;