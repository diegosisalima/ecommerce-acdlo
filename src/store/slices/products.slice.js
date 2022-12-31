import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const productsSlice = createSlice({
  name: "Products",
  initialState: null,
  reducers: {
    setProducts: (state, action) => action.payload,
    ascendingProducts: (state) => {
      state.sort((a, b) => Number(a.price) - Number(b.price));
    },
    descendingProducts: (state) => {
      state.sort((a, b) => Number(b.price) - Number(a.price));
    },
  },
});

export const { setProducts, ascendingProducts, descendingProducts } =
  productsSlice.actions;
export default productsSlice.reducer;
export const getAllProducts = () => (dispatch) => {
  axios
    .get("https://e-commerce-api.academlo.tech/api/v1/products")
    .then((res) => dispatch(setProducts(res.data.data.products)))
    .catch((err) => console.log(err));
};
export const getFilterCategory = (id) => (dispatch) => {
  axios
    .get(`https://e-commerce-api.academlo.tech/api/v1/products?category=${id}`)
    .then((res) => dispatch(setProducts(res.data.data.products)))
    .catch((err) => console.log(err));
};
