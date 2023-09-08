import React from "react";
import Header from "../../components/common/Header";
import Footer from "../../components/common/Footer";
import Banner from "../../components/home/banner/Banner";
import Category from "../../components/home/category/Category";
import TopProduct from "../../components/home/top_product/TopProduct";
import Testimonial from "../../components/home/testimonial/Testimonial";
import Blog from "../../components/home/blog/Blog";

import "../../style/main.scss";

const Home = () => {
  return (
    <div>
      <Header />
      <Banner />
      <Category />
      <TopProduct />
      <Testimonial />
      <Blog />
      <Footer />
    </div>
  );
};

export default Home;
