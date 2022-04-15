export interface IProduct {
    id: number
    title: string
    pages: number
    format: string
    longDescription: string
    shortDescription: string
    amount: number
    price: number
    imageUrl: string
    isFavor: boolean
    resealeDate: Date
    authorNames: string[]
    genreNames: string[]
    publisherName: string
}