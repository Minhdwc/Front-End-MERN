import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import authorizedAxiosInstance from "@/ultils/authorAxios";
import { UserInterface, UserData } from "@/store/model/user";

interface UserState {
  userInfo: {
    data: UserData | null;
    loading: boolean;
    error: string | null;
  };
}

const initialState: UserState = {
  userInfo: {
    data: null,
    loading: false,
    error: null,
  },
};

export const getUsers = createAsyncThunk<UserData, void, { rejectValue: string }>(
  "user/getUserProfile",
  async (_, { rejectWithValue }) => {
    try {
      const response = await authorizedAxiosInstance.get('/auth/profile');
      return response.data as UserData;
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
      state.userInfo = {
        data: null,
        loading: false,
        error: null,
      };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getUsers.pending, (state) => {
        state.userInfo.loading = true;
        state.userInfo.error = null;
      })
      .addCase(getUsers.fulfilled, (state, action: PayloadAction<UserData>) => {
        state.userInfo.loading = false;
        state.userInfo.data = action.payload;
        state.userInfo.error = null;
      })
      .addCase(getUsers.rejected, (state, action) => {
        state.userInfo.loading = false;
        state.userInfo.error = action.payload || "Failed to fetch user profile";
      });
  }
});

export const { clearUser } = userSlice.actions;
export default userSlice.reducer;