interface IProduct {
    name: string
    price: number
    quantity: number
}

export interface ICart {
    id: number
    amount: number
    book: {
        id: number
        title: string
        amount: number
        price: number
        imageUrl: string
    }

}