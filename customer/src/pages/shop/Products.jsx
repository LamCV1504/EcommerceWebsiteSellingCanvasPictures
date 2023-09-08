import React, { useEffect, useState, useMemo } from "react";
import Heading from "../../components/common/Heading";
import { Product } from "./Product";
import axios from "axios";

export const Products = () => {
  const [products, setProducts] = useState([]);

  const [allProducts, setAllProducts] = useState();
  console.log(allProducts);
  const allCategories = useMemo(
    () => ["Tất Cả", ...new Set(products.map((item) => item.categoryName))],
    [products]
  );

  useEffect(() => {
    setAllProducts(() => products);
  }, [products]);

  useEffect(() => {
    const getProducts = async () => {
      try {
        const { data } = await axios.get(
          "http://localhost:8000/v1/products/all"
        );
        setProducts(data);
      } catch (err) {}
    };
    getProducts();
  }, []);

  // useEffect(()=> {
  const handleFilter = (category) => {
    const filterProducts = products.filter(
      (item) => item.categoryName === category
    );
    setAllProducts(filterProducts);

    if (category === "Tất Cả") {
      setAllProducts(products);
      return;
    }
  };

  return (
    <>
      <section className="topproduct">
        <div className="container">
          <div className="head">
            <Heading
              title="BỘ SƯU TẬP"
              desc="Chọn bộ sưu tập hoặc tất cả sản phẩm"
            />
            <div className="category">
              {allCategories?.map((category) => (
                <button
                  className="button"
                  onClick={() => handleFilter(category)}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>
      <section className="product_items">
        {allProducts?.map((item) => (
          <Product item={item} key={item.product.productId} />
        ))}
      </section>
    </>
  );
};
