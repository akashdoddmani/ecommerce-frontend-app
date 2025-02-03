import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type UserPreferencesState = {
  sortBy: "price" | "rating";
  categoryFilter: string;
};

const initialState: UserPreferencesState = {
  sortBy: "price",
  categoryFilter: "",
};

const userPreferencesSlice = createSlice({
  name: "userPreferences",
  initialState,
  reducers: {
    setSortBy: (state, action: PayloadAction<"price" | "rating">) => {
      state.sortBy = action.payload;
    },
    setCategoryFilter: (state, action: PayloadAction<string>) => {
      state.categoryFilter = action.payload;
    },
  },
});

export const { setSortBy, setCategoryFilter } = userPreferencesSlice.actions;
export default userPreferencesSlice.reducer;
