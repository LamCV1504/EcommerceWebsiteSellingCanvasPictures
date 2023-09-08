import React, { useEffect } from "react";
import Sidebar from "./SideBar";
import Header from "./Header";
import Body from "./Body";
import { useDispatch, useSelector } from "react-redux";
import {
  getCategories,
  getCurrentUser,
  getOrders,
  getProducts,
  getUsers,
} from "../../redux/actions/adminActions";

const AdminHome = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getCurrentUser());
    dispatch(getProducts());
    dispatch(getCategories());
    dispatch(getUsers());
    dispatch(getOrders());
  }, [dispatch]);

  return (
    <div className="bg-[#d6d9e0] h-screen flex items-center">
      <div className="flex bg-[#f4f6fa] w-full h-full overflow-y-hidden">
        <Sidebar />
        <div className="flex flex-col flex-1">
          <Header />
          <Body />
        </div>
      </div>
    </div>
  );
};

export default AdminHome;