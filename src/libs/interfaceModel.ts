export interface IAppointment{
    _id: string;
    petId: string;
    service: string;
    timeStamp: Date;
    status: string;
}

export interface ICartItem{
    idPet: string;
    idProduct: string;
    quantity: number;
    price: number;
    totalPrice: number;
    image: string
}

export interface ICart{
    item: ICartItem[];
    userId: string;
    timeStamp: Date
}
export interface ICategory{
    _id: string;
    name: string;
    decription: string;
    typeOf: string;
}

export interface INotification{
    _id: string;
    userId: string;
    message: string;
    isRead: boolean;
    timeStamp: Date;
}

export interface IDelivery_locationOrder{
    city: string;
    district: string;
    street: string;
    number_house: string;
}

export interface IItemOrder{
    itemId: string;
    quantity: number;
    price: number;
}

export interface IOrder{
    total: number;
    quantity: number;
    delivery_location: IDelivery_locationOrder;
    status: string;
    item: IItemOrder[];
    timeStamp: Date
}

export interface ISize{
    height: number;
    width: number;
    weight: number;
}

export interface IPet{
    _id: string;
    name: string;
    generic: string;
    categoryId: string;
    gender: string;
    size: ISize;
    color: string;
    image: string
}

export interface IProduct{
    _id: string;
    name: string;
    price: number;
    stock: number;
    description: string;
    categoryId: string
}

export interface IReview{
    _id: string;
    userId: string;
    itemId: string;
    comment: string;
    timeStamp: Date;
}

export interface IUser{
    _id: string;
    name: string;
    dateOfBirth: Date;
    email: string;
    password: string;
    role: string;
    image: string;
}