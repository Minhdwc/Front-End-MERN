import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import authorizedAxiosInstance from "@/ultils/authorAxios";
import { UserInterface } from "@/store/model/user";

interface UserState{
    userInfo: UserInterface | null,
    loading: boolean,
    error: string | null,
}

const initialState: UserState={
    userInfo: null,
    loading: false,
    error: null
}

const getUsers = createAsyncThunk("user", async()=>{

})

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers:{}
})
