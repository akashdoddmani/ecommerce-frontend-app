import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type Product = {
  id: number;
  title: string;
  price: number;
  images: string[];
  rating: number;
  discountPercentage: number;
};

type ProductsState = {
  products: Product[];
  categories: string[];
  totalProducts: number;
};

const initialState: ProductsState = {
  products: [],
  categories: [],
  totalProducts: 194,
};

const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    setProducts: (state, action: PayloadAction<Product[]>) => {
      state.products = action.payload;
    },
    sortByPrice: (state) => {
      state.products.sort((a, b) => a.price - b.price);
    },
    sortByRating: (state) => {
      state.products.sort((a, b) => b.rating - a.rating);
    },
    setCategories: (state, action: PayloadAction<string[]>) => {
      state.categories = action.payload;
    },
    setTotalProducts: (state, action: PayloadAction<number>) => {
      state.totalProducts = action.payload;
    },
  },
});

export const {
  setProducts,
  sortByPrice,
  sortByRating,
  setCategories,
  setTotalProducts,
} = productsSlice.actions;
export default productsSlice.reducer;
