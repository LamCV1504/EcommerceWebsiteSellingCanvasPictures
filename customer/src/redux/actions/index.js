import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  ADD_CART,
  ADD_ORDER,
  ADD_USER,
  CANCELED,
  DELETE_CART,
  GET_CART_USER,
  GET_ORDER_USER,
  UPDATE_USER,
  LOGIN,
  SET_ERRORS,
  UPDATE_CART,
  CHANGE_PASSWORD,
  RESET_PASSWORD,
  QUEN_MAT_KHAU,
} from "../actionTypes";
import * as api from "../api/customerapi";
import { useSelector } from "react-redux";

export const userLogin = (formData, navigate) => async (dispatch) => {
  try {
    const { data } = await api.userLogin(formData);
    // if (data) {
    dispatch({ type: LOGIN, data: data });
    toast.success("Đăng nhập thành công!");
    navigate("/");
    // } else {
    // toast.error("Email hoặc mật khẩu hoặc mật khẩu chưa đúng!");
    // }
  } catch (error) {
    dispatch({ type: SET_ERRORS, payload: error.response.data });
  }
};

export const addUser = (payload) => async (dispatch) => {
  try {
    const { data, onSuccess } = payload;
    await api.addUser(data);
    // if (data.status == 200) {
    toast.success("Đăng ký tài khoản thành công!");
    onSuccess();
    dispatch({ type: ADD_USER, payload: true });
    // }
  } catch (error) {
    console.log("error nè", error.response.data);
    toast.error(error.response.data);
  }
};

export const updateUser = (userId, formData) => async (dispatch) => {
  try {
    const data = await api.updateUser(userId, formData);
    if (data.status === 200) {
      toast.success("updated user role successfully!");
      dispatch({ type: UPDATE_USER, payload: true });
    } else {
      toast.error("updated error!");
      dispatch({ type: SET_ERRORS, payload: data });
    }
  } catch (error) {
    // dispatch({ type: SET_ERRORS, payload: error.response.data });
  }
};

export const addCart = (formData) => async (dispatch) => {
  try {
    const data = await api.addCart(formData);
    // const stored = useSelector((state) => state.customer);
    console.log(data);
    // if (data) {
    // toast.success("Thêm sản phẩm vào giỏ hàng thành công!");
    setTimeout(() => {
      dispatch({ type: ADD_CART, payload: data });
    }, 100);
    // }
  } catch (error) {
    // console.log("Lỗi");

    console.log("Unknown error occurred");
  }
};

export const addOrder = (formData) => async (dispatch) => {
  try {
    const { data } = await api.addOrder(formData);
    if (data) {
      toast.success("Đặt hàng thành công!");
      dispatch({ type: ADD_ORDER, payload: true });
    } else {
      dispatch({ type: SET_ERRORS, payload: data });
    }
  } catch (error) {
    console.log(error.response);
  }
};

export const getCartUser = (userId) => async (dispatch) => {
  try {
    const { data } = await api.getCartUser(userId);
    dispatch({ type: GET_CART_USER, payload: data });
  } catch (error) {
    console.log("Redux Error", error);
  }
};

export const updateCartQuantity = (formData) => async (dispatch) => {
  try {
    const { data } = await api.updateCartQuantity(
      formData.cartItemId,
      formData
    );
    dispatch({ type: UPDATE_CART, payload: true });
  } catch (error) {
    dispatch({ type: SET_ERRORS, payload: error.response.data });
  }
};

export const Canceled = (formData) => async (dispatch) => {
  try {
    const { data } = await api.Canceled(formData);
    console.log("data", data);
    if (data.success === true) {
      toast.success("Hủy đơn hàng thành công!");
      dispatch({ type: CANCELED, payload: true });
    } else {
      dispatch({ type: SET_ERRORS, payload: data });
    }
  } catch (error) {}
};

export const deleteCart = (formData) => async (dispatch) => {
  try {
    const { data } = await api.deleteCart(formData);
    console.log("data", data);

    toast.success("xóa sản phẩm khỏi giỏ hàng thành công!");
    dispatch({ type: DELETE_CART, payload: true });
  } catch (error) {
    if (
      error.response &&
      error.response.data &&
      error.response.data.status === "error"
    ) {
      dispatch({ type: SET_ERRORS, payload: error.response });
    } else {
      console.log("Unknown error occurred");
    }
  }
};
export const quenMatKhau = (formData) => async (dispatch) => {
  try {
    const data = await api.quenMatKhau(formData);
    if (data.status === 200) {
      toast.success("Đã gởi mail thành công!");
      dispatch({ type: QUEN_MAT_KHAU, payload: true });
    }
  } catch (error) {
    dispatch({ type: SET_ERRORS, payload: error.response.data });
  }
};

export const Resetpassword = (dataBody) => async (dispatch) => {
  try {
    const data = await api.Resetpassword(dataBody);
    if (data.status === 200) {
      dispatch({ type: RESET_PASSWORD, payload: true });
      toast.success("Đặt lại mật khẩu thành công!");
    }
  } catch (error) {
    dispatch({ type: SET_ERRORS, payload: error.response.data });
  }
};

export const changePassword = (userId, dataBody) => async (dispatch) => {
  try {
    const data = await api.changePassword(userId, dataBody);
    if (data.status === 200) {
      dispatch({ type: CHANGE_PASSWORD, payload: true });
      toast.success("Đặt lại mật khẩu thành công!");
    }
  } catch (error) {
    dispatch({ type: SET_ERRORS, payload: error.response.data });
  }
};
