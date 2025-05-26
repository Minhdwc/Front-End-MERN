export interface UserData {
  data: {
    _id: string;
    name: string;
    dateOfBirth: Date;
    email: string;
    password: string;
    role: string;
    image: string;
  };
}

export interface UserInterface {
  userInfo: {
    data: UserData;
    loading?: boolean;
    error?: string | null;
  };
}
