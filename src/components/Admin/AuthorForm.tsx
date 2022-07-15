import React, {useState} from 'react';
import {useInput} from "../../hooks/useInput";
import {Button, Card, Grid, TextField} from "@mui/material";
import {useActions} from "../../hooks/useAppDispatch";
import {styled} from "@mui/material/styles";

const Input = styled('input')({
    display: 'none',
})

const AuthorForm = () => {

    const fullName = useInput("")
    const nameForUrl = useInput("")
    const description = useInput("")
    const [image, setImage] = useState<any>("")

    const {addAuthor} = useActions()

    const sendAuthor = () => {
        const formData = new FormData()
        formData.append("FullName", fullName.value)
        formData.append("NameForUrl", nameForUrl.value)
        formData.append("Description", description.value)
        formData.append("image", image)
        addAuthor(formData)
    }

    return (
        <Card style={{borderRadius: "1px", padding: "20px", display: "flex"}}>
            <Grid container spacing={2} width={"50%"} style={{marginRight: "20px", alignItems: "center"}}>
                <Grid item xs={4}>
                    <TextField {...fullName} style={{width: "100%"}} id="outlined-basic" label="name"
                               variant="outlined"/>
                </Grid>
                <Grid item xs={4}>
                    <TextField {...nameForUrl} style={{width: "100%"}} id="outlined-basic" label="nameForUrl"
                               variant="outlined"/>
                </Grid>
                <Grid item xs={4}>
                    <TextField {...description} style={{width: "100%"}} id="outlined-basic" label="description"
                               variant="outlined"/>
                </Grid>
                <Grid item xs={4}>
                    <Button variant="outlined" onClick={sendAuthor}>Send</Button>
                </Grid>
            </Grid>
            <Grid container spacing={2} width={"50%"} style={{marginRight: "20px"}}>
                <Grid item xs={8} style={{position: "relative"}}>
                    {image &&
                    <div style={{position: "absolute", top: 0, left: 0, bottom: 0, right: 0}}>
                        <img src={URL.createObjectURL(image)}
                             style={{width: "100%", height: "100%", objectFit: "contain"}}
                             alt="product-img"/>
                    </div>
                    }
                </Grid>
                <Grid item xs={4}>
                    <label htmlFor="contained-button-file">
                        <Input accept="image/*" id="contained-button-file" type="file" onChange={
                            (e) => setImage(e.target.files && e.target.files[0])
                        }/>
                        <Button variant="contained" component="span">
                            Upload
                        </Button>
                    </label>
                </Grid>
            </Grid>
        </Card>
    );
};

export default AuthorForm;