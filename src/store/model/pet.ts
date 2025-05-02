export interface PetInterface {
    _id: string;
    name: string;
    generic: string;
    categoryId: string;
    gender: string;
    size: {
      height: number;
      width: number;
      weight: number;
    };
    color: string;
    image: string;
    price: number;
    Model_Url_3D: string;
    createAt: string;
}
