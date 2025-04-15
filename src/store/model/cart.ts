export interface ItemCartInteface{
    idPet: String;
    idProduct: String;
    quantity: Number;
    price: Number;
    totalPrice: Number;
    image: String
}

export interface CartInterface{
    item:ItemCartInteface[];
    userId: String;
}