import React, {useEffect, useState} from 'react';
import {useActions} from "../../../hooks/useAppDispatch";
import $api from "../../../http";
import {ITypeGenre} from "../../../types/ITypeGenre";
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

const ModalTypeGenres = ({id, children}: { id: number, children: React.ReactNode }) => {

    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const {editTypeGenre} = useActions()

    const getTypeGenre = async (id: number) => {
        return await $api.get(`/TypeGenre/get-typegenre-by-id/${id}`).then((response) => {
            setTypeGenre(response.data)
        })
    }

    const [typeGenre, setTypeGenre] = useState<ITypeGenre>({
        name: "",
        nameForUrl: "",
        description: ""
    })

    useEffect(() => {
        if (open) {
            getTypeGenre(id)
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
                        <TextField value={typeGenre.name} onChange={(e) => {
                            setTypeGenre({...typeGenre, name: e.target.value})
                        }} style={{width: "50%", marginBottom: "15px"}} id="outlined-basic" label="name"
                                   variant="outlined"/>
                        <TextField value={typeGenre.nameForUrl} onChange={(e) => {
                            setTypeGenre({...typeGenre, nameForUrl: e.target.value})
                        }} style={{width: "50%", marginBottom: "15px"}} id="outlined-basic" label="name"
                                   variant="outlined"/>
                        <TextField value={typeGenre.description} onChange={(e) => {
                            setTypeGenre({...typeGenre, description: e.target.value})
                        }} style={{width: "50%", marginBottom: "15px"}} id="outlined-basic" label="name"
                                   variant="outlined"/>
                        <div>
                            <Button variant="outlined" onClick={(e) => {
                                e.stopPropagation()
                                editTypeGenre(id, {
                                    name: typeGenre.name,
                                    nameForUrl: typeGenre.nameForUrl,
                                    description: typeGenre.description
                                })
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

export default ModalTypeGenres;