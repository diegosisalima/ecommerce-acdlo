import React, { useState } from "react";
import "./css/Slider.css";

const Slider = ({ product, sliderIndex, setSliderIndex }) => {
  const styleBorder = {
    border: "3px solid #3f3e3e",
  };
  return (
    <section className="slider">
      <div className="static">
        <div
          className="move"
          style={{
            transform: `translateX(calc(-${sliderIndex} / 3 * 100%))`,
          }}
        >
          <div className="img-primary">
            <img src={product?.productImgs[0]} alt="" />
          </div>
          <div className="img-primary">
            <img src={product?.productImgs[1]} alt="" />
          </div>
          <div className="img-primary">
            <img src={product?.productImgs[2]} alt="" />
          </div>
        </div>
      </div>
      <div className="imgs-list-container">
        <div
          className="img-item"
          onClick={() => setSliderIndex(0)}
          style={sliderIndex === 0 ? styleBorder : {}}
        >
          <img src={product?.productImgs[0]} alt="" />
        </div>
        <div
          className="img-item"
          onClick={() => setSliderIndex(3)}
          style={sliderIndex === 3 ? styleBorder : {}}
        >
          <img src={product?.productImgs[1]} alt="" />
        </div>
        <div
          className="img-item"
          onClick={() => setSliderIndex(6)}
          style={sliderIndex === 6 ? styleBorder : {}}
        >
          <img src={product?.productImgs[2]} alt="" />
        </div>
      </div>
    </section>
  );
};

export default Slider;
