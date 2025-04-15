import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import authorizedAxiosInstance from "@/ultils/authorAxios";
import { PetInterface } from "@/store/model/pet";

interface PetResponse {
  status: string;
  data: PetInterface[];
  total: number;
  totalPages: number | null;
  message: string;
}

interface PetState {
  pets: PetResponse;
  petInfo: PetInterface | null;
  loading: boolean;
  error: string | null;
}

const initialState: PetState = {
  pets: {
    status: "",
    data: [],
    total: 0,
    totalPages: null,
    message: "",
  },
  petInfo: null,
  loading: false,
  error: null,
};

export const getAllPet = createAsyncThunk<
  PetResponse,
  void,
  { rejectValue: string }
>("fetchAllPet", async (_, { rejectWithValue }) => {
  try {
    const response = await authorizedAxiosInstance.get("/pet/get/all");
    return response.data as PetResponse;
  } catch (error: any) {
    return rejectWithValue(error.response?.data?.message || "An error occurred");
  }
});

const petSlice = createSlice({
  name: "pet",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllPet.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllPet.fulfilled, (state, action: PayloadAction<PetResponse>) => {
        state.loading = false;
        state.pets = action.payload;
      })
      .addCase(getAllPet.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to fetch pet data";
      });
  },
});

export default petSlice.reducer;
