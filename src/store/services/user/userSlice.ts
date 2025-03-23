import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import authorizedAxiosInstance from "@/ultils/authorAxios";
import { UserInterface } from "@/store/model/user";

interface UserState {
  userInfo: UserInterface | null;
  loading: boolean;
  error: string | null;
}

const initialState: UserState = {
  userInfo: null,
  loading: false,
  error: null,
};

export const getUsers = createAsyncThunk<UserInterface, void, { rejectValue: string }>(
  "user/getUserProfile",
  async (_, { rejectWithValue }) => {
    try {
      const response = await authorizedAxiosInstance.get('/auth/profile');
      return response.data as UserInterface;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || "An error occurred");
    }
  }
);

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    clearUser: (state) => {
      state.userInfo = null;
      state.error = null;
      state.loading = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getUsers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getUsers.fulfilled, (state, action: PayloadAction<UserInterface>) => {
        state.loading = false;
        state.userInfo = action.payload;
      })
      .addCase(getUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to fetch user profile";
      });
  }
});

export const { clearUser } = userSlice.actions;
export default userSlice.reducer;