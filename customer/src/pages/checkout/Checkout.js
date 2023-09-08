import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

import Header from "../../components/common/Header";
import Footer from "../../components/common/Footer";
import Heading from "../../components/common/Heading";

import "../../style/checkout.scss";
import "../../style/main.scss";
import { AiOutlineDelete } from "react-icons/ai";
import { formatMoney } from "../../convert_helper";
import Swal from "sweetalert2";
import {
  getCartUser,
  deleteCart,
  updateCartQuantity,
  addOrder,
} from "../../redux/actions";

const Checkout = () => {
  const dispatch = useDispatch();
  const [updateCart, setUpdateCart] = useState(null);
  const [totalAmount, setTotalAmount] = useState(0);
  const [total, setTotal] = useState(0);
  const [discountAmount, setDiscountAmount] = useState(0);

  const user = JSON.parse(localStorage.getItem("auth"));

  const navigate = useNavigate();
  const userCarts = useSelector((state) => state?.customer?.userCarts);

  const orderAlert = () => {
    Swal.fire({
      title: "Đặt hàng thanh công!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Đồng ý",
    }).then(async (result) => {
      if (result.isConfirmed) {
        dispatch({ type: "addOrder" });
        navigate("/");
      }
    });
  };

  useEffect(() => {
    dispatch(getCartUser(user?.userId));
  }, []);

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

  const [shippingInfo, setShippingInfo] = useState({
    customerId: user?.userId,
    shippingAddress: "",
    consigneePhone: "",
    consigneeName: "",
    notes: "",
    total: totalAmount,
  });

  const handleSubmithtmlForm = (e) => {
    e.preventDefault();
  };

  const handleClick = () => {
    dispatch(addOrder(shippingInfo))
      .then((response) => {
        // const { success, message } = response;
        // if (success) {
        console.log("Đặt hàng thành công!");
        orderAlert();
        //  else {
        //   console.error("Đặt hàng không thành công:", message);
        // }
      })
      .catch((error) => {
        console.error("Đã có lỗi xảy ra:", error);
      });
  };

  return (
    <>
      <Header />
      <div className="checkout">
        <Heading title="THÔNG TIN ĐƠN HÀNG" dsc="" />
        <form onSubmit={handleSubmithtmlForm}>
          <div className="row">
            <div className="col-75">
              <div className="container">
                <div className="row">
                  <div className="col-50">
                    <h3>THÔNG TIN NHẬN HÀNG</h3>
                    <label htmlFor="fname">
                      <i className="fa fa-user" /> Họ Và Tên
                    </label>
                    <input
                      type="text"
                      id="fname"
                      name="name"
                      placeholder="Nhập Họ Và Tên"
                      onChange={(e) =>
                        setShippingInfo({
                          ...shippingInfo,
                          consigneeName: e.target.value,
                        })
                      }
                      value={shippingInfo.consigneeName}
                      required
                    />
                    <label htmlFor="adr">
                      <i className="fa fa-address-card-o" /> Address
                    </label>
                    <input
                      type="text"
                      id="adr"
                      name="address"
                      placeholder="Nhập Địa Chỉ"
                      onChange={(e) =>
                        setShippingInfo({
                          ...shippingInfo,
                          shippingAddress: e.target.value,
                        })
                      }
                      value={shippingInfo.shippingAddress}
                    />
                    <label htmlFor="phone">
                      <i className="fa fa-institution" /> Số Điện Thoại
                    </label>
                    <input
                      type="text"
                      id="phone"
                      name="phone"
                      placeholder="Nhập Số Điện Thoại"
                      onChange={(e) =>
                        setShippingInfo({
                          ...shippingInfo,
                          consigneePhone: e.target.value,
                        })
                      }
                    />
                    <label htmlFor="note">
                      <i className="fa fa-institution" /> Ghi Chú
                    </label>
                    <input
                      style={{ height: "150px", "vertical-align": "baseline" }}
                      type="text"
                      id="note"
                      name="note"
                      onChange={(e) =>
                        setShippingInfo({
                          ...shippingInfo,
                          notes: e.target.value,
                        })
                      }
                    />
                  </div>
                  <div className="col-50">
                    <h3>HÌNH THỨC THANH TOÁN</h3>
                    <br></br>
                    <label>
                      <input
                        type="checkbox"
                        defaultChecked={false}
                        name="sameadr"
                      />{" "}
                      Thanh Toán Bằng Thẻ
                    </label>
                    <div className="icon-container">
                      <i className="fa fa-cc-visa" style={{ color: "navy" }} />
                      <i className="fa fa-cc-amex" style={{ color: "blue" }} />
                      <i
                        className="fa fa-cc-mastercard"
                        style={{ color: "red" }}
                      />
                      <i
                        className="fa fa-cc-discover"
                        style={{ color: "orange" }}
                      />
                    </div>
                    <label htmlFor="cname">Tên Tài Khoản</label>
                    <input
                      type="text"
                      id="cname"
                      name="cardname"
                      placeholder="Nhập Tên"
                    />
                    <label htmlFor="ccnum">Số Thẻ</label>
                    <input
                      type="text"
                      id="ccnum"
                      name="cardnumber"
                      placeholder="1111-2222-3333-4444"
                    />
                    <label htmlFor="expmonth">Tháng Hết Hạn</label>
                    <input
                      type="text"
                      id="expmonth"
                      name="expmonth"
                      placeholder="Chọn Tháng"
                    />
                    <div className="row">
                      <div className="col-50">
                        <label htmlFor="expyear">Năm Hết Hạn</label>
                        <input
                          type="text"
                          id="expyear"
                          name="expyear"
                          placeholder="Chọn Năm"
                        />
                      </div>
                      <div className="col-50">
                        <label htmlFor="cvv">CVV</label>
                        <input
                          type="text"
                          id="cvv"
                          name="cvv"
                          placeholder={352}
                        />
                      </div>
                    </div>
                    <label>
                      <input
                        type="checkbox"
                        defaultChecked={true}
                        name="sameadr"
                      />{" "}
                      Thanh Toán Khi Nhận Hàng
                    </label>
                  </div>
                </div>

                {userCarts.length > 0 ? (
                  <button
                    type="submit"
                    name="ĐẶT HÀNG"
                    defaultValue="Continue to checkout"
                    className="btn"
                    onClick={handleClick}
                  >
                    ĐẶT HÀNG
                  </button>
                ) : (
                  <button
                    type="submit"
                    name="ĐẶT HÀNG"
                    defaultValue="Continue to checkout"
                    className="btndisabled"
                    disabled
                    onClick={handleClick}
                  >
                    ĐẶT HÀNG
                  </button>
                )}
              </div>
            </div>
            <div className="col-25">
              <div className="container">
                <h3>CHI TIẾT ĐƠN HÀNG </h3>
                <section className="chitiet">
                  <div>
                    {userCarts.map((item, idx) => (
                      <div className="details_content" key={idx}>
                        <div className="details_content_img">
                          <Link to={`/product/${item.productId}`}>
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
                  </div>
                </section>
              </div>
            </div>
          </div>
        </form>
      </div>
      <Footer />
    </>
  );
};

export default Checkout;
