import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import ProductCard from "../components/ProductCard";
import {
  getAllProducts,
  getFilterCategory,
} from "../store/slices/products.slice";
import {
  ascendingProducts,
  descendingProducts,
} from "../store/slices/products.slice";
import "./css/Home.css";

const Home = () => {
  const products = useSelector((state) => state.productsSlice);
  const [inputValue, setInputValue] = useState("");
  const [filterText, setFilterText] = useState();
  const [categories, setCaregories] = useState();
  const [filterByPrice, setFilterByPrice] = useState({
    from: 0,
    to: Infinity,
  });
  const [isShowFilters, setIsShowFilters] = useState(false);
  const dispatch = useDispatch();

  const hanleChange = (e) => {
    setInputValue(e.target.value);
  };
  useEffect(() => {
    if (inputValue !== "" && products) {
      setFilterText(
        products.filter((product) =>
          product.title.toLowerCase().includes(inputValue.toLowerCase().trim())
        )
      );
    } else {
      setFilterText(products);
    }
  }, [inputValue, products]);

  useEffect(() => {
    axios
      .get("https://e-commerce-api.academlo.tech/api/v1/products/categories")
      .then((res) => setCaregories(res.data.data.categories))
      .catch((error) => console.log(error));
  }, []);

  const handleCategory = (id) => {
    id ? dispatch(getFilterCategory(id)) : dispatch(getAllProducts());
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const from = Number(e.target.from.value);
    const to = Number(e.target.to.value);
    const obj = {
      from: from,
      to: to !== 0 ? to : Infinity,
    };
    setFilterByPrice(obj);
  };
  const callbackFilterPrice = (product) => {
    return (
      Number(product.price) >= filterByPrice.from &&
      Number(product.price) <= filterByPrice.to
    );
  };
  return (
    <div className="home">
      <header>
        <form
          className="input"
          onSubmit={(e) => {
            e.preventDefault();
          }}
        >
          <input
            type="text"
            id="input"
            placeholder="Search . . ."
            onChange={hanleChange}
            value={inputValue}
          />
          <button>
            <i className="bx bx-search-alt-2"></i>
          </button>
        </form>
      </header>
      <p
        className={`btn-filters ${isShowFilters ? "show" : ""}`}
        onClick={() => setIsShowFilters(!isShowFilters)}
      >
        Filters
      </p>
      <section className="main">
        <div className={`filters ${isShowFilters ? "show" : ""}`}>
          <p>FILTERS</p>
          <p className="x" onClick={() => setIsShowFilters(!isShowFilters)}>
            X
          </p>
          <section className="price">
            <p>Price</p>
            <form className="frm-price" onSubmit={handleSubmit}>
              <input type="number" placeholder="From" id="from" />
              <input type="number" placeholder="To" id="to" />
              <button>
                <small>Filter price</small>
              </button>
            </form>
          </section>
          <section className="categories">
            <p>Categories</p>
            <ul>
              {categories?.map((item) => (
                <li key={item.id} onClick={() => handleCategory(item.id)}>
                  <small>{item.name}</small>
                </li>
              ))}
              <li>
                <small onClick={() => handleCategory()}>All</small>
              </li>
            </ul>
          </section>
          <section className="order">
            <p>Order</p>
            <ul>
              <button onClick={() => dispatch(ascendingProducts())}>
                <small>Ascending ⬆</small>
              </button>

              <button onClick={() => dispatch(descendingProducts())}>
                <small>descending ⬇</small>
              </button>
            </ul>
          </section>
        </div>
        <div className="card-container flex-galery">
          {filterText?.filter(callbackFilterPrice).map((item) => (
            <ProductCard key={item.id} product={item} />
          ))}
        </div>
      </section>
    </div>
  );
};
export default Home;
