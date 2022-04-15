import React, {useEffect} from 'react';
import styles from "./Navbar.module.scss"
import {Link, useParams} from "react-router-dom";
import {useAppDispatch} from "../../hooks/useAppDispatch";
import {fetchGenres} from "../../redux/actions/genre";
import {useAppSelector} from "../../hooks/useAppSelector";
import SimpleAccordion from "../Accordion";

const Navbar = () => {

    const dispatch = useAppDispatch()

    const genres = useAppSelector(state => state.genreReducer)

    useEffect(() => {
        dispatch(fetchGenres())
    }, [])

    return (
        <ul className={styles.header__list}>
            <li>
                <SimpleAccordion genres={genres.genres}/>
                <Link to="/"></Link>
            </li>
            <li>
                <Link to="/products"> </Link>
            </li>
        </ul>
    );
};

export default Navbar;