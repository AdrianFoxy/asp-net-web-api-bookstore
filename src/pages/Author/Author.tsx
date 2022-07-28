import React, {useEffect} from 'react';
import {useActions} from "../../hooks/useAppDispatch";
import {useTypedSelector} from "../../hooks/useTypedSelector";
import styles from "./Author.module.scss"
import {Card, Grid} from "@mui/material";

const Author = () => {

    const {getAuthorByName, getBooksAuthor} = useActions()

    const {authorName, author, booksAuthor} = useTypedSelector(state => state.authorReducer)
    console.log(booksAuthor, author, authorName)
    useEffect(() => {
        if (authorName) {
            getAuthorByName(authorName)
        }
    }, [authorName])

    useEffect(() => {
        if (author) {
            getBooksAuthor(author.nameForUrl)
        }
    }, [author])


    return (
        <>
            <Card className={styles.author}>
                <div className={styles.author__title}>
                    {author.fullName}
                </div>
                <Grid container spacing={2}>
                    <Grid item xs={2}>
                        <img src={`${process.env.REACT_APP_SERVER_IMAGE_URL}${author.imageUrl}`} alt="book"
                             className={styles.author__img}/>
                    </Grid>
                    <Grid item xs={10}>
                        <div>
                            {author.description}
                        </div>
                    </Grid>
                </Grid>
            </Card>
            {booksAuthor.map((book: any) =>
                <Grid container spacing={2} style={{margin: "10px"}}>
                    <Grid item xs={2}>
                        <img src={`${process.env.REACT_APP_SERVER_IMAGE_URL}${book.imageUrl}`} alt=""
                             className={styles.author__bookImg}/>
                    </Grid>
                    <Grid item xs={2}>
                        {book.title}
                    </Grid>
                    <Grid item xs={2}>
                        Цена {book.price}
                    </Grid>
                    <Grid item xs={2}>
                        Формат {book.format}
                    </Grid>
                    <Grid item xs={2}>
                        Количество страниц {book.pages}
                    </Grid>
                    <Grid item xs={2}>
                        Издатель {book.publisherName}
                    </Grid>
                </Grid>
            )}
        </>
    );
};

export default Author;