import * as React from 'react';
import Typography from '@mui/material/Typography';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Link from '@mui/material/Link';
import {useLocation, useNavigate, useParams} from "react-router-dom";
import {useTypedSelector} from "../../hooks/useTypedSelector";
import {useEffect, useState} from "react";

const BasicBreadcrumbs = () => {

    const location = useLocation();

    const {genres} = useTypedSelector(state => state.genreReducer)
    const {product} = useTypedSelector(state => state.productReducer)

    const {genre} = useParams()
    const {productId} = useParams()

    const [nameGenre, setNameGenre] = useState("")

    useEffect(() => {
        if (genre) {
            const g = genres.find(item => item.nameEng === genre)
            if (g) {
                setNameGenre(g.name)
            } else {
                genres.forEach((genre2, i, genres) => {
                    const genreNames = genre2.genreNames
                    const g2 = genreNames.find(item => item.nameForUrl === genre)
                    if (g2) {
                        setNameGenre(g2.name)
                    }
                })
            }
        }
    }, [genre, genres, productId])

    // const breadcrumbNameMap: { [key: string]: string } = {
    //     "/products": "Каталог",
    //     "/products/Prikladnaya-literaturaa": "Книга",
    // };

    const generateNameMap = (productId: string | undefined, productIdKey: string, id: string | undefined, idKey: string, map: Object) => {
        const clone = {};
        Object.keys(map).forEach(k => {
            // @ts-ignore
            clone[k.replace(idKey, id)] = map[k].replace(idKey, id)
        })

        const clone2 = {}
        Object.keys(clone).forEach(k => {
            // @ts-ignore
            clone2[k.replace(productIdKey, productId)] = clone[k].replace(productIdKey, productId)
        })
        return clone2;
    }

    const breadcrumbNameMap: { [key: string]: string | null } = generateNameMap(productId, ":productId", genre, ":genre", {
        "/products": "Каталог",
        "/products/:genre": nameGenre,
        "/product": "",
        "/product/:productId": product ? product?.title : "Книга",
        "/search": "Поиск",
        "/cart": "Корзина",
        "/order": "Новый заказ",
        "/orderById": "Отслеживание заказа по номеру",
        "/profile": "Личный кабинет",
        "/author": "Автор",
    })

    //console.log(breadcrumbNameMap)

    const navigate = useNavigate()

    const pathnames = location.pathname.split('/').filter((x) => x);

    return (
        <Breadcrumbs aria-label="breadcrumb" style={{marginBottom: "15px"}}>
            {pathnames.length > 0 ?
                <Link onClick={() => navigate("/")}>Главная</Link>
                :
                <Typography> Главная </Typography>
            }
            {pathnames.map((name, index) => {
                const routeTo: string = `/${pathnames.slice(0, index + 1).join("/")}`
                const isLast = index === pathnames.length - 1
                // console.log(routeTo)
                // console.log(breadcrumbNameMap)
                //console.log(breadcrumbNameMap[routeTo])
                return breadcrumbNameMap[routeTo] === "" ? "" :
                    isLast ?
                        <Typography key={name}> {/*{name}*/} {breadcrumbNameMap[routeTo]}</Typography>
                        :
                        <Link key={name} style={{cursor: "pointer"}}
                              onClick={() => navigate(routeTo)}> {/*{name}*/} {breadcrumbNameMap[routeTo]}</Link>
            })}
            {/*<Link color="inherit">Core</Link>*/}
            {/*<Typography color="text.primary">Breadcrumbs</Typography>*/}
        </Breadcrumbs>
    );
}

export default BasicBreadcrumbs