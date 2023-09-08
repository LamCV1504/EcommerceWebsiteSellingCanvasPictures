import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { APIV1 } from "../../../redux/config/config";
import { MenuItem, Select } from "@mui/material";
import * as classes from "../../../utils/styles";
import { updateOrderStatus } from "../../../redux/api/adminapi";
import axios from "axios";
import { formatMoney } from "../../../convert_helper";
import { toast } from "react-toastify";

const Body = () => {
  const orderId = useParams();

  const [order, setOrder] = useState({});
  const [orderDetails, setOrderDetails] = useState([]);
  const [statusE, setStatusE] = useState("");
  const user = JSON.parse(localStorage.getItem("user"));

  const dispatch = useDispatch();
  useEffect(() => {
    const getOrder = async () => {
      try {
        const { data } = await axios.get(
          "http://localhost:8000/v1/orders/" + orderId.id
        );
        setOrder(data);
      } catch {}
    };
    getOrder();
  }, [orderId.id]);

  useEffect(() => {
    const getOrderDetails = async () => {
      try {
        const { data } = await axios.get(
          "http://localhost:8000/v1/order_details/order/" + orderId.id
        );
        setOrderDetails(data);
      } catch {}
    };
    getOrderDetails();
  }, [orderId]);

  const handleSetStatus = async (e) => {
    e.preventDefault();
    try {
      await updateOrderStatus({
        orderId: orderId.id,
        orderStatus: statusE,
        employeeId: user.userId,
      });
      toast.success("Cập nhật trạng thái thành công!");
      console.log("OK");
      setOrderDetails((pre) =>
        pre.map((item) =>
          item.orderId === orderId.id ? { ...item, status: statusE } : item
        )
      );
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="w-full my-8 mt-6 bg-bg_product">
      <div className="flex mx-4">
        <Link to="/manage-orders" className="btn btn-primary">
          <button
            className="items-center gap-[9px]  w-[88px] h-[40px] hover:bg-[#603304] block py-2 font-bold text-white rounded-lg px-4 
          bg-[#784e3d] focus:outline-none focus:shadow-outline "
          >
            BACK
          </button>
        </Link>
      </div>
      <div className="px-8 py-6 m-5 border w-30">
        <h2 className="mb-4 text-2xl font-bold">Order #{order.orderId}</h2>
        <div className="flex items-center justify-between mb-4">
          <div>
            <p className>Name: {`${order.consigneeName}`}</p>
            <p className>Address: {`${order.shippingAddress}`}</p>
            <p className>Phone: {`${order.consigneePhone}`}</p>
          </div>
          <div className="flex p-8 gap-x-5 ">
            <div className={classes.WrapInputLabel}>
              <h1 className={classes.LabelStyle}>Update Status:</h1>
              <Select
                required
                displayEmpty
                placeholder={order.orderStatus}
                sx={{ height: 36 }}
                inputProps={{ "aria-label": "Without label" }}
                value={order.status}
                onChange={(e) => setStatusE(e.target.value)}
                className={`${classes.InputStyle} hover:focus:border-none `}
              >
                <MenuItem value="PENDING" disabled>
                  PENDING
                </MenuItem>
                {order.orderStatus === "COMPLETED" ||
                order.orderStatus === "CANCELED" ? (
                  <MenuItem value="CONFIRMED" disabled>
                    CONFIRMED
                  </MenuItem>
                ) : (
                  <MenuItem value="CONFIRMED">CONFIRMED</MenuItem>
                )}
                {order.orderStatus === "COMPLETED" ||
                order.orderStatus === "CANCELED" ? (
                  <MenuItem value="DELIVERING" disabled>
                    DELIVERING
                  </MenuItem>
                ) : (
                  <MenuItem value="DELIVERING">DELIVERING</MenuItem>
                )}

                {order.orderStatus === "CANCELED" ? (
                  <MenuItem value="COMPLETED" disabled>
                    COMPLETED
                  </MenuItem>
                ) : (
                  <MenuItem value="COMPLETED">COMPLETED</MenuItem>
                )}
              </Select>
            </div>
            <div className="items-center justify-center my-auto">
              <button
                className="px-3.5 py-2 mt-2  font-bold text-white rounded hover:bg-[#603304]  bg-[#784e3d] focus:outline-none focus:shadow-outline text-base"
                onClick={handleSetStatus}
              >
                SAVE
              </button>
            </div>
          </div>
        </div>
        <div className="w-full">
          <table className="w-full table-auto ">
            <thead>
              <tr>
                <th className="px-4 py-2 border border-[#c7c2c2]">ID</th>
                <th className="px-4 py-2 border border-[#c7c2c2]">
                  Product Name
                </th>
                <th className="px-4 py-2 border border-[#c7c2c2]">Quantity</th>
                <th className="px-4 py-2 border border-[#c7c2c2]">Price</th>
                <th className="px-4 py-2 border border-[#c7c2c2]">Discount</th>
                <th className="px-4 py-2 border border-[#c7c2c2]">
                  {" "}
                  Total Price
                </th>
              </tr>
            </thead>
            <tbody>
              {orderDetails?.map((orderDetail, idx) => (
                <tr key={idx}>
                  <th className="px-4 py-2 border font-normal  border-[#c7c2c2]">
                    {idx + 1}
                  </th>
                  <th className="px-4 py-2 border font-normal  border-[#c7c2c2]">
                    {orderDetail.productName}
                  </th>
                  <th className="px-4 py-2 border font-normal  border-[#c7c2c2]">
                    {orderDetail.quantity}
                  </th>
                  <th className="px-4 py-2 border font-normal  border-[#c7c2c2]">
                    {orderDetail.price}
                  </th>
                  <th className="px-4 py-2 border font-normal  border-[#c7c2c2]">
                    {orderDetail.discount != null ? orderDetail.discount : 0}
                  </th>
                  <th className="px-4 py-2 border  border-[#c7c2c2]">
                    {" "}
                    {formatMoney(
                      orderDetail.discount != null
                        ? orderDetail.quantity *
                            orderDetail.price *
                            (1 - orderDetail.discount * 0.01)
                        : orderDetail.quantity * orderDetail.price
                    )}
                    đ
                  </th>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Body;
