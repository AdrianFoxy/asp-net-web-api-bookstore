import * as GenreActionCreators from "./genre"
import * as ProductActionCreators from "./product"
import * as CartActionCreators from "./cart"

export const allActionCreators = {
    ...GenreActionCreators,
    ...ProductActionCreators,
    ...CartActionCreators
}