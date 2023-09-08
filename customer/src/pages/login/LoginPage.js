import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
// import Spinner from "../utils/Spinner";
import { Link, useNavigate } from "react-router-dom";
import "./login.scss";
// import { userLogin } from "../../redux/actions";
import * as api from "../../redux/api/customerapi";
import { getCartUser } from "../../redux/actions/index";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  console.log("email", email);
  const [password, setPassword] = useState("");
  // const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const store = useSelector((state) => state);
  const [error, setError] = useState({});
  const [message, setMessage] = useState("");

  const dispatch = useDispatch();

  const getCart = (userId) => {
    dispatch(getCartUser(userId));
  };

  useEffect(() => {
    if (store.errors) {
      setError(store.errors);
    }
    console.log(store);
  }, [store.errors]);

  const login = async (e) => {
    e.preventDefault();
    setLoading(true);
    // dispatch(userLogin({ email: email, password: password }, navigate));
    const data = await api.login({ email: email, password: password });
    if (data.success === false) {
      setMessage(data.data);
    } else {
      localStorage.setItem("auth", JSON.stringify(data.data));
      window.location.href = "/";
      getCart(data.data.userId);
    }
  };

  useEffect(() => {
    if (store.errors) {
      setLoading(false);
      setEmail("");
      setPassword("");
    }
  }, [store.errors]);

  const [panelActive, setPanelActive] = useState(false);

  const onSignInEvent = () => {
    setPanelActive(false);
  };

  const onSignUpEvent = () => {
    setPanelActive(true);
  };

  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={990}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <div className="login">
        <div className={`${panelActive ? "right-panel-active" : ""}`}>
          <div className="container" id="container">
            <div className="form-container sign-up-container">
              <form action="#">
                <h1>ĐĂNG KÝ</h1>
                <input type="text" placeholder="Nhập Họ và tên" />
                <input type="text" placeholder="Số điện thoại" />
                <input type="email" placeholder="Nhập địa chỉ Email" />
                <input type="password" placeholder="Mật khẩu" />
                <button>ĐĂNG KÝ</button>
              </form>
            </div>
            <div className="form-container sign-in-container">
              <form action="#" onSubmit={login}>
                <h1>ĐĂNG NHẬP</h1>
                <br></br>
                <input
                  type="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <input
                  type="password"
                  placeholder="Mật khẩu"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <a href="#">Quên mật khẩu?</a>
                <button type="submit">ĐĂNG NHẬP</button>
              </form>
            </div>

            <div className="overlay-container">
              <div className="overlay">
                <div className="overlay-panel overlay-left">
                  <h1>Shop rất vui khi bạn trở lại!</h1>
                  <p>Đăng nhập để mua hàng bạn nhé!</p>
                  <button className="ghost" id="signIn" onClick={onSignInEvent}>
                    ĐĂNG NHẬP
                  </button>
                </div>
                <div className="overlay-panel overlay-right">
                  <h1>Faliz Xin Chào</h1>
                  <p>
                    Nhập thông tin cá nhân <br></br>để tạo tài khoản bạn nhé!
                  </p>
                  <Link to="/register">
                    <button
                      className="ghost"
                      id="signUp"
                      style={{ backgroundColor: "#fff", color: "#784e3d" }}
                    >
                      ĐĂNG KÝ
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default LoginPage;
