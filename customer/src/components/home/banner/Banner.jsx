import React, { useState } from "react";
import { IoIosArrowDropleft, IoIosArrowDropright } from "react-icons/io";
// import WestOutlinedIcon from "@mui/icons-material/WestOutlined";
// import "./banner.scss";

const Banner = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const data = [
    "../images/banner/b1.png",
    "../images/banner/b2.png",
    "../images/banner/b3.png",
  ];

  const prevSlide = () => {
    setCurrentSlide(currentSlide === 0 ? 2 : (prev) => prev - 1);
  };
  const nextSlide = () => {
    setCurrentSlide(currentSlide === 2 ? 0 : (prev) => prev + 1);
  };

  return (
    <div className="slider">
      <div
        className="container"
        style={{ transform: `translateX(-${currentSlide * 100}vw)` }}
      >
        <img src={data[0]} alt="" />
        <img src={data[1]} alt="" />
        <img src={data[2]} alt="" />
      </div>
      <div className="icons">
        <div className="icon" onClick={prevSlide}>
          <IoIosArrowDropleft />
        </div>
        <div className="icon" onClick={nextSlide}>
          <IoIosArrowDropright />
        </div>
      </div>
    </div>
  );
};

export default Banner;
