import React from "react";
import Heading from "../../components/common/Heading";
import { blog } from "../../components/assets/data/data";
import Header from "../../components/common/Header";
import Footer from "../../components/common/Footer";

const Blog = () => {
  return (
    <>
      <Header />
      <section className="blog">
        <Heading title="BÀI VIẾT" desc="" />

        <div className="posts">
          {blog.slice(0, 6).map((items) => (
            <div className="post" key={items.id}>
              <div className="content">
                <div className="img">
                  <img src={items.cover} alt="" />
                </div>
                <div className="text">
                  <h3>{items.title.slice(0, 42)}...</h3>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
      <Footer />
    </>
  );
};
export default Blog;
