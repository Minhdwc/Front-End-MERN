export interface ItemCartInteface{
    itemType: "Pet" | "Food" | "Accessory";
    itemId: string;
    quantity: number;
    price: number;
    totalPrice: number;
}

export interface CartInterface{
    item:ItemCartInteface[];
    userId: string;
}