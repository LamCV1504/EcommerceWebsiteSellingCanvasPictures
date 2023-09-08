import React from "react";
import { blog } from "../../assets/data/data";
import Heading from "../../common/Heading";

const Blog = () => {
  return (
    <>
      <section className="blog">
        <Heading
          title="BÀI VIẾT"
          desc="Khám phá những bí quyết và ý tưởng sáng tạo để tối ưu hóa không gian sống"
        />

        <div className="posts">
          {blog.slice(0, 3).map((items) => (
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
    </>
  );
};
export default Blog;
