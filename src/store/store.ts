import { configureStore } from '@reduxjs/toolkit'
import userReducer from "@/store/services/user/userSlice"
import categoryReducer from "@/store/services/category/categorySlice"

export const store = configureStore({
    reducer:{
        user: userReducer,
        category: categoryReducer
    }
})

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch