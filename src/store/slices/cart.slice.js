import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import getConfig from "../../utils/getConfig";

const cartSlice = createSlice({
  name: "Cart",
  initialState: null,
  reducers: {
    setCart: (state, action) => action.payload,
  },
});
export const { setCart } = cartSlice.actions;
export default cartSlice.reducer;
export const getUserCart = () => (dispatch) => {
  axios
    .get("https://e-commerce-api.academlo.tech/api/v1/cart", getConfig())
    .then((res) => dispatch(setCart(res.data.data.cart.products)))
    .catch((error) => console.log(error));
};
