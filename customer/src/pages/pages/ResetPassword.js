import { useDispatch, useSelector } from "react-redux";
import * as classes from "../utils/styles";
import React, { useEffect, useState } from "react";
import { changePassword } from "../redux/actions/adminActions";
import { CHANGE_PASSWORD, SET_ERRORS } from "../redux/actionTypes";
import { Link, useParams } from "react-router-dom";

const ResetPassword = () => {
  const user = JSON.parse(localStorage.getItem("user"));
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
    if (store.errors || store.admin.changePassword) {
      if (store.admin.changePassword) {
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
  }, [store.errors, store.admin.changePassword]);

  useEffect(() => {
    dispatch({ type: SET_ERRORS, payload: {} });
  }, []);

  return (
    <div className="mx-5 mt-3 item-center">
      <div className="space-y-3  w-[1000px] min-h-[100px] ml-[280px]">
        <div className="place-self-center">
          <h1 className="mt-[150px] ml-[400px] bg-text4 bg-opacity-5 rounded-xl font-bold text-[25px] inline-block ">
            ĐỔI MẬT KHẨU
          </h1>
        </div>
        <div className="flex flex-col bg-white rounded-xl">
          <form
            className="w-full min-h-[300px] py-9 px-7 text-center bg-white border rounded-md  shadow-2xl mx-auto"
            onSubmit={handleSubmit}
          >
            <div className={classes.WrapInputLabel}>
              <h1 className={classes.LabelStyle}>Mật khẩu cũ*:</h1>
              <input
                required
                className={classes.InputStyle}
                type="password"
                value={value.oldPassword}
                onChange={(e) =>
                  setValue({ ...value, oldPassword: e.target.value })
                }
              />
            </div>
            <div className={classes.WrapInputLabel}>
              <h1 className={classes.LabelStyle}>Mật khẩu mới*:</h1>
              <input
                required
                className={classes.InputStyle}
                type="password"
                value={value.newPassword}
                onChange={(e) =>
                  setValue({ ...value, newPassword: e.target.value })
                }
              />
            </div>
            <div className={classes.WrapInputLabel}>
              <h1 className={classes.LabelStyle}>Xác nhận mật khẩu*:</h1>
              <input
                required
                className={classes.InputStyle}
                type="password"
                value={value.confirmPassword}
                onChange={(e) =>
                  setValue({ ...value, confirmPassword: e.target.value })
                }
              />
            </div>
            <div className="flex items-center justify-center mt-10 space-x-6">
              <button className={classes.adminFormSubmitButton} type="submit">
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
                  className={classes.adminFormClearButton}
                  type="button"
                >
                  TRỞ LẠI
                </button>
              </Link>
            </div>
            {error.mes ? <p className="text-red-500">{error.mes}</p> : null}
          </form>
        </div>
      </div>
    </div>
  );
};
export default ResetPassword;
