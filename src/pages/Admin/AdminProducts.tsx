import React, {FC, useEffect} from 'react';
import DataTable from "../../components/Admin/DataTable";
import {useTypedSelector} from "../../hooks/useTypedSelector";
import {GridColDef, GridValueGetterParams} from "@mui/x-data-grid";
import {fetchAllProduct} from "../../redux/actions/product";
import {useActions} from "../../hooks/useAppDispatch";

const AdminProducts: FC = () => {

    const {fetchAllProduct} = useActions()

    useEffect(() => {
        fetchAllProduct()
    }, [])

    return (
        <DataTable/>
    );
};

export default AdminProducts;