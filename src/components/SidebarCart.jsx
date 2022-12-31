import React, { useState, useEffect } from "react";
import "./css/SidebarCart.css";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import getConfig from "../utils/getConfig";
import { getUserCart, setCart } from "../store/slices/cart.slice";

const SidebarCart = ({ viewCart }) => {
  const cart = useSelector((state) => state.cartSlice);
  const dispatch = useDispatch();
  console.log(cart);
  const navigate = useNavigate();
  const [total, setTotal] = useState(0);
  const removeItem = (id) => {
    axios
      .delete(
        `https://e-commerce-api.academlo.tech/api/v1/cart/${id}`,
        getConfig()
      )
      .then((res) => {
        res.data;
        dispatch(getUserCart());
      })
      .catch((error) => console.log(error));
  };
  const checkout = () => {
    const data = {
      street: "Green St. 1456",
      colony: "Southwest",
      zipCode: 12345,
      city: "USA",
      references: "Some references",
    };
    axios
      .post(
        "https://e-commerce-api.academlo.tech/api/v1/purchases",
        data,
        getConfig()
      )
      .then((res) => {
        console.log(res.data);
        dispatch(setCart(null));
        setTotal(0);
      })
      .catch((error) => console.log(error));
  };
  useEffect(() => {
    if (cart) {
      const result = cart.reduce((ac, item) => {
        return ac + Number(item.price) * item.productsInCart.quantity;
      }, 0);
      setTotal(result);
    }
  }, [cart]);
  return (
    <div className={`cart ${viewCart ? "show" : "hide"}`}>
      <h2 className="title">My cart</h2>
      <ul className="products-info">
        {cart?.map((product) => (
          <li className="product-item" key={product.id}>
            <section className="header">
              <small
                className="product"
                onClick={() => navigate(`/product/${product.id}`)}
              >
                <i className="bx bx-link-alt"> </i>
                {" " + product.title} <br />
              </small>
              <i
                className="bx bxs-trash"
                title="remove"
                onClick={() => removeItem(product.id)}
              ></i>
            </section>
            <section className="footer">
              <small className="units">
                {product.productsInCart.quantity} | <small>Units</small>
              </small>
              <div className="total">
                <small className="lbl">Total item</small>
                <small className="total-item">
                  ${product.price * product.productsInCart.quantity}
                </small>
              </div>
            </section>
          </li>
        ))}
      </ul>
      <section>
        <div className="total-cart-container">
          <p>Total:</p>
          <p className="total-cart">${total}</p>
        </div>
        <button className="checkout" onClick={checkout}>
          Checkout ◽ ${total}
        </button>
      </section>
    </div>
  );
};

export default SidebarCart;
