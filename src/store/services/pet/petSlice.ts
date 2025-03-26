import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import authorizedAxiosInstance from "@/ultils/authorAxios";
import { PetInterface } from "@/store/model/pet";

interface UserState {
  petInfo: PetInterface | null;
  loading: boolean;
  error: string | null;
}

const initialState: UserState = {
  petInfo: null,
  loading: false,
  error: null,
};

export const getAllPet = createAsyncThunk<PetInterface, void, { rejectValue: string }>(
    "pet/get/all",
    async (_, { rejectWithValue }) => {
      try {
        const response = await authorizedAxiosInstance.get('/auth/profile');
        return response.data as PetInterface;
      } catch (error: any) {
        return rejectWithValue(error.response?.data?.message || "An error occurred");
      }
    }
  );
export const petSlice = createSlice({
    name: 'pet',
    initialState,
    reducers:{},
    extraReducers:(builder)=>{
        builder
        .addCase(getAllPet.pending, (state)=>{
            state.loading = true;
            state.error = null;
        })
        .addCase(getAllPet.fulfilled, (state, action: PayloadAction<PetInterface>)=>{
            state.loading = false;
            state.petInfo = action.payload;
        })
        .addCase(getAllPet.rejected, (state, action)=>{
            state.loading = false;
            state.error = action.payload || "Failed to fetch pet data"
        })
    }
})
export default petSlice.reducer