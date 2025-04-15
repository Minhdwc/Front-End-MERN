import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import authorizedAxiosInstance from "@/ultils/authorAxios";
import { categoryInterface } from "@/store/model/category";

interface CategoryState {
  petCategories: categoryInterface[];
  foodCategories: categoryInterface[];
  accessoryCategories: categoryInterface[];
  loading: boolean;
  error: string | null;
}

const initialState: CategoryState = {
  petCategories: [],
  foodCategories: [],
  accessoryCategories: [],
  loading: false,
  error: null,
};

const fetchCategoryByType = async (type: string) => {
  const response = await authorizedAxiosInstance.get(
    `/api/v1/category/get/type/t=${type}`
  );
  return response.data as categoryInterface[];
};

export const fetchPetCategories = createAsyncThunk<
  categoryInterface[],
  void,
  { rejectValue: string }
>("category/fetchPetCategories", async (_, { rejectWithValue }) => {
  try {
    return await fetchCategoryByType("Pet");
  } catch (error: any) {
    return rejectWithValue(
      error.response?.data?.message || "Failed to fetch Pet categories"
    );
  }
});

export const fetchFoodCategories = createAsyncThunk<
  categoryInterface[],
  void,
  { rejectValue: string }
>("category/fetchFoodCategories", async (_, { rejectWithValue }) => {
  try {
    return await fetchCategoryByType("Food");
  } catch (error: any) {
    return rejectWithValue(
      error.response?.data?.message || "Failed to fetch Food categories"
    );
  }
});

export const fetchAccessoryCategories = createAsyncThunk<
  categoryInterface[],
  void,
  { rejectValue: string }
>("category/fetchAccessoryCategories", async (_, { rejectWithValue }) => {
  try {
    return await fetchCategoryByType("Assessory");
  } catch (error: any) {
    return rejectWithValue(
      error.response?.data?.message || "Failed to fetch Accessory categories"
    );
  }
});

const categorySlice = createSlice({
  name: "category",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPetCategories.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        fetchPetCategories.fulfilled,
        (state, action: PayloadAction<categoryInterface[]>) => {
          state.loading = false;
          state.petCategories = action.payload;
        }
      )
      .addCase(fetchPetCategories.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to fetch Pet categories";
      });

    builder
      .addCase(fetchFoodCategories.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        fetchFoodCategories.fulfilled,
        (state, action: PayloadAction<categoryInterface[]>) => {
          state.loading = false;
          state.foodCategories = action.payload;
        }
      )
      .addCase(fetchFoodCategories.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to fetch Food categories";
      });

    builder
      .addCase(fetchAccessoryCategories.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        fetchAccessoryCategories.fulfilled,
        (state, action: PayloadAction<categoryInterface[]>) => {
          state.loading = false;
          state.accessoryCategories = action.payload;
        }
      )
      .addCase(fetchAccessoryCategories.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to fetch Accessory categories";
      });
  },
});

export default categorySlice.reducer;
