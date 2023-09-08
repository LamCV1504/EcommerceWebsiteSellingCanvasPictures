import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { APIPUBLIC } from "../../redux/config/config";
import { useDispatch } from "react-redux";

import Header from "../../components/common/Header";
import Footer from "../../components/common/Footer";
import { formatMoney } from "../../convert_helper";

import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";

import { addCart, getCartUser } from "../../redux/actions/index";

const Details = () => {
  const { productId } = useParams();
  const [product, setProduct] = useState({});
  const [quantity, setQuantity] = useState(1);
  const user = JSON.parse(localStorage.getItem("auth"));

  const dispatch = useDispatch();
  useEffect(() => {
    const getProduct = async () => {
      try {
        const res = await APIPUBLIC.get("/products/" + productId);
        console.log("res", res);
        setProduct(res?.data);
      } catch {}
    };
    getProduct();
  }, [productId]);

  const handleQuantity = (type) => {
    if (type === "dec") {
      quantity > 1 && setQuantity(quantity - 1);
    } else {
      setQuantity(quantity + 1);
    }
  };

  const handleClick = () => {
    dispatch(
      addCart({
        productId: product.productId,
        userId: user?.userId,
        quantity,
      })
    );
    setTimeout(() => {
      return dispatch(getCartUser(user?.userId));
    }, 200);
  };

  return (
    <>
      <Header />
      <article>
        <section className="details">
          <h2 className="details_title">CHI TIẾT SẢN PHẨM</h2>
          <div className="details_content">
            <div className="details_content_img">
              <img src={product?.image} alt={product.productName} />
            </div>
            <div className="details_content_detail">
              <h1>{product.productName}</h1>
              {/* <p>{item.categoryName}</p> */}
              <h3>{formatMoney(product?.unitPrice)}</h3>
              <div className="qty">
                <div className="count">
                  <button onClick={() => handleQuantity("dec")}>
                    <AiOutlineMinus />
                  </button>
                  <span> {quantity}</span>
                  <button onClick={() => handleQuantity("inc")}>
                    <AiOutlinePlus />
                  </button>
                </div>
                <button className="button" onClick={handleClick}>
                  THÊM VÀO GIỎ HÀNG
                </button>
              </div>
              <div className="desc">
                <h4>THÔNG TIN CHI TIẾT</h4>
                <p> {product.productDescription} </p>
              </div>
            </div>
          </div>
        </section>
      </article>
      <Footer />
    </>
  );
};
export default Details;
