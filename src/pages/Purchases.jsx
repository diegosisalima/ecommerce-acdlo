import React, { useEffect, useState } from "react";
import "./css/Purchases.css";
import axios from "axios";
import getConfig from "../utils/getConfig";
const Purchases = () => {
  const [purchases, setPurchases] = useState();
  useEffect(() => {
    axios
      .get("https://e-commerce-api.academlo.tech/api/v1/purchases", getConfig())
      .then((res) => setPurchases(res.data.data.purchases))
      .catch((error) => console.log(error));
  }, []);
  console.log(purchases);
  return (
    <div className="purchases mx-wd-container">
      <h2>My Purchases</h2>
      <ul>
        {purchases?.map((item) => (
          <li className="item" key={item.id}>
            <p className="date">{item.createdAt}</p>
            {item.cart.products.map((product) => (
              <section className="description" key={product.id}>
                <small className="name">{product.title}</small>
                <small>{product.productsInCart.quantity}</small>
                <small className="price">
                  $ {product.price * product.productsInCart.quantity}
                </small>
              </section>
            ))}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Purchases;
