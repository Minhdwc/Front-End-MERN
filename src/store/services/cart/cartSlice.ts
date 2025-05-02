import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import authorizedAxiosInstance from "@/ultils/authorAxios";
import { CartInterface, ItemCartInteface } from "@/store/model/cart";
import { PetInterface } from "@/store/model/pet";
import { persistor } from "@/store/store";
import { FoodInterface } from "@/store/model/food";
import { AccessoryInterface } from "@/store/model/accessory";

interface CartState {
  cart: CartInterface | null;
  loading: boolean;
  error: string | null;
}

const initialState: CartState = {
  cart: null,
  loading: false,
  error: null,
};

export const getCartByUserId = createAsyncThunk<CartInterface, string>(
  "cart/fetch",
  async (userId, { rejectWithValue }) => {
    try {
      const response = await authorizedAxiosInstance.get(
        `/cart/get/c=${userId}`
      );
      const userCart = response.data?.data?.[0] as CartInterface;
      if (!userCart) throw new Error("Cart not found");
      return userCart;
    } catch {
      return rejectWithValue("Failed");
    }
  }
);

export const addItemToCart = createAsyncThunk<
  CartInterface,
  {
    userId: string;
    pet?: PetInterface;
    food?: FoodInterface;
    accessory?: AccessoryInterface;
  }
>(
  "cart/addItemToCart",
  async ({ userId, pet, food, accessory }, { rejectWithValue }) => {
    try {
      const res = await authorizedAxiosInstance.get(`/cart/get/c=${userId}`);
      const userCart = res.data?.data?.[0] as CartInterface;

      let cartItemUpdate: ItemCartInteface[] = userCart?.item
        ? [...userCart.item]
        : [];

      const pushItem = (
        type: "Pet" | "Food" | "Accessory",
        data: { _id?: string; price?: number }
      ) => {
        if (!data._id || data.price === undefined) {
          throw new Error(`${type} item missing _id or price`);
        }

        const index = cartItemUpdate.findIndex(
          (item) =>
            item.itemType === type &&
            item.itemId?.toString() === data._id?.toString()
        );

        if (index > -1) {
          cartItemUpdate[index].quantity += 1;
          cartItemUpdate[index].totalPrice += data.price;
        } else {
          cartItemUpdate.push({
            itemType: type,
            itemId: data._id,
            quantity: 1,
            price: data.price,
            totalPrice: data.price,
          });
        }
      };

      if (pet) {
        pushItem("Pet", pet);
      } else if (food) {
        pushItem("Food", food);
      } else if (accessory) {
        pushItem("Accessory", accessory);
      } else {
        throw new Error("No valid item to add");
      }

      const payload = { item: cartItemUpdate };

      if (userCart && userCart._id) {
        const response = await authorizedAxiosInstance.post(
          `/cart/update/u=${userId}`,
          payload
        );
        return response.data as CartInterface;
      } else {
        const createResponse = await authorizedAxiosInstance.post(
          "/cart/create",
          { ...payload, userId }
        );
        return createResponse.data as CartInterface;
      }
    } catch (err: any) {
      return rejectWithValue("Failed to add item to cart");
    }
  }
);

export const deleteCart = createAsyncThunk<CartInterface, { id: string }>(
  "cart/delete",
  async ({ id }, { rejectWithValue }) => {
    try {
      const response = await authorizedAxiosInstance.delete(
        `/cart/delete/d=${id}`
      );
      if (response.data?.status === "Deleted") {
        persistor.purge();
        return response.data?.cart as CartInterface;
      }
      throw new Error("Failed to delete cart");
    } catch (error: any) {
      console.error(error);
      return rejectWithValue("Failed to delete cart item");
    }
  }
);

export const increaseQuantity = createAsyncThunk<
  CartInterface,
  { userId: string; id: string; itemType: "Pet" | "Food" | "Accessory" }
