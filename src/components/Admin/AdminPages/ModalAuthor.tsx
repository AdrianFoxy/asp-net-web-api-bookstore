import React, {useEffect, useState} from 'react';
import {useActions} from "../../../hooks/useAppDispatch";
import $api from "../../../http";
import Box from "@mui/material/Box";
import {Button, TextField} from "@mui/material";
import Modal from "@mui/material/Modal";
import {styled} from "@mui/material/styles";

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

const Input = styled('input')({
    display: 'none',
})

const ModalAuthor = ({id, children}: { id: number, children: React.ReactNode }) => {

    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const {editAuthor} = useActions()

    const getAuthor = async (id: number) => {
        return await $api.get(`/Author/get-author-by-id/${id}`).then((response) => {
            setAuthor({id: response.data.id, fullName: response.data.fullName, nameForUrl: response.data.nameForUrl, imageUrl: response.data.imageUrl, description: response.data.description})
        })
    }

    const [author, setAuthor] = useState<any>({
        fullName: "",
        nameForUrl: "",
        imageUrl: "",
        description: "",
    })

    const [image, setImage] = useState<any>("")

    useEffect(() => {
        if (open) {
            getAuthor(id)
        }
    }, [open])

    const sendEditAuthor = (id: number) => {
        const formData = new FormData()
        formData.append("FullName", author.fullName)
        formData.append("NameForUrl", author.nameForUrl)
        formData.append("Description", author.description)
        formData.append("image", image)
        editAuthor(id, formData)
    }

    console.log(image)

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
                        <TextField value={author.fullName} onChange={(e) => {
                            setAuthor({...author, fullName: e.target.value})
                        }} style={{width: "45%", marginBottom: "15px", marginRight: "15px"}} id="outlined-basic" label="name"
                                   variant="outlined"/>
                        <TextField value={author.nameForUrl} onChange={(e) => {
                            setAuthor({...author, nameForUrl: e.target.value})
                        }} style={{width: "45%", marginBottom: "15px"}} id="outlined-basic" label="nameForUrl"
                                   variant="outlined"/>
                        <TextField value={author.description} onChange={(e) => {
                            setAuthor({...author, description: e.target.value})
                        }} style={{width: "45%", marginBottom: "15px", marginRight: "15px"}} id="outlined-basic" label="description"
                                   variant="outlined"/>
                        {image &&
                        <div style={{position: "absolute", top: 100, left: 300, bottom: 0, right: 0}}>
                            <img src={URL.createObjectURL(image)}
                                 style={{width: "100%", height: "70%", objectFit: "contain"}}
                                 alt="product-img"/>
                        </div>
                        }
                        <label htmlFor="contained-button-file2">
                            <Input accept="image/*" id="contained-button-file2" type="file" onChange={
                                (e) => setImage(e.target.files && e.target.files[0])
                            }/>
                            <Button variant="contained" component="span">
                                Upload
                            </Button>
                        </label>
                        <div>
                            <Button variant="outlined" onClick={(e) => {
                                e.stopPropagation()
                                sendEditAuthor(id)
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

export default ModalAuthor;