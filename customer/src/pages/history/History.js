import React from "react";
import Header from "../../components/common/Header";
import Heading from "../../components/common/Heading";
import Footer from "../../components/common/Footer";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useParams } from "react-router-dom";
import "../../style/history.scss";
import "../../style/main.scss";
import axios from "axios";
import { APIV1 } from "../../redux/config/config";
import { formatMoney } from "../../convert_helper";
import Modal, { ReactModal } from "react-modal";
import Swal from "sweetalert2";
import "react-toastify/dist/ReactToastify.css";
import { Canceled } from "../../redux/api/customerapi";

const History = () => {
  const user = JSON.parse(localStorage.getItem("auth"));
  const [orders, setOrders] = useState([]);
  const orderId = useParams();
  const { id } = orderId;
  const [orderDetails, setOrderDetails] = useState([]);
  const dispatch = useDispatch();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState(null);
  const [selectedOrder, setSelectedOrder] = useState("");
  const [error, setError] = useState({});

  const handleOpenViewModal = (orderDetail) => {
    setSelectedOrder(orderDetail);
    // setModalMode("view");
    setIsModalOpen(true);
  };
  const handleModalError = () => {
    setError({});
    closeModal();
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };
  const getOrders = async () => {
    try {
      const { data } = await axios.get(
        "http://localhost:8000/v1/orders/user/" + user.userId
      );
      setOrders(data);
    } catch {}
  };
  useEffect(() => {
    getOrders();
  }, [user.userId]);

  useEffect(() => {
    const getOrderDetails = async () => {
      try {
        const { data } = await axios.get(
          "http://localhost:8000/v1/order_details/order/" + selectedOrder
        );
        setOrderDetails(data);
      } catch {}
    };
    getOrderDetails();
  }, [selectedOrder]);

  const cancel = (order) => {
    Swal.fire({
      title: "Bạn có chắc chắn muốn hủy đơn hàng này không?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Đồng ý",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await Canceled(order.orderId, {
            orderStatus: "CANCELED",
            employeeId: null,
          });
          getOrders();
        } catch (error) {
          console.log("Loi~", error);
        }
      }
    });
  };

  return (
    <>
      <Header />
      <Heading title="LỊCH SỬ MUA HÀNG" desc="" />
      <div className="history">
        <div className="container">
          <table className="responsive-table">
            <thead className="table-header">
              <tr>
                <td className="col col-1">Mã Đơn Hàng</td>
                <td className="col col-2">Thời Gian Đặt</td>
                <td className="col col-3">Giá Tiền</td>
                <td className="col col-5">Địa Chỉ</td>
                <td className="col col-4">Trạng Thái</td>
                <td className="col col-4">Hành Động</td>
              </tr>
            </thead>
            <tbody className="table-row">
              {orders.map((order, idx) => (
                <tr>
                  <td className="col col-1">{order.orderId}</td>
                  <td className="col col-2"> {order.purchaseTime}</td>
                  <td className="col col-3"> {formatMoney(order.total)}đ</td>
                  <td className="col col-5">{order.shippingAddress}</td>
                  <td className="col col-4">{order.orderStatus}</td>
                  <td className="col col-4">
                    <button
                      className="btn"
                      style={{ "background-color": "#784e3d" }}
                      onClick={() => handleOpenViewModal(order.orderId)}
                    >
                      XEM
                    </button>

                    {order.orderStatus === "PENDING" && (
                      <button
                        className="btn"
                        style={{ "background-color": "red" }}
                        onClick={() => {
                          cancel(order);
                        }}
                      >
                        HỦY
                      </button>
                    )}
                    {order.orderStatus !== "PENDING" && (
                      <button
                        className="btn"
                        style={{ "background-color": "grey" }}
                      >
                        HỦY
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {selectedOrder ? (
          <div className="modal">
            <button
              className={"btn"}
              type="button"
              onClick={() => setSelectedOrder(false)}
              style={{
                "background-color": "#784e3d",
                width: "60px",
                height: "40px",
              }}
            >
              BACK
            </button>
            <h2>CHI TIẾT ĐƠN HÀNG</h2>
            <table className="responsive-table">
              <thead className="table-header">
                <tr>
                  <td className="col col-1">TT</td>
                  <td className="col col-2">Tên Sản Phẩm</td>
                  <td className="col col-3">Số Lượng</td>
                  <td className="col col-5">Đơn Giá</td>
                  <td className="col col-4">Khuyến Mãi</td>
                  <td className="col col-4">Thành Tiền</td>
                </tr>
              </thead>
              <tbody className="table-row">
                {orderDetails.map((orderDetail, idx) => (
                  <tr>
                    <td className="col col-1">{idx + 1}</td>
                    <td className="col col-2"> {orderDetail.productName}</td>
                    <td className="col col-3"> {orderDetail.quantity}</td>
                    <td className="col col-5">
                      {formatMoney(orderDetail.price)}đ
                    </td>
                    <td className="col col-4">
                      {orderDetail.discount != null ? orderDetail.discount : 0}%
                    </td>
                    <td className="col col-4">
                      {formatMoney(
                        orderDetail.discount != null
                          ? orderDetail.quantity *
                              orderDetail.price *
                              (1 - orderDetail.discount * 0.01)
                          : orderDetail.quantity * orderDetail.price
                      )}
                      đ
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : null}
      </div>
      <Footer />
    </>
  );
};
export default History;
