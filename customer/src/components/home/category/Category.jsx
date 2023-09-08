import Heading from "../../common/Heading";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "../../../style/main.scss";
const Category = () => {
  const [categories, setCategories] = useState([]);
  useEffect(() => {
    const getCategory = async () => {
      try {
        const { data } = await axios.get("http://localhost:8000/v1/categories");
        setCategories(data.content);
      } catch {}
    };
    getCategory();
  }, []);

  return (
    <>
      <section className="product">
        <div className="container">
          <Heading
            title="BỘ SƯU TẬP"
            desc="Dấn thân vào thế giới tuyệt diệu của nghệ thuật, nơi hòa mình vào biển màu sắc và cảm xúc đỉnh cao, để tâm hồn bay bổng và trí tưởng tượng tung bay!"
          />
        </div>
      </section>
      <section className="product_items">
        {categories.map((category, index) => (
          <div className="box" key={category.categoryId}>
            <Link to="/product">
              <div className="img">
                <img src={category?.image} alt={category.categoryName} />
              </div>
              <div className="details">
                <h3>{category.categoryName}</h3>
                {/* <h3>{category.author}</h3> */}
              </div>
            </Link>
          </div>
        ))}
      </section>
    </>
  );
};
export default Category;
