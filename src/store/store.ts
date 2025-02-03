import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "@/store/cartSlice";
import userPreferencesReducer from "@/store/userPreferencesSlice";
import productsReducer from "@/store/productsSlice";
import { apiSlice } from "@/store/apiSlice";
import { localStorageMiddleware } from "./localStorageMiddleware";
import { loadCartState } from "./localStorageUtils";

const preloadedState = {
  cart: {
    items: loadCartState() || [],
  },
};

export const store = configureStore({
  reducer: {
    cart: cartReducer,
    userPreferences: userPreferencesReducer,
    products: productsReducer,
    [apiSlice.reducerPath]: apiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware, localStorageMiddleware),
  preloadedState,
});

// Infer types for better TypeScript support
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
