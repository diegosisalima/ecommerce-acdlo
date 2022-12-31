import React from "react";
import "./css/Login.css";
import { useForm } from "react-hook-form";
import axios from "axios";

const Login = () => {
  const { handleSubmit, register, reset } = useForm();
  const submit = (data) => {
    axios
      .post("https://e-commerce-api.academlo.tech/api/v1/users/login", data)
      .then((res) => {
        console.log(res.data.data);
        localStorage.setItem("token", res.data.data.token);
      })
      .catch((err) => console.log(err));
    reset({
      email: "",
      password: "",
    });
  };
  if (localStorage.getItem("token")) {
    return (
      <div className="user">
        <h1>User ✔</h1>
        <p>Logout</p>
      </div>
    );
  }
  return (
    <div className="login-container">
      <div className="login">
        <h2>LOGIN</h2>
        <small>Please enter your e-mail and password</small>
        <form onSubmit={handleSubmit(submit)}>
          <input
            type="text"
            placeholder="Email"
            required
            {...register("email")}
          />
          <input
            type="password"
            placeholder="Password"
            required
            {...register("password")}
          />
          <button>LOGIN</button>
        </form>
      </div>
    </div>
  );
};

export default Login;
