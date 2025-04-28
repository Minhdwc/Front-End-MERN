export interface ItemCartInteface{
    idPet: string | null;
    idProduct: string | null;
    quantity: number;
    price: number;
    totalPrice: number;
}

export interface CartInterface{
    item:ItemCartInteface[];
    userId: string;
}