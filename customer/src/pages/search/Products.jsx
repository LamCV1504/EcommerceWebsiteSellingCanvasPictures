import React, { useEffect, useState, useMemo } from "react";
import Heading from "../../components/common/Heading";
import { Product } from "./Product";
import axios from "axios";

export const Products = () => {
  const [products, setProducts] = useState([]);
  const [allProducts, setAllProducts] = useState();
  const [search, setSearch] = useState("");
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
  // const handleSearch = (keyword) => {
  //   const searchProducts = products.filter(
  //     (item) => {
  //       keyword.toLowerCase() ===""
  //       ?item
  //       ?item.product.productName === keyword
  //     }
  //   );
  //   setAllProducts(filterProducts);
  // };

  return (
    <>
      <section className="topproduct">
        <div className="container">
          <div className="head">
            <Heading title="KẾT QUẢ TÌM KIẾM" desc="" />
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
