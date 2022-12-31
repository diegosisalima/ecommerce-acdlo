import "./css/ProductID.css";
import { React, useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useSelector } from "react-redux";
import ProductCard from "../components/ProductCard";
import Slider from "../components/Slider";
import getConfig from "../utils/getConfig";
import { getUserCart } from "../store/slices/cart.slice";
import { useDispatch } from "react-redux";

const ProductID = () => {
  const { id } = useParams();
  const [product, setproduct] = useState();
  const [counter, setCounter] = useState(1);
  const allproducts = useSelector((state) => state.productsSlice);
  const [similarProducts, setSimilarProducts] = useState();
  const [sliderIndex, setSliderIndex] = useState(0);
  const dispatch = useDispatch();
  useEffect(() => {
    axios
      .get(`https://e-commerce-api.academlo.tech/api/v1/products/${id}`)
      .then((res) => setproduct(res.data.data.product))
      .catch((err) => console.log(err));
    setSliderIndex(0);
  }, [id]);
  const counterLess = () => {
    if (counter - 1 > 0) {
      setCounter(counter - 1);
    }
  };
  useEffect(() => {
    if (allproducts && product) {
      setSimilarProducts(
        allproducts.filter((item) => item.category.name === product.category)
      );
    }
  }, [allproducts, product]);
  const addCart = (e) => {
    const data = {
      id: product.id,
      quantity: counter,
    };
    axios
      .post(
        "https://e-commerce-api.academlo.tech/api/v1/cart",
        data,
        getConfig()
      )
      .then((res) => {
        console.log(res.data), dispatch(getUserCart());
      })
      .catch((err) => console.log(err));
  };
  return (
    <div className="main-cotainer">
      <div className="product-info">
        <Slider
          product={product}
          sliderIndex={sliderIndex}
          setSliderIndex={setSliderIndex}
        />
        <section className="description">
          <h3>{product?.title}</h3>
          <small>{product?.description}</small>
          <small className="price">$ {product?.price}</small>
          <div className="btns-quantity">
            <button onClick={counterLess}>-</button> {counter}{" "}
            <button onClick={() => setCounter(counter + 1)}>+</button>
          </div>
          <button onClick={addCart}>ADD TO CART</button>
        </section>
      </div>
      <p className="subtitle">Discover similar items</p>
      <section className="similar-products flex-galery">
        {similarProducts?.map((item) => {
          if (item.title != product.title) {
            return <ProductCard key={item.id} product={item} />;
          }
        })}
      </section>
    </div>
  );
};

export default ProductID;
