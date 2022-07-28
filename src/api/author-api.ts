import $api from "../http";
import {deleteAuthor, editAuthor, getAuthorByName, getBooksAuthor} from "../redux/actions/author";


export const authorApi = {
    getAuthors() {
        return $api.get(`/Author/get-all-author`)
    },
    getAuthorsList() {
        return $api.get(`/Author/get-authors-for-drop-list`)
    },
    addAuthor(author: Object) {
        return $api.post(`/Author/add-author`, author)
    },
    deleteAuthor(id: number) {
        return $api.delete(`/Author/delete-author-by-id/${id}`)
    },
    editAuthor(id: number, author: Object) {
        return $api.put(`/Author/update-author-by-id/${id}`, author)
    },
    getAuthorByName(name: string) {
        return $api.get(`/Author/get-author-by-name/${name}`)
    },
    getBooksAuthor(nameUrl: string) {
        return $api.get(`/Book/get-all-books-by-author/${nameUrl}`, {
            params: {
                Page: 1,
                ItemsPerPage: 10
            }
        })
    }
}