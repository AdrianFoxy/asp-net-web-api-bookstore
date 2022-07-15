import React, {useEffect, useState} from 'react';
import {styled} from "@mui/material/styles";
import {useActions} from "../../../hooks/useAppDispatch";
import $api from "../../../http";
import Box from "@mui/material/Box";
import {Button, TextField} from "@mui/material";
import Modal from "@mui/material/Modal";

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

const ModalProduct = ({id, children}: { id: number, children: React.ReactNode }) => {

    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const {editProduct} = useActions()

    const getProduct = async (id: number) => {
        return await $api.get(`/Book/get-book-for-update-by-id/${id}`).then((response) => {
            setProduct(response.data)
        })
    }

    const [product, setProduct] = useState<any>({
        title: "",
        pages: 0,
        format: "",
        longDescription: "",
        shortDescription: "",
        amount: 0,
        price: 0,
        imageUrl: "",
        isFavor: false,
        releaseDate: null,
        publisherId: 0,
        authorId: [],
        genreId: []
    })

    const [image, setImage] = useState<any>("")

    useEffect(() => {
        if (open) {
            getProduct(id)
        }
    }, [open])

    const sendEditProduct = (id: number) => {
        const formData = new FormData()
        formData.append("Title", product.title)
        formData.append("Pages", product.pages)
        formData.append("Format", product.format)
        formData.append("LongDescription", product.longDescription)
        formData.append("ShortDescription", product.shortDescription)
        formData.append("Amount", product.amount)
        formData.append("Price", product.price)
        formData.append("IsFavor", product.isFavor)
        formData.append("ReleaseDate", product.releaseDate)
        formData.append("Fk_PublisherId", product.publisherId)
        for (let i = 0; i < product.authorId.length; i++) {
            formData.append("AuthorsId", product.authorId[i])
        }
        for (let i = 0; i < product.genreId.length; i++) {
            formData.append("GenresId", product.genreId[i])
        }
        formData.append("image", image)
        editProduct(id, formData)
    }

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
                        <TextField value={product.title} onChange={(e) => {
                            setProduct({...product, title: e.target.value})
                        }} style={{width: "45%", marginBottom: "15px", marginRight: "15px"}} id="outlined-basic" label="title"
                                   variant="outlined"/>
                        <TextField value={product.pages} onChange={(e) => {
                            setProduct({...product, pages: e.target.value})
                        }} style={{width: "45%", marginBottom: "15px"}} id="outlined-basic" label="pages"
                                   variant="outlined"/>
                        <TextField value={product.format} onChange={(e) => {
                            setProduct({...product, format: e.target.value})
                        }} style={{width: "45%", marginBottom: "15px", marginRight: "15px"}} id="outlined-basic" label="format"
                                   variant="outlined"/>
                        <TextField value={product.longDescription} onChange={(e) => {
                            setProduct({...product, longDescription: e.target.value})
                        }} style={{width: "45%", marginBottom: "15px", marginRight: "15px"}} id="outlined-basic" label="longDescription"
                                   variant="outlined"/>
                        <TextField value={product.shortDescription} onChange={(e) => {
                            setProduct({...product, shortDescription: e.target.value})
                        }} style={{width: "45%", marginBottom: "15px", marginRight: "15px"}} id="outlined-basic" label="shortDescription"
                                   variant="outlined"/>
                        <TextField value={product.amount} onChange={(e) => {
                            setProduct({...product, amount: e.target.value})
                        }} style={{width: "45%", marginBottom: "15px", marginRight: "15px"}} id="outlined-basic" label="amount"
                                   variant="outlined"/>
                        <TextField value={product.price} onChange={(e) => {
                            setProduct({...product, price: e.target.value})
                        }} style={{width: "45%", marginBottom: "15px", marginRight: "15px"}} id="outlined-basic" label="price"
                                   variant="outlined"/>
                        <TextField value={product.imageUrl} onChange={(e) => {
                            setProduct({...product, imageUrl: e.target.value})
                        }} style={{width: "45%", marginBottom: "15px", marginRight: "15px"}} id="outlined-basic" label="imageUrl"
                                   variant="outlined"/>
                        {/*{image &&*/}
                        {/*<div style={{position: "absolute", top: 100, left: 300, bottom: 0, right: 0}}>*/}
                        {/*    <img src={URL.createObjectURL(image)}*/}
                        {/*         style={{width: "100%", height: "70%", objectFit: "contain"}}*/}
                        {/*         alt="product-img"/>*/}
                        {/*</div>*/}
                        {/*}*/}
                        {/*<label htmlFor="contained-button-file2">*/}
                        {/*    <Input accept="image/*" id="contained-button-file2" type="file" onChange={*/}
                        {/*        (e) => setImage(e.target.files && e.target.files[0])*/}
                        {/*    }/>*/}
                        {/*    <Button variant="contained" component="span">*/}
                        {/*        Upload*/}
                        {/*    </Button>*/}
                        {/*</label>*/}
                        <div>
                            <Button variant="outlined" onClick={(e) => {
                                e.stopPropagation()
                                sendEditProduct(id)
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

export default ModalProduct;