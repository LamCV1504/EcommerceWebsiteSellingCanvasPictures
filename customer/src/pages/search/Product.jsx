import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FiShoppingBag, FiSearch } from "react-icons/fi";
import { AiOutlineHeart, AiOutlineClose } from "react-icons/ai";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addCart } from "../../redux/actions/index";
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
  };

  return (
    <>
      <div className="box" key={item.productId}>
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

          
          <h3>{item.product.productName}</h3>
          <h3>{formatMoney(item.product.unitPrice)}</h3>
          {/* <h3>{item.categoryName}</h3> */}
        </div>
      </div>
    </>
  );
};
