import "./App.css";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { getAllProducts } from "./store/slices/products.slice";
import { getUserCart } from "./store/slices/cart.slice";
import ProductID from "./pages/ProductID";
import axios from "axios";
import Login from "./pages/Login";
import Nav from "./components/Nav";
import Purchases from "./pages/Purchases";

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllProducts());
    dispatch(getUserCart());
  }, []);

  useEffect(() => {
    const data = {
      firstName: "root",
      lastName: "root",
      email: "root_ds@hotmail.com",
      password: "root1234",
      phone: "9999999999",
      role: "admin",
    };
    axios
      .post("https://e-commerce-api.academlo.tech/api/v1/users", data)
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className="App">
      <Nav />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/product/:id" element={<ProductID />} />
        <Route path="/purchases" element={<Purchases />} />
      </Routes>
    </div>
  );
}

export default App;
