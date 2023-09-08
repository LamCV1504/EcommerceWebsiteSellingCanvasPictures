import { useDispatch, useSelector } from "react-redux";
import * as classes from "../utils/styles";
import React, { useEffect, useState } from "react";
import { changePassword } from "../redux/actions/index";
import { CHANGE_PASSWORD, SET_ERRORS } from "../redux/actionTypes";
import { Link, useParams } from "react-router-dom";
import "./login/login.scss";
import Header from "./../components/common/Header";
import Footer from "./../components/common/Footer";

const ResetPassword = () => {
  const user = JSON.parse(localStorage.getItem("auth"));
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

  const handleSubmit = (e) => {
    e.preventDefault();
    setError({});
    dispatch(
      changePassword(user.userId, {
        userId: user?.userId,
        oldPassword: value.oldPassword,
        newPassword: value.newPassword,
        confirmPassword: value.confirmPassword,
      })
    );
  };

  useEffect(() => {
    if (store.errors || store.customer.changePassword) {
      if (store.customer.changePassword) {
        setValue({
          userId: user?.userId,
          oldPassword: "",
          newPassword: "",
          confirmPassword: "",
        });
        dispatch({ type: SET_ERRORS, payload: {} });
        dispatch({ type: CHANGE_PASSWORD, payload: false });
      }
    } else {
    }
  }, [store.errors, store.customer.changePassword]);

  useEffect(() => {
    dispatch({ type: SET_ERRORS, payload: {} });
  }, []);

  return (
    <>
      <Header />
      <div className="login">
        <div className="container" id="container">
          {/* <div className="form-container sign-in-container"> */}
          <form onSubmit={handleSubmit}>
            <h1>ĐỔI MẬT KHẨU</h1>
            <br></br>
            <input
              type="password"
              required
              placeholder="Mật khẩu cũ"
              value={value.oldPassword}
              onChange={(e) =>
                setValue({ ...value, oldPassword: e.target.value })
              }
            />
            <input
              type="password"
              placeholder="Mật khẩu mới"
              value={value.newPassword}
              onChange={(e) =>
                setValue({ ...value, newPassword: e.target.value })
              }
            />
            <input
              type="password"
              placeholder="Xác nhận mật khẩu mới"
              value={value.confirmPassword}
              onChange={(e) =>
                setValue({ ...value, confirmPassword: e.target.value })
              }
            />
            <div>
              <br></br>
              <button type="submit" style={{ marginRight: "50px" }}>
                OK
              </button>
              <Link to="/profile">
                <button
                  onClick={() => {
                    setValue({
                      password: "",
                      token: "",
                    });
                    setError({});
                  }}
                  type="button"
                >
                  TRỞ LẠI
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
export default ResetPassword;
