import React, {useEffect} from 'react';
import {useTypedSelector} from "../../hooks/useTypedSelector";
import {useActions} from "../../hooks/useAppDispatch";
import {Pagination} from "@mui/material";
import ProductList from "../../components/ProductList/ProductList";

const Search = () => {

    const {searchBooks, setPageSearch} = useActions()

    const {searchedBooks, pageS, countS, pageSizeS, textSearch} = useTypedSelector((state) => state.productReducer)

    console.log(textSearch)

    useEffect(() => {
        if (textSearch) {
            if (pageS) {
                searchBooks(textSearch, pageS)
            }
        }
    }, [pageS, textSearch])

    const pages = Math.ceil(countS / pageSizeS)

    const handleChange = (event: React.ChangeEvent<unknown>, page: number) => {
        setPageSearch(page)
    }

    return (
        <div>
            {countS <= pageSizeS ?
                ""
                :
                <Pagination count={pages} color="primary" onChange={handleChange} style={{margin: "20px 0"}}/>
            }
            <ProductList products={searchedBooks}/>
        </div>
    );
};

export default Search;