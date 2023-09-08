import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FiShoppingBag, FiSearch } from "react-icons/fi";
import { AiOutlineHeart, AiOutlineClose } from "react-icons/ai";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addCart, getCartUser } from "../../redux/actions/index";
import { formatMoney } from "../../convert_helper";

export const Product = ({ item }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("auth"));
  const [quantity, setQuantity] = useState(1);

  const handleClick = () => {
    dispatch(
      addCart({
        productId: item.product.productId,
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
      <div className="box" key={item.productId}>
        {item.discount && (
          <div>
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
                -{item.discount}%
              </div>
              <img
                src={item.product.image}
                alt="Product"
                onClick={() => navigate(`${item.product.productId}`)}
              />
              <div className="overlay">
                <button className="button" onClick={handleClick}>
                  <FiShoppingBag />
                </button>
              </div>
            </div>
            <div className="details">
              <h3 style={{}}>{item.product.productName}</h3>
              <div>
                <p style={{ textDecoration: "line-through" }}>
                  {formatMoney(item.product.unitPrice)}đ
                </p>
                <h3
                  style={{
                    position: "positive",
                    fontWeight: "bold",
                    marginTop: "-8px",
                    fontSize: "18px",
                  }}
                >
                  {formatMoney(
                    item.product.unitPrice * (1 - item.discount / 100)
                  )}
                  đ
                </h3>
              </div>
            </div>
          </div>
        )}
        {!item.discount && (
          <div>
            <div className="img">
              <img
                src={item.product.image}
                alt="Product"
                onClick={() => navigate(`${item.product.productId}`)}
              />
              <div className="overlay">
                <button className="button" onClick={handleClick}>
                  <FiShoppingBag />
                </button>
              </div>
            </div>
            <div className="details">
              <h3 style={{}}>{item.product.productName}</h3>
              <div>
                <h3
                  style={{
                    position: "positive",
                    fontWeight: "bold",
                    marginTop: "-8px",
                    fontSize: "18px",
                  }}
                >
                  {formatMoney(item.product.unitPrice)}đ
                </h3>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};
