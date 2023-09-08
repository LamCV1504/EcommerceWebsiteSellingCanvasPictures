import { useDispatch, useSelector } from "react-redux";
import * as classes from "../utils/styles";
import React, { useEffect, useState } from "react";
import { Resetpassword } from "../redux/actions/adminActions";
import { RESET_PASSWORD, SET_ERRORS } from "../redux/actionTypes";
import { Link } from "react-router-dom";

const Confirm = () => {
  const email = useSelector((state) => state.admin.quenmatkhau);
  console.log(email);
  const dispatch = useDispatch();
  const store = useSelector((state) => state);
  const [error, setError] = useState({});
  const [value, setValue] = useState({
    email: email,
    newPassword: "",
    confirmedPassword: "",
    code: "",
  });

  useEffect(() => {
    if (Object.keys(store.errors).length !== 0) {
      setError(store.errors);
      setValue({ ...value });
    }
  }, [store.errors]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setError({});
    dispatch(Resetpassword(value.email));
  };

  useEffect(() => {
    if (store.errors || store.admin.Resetpassword) {
      if (store.admin.Resetpassword) {
        setValue({
          email: "",
        });
        dispatch({ type: SET_ERRORS, payload: {} });
        dispatch({ type: RESET_PASSWORD, payload: false });
      }
    } else {
    }
  }, [store.errors, store.admin.Resetpassword]);

  useEffect(() => {
    dispatch({ type: SET_ERRORS, payload: {} });
  }, []);

  return (
    <div className="mx-5 mt-3 item-center ">
      <div className="space-y-3 w-[1000px] min-h-[100px] ml-[280px]">
        <div className="place-self-center">
          <h1 className="mt-[150px] ml-[250px] bg-text4 bg-opacity-5 rounded-xl font-bold text-[25px] inline-block text-center">
            Nhập mật khẩu mới
          </h1>
        </div>
        <div className="flex flex-col bg-white rounded-xl">
          <form
            className="w-full min-h-[300px] py-9 px-7 text-center bg-white border rounded-md  shadow-2xl mx-auto"
            onSubmit={handleSubmit}
          >
            <div className={classes.WrapInputLabel}>
              <h1 className={classes.LabelStyle}>Mật khẩu mới*:</h1>
              <input
                // placeholder="example@gmail.com"
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
                // placeholder="example@gmail.com"
                required
                className={classes.InputStyle}
                type="password"
                value={value.confirmPassword}
                onChange={(e) =>
                  setValue({ ...value, confirmPassword: e.target.value })
                }
              />
            </div>
            <div className={classes.WrapInputLabel}>
              <h1 className={classes.LabelStyle}>Mã xác nhận*:</h1>
              <input
                // placeholder="example@gmail.com"
                required
                className={classes.InputStyle}
                type="text"
                value={value.code}
                onChange={(e) => setValue({ ...value, code: e.target.value })}
              />
            </div>
            <div className="flex items-center justify-center mt-10 space-x-6">
              <button className={classes.adminFormSubmitButton} type="submit">
                Gửi
              </button>
              <Link to="/">
                <button
                  onClick={() => {
                    setValue({
                      email: "",
                    });
                    setError({});
                  }}
                  className={classes.adminFormClearButton}
                  type="button"
                >
                  Trang Chủ
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
export default Confirm;
