import React from 'react';
import {useActions} from "../../hooks/useAppDispatch";
import {useInput} from "../../hooks/useInput";
import {Button, Card, Grid, TextField} from "@mui/material";

const GenreForm = () => {

    const name = useInput("")
    const nameForUrl = useInput("")
    const description = useInput("")
    const fk_TypeGenreId = useInput("")

    const {addGenre} = useActions()

    const sendTypeGenre = () => {
        addGenre({
            name: name.value,
            nameForUrl: nameForUrl.value,
            description: description.value,
            fk_TypeGenreId: fk_TypeGenreId.value
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
                    <TextField {...fk_TypeGenreId} style={{width: "100%"}} id="outlined-basic" label="fk_TypeGenreId" variant="outlined"/>
                </Grid>
                <Grid item xs={4}>
                    <Button variant="outlined" onClick={sendTypeGenre}>Send</Button>
                </Grid>
            </Grid>
        </Card>
    );
};

export default GenreForm;