import React, {FC, useEffect, useState} from 'react';
import {Button, Card, Checkbox, FormControlLabel, FormGroup, Grid, IconButton, Stack, TextField} from "@mui/material";
import {useInput} from "../../hooks/useInput";
import {useActions} from "../../hooks/useAppDispatch";
import {useRequest} from "../../hooks/useRequest";
import $api from "../../http";
import {Theme, useTheme} from '@mui/material/styles';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, {SelectChangeEvent} from '@mui/material/Select';
import {PhotoCamera} from "@mui/icons-material";
import {styled} from '@mui/material/styles';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 250,
        },
    },
};

const Input = styled('input')({
    display: 'none',
});

function getStyles(name: string, personName: string[], theme: Theme) {
    return {
        fontWeight:
            personName.indexOf(name) === -1
                ? theme.typography.fontWeightRegular
                : theme.typography.fontWeightMedium,
    };
}

const ProductForm: FC = () => {

    const theme = useTheme();

    const [authorList, isAuthorLoading, authorError] = useRequest(async () => {
        return await $api.get(`/Author/get-authors-for-drop-list`)
    })

    const [genreList, isGenreLoading, genreError] = useRequest(async () => {
        return await $api.get(`/Genre/get-genres-for-drop-list`)
    })

    const [publisherList, isPublisherLoading, publisherError] = useRequest(async () => {
        return await $api.get(`/Publisher/get-publishers-for-drop-list`)
    })

    const {createProduct} = useActions()

    const title = useInput("")
    const pages = useInput(null)
    const format = useInput("")
    const longDescription = useInput("")
    const shortDescription = useInput("")
    const amount = useInput(null)
    const price = useInput(null)

    const [isCheck, setIsCheck] = useState(false)
    const [isFavor, setIsFavor] = useState("")
    const handleChangeFavor = (event: React.ChangeEvent<HTMLInputElement>) => {
        setIsCheck(event.target.checked);
    };
    useEffect(() => {
        if (isCheck) {
            setIsFavor("true")
        } else {
            setIsFavor("false")
        }
    }, [isCheck])


    const [resealeDate, setResealeData] = useState("2015.12.16")

    const [publisherId, setPublisherId] = useState<any>(null)
    const handleChange = (event: SelectChangeEvent) => {
        setPublisherId(event.target.value);
    };

    const [authorsId, setAuthorsId] = useState<any>([])
    const [authorsName, setAuthorsName] = useState<string[]>([]);
    const authorsChange = (event: SelectChangeEvent<typeof authorsName>) => {
        const {
            target: {value},
        } = event;
        setAuthorsName(
            typeof value === 'string' ? value.split(',') : value,
        );
        setAuthorsId(event.target.value);
    };

    const [genresId, setGenresId] = useState<any>([])
    const [genresName, setGenresName] = useState<string[]>([]);
    const genresChange = (event: SelectChangeEvent<typeof genresName>) => {
        const {
            target: {value},
        } = event;
        setGenresName(
            typeof value === 'string' ? value.split(',') : value,
        );
        setGenresId(event.target.value);
    };

    const [image, setImage] = useState<any>("")

    const sendProduct = () => {
        const formData = new FormData()
        formData.append("Title", title.value)
        formData.append("Pages", pages.value)
        formData.append("Format", format.value)
        formData.append("LongDescription", longDescription.value)
        formData.append("ShortDescription", shortDescription.value)
        formData.append("Amount", amount.value)
        formData.append("Price", price.value)

        formData.append("IsFavor", isFavor)

        formData.append("ResealeDate", "2015.12.16")
        formData.append("Fk_PublisherId", publisherId)

        for (let i = 0; i < genresId.length; i++) {
            formData.append("GenresId", genresId[i])
        }

        for (let i = 0; i < authorsId.length; i++) {
            formData.append("AuthorsId", authorsId[i])
        }

        formData.append("image", image)
        createProduct(formData)
    }

    return (
        <Card style={{borderRadius: "1px", padding: "20px", display: "flex"}}>
            <Grid container spacing={2} width={"50%"} style={{marginRight: "20px"}}>
                <Grid item xs={4}>
                    <TextField {...title} style={{width: "100%"}} id="outlined-basic" label="title" variant="outlined"/>
                </Grid>
                <Grid item xs={4}>
                    <TextField {...pages} style={{width: "100%"}} id="outlined-basic" label="pages" variant="outlined"/>
                </Grid>
                <Grid item xs={4}>
                    <TextField {...format} style={{width: "100%"}} id="outlined-basic" label="format"
                               variant="outlined"/>
                </Grid>
                <Grid item xs={4}>
                    <TextField {...longDescription} style={{width: "100%"}} id="outlined-basic" label="longDescription"
                               variant="outlined"/>
                </Grid>
                <Grid item xs={4}>
                    <TextField {...shortDescription} style={{width: "100%"}} id="outlined-basic"
                               label="shortDescription" variant="outlined"/>
                </Grid>
                <Grid item xs={4}>
                    <TextField {...amount} style={{width: "100%"}} id="outlined-basic" label="amount"
                               variant="outlined"/>
                </Grid>
                <Grid item xs={4}>
                    <TextField {...price} style={{width: "100%"}} id="outlined-basic" label="price" variant="outlined"/>
                </Grid>
                <Grid item xs={4}>
                    <FormControl fullWidth>
                        <InputLabel id="demo-multiple-name-label">Authors</InputLabel>
                        <Select
                            labelId="demo-multiple-name-label"
                            id="demo-multiple-name"
                            multiple
                            value={authorsName}
                            onChange={authorsChange}
                            input={<OutlinedInput label="Name"/>}
                            MenuProps={MenuProps}
                        >
                            {authorList?.map((author: any) => (
                                <MenuItem
                                    key={author.fullName}
                                    value={author.id}
                                    style={getStyles(author.fullName, authorsName, theme)}
                                >
                                    {author.fullName}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </Grid>
                <Grid item xs={4}>
                    <FormControl fullWidth>
                        <InputLabel id="demo-multiple-name-label">Genres</InputLabel>
                        <Select
                            labelId="demo-multiple-name-label"
                            id="demo-multiple-name"
                            multiple
                            value={genresName}
                            onChange={genresChange}
                            input={<OutlinedInput label="Name"/>}
                            MenuProps={MenuProps}
                        >
                            {genreList?.map((genre: any) => (
                                <MenuItem
                                    key={genre.fullName}
                                    value={genre.id}
                                    style={getStyles(genre.name, genresName, theme)}
                                >
                                    {genre.name}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </Grid>
                <Grid item xs={4}>
                    <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label">Age</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"

                            label="Age"
                            onChange={handleChange}
                        >
                            {publisherList?.map((publisher: any) =>
                                <MenuItem value={publisher.id}>{publisher.name}</MenuItem>
                            )}
                        </Select>
                    </FormControl>
                </Grid>
                <Grid item xs={4}>
                    <FormGroup style={{justifyContent: "center", flexDirection: "row"}}>
                        <FormControlLabel control={
                            <Checkbox checked={isCheck} onChange={handleChangeFavor}
                                      inputProps={{'aria-label': 'controlled'}}/>}
                                          label="IsFavor"/>
                    </FormGroup>
                </Grid>
                <Grid item xs={4}>
                    <Button onClick={sendProduct} variant="outlined" style={{display: "block", margin: "0 auto"}}>
                        Send
                    </Button>
                </Grid>
            </Grid>
            <Grid container spacing={2} width={"50%"}>
                <Grid item xs={8} style={{position: "relative"}}>
                    {image &&
                    <div style={{position: "absolute", top: 0, left: 0, bottom: 0, right: 0}}>
                        <img src={URL.createObjectURL(image)} style={{width: "100%", height: "100%", objectFit: "contain"}} alt="product-img"/>
                    </div>
                    }
                </Grid>
                <Grid item xs={4}>
                    <Stack direction="row" alignItems="center" spacing={2}>
                        <label htmlFor="contained-button-file">
                            <Input accept="image/*" id="contained-button-file" multiple type="file"/>
                            <Button variant="contained" component="span">
                                Upload
                            </Button>
                        </label>
                        <label htmlFor="icon-button-file">
                            <Input accept="image/*" id="icon-button-file" type="file" onChange={
                                (e) => setImage(e.target.files && e.target.files[0])
                            }/>
                            <IconButton color="primary" aria-label="upload picture" component="span">
                                <PhotoCamera/>
                            </IconButton>
                        </label>
                    </Stack>
                </Grid>
            </Grid>
        </Card>
    );
};

export default ProductForm;