>("cart/increase", async ({ userId, id, itemType }, { rejectWithValue }) => {
  try {
    const res = await authorizedAxiosInstance.get(`/cart/get/c=${userId}`);
    const userCart = res.data?.data?.[0] as CartInterface;
    if (!userCart) throw new Error("Cart not found");

    const updatedItems = userCart.item.map((item) => {
      const match =
        item.itemType === itemType && item.itemId?.toString() === id;
      if (match) {
        return {
          ...item,
          quantity: item.quantity + 1,
          totalPrice: item.totalPrice + item.price,
        };
      }
      return item;
    });

    const response = await authorizedAxiosInstance.post(
      `/cart/update/u=${userId}`,
      { item: updatedItems }
    );
    return response.data as CartInterface;
  } catch (err: any) {
    return rejectWithValue("Failed to increase quantity");
  }
});

export const decreaseQuantity = createAsyncThunk<
  CartInterface,
  { userId: string; id: string; itemType: "Pet" | "Food" | "Accessory" }
>("cart/decrease", async ({ userId, id, itemType }, { rejectWithValue }) => {
  try {
    const res = await authorizedAxiosInstance.get(`/cart/get/c=${userId}`);
    const userCart = res.data?.data?.[0] as CartInterface;
    if (!userCart) throw new Error("Cart not found");

    const updatedItems = userCart.item.map((item) => {
      const match =
        item.itemType === itemType && item.itemId?.toString() === id;
      if (match && item.quantity > 1) {
        return {
          ...item,
          quantity: item.quantity - 1,
          totalPrice: item.totalPrice - item.price,
        };
      }
      return item;
    });

    const response = await authorizedAxiosInstance.post(
      `/cart/update/u=${userId}`,
      { item: updatedItems }
    );
    return response.data as CartInterface;
  } catch (err: any) {
    return rejectWithValue("Failed to decrease quantity");
  }
});

export const deleteItemInCart = createAsyncThunk<
  CartInterface,
  { userId: string; id: string; itemType: "Pet" | "Food" | "Accessory" }
>("cart/deleteItem", async ({ userId, id, itemType }, { rejectWithValue }) => {
  try {
    const res = await authorizedAxiosInstance.get(`/cart/get/c=${userId}`);
    const userCart = res.data?.data?.[0] as CartInterface;
    if (!userCart) throw new Error("Cart not found");

    const updatedItems = userCart.item.filter(
      (item) => item.itemType !== itemType || item.itemId?.toString() !== id
    );

    const response = await authorizedAxiosInstance.post(
      `/cart/update/u=${userId}`,
      { item: updatedItems }
    );
    return response.data as CartInterface;
  } catch (err: any) {
    return rejectWithValue("Failed to delete item");
  }
});

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    clearCart(state) {
      state.cart = null;
      state.loading = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getCartByUserId.pending, (state) => {
        state.loading = true;
      })
      .addCase(getCartByUserId.fulfilled, (state, action) => {
        state.loading = false;
        state.cart = action.payload;
        state.error = null;
      })
      .addCase(getCartByUserId.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      .addCase(addItemToCart.pending, (state) => {
        state.loading = true;
      })
      .addCase(addItemToCart.fulfilled, (state, action) => {
        state.loading = false;
        state.cart = action.payload || { item: [], userId: "" };
        state.error = null;
      })
      .addCase(addItemToCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      .addCase(increaseQuantity.fulfilled, (state, action) => {
        state.cart = action.payload;
      })
      .addCase(decreaseQuantity.fulfilled, (state, action) => {
        state.cart = action.payload;
      })
      .addCase(deleteItemInCart.fulfilled, (state, action) => {
        state.cart = action.payload;
      })
      .addCase(deleteCart.fulfilled, (state, action) => {
        state.cart = null;
        state.loading = false;
        state.error = null;
      })
      .addCase(deleteCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { clearCart } = cartSlice.actions;
export default cartSlice.reducer;
