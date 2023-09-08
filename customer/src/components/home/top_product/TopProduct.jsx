import { useState } from "react";
import { products } from "../../assets/data/data";
import Heading from "../../common/Heading";
import ProductItem from "./ProductItem";

const TopProduct = () => {
  const [cartItem, setCartItem] = useState(products);
  return (
    <>
      <section className="product">
        <div className="container">
          <Heading
            title="SẢN PHẨM NỔI BẬT"
            desc="Những sản phẩm được yêu thích nhất của cửa hàng"
          />

          <ProductItem Items={cartItem} />
        </div>
      </section>
    </>
  );
};
export default TopProduct;
