import React, {useEffect} from 'react';
import styles from "./Navbar.module.scss"
import {useActions} from "../../hooks/useAppDispatch";
import {fetchGenres} from "../../redux/actions/genre";
import {useTypedSelector} from "../../hooks/useTypedSelector";
import SimpleAccordion from "../MUI/Accordion";
import Filters from "../Filters/Filters";
import {useLocation} from 'react-router-dom';

const Navbar = () => {

    const genres = useTypedSelector(state => state.genreReducer)

    const {fetchGenres} = useActions()

    useEffect(() => {
        fetchGenres()
    }, [])

    let location = useLocation();
    let res = location.pathname.toString().split("/")[1]

    return (
        <ul className={styles.header__list}>
            <li>
                <SimpleAccordion genres={genres.genres}/>
                {res === "products" &&
                <Filters/>
                }
            </li>
        </ul>
    );
};

export default Navbar;