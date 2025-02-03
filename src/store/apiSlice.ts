import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({ baseUrl: "https://dummyjson.com/" }),
  endpoints: (builder) => ({
    getProducts: builder.query({
      query: ({ skip = 0, category }: { skip?: number; category?: string }) =>
        `products${
          category ? `/category/${category}` : ""
        }?limit=12&skip=${skip}`,
    }),
    getProductDetails: builder.query({
      query: (id: string) => `products/${id}`,
    }),
    getCategories: builder.query({
      query: () => "products/category-list",
    }),
  }),
});

export const {
  useGetProductsQuery,
  useGetProductDetailsQuery,
  useGetCategoriesQuery,
} = apiSlice;
