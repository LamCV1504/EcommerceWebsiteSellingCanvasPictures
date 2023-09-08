import { useDispatch, useSelector } from "react-redux";
import * as classes from "../utils/styles";
import React, { useEffect, useState } from "react";
import { updateUser } from "../redux/actions/index";
import { CHANGE_PASSWORD, SET_ERRORS, UPDATE_USER } from "../redux/actionTypes";
import { Link, useParams } from "react-router-dom";
import "./login/login.scss";
import Header from "../components/common/Header";
import Footer from "../components/common/Footer";
import { APIV1 } from "../redux/config/config";

const ChangeInfo = () => {
  const [user, setUser] = useState({});
  const curUser = JSON.parse(localStorage.getItem("auth"));

  useEffect(() => {
    const getUser = async () => {
      try {
        const res = await APIV1.get("/users/" + curUser.userId);
        setUser(res);
      } catch {}
    };
    getUser();
  }, [curUser.userId]);
  const dispatch = useDispatch();
  const store = useSelector((state) => state);
  const [error, setError] = useState({});
  console.log("error", error);
  const [value, setValue] = useState({
    userId: user?.userId,
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  console.log("value", value);
  useEffect(() => {
    if (Object.keys(store.errors).length !== 0) {
      setError(store.errors);
      setValue({ ...value });
    }
  }, [store.errors]);

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

  useEffect(() => {
    dispatch({ type: SET_ERRORS, payload: {} });
  }, []);

  return (
    <>
      <Header />
      <div className="login">
        <div className="container" id="container">
          <form onSubmit={handleFormSubmit}>
            <h1>CẬP NHẬT THÔNG TIN</h1>
            <br></br>
            <input
              placeholder={curUser?.firstName}
              type="text"
              value={value.firstName || curUser?.firstName}
              onChange={(e) =>
                setValue({
                  ...value,
                  firstName: e.target.value,
                })
              }
            />
            <input
              type="text"
              value={value.lastName || curUser?.lastName}
              onChange={(e) =>
                setValue({
                  ...value,
                  lastName: e.target.value,
                })
              }
            />
            <input
              type="text"
              value={value.phoneNumber || curUser?.phone}
              onChange={(e) =>
                setValue({
                  ...value,
                  phoneNumber: e.target.value,
                })
              }
            />
            <input
              className={classes.InputStyle}
              type="text"
              value={value.address || curUser.address}
              onChange={(e) =>
                setValue({
                  ...value,
                  address: e.target.value,
                })
              }
            />
            <div className="">
              <button className={classes.adminFormSubmitButton} type="submit">
                Lưu
              </button>
              <Link to="/profile">
                <button className={classes.adminFormClearButton} type="button">
                  Thoát
                </button>
              </Link>
            </div>
          </form>
        </div>
      </div>
      <Footer />
    </>
  );
};
export default ChangeInfo;
