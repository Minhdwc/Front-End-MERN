export interface PetInterface{
    name: string,
    generic: string,
    categoryId: string,
    gender: string,
    size: {
        height: number,
        width: number,
        weight: number
    },
    color: string,
    image: string
}