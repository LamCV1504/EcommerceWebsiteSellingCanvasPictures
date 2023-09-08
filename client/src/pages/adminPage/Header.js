import { Avatar } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import LogoutIcon from "@mui/icons-material/Logout";
import React from "react";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // const user = JSON.parse(localStorage.getItem("auth"));
  const authDataSelector = (state) => state.admin.authData;
  const user = useSelector(authDataSelector);
  console.log("uset", user);

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
        dispatch({ type: "ADMIN_LOGOUT" });
        navigate("/");
      }
    });
  };
  return (
    <div
      className="flex  items-center justify-between  h-[74px] w-full sticky top-0 bg-[#ffff]  "
      style={{ boxShadow: "rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px" }}
    >
      <div className="flex items-center"></div>
      <div className="flex items-center mx-5 space-x-3">
        <Link to="/profile" className="btn btn-primary">
          <Avatar />
          <h1>{user?.email}</h1>
        </Link>
        <LogoutIcon
          onClick={logout}
          className="transition-all cursor-pointer hover:scale-125 "
        />
      </div>
    </div>
  );
};

export default Header;
