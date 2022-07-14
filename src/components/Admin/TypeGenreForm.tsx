import React from 'react';
import {Button, Card, Grid, TextField} from "@mui/material";
import {useInput} from "../../hooks/useInput";
import {useActions} from "../../hooks/useAppDispatch";

const TypeGenreForm = () => {

    const name = useInput("")
    const nameForUrl = useInput("")
    const description = useInput("")

    const {addTypeGenre} = useActions()

    const sendTypeGenre = () => {
        addTypeGenre({
            name: name.value,
            nameForUrl: nameForUrl.value,
            description: description.value
        })
    }

    return (
        <Card style={{borderRadius: "1px", padding: "20px", display: "flex"}}>
            <Grid container spacing={2} width={"50%"} style={{marginRight: "20px", alignItems: "center"}}>
                <Grid item xs={4}>
                    <TextField {...name} style={{width: "100%"}} id="outlined-basic" label="name" variant="outlined"/>
                </Grid>
                <Grid item xs={4}>
                    <TextField {...nameForUrl} style={{width: "100%"}} id="outlined-basic" label="nameForUrl" variant="outlined"/>
                </Grid>
                <Grid item xs={4}>
                    <TextField {...description} style={{width: "100%"}} id="outlined-basic" label="description" variant="outlined"/>
                </Grid>
                <Grid item xs={4}>
                    <Button variant="outlined" onClick={sendTypeGenre}>Send</Button>
                </Grid>
            </Grid>
        </Card>
    );
};

export default TypeGenreForm;