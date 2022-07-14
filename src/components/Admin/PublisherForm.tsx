import React from 'react';
import {Button, Card, Grid, TextField} from "@mui/material";
import {useInput} from "../../hooks/useInput";
import {useActions} from "../../hooks/useAppDispatch";
import {addPublisher, deletePublisher} from "../../redux/actions/publisher";

const PublisherForm = () => {

    const name = useInput("")

    const {addPublisher} = useActions()

    const sendPublisher = () => {
        addPublisher({name: name.value})
    }

    return (
        <Card style={{borderRadius: "1px", padding: "20px", display: "flex"}}>
            <Grid container spacing={2} width={"50%"} style={{marginRight: "20px", alignItems: "center"}}>
                <Grid item xs={4}>
                    <TextField {...name} style={{width: "100%"}} id="outlined-basic" label="title" variant="outlined"/>
                </Grid>
                <Grid item xs={4}>
                    <Button variant="outlined" onClick={sendPublisher}>Send</Button>
                </Grid>
            </Grid>
        </Card>
    );
};

export default PublisherForm;