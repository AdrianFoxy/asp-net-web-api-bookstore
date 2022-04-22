import * as React from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Typography from '@mui/material/Typography';
import {useTypedSelector} from "../hooks/useTypedSelector";
import {Link} from "react-router-dom";

const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: "80vw",
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

export default function KeepMountedModal({type = "primary", children}: { type?: string, children: React.ReactNode }) {
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const genres = useTypedSelector(state => state.genreReducer.genres)

    return (
        <div>
            {type === "primary" ?
                <div onClick={handleOpen}> {children} </div>
                :
                <div onClick={handleOpen}> {children} </div>
            }
            <Modal
                keepMounted
                open={open}
                onClose={handleClose}
                aria-labelledby="keep-mounted-modal-title"
                aria-describedby="keep-mounted-modal-description"
            >
                <Box sx={style}  style={{display: "flex"}}>
                    {genres.map((genre) =>
                        <div>
                            <Typography id="keep-mounted-modal-title" variant="h6" component="h2">
                                <Link to={`/products/${genre.nameEng}`} onClick={handleClose}>
                                    {genre.name}
                                </Link>
                            </Typography>
                            {genre.genreNames.map((name) =>
                                <Typography id="keep-mounted-modal-description" sx={{mt: 2}}
                                            style={{marginLeft: "10px"}}>
                                    <Link to={`/products/${name.nameForUrl}`} onClick={handleClose}>
                                        {name.name}
                                    </Link>
                                </Typography>
                            )}
                        </div>
                    )}
                </Box>
            </Modal>
        </div>
    );
}