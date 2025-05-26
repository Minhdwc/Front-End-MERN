import {
  configureStore,
  combineReducers,
} from '@reduxjs/toolkit';
import userReducer from "@/store/services/user/userSlice";
import categoryReducer from "@/store/services/category/categorySlice";
import petReducer from "@/store/services/pet/petSlice";
import cartReducer from '@/store/services/cart/cartSlice';
import orderReducer from '@/store/model/orderSlice';
import storage from 'redux-persist/lib/storage';
import { persistReducer, persistStore } from 'redux-persist';

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['user', 'cart']
};

const rootReducer = combineReducers({
  user: userReducer,
  category: categoryReducer,
  pet: petReducer,
  cart: cartReducer,
  order: orderReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [
          'persist/PERSIST',
          'persist/REHYDRATE',
          'persist/PAUSE',
          'persist/FLUSH',
          'persist/PURGE',
          'persist/REGISTER',
        ],
      },
    }),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
