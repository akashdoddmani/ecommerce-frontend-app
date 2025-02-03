import { Middleware } from "@reduxjs/toolkit";

export const localStorageMiddleware: Middleware =
  (storeAPI) => (next) => (action) => {
    const result = next(action);
    if (typeof window !== "undefined") {
      const state = storeAPI.getState();
      localStorage.setItem("cart", JSON.stringify(state.cart.items));
    }
    return result;
  };
