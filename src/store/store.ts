import { configureStore, combineReducers } from '@reduxjs/toolkit'
import userReducer from "@/store/services/user/userSlice"
import categoryReducer from "@/store/services/category/categorySlice"
import petReducer from "@/store/services/pet/petSlice"
import storage from 'redux-persist/lib/storage' 
import { persistReducer, persistStore } from 'redux-persist'

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['user']
}

const rootReducer = combineReducers({
  user: userReducer,
  category: categoryReducer,
  pet: petReducer
})

const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = configureStore({
  reducer: persistedReducer
})

export const persistor = persistStore(store)

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
