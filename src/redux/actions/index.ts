import * as GenreActionCreators from "./genre"
import * as ProductActionCreators from "./product"
import * as CartActionCreators from "./cart"
import * as AuthorActionCreators from "./author"
import * as UserActionCreators from "./user"

export const allActionCreators = {
    ...GenreActionCreators,
    ...ProductActionCreators,
    ...CartActionCreators,
    ...AuthorActionCreators,
    ...UserActionCreators
}