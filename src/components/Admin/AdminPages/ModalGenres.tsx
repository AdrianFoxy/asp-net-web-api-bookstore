import React, {useEffect, useState} from 'react';
import {useActions} from "../../../hooks/useAppDispatch";
import $api from "../../../http";
import {IGenreA} from "../../../types/IGenreA";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import {TextField} from "@mui/material";
import Button from "@mui/material/Button";

const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: "60vw",
    height: "30vh",
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

const ModalGenres = ({id, children}: { id: number, children: React.ReactNode }) => {

    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const {editGenre} = useActions()

    const getGenre = async (id: number) => {
        return await $api.get(`/Genre/get-genre-for-update-by-id/${id}`).then((response) => {
            setGenre(response.data)
        })
    }

    const [genre, setGenre] = useState<IGenreA>({
        id: 0,
        name: "",
        nameForUrl: "",
        description: "",
        fk_TypeGenreId: 0
    })

    useEffect(() => {
        if (open) {
            getGenre(id)
        }
    }, [open])

    return (
        <div>
            <div style={{padding: "2px 15px", borderRadius: "5px", border: "1px solid #EB4C42", cursor: "pointer"}}
                 onClick={handleOpen}>
                Edit
            </div>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <div>
                        <TextField value={genre.name} onChange={(e) => {
                            setGenre({...genre, name: e.target.value})
                        }} style={{width: "50%", marginBottom: "15px"}} id="outlined-basic" label="name"
                                   variant="outlined"/>
                        <TextField value={genre.nameForUrl} onChange={(e) => {
                            setGenre({...genre, nameForUrl: e.target.value})
                        }} style={{width: "50%", marginBottom: "15px"}} id="outlined-basic" label="nameForUrl"
                                   variant="outlined"/>
                        <TextField value={genre.description} onChange={(e) => {
                            setGenre({...genre, description: e.target.value})
                        }} style={{width: "50%", marginBottom: "15px"}} id="outlined-basic" label="description"
                                   variant="outlined"/>
                        <TextField value={genre.fk_TypeGenreId} onChange={(e) => {
                            setGenre({...genre, fk_TypeGenreId: Number(e.target.value)})
                        }} style={{width: "50%", marginBottom: "15px"}} id="outlined-basic" label="fk_TypeGenreId"
                                   variant="outlined"/>
                        <div>
                            <Button variant="outlined" onClick={(e) => {
                                e.stopPropagation()
                                editGenre(id, genre)
                                handleClose()
                            }}>Send</Button>
                        </div>
                    </div>
                    {children}
                </Box>
            </Modal>
        </div>
    );
};

export default ModalGenres;