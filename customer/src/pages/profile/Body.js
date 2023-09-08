import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { UPDATE_USER } from "../../redux/actionTypes";
import { APIV1 } from "../../redux/config/config";
import "../../style/history.scss";
import "../../style/main.scss";
import "../login/login.scss";
import * as classes from "../../utils/styles";
import ReactModal from "react-modal";
import { getCurrentUser, updateUser } from "../../redux/actions/index";
import { Link } from "react-router-dom";

const Body = () => {
  const dispatch = useDispatch();
  const [user, setUser] = useState({});
  const curUser = JSON.parse(localStorage.getItem("auth"));
  console.log(curUser);

  useEffect(() => {
    const getUser = async () => {
      try {
        const res = await APIV1.get("/users/" + curUser.userId);
        setUser(res);
      } catch {}
    };
    getUser();
  }, [curUser.userId]);

  // EDIT
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [value, setValue] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
  });

  const handleEditClick = () => {
    setIsModalOpen(true);
    setValue({
      firstName: "",
      lastName: "",
      email: user?.data.email,
      phone: "",
      address: "",
    });
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    // <div className="modal">
    <div className="">
      <div className="">
        <h2
          style={{
            marginTop: "100px",
            fontSize: "30px",
            textAlign: "center",
            fontWeight: "bolder",
          }}
        >
          THÔNG TIN TÀI KHOẢN
        </h2>
        <div className="">
          <br></br>
          <div className="">
            <div className="" style={{ width: "130px", height: "130px" }}>
              <img
                src={user?.data?.image}
                style={{
                  width: "250px",
                  height: "200px",
                  marginLeft: "200px",
                }}
              />
            </div>
            <div
              className=""
              style={{ marginLeft: "600px", marginTop: "-100px" }}
            >
              <div
                className=""
                style={{
                  width: "400px",
                  textAlign: "left",
                  fontSize: "20px",
                  lineHeight: "200%",
                }}
              >
                <span>
                  Full Name: {user?.data?.lastName} {user?.data?.firstName}{" "}
                  <br></br>
                </span>
                <span>
                  Email: {user?.data?.email}
                  <br></br>
                </span>
                <span>
                  Phone Number: {user?.data?.phone} <br></br>
                </span>
                <span>
                  Address: {user?.data?.address} <br></br>
                </span>
              </div>
            </div>
          </div>
          <div
            className=""
            style={{
              // width: "200px",
              textAlign: "center",
              lineHeight: "200%",
              padding: "20px",
              marginLeft: "30px",
              justifyContent: "space-between",
              marginBottom: "220px",
            }}
          >
            <Link to="/reset-password">
              <button
                className=""
                type="button"
                style={{
                  backgroundColor: "#784e3d",
                  padding: "15px",
                  fontSize: "15px",
                  color: "#ffffff",
                  marginRight: "50px",
                  borderRadius: "10px",
                  marginTop: "20px",
                }}
              >
                ĐỔI MẬT KHẨU
              </button>
            </Link>
            <Link to="/change-info">
              <button
                className=""
                type="button"
                onClick={handleEditClick}
                style={{
                  backgroundColor: "#784e3d",
                  padding: "15px",
                  fontSize: "15px",
                  color: "#ffffff",
                  marginRight: "50px",
                  borderRadius: "10px",
                  marginTop: "20px",
                }}
              >
                CẬP NHẬT THÔNG TIN
              </button>
            </Link>
          </div>

          <div></div>
        </div>
      </div>
    </div>
  );
};

export default Body;
