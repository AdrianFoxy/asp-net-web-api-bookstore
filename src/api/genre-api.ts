import $api from "../http";
import {IGenre} from "../types/IGenre";

export const genreApi = {
    getGenres() {
        return $api.get<IGenre[]>(`TypeGenre/get-all-types-and-genres-eng`)
    },
    getDescriptionTypeGenre(genre: string) {
        return $api.get(`TypeGenre/get-type-genre-description/${genre}`)
    },
    getDescriptionGenre(genre: string) {
        return $api.get(`Genre/get-genre-description/${genre}`)
    },
    getGenresAdmin(page: number, count: number) {
        return $api.get(`Genre/get-all-genres-pagination`, {
            params: {
                Page: page + 1,
                ItemsPerPage: count
            }
        })
    },
    getTypeGenresAdmin() {
        return $api.get(`TypeGenre/get-all-type-genres`)
    },
    addTypeGenre(typeGenre: Object) {
        return $api.post(`TypeGenre/add-typegenre`, typeGenre)
    },
    deleteTypeGenre(id: number) {
        return $api.delete(`TypeGenre/delete-typegenre-by-id/${id}`)
    },
    updateTypeGenre(id: number, typeGenre: Object) {
        return $api.put(`TypeGenre/update-typegenre-by-id/${id}`, typeGenre)
    },
    addGenre(genre: Object) {
        return $api.post(`Genre/add-genre`, genre)
    },
    deleteGenre(id: number) {
        return $api.delete(`Genre/delete-genre-by-id/${id}`)
    },
    updateGenre(id: number, genre: Object) {
        return $api.put(`Genre/update-genre-by-id/${id}`, genre)
    }
}