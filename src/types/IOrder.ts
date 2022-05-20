export interface IOrder {
    id: number
    address: string
    contactEmail: string
    contactName: string
    contactPhone: string
    delivery: {
        id: number,
        name: string
    }
    orderItem: [
        {
            amount: number
            book: {
                id: number
                title: string
                imageUrl: string
                price: number
            },
        }
    ]
    status: string
    sum: number
}