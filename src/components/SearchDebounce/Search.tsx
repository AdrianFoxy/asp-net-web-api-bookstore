import React, {useEffect, useState} from 'react';
import {useActions} from "../../hooks/useAppDispatch";
import useDebounce from "../../hooks/useDebounce";
import SearchIcon from "@mui/icons-material/Search";
import {alpha, styled} from "@mui/material/styles";
import InputBase from "@mui/material/InputBase";
import styles from "./Search.module.scss"
import {useNavigate} from "react-router-dom";

const Search = () => {

    const {setTextSearch, setPageSearch} = useActions()

    const [text, setText] = useState("")

    const textDebounce = useDebounce(text, 1000)

    useEffect(() => {
        if (!(textDebounce === "")) {
            setTextSearch(textDebounce)
            setPageSearch(1)
        }
    }, [textDebounce])

    const navigate = useNavigate()

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === "Enter") {
            navigate(`/search`)
        }
    }

    return (
        <div className={styles.wrapper}>

            <input
                placeholder="Search…"
                value={text}
                onChange={(e) => setText(e.target.value)}
                onKeyPress={handleKeyDown}
                className={styles.input}
            />

            <div className={styles.icon_wrapper} onClick={() => navigate(`/search`)}>
                <SearchIcon className={styles.icon}/>
            </div>

            {/*<Search style={{marginLeft: "0", marginRight: "36px"}}>*/}
            {/*    <SearchIconWrapper>*/}
            {/*        <SearchIcon/>*/}
            {/*    </SearchIconWrapper>*/}
            {/*    <StyledInputBase*/}
            {/*        placeholder="Search…"*/}
            {/*        inputProps={{'aria-label': 'search'}}*/}
            {/*        value={text}*/}
            {/*        onChange={(e) => {*/}
            {/*            e.preventDefault()*/}
            {/*            setText(e.target.value)*/}
            {/*        }}*/}
            {/*    />*/}
            {/*</Search>*/}
        </div>

    );
};

export default Search;