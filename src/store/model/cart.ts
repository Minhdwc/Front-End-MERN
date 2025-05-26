export interface ItemCartInteface {
    itemType: "Pet" | "Food" | "Accessory";
    itemId: string;
    quantity: number;
    price: number;
    totalPrice: number;
}

export interface CartInterface {
    _id?: string;
    item: ItemCartInteface[];
    userId: string;
    createdAt?: Date;
    updatedAt?: Date;
}