import {IProduct} from "../types/IProduct";
import {useMemo} from "react";

export const useFilteredProducts = (products: IProduct[], minPrice: number, maxPrice: number) => {

    const filteredProducts = useMemo(() => {
        return products.filter((product) => {
            return product.price >= minPrice && product.price <= maxPrice
        })
    }, [minPrice, maxPrice, products])

    return filteredProducts
}

export const useFilteredProducts2 = (products: IProduct[], minPrice: number, maxPrice: number, authors: string[]) => {

    const filteredProducts = useFilteredProducts(products, minPrice, maxPrice)

    const filteredProducts2 = useMemo(() => {
        if (authors.length <= 0) {
            return filteredProducts
        } else {
            return filteredProducts.filter((product) => {
                return product.authorNames.some(authorName => authors.includes(authorName))
            })
        }
    }, [filteredProducts, authors])



    return filteredProducts2

}