import { Link } from "react-router-dom";
import react from "../assets/react.svg";
import "./css/Nav.css";
import SidebarCart from "./SidebarCart";
import { useState } from "react";

const Nav = () => {
  const [viewCart, setViewCart] = useState(false);

  const toggleView = () => setViewCart(!viewCart);

  return (
    <>
      <nav className="nav">
        <li className="logo">
          {/* <a href="#/">Enlace uno</a> */}
          <Link to="/">
            <i className="bx bxs-home-alt-2"></i>
          </Link>
        </li>
        <input type="checkbox" className="btn-check" id="menu-mobile" />
        <label htmlFor="menu-mobile" className="lbl-menu-draw"></label>
        <ul>
          <li>
            {/* <a href="#/">Enlace uno</a> */}
            <Link to="/">E-COMMERCE</Link>
          </li>
          <li>
            {/* <a href="#/">Enlace uno</a> */}
            <Link to="/purchases">purchases</Link>
          </li>
          <li>
            {/* <a href="#/">Enlace uno</a> */}
            <Link to="/login">account</Link>
          </li>
        </ul>

        <div className="icons">
          <li>
            {/* <a href="#/">Enlace uno</a> */}
            <Link onClick={toggleView}>
              <i className="bx bx-cart"></i>
            </Link>
          </li>
        </div>
      </nav>
      <SidebarCart viewCart={viewCart} />
    </>
  );
};
export default Nav;
