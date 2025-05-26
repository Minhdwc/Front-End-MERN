import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

interface CartItem {
    id: string;
    productId: string;
    name: string;
    price: number;
    quantity: number;
    image: string;
}

interface OrderState {
    items: CartItem[];
    totalAmount: number;
    loading: boolean;
    error: string | null;
}

const initialState: OrderState = {
    items: [],
    totalAmount: 0,
    loading: false,
    error: null,
};

export const fetchOrderFromCart = createAsyncThunk(
    'order/fetchFromCart',
    async (_, { rejectWithValue }) => {
        try {
            const response = await axios.get('/api/order/from-cart');
            return response.data;
        } catch (error: any) {
            return rejectWithValue(error.response?.data?.message || 'Failed to fetch order data');
        }
    }
);

export const createOrder = createAsyncThunk(
    'order/create',
    async (_, { rejectWithValue }) => {
        try {
            const response = await axios.post('/api/order/create');
            return response.data;
        } catch (error: any) {
            return rejectWithValue(error.response?.data?.message || 'Failed to create order');
        }
    }
);

const orderSlice = createSlice({
    name: 'order',
    initialState,
    reducers: {
        clearOrder: (state) => {
            state.items = [];
            state.totalAmount = 0;
            state.error = null;
        },
    },
    extraReducers: (builder) => {
        builder
            // Fetch order from cart
            .addCase(fetchOrderFromCart.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchOrderFromCart.fulfilled, (state, action) => {
                state.loading = false;
                state.items = action.payload.items;
                state.totalAmount = action.payload.totalAmount;
            })
            .addCase(fetchOrderFromCart.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })
            // Create order
            .addCase(createOrder.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(createOrder.fulfilled, (state) => {
                state.loading = false;
                state.items = [];
                state.totalAmount = 0;
            })
            .addCase(createOrder.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            });
    },
});

export const { clearOrder } = orderSlice.actions;
export default orderSlice.reducer; 