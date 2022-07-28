import $api from "../http";
import {IProduct} from "../types/IProduct";


export const productApi = {
    getBooksTypeGenre(genre: string, page: number = 1, count: number = 10) {
        return $api.get<IProduct[]>(`/Book/get-all-books-by-typegenre/${genre}`, {
            params: {
                Page: page,
                ItemsPerPage: count
            }
        })
    },
    getBooksGenre(genre: string) {
        return $api.get<IProduct[]>(`/Book/get-all-books-by-genre/${genre}`, {
            params: {
                Page: 1,
                ItemsPerPage: 10
            }
        })
    },
    getAgeRecomendations() {
        return $api.get(`/Book/get-age-recommendations(authorizedOnly)`)
    },
    getAllFavoriteBooks() {
        return $api.get<IProduct[]>(`/Book/get-all-favorite-books`, {
            params: {
                Page: 1,
                ItemsPerPage: 10
            }
        })
    },
    getWhatToReadBooks() {
        return $api.get<IProduct[]>(`/Book/get-what-to-read`)
    },
    getAllBooksInfo(page: number, count: number) {
        return $api.get<IProduct[]>(`/Book/get-all-books-info`, {
            params: {
                Page: page, //?
                ItemsPerPage: count
            }
        })
    },
    getAllBooksAdmin(page: number, count: number) {
        return $api.get<IProduct[]>(`/Book/get-all-books-info`, {
            params: {
                Page: page + 1, //?
                ItemsPerPage: count
            }
        })
    },
    addProduct(product: Object) {
        return $api.post(`/Book/add-book`, product)
    },
    updateProduct(id: number, author: Object) {
        return $api.put(`/Book/update-book-by-id/${id}`, author)
    },
    deleteProduct(id: number) {
        return $api.delete(`/Book/delete-book-by-id/${id}`)
    },
    getBookById(productId: string | undefined) {
        return $api.get(`/Book/get-book-by-id/${productId}`)
    },
    getSearchedBooks(text: string, page: number) {
        return $api.get(`/Book/get-searched-books`, {
            params: {
                Page: page,
                ItemsPerPage: 10,
                searchString: text
            }
        })
    },
    getRecommendationsForAge(age: number) {
        return $api.get(`/Book/get-recommendations-for-input-age-group(Admin)?age=${age}`)
    }
}