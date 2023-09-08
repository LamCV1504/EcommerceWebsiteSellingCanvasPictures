import { useDispatch, useSelector } from "react-redux";
import ReactModal from "react-modal";
import * as classes from "../utils/styles";
import React, { useEffect, useState } from "react";
import { quenMatKhau, Resetpassword } from "../redux/actions/adminActions";
import {
  QUEN_MAT_KHAU,
  SET_ERRORS,
  RESET_PASSWORD,
} from "../redux/actionTypes";
import { Link, useNavigate } from "react-router-dom";

const ForgotPassword = () => {
  const dispatch = useDispatch();

  const navigate = useNavigate();
  const store = useSelector((state) => state);
  const [error, setError] = useState({});
  const [value, setValue] = useState({
    email: "",
  });
  const em = value.email;
  console.log("email", em);
  const [data, setData] = useState({
    email: "",
    newPassword: "",
    confirmPassword: "",
    code: "",
  });
  console.log("data", data);

  const [isModalOpen, setIsModalOpen] = useState(true);
  const openModal = () => {
    setIsModalOpen(true);
  };
  const closeModal = () => {
    setIsModalOpen(false);
  };
  const handleModalError = () => {
    closeModal();
  };
  useEffect(() => {
    if (Object.keys(store.errors).length !== 0) {
      setError(store.errors);
      setValue({ ...value });
    }
  }, [store.errors]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setError({});
    dispatch(quenMatKhau(value.email));
    setIsModalOpen();
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    setError({});
    dispatch(Resetpassword({ ...data, email: value.email }));
    navigate("/");
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
    <div className="mx-5 mt-[150px] item-center ">
      {store.admin.quenmatkhau ? (
        <div className="bg-white rounded-xl">
          <form
            className="w-[500px] h-[500px] px-7 text-center bg-[#fff] border rounded-md  shadow-md mx-auto"
            onSubmit={handleFormSubmit}
          >
            <div>
              <h1 className="mt-[40px] ml-[10px] py-7 bg-text4 bg-opacity-5 rounded-xl font-bold text-[25px] inline-block text-center">
                Nhập mật khẩu mới
              </h1>
            </div>
            <div className={classes.WrapInputLabel}>
              <h1 className={classes.LabelStyle}>Mật khẩu mới*:</h1>
              <input
                // placeholder="example@gmail.com"
                required
                className={classes.InputStyle}
                type="password"
                value={data.newPassword}
                onChange={(e) =>
                  setData({ ...data, newPassword: e.target.value })
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
                value={data.confirmPassword}
                onChange={(e) =>
                  setData({ ...data, confirmPassword: e.target.value })
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
                value={data.code}
                onChange={(e) => setData({ ...data, code: e.target.value })}
              />
            </div>
            <div className="flex items-center justify-center mt-10 space-x-6">
              <button className={classes.adminFormSubmitButton} type="submit">
                SAVE
              </button>
              <button
                className={classes.adminFormClearButton}
                type="button"
                onClick={() => handleModalError()}
              >
                CANCEL
              </button>
            </div>
            <div className="mt-5">
              {error?.message ? (
                <p className="text-red-500">{error?.message}</p>
              ) : null}
            </div>
          </form>
        </div>
      ) : (
        // </ReactModal>
        <div className="space-y-3 w-[1000px] min-h-[100px] ml-[280px]">
          <div className="place-self-center">
            <h1 className="mt-[150px] ml-[150px] bg-text4 bg-opacity-5 rounded-xl font-bold text-[25px] inline-block text-center">
              Nhập địa chỉ email đã đăng ký trên hệ thống
            </h1>
          </div>
          <div className="flex flex-col bg-white rounded-xl">
            <form
              className="w-full min-h-[300px] py-9 px-7 text-center bg-white border rounded-md  shadow-2xl mx-auto"
              onSubmit={handleSubmit}
            >
              <div className={classes.WrapInputLabel}>
                <h1 className={classes.LabelStyle}>Email của bạn*:</h1>
                <input
                  placeholder="example@gmail.com"
                  required
                  className={classes.InputStyle}
                  type="email"
                  value={value.email}
                  onChange={(e) =>
                    setValue({ ...value, email: e.target.value })
                  }
                />
              </div>
              <div className="flex items-center justify-center mt-10 space-x-6">
                {/* <Link to="/confirm"> */}
                <button className={classes.adminFormSubmitButton} type="submit">
                  Gửi
                </button>
                {/* </Link> */}
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
      )}
    </div>
  );
};
export default ForgotPassword;
