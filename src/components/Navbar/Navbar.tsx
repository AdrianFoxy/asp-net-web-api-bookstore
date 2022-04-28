import React, {useEffect} from 'react';
import styles from "./Navbar.module.scss"
import {Link} from "react-router-dom";
import {useActions} from "../../hooks/useAppDispatch";
import {fetchGenres} from "../../redux/actions/genre";
import {useTypedSelector} from "../../hooks/useTypedSelector";
import SimpleAccordion from "../Accordion";

const Navbar = () => {

    const genres = useTypedSelector(state => state.genreReducer)

    const {fetchGenres} = useActions()

    useEffect(() => {
        fetchGenres()
    }, [])

    return (
        <ul className={styles.header__list}>
            <li>
                <SimpleAccordion genres={genres.genres}/>
            </li>
        </ul>
    );
};

export default Navbar;