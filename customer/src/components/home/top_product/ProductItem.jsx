import React, { useEffect, useState } from "react";
import { FiShoppingBag, FiSearch } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { AiOutlineHeart, AiOutlineClose } from "react-icons/ai";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addCart, getCartUser } from "../../../redux/actions/index";
import { products } from "../../assets/data/data";
import { formatMoney } from "../../../convert_helper";

const ProductItem = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("auth"));
  const handleClick = ({ id }) => {
    console.log("meo meo");
    dispatch(
      addCart({
        productId: id,
        userId: user?.userId,
        quantity: 1,
      })
    );
    setTimeout(() => {
      console.log("runing app...");
      return dispatch(getCartUser(user?.userId));
    }, 200);
    dispatch(getCartUser(user?.userId));
  };

  return (
    <>
      <section className="product_items">
        {products.map((product, id) => (
          <div className="box" key={id}>
            <div className="img">
              <div
                style={{
                  position: "absolute",
                  padding: "10px",
                  width: "50px",
                  height: "50px",
                  backgroundColor: "red",
                  borderRadius: "50%",
                  color: "#fff",
                  fontWeight: "bolder",
                  textAlign: "center",
                  alignContent: "flex-end",
                  display: "flex",
                  alignItems: "center",
                  marginLeft: "310px",
                  marginTop: "-15px",
                }}
              >
                -{product.discount}%
              </div>
              <img
                src={product.cover}
                alt="Product"
                onClick={() => navigate(`product/${product.id}`)}
              />

              <div className="overlay">
                <button className="button" onClick={() => handleClick(product)}>
                  <FiShoppingBag />
                </button>
              </div>
            </div>

            <div className="details">
              <h3 style={{ fontWeight: "bolder", fontSize: "20px" }}>
                {product.title}
              </h3>
              <div>
                <p style={{ textDecoration: "line-through" }}>
                  {formatMoney(product.price)}đ
                </p>
                <h3
                  style={{
                    position: "positive",
                    fontWeight: "bold",
                    marginTop: "-8px",
                    fontSize: "18px",
                  }}
                >
                  {formatMoney(product.price * (1 - product.discount / 100))}đ
                </h3>
              </div>

              {/* <h3>{formatMoney(product.price(1 - product.discount * 0.1))}</h3> */}
              {/* <h3>Oanh vth</h3> */}
            </div>
          </div>
        ))}
      </section>
    </>
  );
};
export default ProductItem;
