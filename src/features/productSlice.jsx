// Library
import { createSlice } from "@reduxjs/toolkit";

const productSlice = createSlice({
  name: "product",

  initialState: {
    products: null,
    "view-cart": null,
    search: null,
    isSearch: false,
  },
  reducers: {
    fetchStart: (state) => {
      state.loading = true;
      state.error = false;
    },
    getSuccess: (state, { payload: { data, url } }) => {
      state.loading = false;
      state[url] = data;
    },
    fetchFail: (state) => {
      state.loading = false;
      state.error = true;
    },
    changeSearch: (state, { payload }) => {
      state.isSearch = payload;
    },
  },
});

export const { fetchStart, getSuccess, fetchFail, changeSearch } =
productSlice.actions;
export default productSlice.reducer;
