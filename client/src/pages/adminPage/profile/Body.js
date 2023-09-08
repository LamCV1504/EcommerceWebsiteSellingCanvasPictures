import React, { useEffect, useState } from "react";
import { Avatar } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { UPDATE_USER } from "../../../redux/actionTypes";
import { APIV1 } from "../../../redux/config/config";
import * as classes from "../../../utils/styles";
import ReactModal from "react-modal";
import {
  getCurrentUser,
  updateUser,
} from "../../../redux/actions/adminActions";
import { Link } from "react-router-dom";

const modalStyles = {
  content: {
    top: "45%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    padding: "0",
    border: "none",
  },
};

const Body = () => {
  const dispatch = useDispatch();
  const [user, setUser] = useState({});
  const curUser = JSON.parse(localStorage.getItem("user"));
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

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const updatedValue = {};
    if (value.firstName !== "") {
      updatedValue.firstName = value.firstName;
    } else {
      updatedValue.firstName = user.data.firstName;
    }
    if (value.lastName !== "") {
      updatedValue.lastName = value.lastName;
    } else {
      updatedValue.lastName = user.data.lastName;
    }
    if (value.address !== "") {
      updatedValue.address = value.address;
    } else {
      updatedValue.address = user.data.address;
    }
    if (value.phone !== "") {
      updatedValue.phone = value.phone;
    } else {
      updatedValue.phone = user.data.phone;
    }
    dispatch(updateUser({ ...user, ...updatedValue }));
    dispatch({ type: UPDATE_USER, payload: false });
  };

  const handleModalError = () => {
    closeModal();
  };

  return (
    <div>
      <div className="items-center justify-center my-20">
        <div className="w-[900px] min-h-[100px] py-20 px-7 my-30 text-center bg-primary bg-opacity-10 rounded-md  shadow-md mx-auto">
          <div className="flex items-center justify-center gap-5 w-20  font-bold text-white rounded bg-[#784e3d] mr-14 hover:bg-[#392219] focus:outline-none focus:shadow-outline">
            <button type="button">BACK</button>
          </div>
          <h2
            style={{
              fontSize: "20px",
              textAlign: "center",
              fontWeight: "bolder",
            }}
          >
            THÔNG TIN TÀI KHOẢN
          </h2>
          <div className="flex mt-10 mb-10 gap-x-16">
            <br></br>
            <div className="flex flex-col">
              <div className="w-[180px] h-[180px] bg-[#DDDEEE] bg-opacity-50 object-cover mx-auto mb-2">
                <img
                  src={user?.data?.image}
                  className="object-cover w-full h-full"
                />
              </div>
            </div>

            <div
              className="flex flex-row gap-x-3 "
              style={{ alignItems: "baseline" }}
            >
              <div
                className="flex flex-col gap-y-5"
                style={{ width: "130px", textAlign: "left" }}
              >
                <span>Full Name:</span>
                <span>Email: </span>
                <span>Phone Number: </span>
                <span>Address: </span>
              </div>
              <div
                className="flex flex-col gap-y-5"
                style={{ width: "1000px", textAlign: "left" }}
              >
                <span style={{ "font-weight": "bolder" }}>
                  {user?.data?.lastName} {user?.data?.firstName}
                </span>
                <span>{user?.data?.email}</span>
                <span>{user?.data?.phone}</span>
                <span>{user?.data?.address}</span>
              </div>
            </div>
          </div>
          <div className="flex font-bold text-white focus:outline-none focus:shadow-outline">
            <Link to="/reset-password">
              <button
                className="justify-center gap-5 w-30 mr-14  bg-[#784e3d] hover:bg-[#392219] mx-28 px-3 rounded"
                type="button"
              >
                CHANGE PASSWORD
              </button>
            </Link>
            <button
              className="justify-center gap-5 w-30 mr-14  bg-[#784e3d] hover:bg-[#392219] mx-28 px-3 rounded"
              // className={classes.adminFormClearButton}
              type="button"
              onClick={handleEditClick}
            >
              CHANGE INFO
            </button>
          </div>
        </div>
      </div>
      {isModalOpen && (
        <ReactModal
          isOpen={isModalOpen}
          onRequestClose={openModal}
          style={modalStyles}
          ariaHideApp={false}
        >
          <div className="flex flex-col bg-white rounded-xl ">
            <form
              className="w-[500px] min-h-[300px] py-10 px-7 text-center bg-[#fff] border rounded-md  shadow-md mx-auto"
              onSubmit={handleFormSubmit}
            >
              <div className="grid grid-cols-1">
                <div className={classes.WrapInputLabel}>
                  <h1 className={classes.LabelStyle}>Họ :</h1>
                  <input
                    placeholder={user?.firstName}
                    className={classes.InputStyle}
                    type="text"
                    value={value.firstName || user?.firstName}
                    onChange={(e) =>
                      setValue({
                        ...value,
                        firstName: e.target.value,
                      })
                    }
                  />
                </div>
                <div className={classes.WrapInputLabel}>
                  <h1 className={classes.LabelStyle}>Tên :</h1>
                  <input
                    className={classes.InputStyle}
                    type="text"
                    value={value.lastName || user?.lastName}
                    onChange={(e) =>
                      setValue({
                        ...value,
                        lastName: e.target.value,
                      })
                    }
                  />
                </div>
                <div className={classes.WrapInputLabel}>
                  <h1 className={classes.LabelStyle}>Số điện thoại :</h1>
                  <input
                    className={classes.InputStyle}
                    type="text"
                    value={value.phoneNumber || user?.phoneNumber}
                    onChange={(e) =>
                      setValue({
                        ...value,
                        phoneNumber: e.target.value,
                      })
                    }
                  />
                </div>
                <div className={classes.WrapInputLabel}>
                  <h1 className={classes.LabelStyle}>Địa chỉ :</h1>
                  <input
                    className={classes.InputStyle}
                    type="text"
                    value={value.address || user.address}
                    onChange={(e) =>
                      setValue({
                        ...value,
                        address: e.target.value,
                      })
                    }
                  />
                </div>
              </div>

              <div className="flex items-center justify-center mt-10 space-x-6">
                <button className={classes.adminFormSubmitButton} type="submit">
                  Lưu
                </button>
                <button
                  className={classes.adminFormClearButton}
                  type="button"
                  onClick={() => handleModalError()}
                >
                  Thoát
                </button>
              </div>
            </form>
          </div>
        </ReactModal>
      )}
    </div>
  );
};

export default Body;
