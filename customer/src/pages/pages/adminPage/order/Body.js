import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getOrders } from "../../../redux/actions/adminActions";
import { useNavigate } from "react-router-dom";
import { SET_ERRORS } from "../../../redux/actionTypes";
import { AiFillEdit, AiFillDelete, AiOutlineInfoCircle } from "react-icons/ai";
import { formatMoney } from "../../../convert_helper";

import moment from "moment";

const Body = () => {
  const navigate = useNavigate();
  const store = useSelector((state) => state);
  const orders = useSelector((state) => state.admin.allOrder);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getOrders());
  }, [dispatch]);

  useEffect(() => {
    dispatch({ type: SET_ERRORS, payload: {} });
  }, []);

  return (
    <div className="flex-[0.8] mt-3 mx-5 item-center">
      <div className="flex mt-4"></div>
      <div className="w-full my-8 mt-6">
        {orders?.length !== 0 && (
          <table className="w-full table-auto ">
            <thead className="bg-[rgba(169,126,109,0.46)] items-center">
              <tr>
                <th className="px-4 py-1 text-center">#</th>
                <th className="px-4 py-1 text-center">OrderID</th>
                <th className="px-4 py-1 text-center">Status</th>
                <th className="px-4 py-1 text-center">PurchaseTime</th>
                <th className="px-4 py-1 text-center">TotalPrice</th>
                <th className="px-4 py-1 text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="">
              {orders?.map((order, idx) => (
                <tr
                  className="justify-center hover:bg-[rgb(208,184,177)] item-center "
                  key={idx}
                >
                  <td className="items-center px-4 py-1 text-center border ">
                    {idx + 1}
                  </td>
                  <td className="items-center px-4 py-1 text-center border">
                    {order.orderId}
                  </td>

                  <td className="items-center px-4 py-1 text-center border">
                    {order.orderStatus}
                  </td>
                  <td className="items-center px-4 py-1 text-center border">
                    {moment(order?.purchaseTime).format("DD/MM/YYYY HH:MM:SS")}
                  </td>
                  <td className="items-center px-4 py-1 text-center border">
                    {formatMoney(order.total)}đ
                  </td>
                  <td className="px-1 py-1 mr-0 space-x-3 text-center border ">
                    <button
                      // className="px-3.5 py-1 font-bold text-white rounded hover:bg-[#784e3d] bg-[#784e3d] focus:outline-none focus:shadow-outline text-base"
                      onClick={() => navigate(`/order/${order.orderId}`)}
                    >
                      <AiFillEdit size={20} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};
export default Body;
