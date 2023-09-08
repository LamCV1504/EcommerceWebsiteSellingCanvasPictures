import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import "./login.scss";
// import { userLogin } from "../../redux/actions";
import { addUser } from "../../redux/actions";
import { ADD_USER, SET_ERRORS } from "../../redux/actionTypes";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";

const RegisterPage = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const store = useSelector((state) => state);
  const [error, setError] = useState({});
  const [message, setMessage] = useState("");

  const dispatch = useDispatch();

  useEffect(() => {
    if (store.errors) {
      setError(store.errors);
    }
    console.log(store);
  }, [store.errors]);

  const signup = (e) => {
    e.preventDefault();
    dispatch(
      addUser({
        data: {
          email: email,
          password: password,
          firstName: firstName,
          lastName: lastName,
          phone: phone,
          address: address,
        },
        onSuccess: () => {
          navigate("/login");
          toast.success("Đăng ký tài khoản thành công!");
        },
      })
    );
  };

  useEffect(() => {
    if (store.errors) {
      setEmail("");
      setPassword("");
      setAddress("");
      setError("");
      setFirstName("");
      setLastName("");
      setPhone("");
    }
  }, [store.errors]);

  useEffect(() => {
    if (store.errors || store.customer.userAdded) {
      if (store.customer.userAdded) {
        setAddress("");
        setEmail("");
        setError("");
        setFirstName("");
        setLastName("");
        setPassword("");
        setPhone("");

        dispatch({ type: SET_ERRORS, payload: {} });
        dispatch({ type: ADD_USER, payload: false });
      }
    } else {
    }
  }, [store.errors, store.customer.userAdded]);

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
              <form action="#" onSubmit={signup}>
                <h1>ĐĂNG KÝ</h1>
                <br></br>
                <div className="row">
                  <div className="col-75">
                    <input
                      type="text"
                      placeholder="Họ và tên đệm"
                      onChange={(e) => setLastName(e.target.value)}
                      value={lastName}
                      required
                      name="ten"
                    />{" "}
                  </div>
                  <div className="col-25">
                    {" "}
                    <input
                      type="text"
                      placeholder=" Tên"
                      onChange={(e) => setFirstName(e.target.value)}
                      required
                      value={firstName}
                    />{" "}
                  </div>
                </div>

                <input
                  type="text"
                  placeholder="Số điện thoại"
                  value={phone}
                  required
                  onChange={(e) => setPhone(e.target.value)}
                />

                <input
                  type="text"
                  placeholder="Địa chỉ"
                  onChange={(e) => setAddress(e.target.value)}
                  value={address}
                  name="address"
                  required
                />

                <input
                  type="email"
                  placeholder="Email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <input
                  type="password"
                  placeholder="Mật khẩu"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <br></br>
                <button type="submit">ĐĂNG KÝ</button>
              </form>
            </div>

            <div className="overlay-container">
              <div className="overlay">
                <div className="overlay-panel overlay-left">
                  <button className="ghost" id="signIn" onClick={onSignInEvent}>
                    ĐĂNG KÝ
                  </button>
                </div>
                <div className="overlay-panel overlay-right">
                  <h1>Shop rất vui khi bạn trở lại!</h1>
                  <p>Đăng nhập để mua hàng bạn nhé!</p>
                  <Link to="/login">
                    <button
                      className="ghost"
                      id="signUp"
                      style={{ backgroundColor: "#fff", color: "#784e3d" }}
                    >
                      ĐĂNG NHẬP
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

export default RegisterPage;
