import React, { useState } from "react";
import logo from "../assets/images/logo1.png";
import cartimg from "../assets/images/cart.png";
import { BiSearch } from "react-icons/bi";
import { BsBagCheck } from "react-icons/bs";
import { RiFileInfoFill, RiUser3Line } from "react-icons/ri";
import {
  AiOutlineUserAdd,
  AiOutlineMenu,
  AiOutlineClose,
  AiOutlineDelete,
  AiOutlineLogout,
} from "react-icons/ai";
import { GoChecklist } from "react-icons/go";
import { navlist } from "../assets/data/data";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import {
  getCartUser,
  deleteCart,
  updateCartQuantity,
} from "../../redux/actions";
import { formatMoney } from "../../convert_helper";
import { ToastContainer, toast } from "react-toastify";
import Swal from "sweetalert2";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";

const Header = () => {
  const [mobile, setMobile] = useState(false);
  const [cartList, setCartList] = useState(false);
  const [totalAmount, setTotalAmount] = useState(0);
  const [total, setTotal] = useState(0);
  const [discountAmount, setDiscountAmount] = useState(0);
  const handleCloses = () => {
    setCartList(null);
  };

  const dispatch = useDispatch();
  const [updateCart, setUpdateCart] = useState(null);
  const user = JSON.parse(localStorage.getItem("auth"));
  const navigate = useNavigate();
  const { cartItems, userCarts, authData } = useSelector(
    (state) => state?.customer
  );

  useEffect(() => {
    dispatch(getCartUser(user?.userId));
  }, [authData]);

  useEffect(() => {
    if (updateCart !== null) {
      dispatch(
        updateCartQuantity({
          cartItemId: updateCart?.cartItemId,
          quantity: Number(updateCart?.quantity),
        })
      );
      setTimeout(() => {
        dispatch(getCartUser(user?.userId));
      }, 200);
    }
  }, [updateCart]);

  const handleDelete = (id) => {
    dispatch(deleteCart(id));

    setTimeout(() => {
      dispatch(getCartUser(user?.userId));
    }, 200);
  };

  useEffect(() => {
    let sum = 0,
      discountAmount = 0,
      total = 0;
    for (let index = 0; index < userCarts?.length; index++) {
      sum =
        sum + Number(userCarts[index].quantity * userCarts[index].unitPrice);
      setTotalAmount(sum);
      discountAmount =
        discountAmount +
        Number(
          (userCarts[index].quantity *
            userCarts[index].unitPrice *
            userCarts[index].discount) /
            100
        );
      setDiscountAmount(discountAmount);
      total = sum - discountAmount;
      setTotal(total);
    }
  }, [userCarts]);

  const logout = () => {
    Swal.fire({
      title: "Bạn có muốn đăng xuất không?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Đồng ý",
    }).then(async (result) => {
      if (result.isConfirmed) {
        dispatch({ type: "LOGOUT" });
        navigate("/");
      }
    });
  };

  const cartAlert = () => {
    Swal.fire({
      title: "Vui lòng đăng nhập để mua hàng",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Đồng ý",
    }).then(async (result) => {
      if (result.isConfirmed) {
        dispatch({ type: "LOGIN" });
        navigate("/login");
      }
    });
  };
  const [productFilters, setProductFilters] = useState([]);

  useEffect(() => {
    const getProducts = async () => {
      try {
        const { data } = await axios.get(
          "http://localhost:8000/v1/products/all"
        );
        setProductFilters(data);
      } catch (err) {}
    };
    getProducts();
  }, []);

  const activeProductFilters = productFilters.filter(
    (item) => item.product.productStatus === "ACTIVE"
  );
  const [filteredList, setFilteredList] = new useState([]);
  const [searchValue, setSearchValue] = useState("");
  const filterBySearch = (event) => {
    const query = event.target.value;
    setSearchValue(query);
    var updatedList = [...activeProductFilters];
    updatedList = updatedList.filter((item) => {
      return (
        item?.product.productName
          ?.toLowerCase()
          .indexOf(query.toLowerCase()) !== -1
      );
    });
    setFilteredList(updatedList);
  };

  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={990}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <header className="header">
        <div className="container">
          <nav>
            <div className="toggle">
              <button onClick={() => setMobile(!mobile)}>
                {mobile ? (
                  <AiOutlineClose className="close heIcon" />
                ) : (
                  <AiOutlineMenu className="open heIcon" />
                )}
              </button>
            </div>
            <div className="left">
              <Link to="/">
                <img src={logo} alt="logo" />
              </Link>
            </div>
            <div className="center">
              <ul className={mobile ? "mobile-nav" : "menu"}>
                {navlist.map((nav, i) => (
                  <li key={i}>
                    <Link to={nav.path}>{nav.text}</Link>
                  </li>
                ))}
              </ul>
            </div>
          </nav>
          <div className="right">
            <div className="right_search">
              <input
                type="text"
                placeholder="Nhập tên sản phẩm..."
                onChange={filterBySearch}
              />
              <BiSearch className="serachIcon heIcon" />
              <div className="right_card">
                {searchValue && (
                  <div className="showSearch">
                    <div className="details">
                      {filteredList.map((item, idx) => (
                        <div className="details_content1 key={idx}">
                          <div className="details_content1_img">
                            <Link to={`/product/${item.product.productId}`}>
                              <img
                                src={item.product.image}
                                alt={item.productName}
                              />
                            </Link>
                          </div>
                          <div className="details_content1_detail">
                            <div className="details_content1_detail_price">
                              <p>{item.product.productName}</p>
                              <p> {formatMoney(item.product.unitPrice)}đ</p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {!authData && (
                <div className="right_user">
                  <button onClick={() => navigate("/login")}>
                    <RiUser3Line className="userIcon heIcon" />
                  </button>
                </div>
              )}
              {authData && (
                <div className="right_user" style={{ "margin-left": "10px" }}>
                  <p> Xin Chào</p>
                </div>
              )}

              {authData && (
                <div className="right_user">
                  <button onClick={() => navigate("/profile")}>
                    <RiUser3Line className="userIcon heIcon" />
                  </button>
                </div>
              )}
              {authData && (
                <div className="right_user">
                  <button onClick={() => navigate("/history")}>
                    <GoChecklist className="userIcon heIcon" />
                  </button>
                </div>
              )}

              {authData && (
                <div className="right_user">
                  <button onClick={() => logout()}>
                    <AiOutlineLogout className="userIcon heIcon" />
                  </button>
                </div>
              )}
              <div className="right_card">
                <button
                  className="button"
                  onClick={() => {
                    if (authData) setCartList(!cartList);
                    else cartAlert();
                  }}
                >
                  <BsBagCheck className="shop heIcon" />
                  GIỎ HÀNG<span> ({userCarts.length})</span>
                </button>
                <div className={cartList ? "showCart" : "hideCart"}>
                  {userCarts.length ? (
                    <section className="details">
                      <div className="details_title">
                        <p>DANH SÁCH SẢN PHẨM</p>
                      </div>
                      {userCarts.map((item, idx) => (
                        <div className="details_content" key={idx}>
                          <div className="details_content_img">
                            <Link
                              to={`/product/${item.productId}`}
                              onClick={handleCloses}
                            >
                              <img src={item?.image} alt="" />
                            </Link>
                          </div>
                          <div className="details_content_detail">
                            <div className="details_content_detail_price">
                              <p>{item.productName.slice(0, 15)}...</p>
                              <p>Đơn Giá: {formatMoney(item.unitPrice)}đ</p>
                              <div>
                                <p>
                                  Số lượng:
                                  <input
                                    style={{
                                      "font-family": "Montserrat",
                                      "font-weight": "lighter",
                                      "text-align": "center",
                                    }}
                                    type="number"
                                    name=""
                                    min={1}
                                    max={10}
                                    id="qty"
                                    value={item?.quantity}
                                    onChange={(e) => {
                                      setUpdateCart({
                                        cartItemId: item?.id,
                                        quantity: e.target.value,
                                      });
                                    }}
                                  />
                                </p>
                              </div>

                              <p>Giảm giá: {item?.discount}%</p>
                            </div>
                          </div>
                          <div className="details_content_detail_icon">
                            <i onClick={() => handleDelete(item?.id)}>
                              <AiOutlineDelete />
                            </i>
                          </div>
                        </div>
                      ))}
                      <div className="details_total">
                        <h4 style={{ margin: "8px" }}>
                          TẠM TÍNH: {formatMoney(totalAmount)}đ
                        </h4>
                        <h4 style={{ margin: "8px" }}>
                          GIẢM GIÁ: {formatMoney(discountAmount)}đ
                        </h4>
                        <h4 style={{ margin: "8px", fontWeight: "bolder" }}>
                          THÀNH TIỀN: {formatMoney(total)}đ
                        </h4>
                      </div>
                      <Link to="/checkout" className="button">
                        <button
                          style={{
                            color: "white",
                            fontweight: "bolder",
                            // float: right,
                          }}
                        >
                          THANH TOÁN
                        </button>
                      </Link>
                    </section>
                  ) : (
                    <div className="empty">
                      <p>Giỏ hàng trống</p>
                      <img src={cartimg} alt="" />
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>
    </>
  );
};
export default Header;
