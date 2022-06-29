import React, {useEffect, useState} from 'react';
import FilterRange from "../UI/FilterRange/FilterRange";
import {useTypedSelector} from "../../hooks/useTypedSelector";
import {useActions} from "../../hooks/useAppDispatch";
import styles from "./Filters.module.scss"
import {useFilteredProducts, useFilteredProducts2} from "../../hooks/useFilteredProducts";
import {useRequest} from "../../hooks/useRequest";
import $api from "../../http";
import {Checkbox, ListItemText, MenuItem} from "@mui/material";
import {IAuthor} from "../../types/IAuthor";

const Filters = () => {

    const {minPrice, maxPrice, products} = useTypedSelector(state => state.productReducer)

    const {setMinPrice, setMaxPrice, setFilteredProducts} = useActions()

    //range
    const changePriceMin = (e: React.ChangeEvent<HTMLInputElement>) => {
        setMinPrice(Number(e.target.value))
    }
    const changePriceMax = (e: React.ChangeEvent<HTMLInputElement>) => {
        setMaxPrice(Number(e.target.value))
    }

    //inputs
    const handleChangeMinPrice = (e: React.ChangeEvent<HTMLInputElement>) => {
        setMinPrice(Number(e.target.value))
    }
    const handleChangeMaxPrice = (e: React.ChangeEvent<HTMLInputElement>) => {
        setMaxPrice(Number(e.target.value))
    }

    const onBlurMinPrice = () => {
        if (minPrice > maxPrice) {
            let temp = maxPrice
            setMaxPrice(minPrice)
            setMinPrice(temp)
        }
    }

    const onBlurMaxPrice = () => {
        if (minPrice > maxPrice) {
            let temp = maxPrice
            setMaxPrice(minPrice)
            setMinPrice(temp)
        }
    }

    //
    const [authors, setAuthors] = useState<any[]>([])

    //filters
    const filteredProducts2 = useFilteredProducts2(products, minPrice, maxPrice, authors)

    useEffect(() => {
        setFilteredProducts(filteredProducts2)
    }, [filteredProducts2])

    const [authorList] = useRequest<IAuthor[]>(async () => {
        return await $api.get(`/Author/get-authors-for-drop-list`)
    })

    // const [authorList2] = useRequest3<IProduct[]>(async () => {
    //     return await $api.get(`/Author/get-authors-for-drop-list`)
    // })


    return (
        <div>
            <div>
                <div className={styles.price__title}>Цена</div>
                <div className={styles.price}>
                    <input type="number" value={minPrice === 0 ? "" : minPrice} placeholder="0" className={styles.price__input}
                           onChange={handleChangeMinPrice}/>
                    <input type="number" value={maxPrice === 0 ? "" : maxPrice} className={styles.price__input}
                           onChange={handleChangeMaxPrice}/>
                </div>
                <div style={{marginTop: "24px"}}>
                    <FilterRange min={minPrice} max={maxPrice} onChangeMin={changePriceMin} onChangeMax={changePriceMax}
                                 onBlurMinPrice={onBlurMinPrice} onBlurMaxPrice={onBlurMaxPrice}/>
                </div>
            </div>
            <div>
                <div className={styles.author__title}>Автор</div>
                <div>
                    {authorList?.map((author: IAuthor) =>
                        <MenuItem key={author.fullName} value={author.fullName}>
                            <Checkbox checked={authors.indexOf(author.fullName) > -1} onChange={(e => {
                                if (e.target.checked) {
                                    console.log(author.fullName)
                                    setAuthors([...authors, author.fullName])
                                } else {
                                    setAuthors(authors.filter((author2) => author2 !== author.fullName))
                                }
                            })}/>
                            <ListItemText primary={author.fullName}/>
                        </MenuItem>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Filters;