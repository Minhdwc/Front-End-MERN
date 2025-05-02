import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import authorizedAxiosInstance from "@/ultils/authorAxios";
import { ProductInterface } from "@/store/model/product";

interface ProductResponse{
    status: string;
    data: ProductInterface[];
    message: string;
}

interface ProductState{
    products: ProductResponse;
    productInfo: ProductInterface | null;
    loading: boolean;
    error: string | null
}

const initialState: ProductState={
    products:{
        status:"",
        data:[],
        message:""
    },
    productInfo: null,
    loading: false,
    error: null
}

export const getAllProduct = createAsyncThunk<ProductResponse, void,{rejectValue: string}>("fetchAllProduct", async(_,{rejectWithValue})=>{
    try{
        const response = await authorizedAxiosInstance.get("/product/get/all")
        return response as ProductResponse;
    }catch(error:any){
        return rejectWithValue(error.response?.data?.message || "An error occurred")
    }
})

const productSlice = createSlice({
    name:"product",
    initialState,
    reducers:{},
    extraReducers: (builder)=>{
        builder
        .addCase(getAllProduct.pending, (state)=>{
            state.loading = true;
            state.error = null;
        })
        .addCase(getAllProduct.fulfilled, (state, acction: PayloadAction<ProductResponse>)=>{
            state.loading = false;
            state.products = acction.payload;
        })
        .addCase(getAllProduct.rejected,(state, action)=>{
            state.loading = false;
            state.error = action.payload || "Failed to fetch product data"
        })
    }
})

export default productSlice.reducer