import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import {useEffect, useState} from "react";
import $api from "../../../http";
import {IPublisher} from "../../../types/IPublisher";
import {TextField} from "@mui/material";
import {useActions} from "../../../hooks/useAppDispatch";

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

const ModalPublisher = ({id, children}: { id: number, children: React.ReactNode }) => {

    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const {editPublisher} = useActions()

    const getPublisher = async (id: number) => {
        return await $api.get(`/Publisher/get-publisher-by-id/${id}`).then((response) => {
            setPublisher(response.data)
        })
    }

    const [publisher, setPublisher] = useState<IPublisher>({
        id: 0,
        name: ""
    })

    useEffect(() => {
        if (open) {
            getPublisher(id)
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
                        <TextField value={publisher.name} onChange={(e) => {
                            setPublisher({...publisher, name: e.target.value})
                        }} style={{width: "50%", marginBottom: "15px"}} id="outlined-basic" label="name"
                                   variant="outlined"/>
                        <div>
                            <Button variant="outlined" onClick={(e) => {
                                e.stopPropagation()
                                editPublisher(id, {name: publisher.name})
                                handleClose()
                            }}>Send</Button>
                        </div>
                    </div>
                    {children}
                </Box>
            </Modal>
        </div>
    );
}

export default ModalPublisher