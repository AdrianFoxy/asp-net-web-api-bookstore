import * as React from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import {IGenre} from "../types/IGenre";
import {FC} from "react";
import {Link} from "react-router-dom";

interface SimpleAccordionProps {
    genres: IGenre[],
    genre: string | undefined
}

const SimpleAccordion: FC<SimpleAccordionProps> = ({genres, genre}) => {
    console.log(genre)
    return (
        <div>
            {genres?.map((genre) =>
                <Accordion>
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon/>}
                        aria-controls="panel1a-content"
                        id="panel1a-header"
                    >
                        <Typography onClick={(e) => e.stopPropagation()}>
                            <Link to={`/products/${genre.name}`}>
                                {genre.name}
                            </Link>
                        </Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Typography>
                            {genre.genreNames?.map((name) =>
                                <div>
                                    <Link to={`/products/${name}`}>
                                        {name}
                                    </Link>
                                </div>
                            )}
                        </Typography>
                    </AccordionDetails>
                </Accordion>
            )}
        </div>
    );
}

export default SimpleAccordion