import { toast } from "react-toastify";
import { Navigate } from "react-router-dom";
import {
  ADD_CATEGORY,
  ADD_PROMOTION,
  DELETE_CATEGORY,
  DELETE_PRODUCT,
  DELETE_PROMOTION,
  ADD_PRODUCT,
  GET_ALL_CATEGOIES,
  GET_ALL_PROMOTION,
  GET_ALL_PRODUCT,
  GET_CURRENT_USER,
  GET_INVENTORY,
  GET_ORDERS,
  GET_USERS,
  SET_ERRORS,
  UPDATE_CATEGORY,
  UPDATE_INVENTORY,
  UPDATE_ORDER_STATUS,
  UPDATE_PROMOTION,
  UPDATE_PRODUCT,
  UPDATE_PRODUCT_PRICE,
  QUEN_MAT_KHAU,
  RESET_PASSWORD,
  UPDATE_USER,
  CHANGE_PASSWORD,
} from "../actionTypes";
import * as api from "../api/adminapi";

export const getCategories = () => async (dispatch) => {
  try {
    const { data } = await api.getCategories();
    dispatch({ type: GET_ALL_CATEGOIES, payload: data.content });
  } catch (error) {
    toast.error(error.response.data);
  }
};

export const addCategory = (formData) => async (dispatch) => {
  try {
    const data = await api.addCategory(formData);
    console.log("data", data);
    if (data.status === 200) {
      console.log("dungnid");
      toast.success("Thêm  mới thành công!");
      dispatch({ type: ADD_CATEGORY, payload: true });
    }
  } catch (error) {
    toast.error(error.response.data);
  }
};

export const updateCategory = (formData, categoryId) => async (dispatch) => {
  try {
    const data = await api.updateCategory(formData, categoryId);
    console.log("data", data);
    if (data.status === 200) {
      toast.success("Cập nhật danh mục thành công!");
      dispatch({ type: UPDATE_CATEGORY, payload: true });
    } else {
      toast.error("Cập nhật danh mục thất bại!");
      dispatch({ type: SET_ERRORS, payload: data });
    }
  } catch (error) {
    dispatch({ type: SET_ERRORS, payload: error.response.data });
  }
};

export const deleteCategory = (id) => async (dispatch) => {
  try {
    const data = await api.deleteCategory(id);
    console.log("data", data);
    // if (data.success === 200) {
    toast.success("Xóa danh mục thành công!");
    dispatch({ type: DELETE_CATEGORY, payload: id[0] });
    // }
  } catch (error) {
    toast.error(error.response.data.categoryError);
    dispatch({ type: SET_ERRORS, payload: error.response.data });
  }
};

export const addProduct = (formData) => async (dispatch) => {
  try {
    const data = await api.addProduct(formData);
    if (data.status === 200) {
      toast.success("Thêm  mới thành công!");
      dispatch({ type: ADD_PRODUCT, payload: true });
    }
  } catch (error) {
    toast.error(error.response.data);
  }
};

export const getProducts = () => async (dispatch) => {
  try {
    const { data } = await api.getProducts();
    dispatch({ type: GET_ALL_PRODUCT, payload: data });
  } catch (error) {
    console.log("Redux Error", error);
  }
};

export const getProduct = () => async (dispatch) => {
  try {
    const { data } = await api.getProduct();
    dispatch({ type: GET_ALL_PRODUCT, payload: data });
  } catch (error) {
    console.log("Redux Error", error);
  }
};

export const updateProduct = (formData, productId) => async (dispatch) => {
  try {
    const data = await api.updateProduct(formData, productId);
    console.log("data", data);
    if (data.status === 200) {
      toast.success("updated product successfully!");
      dispatch({ type: UPDATE_PRODUCT, payload: true });
    }
  } catch (error) {
    dispatch({ type: SET_ERRORS, payload: error.response.data });
  }
};

export const deleteProduct = (formData) => async (dispatch) => {
  try {
    const data = await api.deleteProduct(formData);
    if (data.status === 200) {
      toast.success("Xóa sản phẩm thành công!");
      dispatch({ type: DELETE_PRODUCT, payload: true });
    }
  } catch (error) {
    toast.error(error.response.data.productError);
    dispatch({ type: SET_ERRORS, payload: error.response.data });
  }
};

export const addPromotion = (formData) => async (dispatch) => {
  try {
    const { data } = await api.addPromotion(formData);
    // if (data.success === true) {
    toast.success("Thêm  mới thành công!");
    dispatch({ type: ADD_PROMOTION, payload: true });
    // } else {
    // dispatch({ type: SET_ERRORS, payload: data });
    // }
  } catch (error) {
    // if (
    toast.error(error.response.data);
  }
};

export const getPromotions = () => async (dispatch) => {
  try {
    const { data } = await api.getPromotions();
    dispatch({ type: GET_ALL_PROMOTION, payload: data.content });
  } catch (error) {
    console.log("Redux Error", error);
  }
};

export const updatePromotion = (promotionId, formData) => async (dispatch) => {
  try {
    const data = await api.updatePromotion(promotionId, formData);
    if (data.status === 200) {
      toast.success("updated promotion successfully!");
      dispatch({ type: UPDATE_PROMOTION, payload: true });
    } else {
      toast.error("updated error!");
      dispatch({ type: SET_ERRORS, payload: data });
    }
  } catch (error) {
    dispatch({ type: SET_ERRORS, payload: error.response.data });
  }
};

export const deletePromotion = (formData) => async (dispatch) => {
  try {
    const data = await api.deletePromotion(formData);
    console.log("data", data);
    if (data.status === 200) {
      toast.success("Xóa chương trình khuyến mãi thành công!");
      dispatch({ type: DELETE_PROMOTION, payload: formData[0] });
    }
  } catch (error) {
    toast.error(error.response.data.productError);
    dispatch({ type: SET_ERRORS, payload: error.response.data });
  }
};

export const getUsers = () => async (dispatch) => {
  try {
    const { data } = await api.getUsers();
    if (data) {
      dispatch({ type: GET_USERS, payload: data.content });
    } else {
      dispatch(dispatch({ type: SET_ERRORS, payload: data.mes }));
    }
  } catch (error) {
    console.log("Redux Error", error);
  }
};

export const getCurrentUser = () => async (dispatch) => {
  try {
    const { data } = await api.getCurrentUser();
    dispatch({ type: GET_CURRENT_USER, payload: data });
  } catch (error) {
    console.log("Redux Error", error);
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
export const getOrders = () => async (dispatch) => {
  try {
    const { data } = await api.getOrders();
    if (data) {
      dispatch({ type: GET_ORDERS, payload: data.content });
    } else {
      dispatch(dispatch({ type: SET_ERRORS, payload: data }));
    }
  } catch (error) {
    console.log("Redux Error", error);
  }
};

export const updateOrderStatus = (formData) => async (dispatch) => {
  try {
    const { data } = await api.updateOrderStatus(formData);
    if (data.status === 200) {
      toast.success("Cập nhật trạng thái thành công!");
      // dispatch({ type: UPDATE_ORDER_STATUS, payload: true });
    } else {
      toast.error("updated error!");
      // dispatch({ type: SET_ERRORS, payload: data });
    }
  } catch (error) {
    dispatch({ type: SET_ERRORS, payload: error.response.data });
  }
};

export const getWarehousing = () => async (dispatch) => {
  try {
    const { data } = await api.getWarehousing();
    if (data.success === true) {
      dispatch({ type: GET_INVENTORY, payload: data.retObj });
    } else {
      dispatch(dispatch({ type: SET_ERRORS, payload: data }));
    }
  } catch (error) {
    console.log("Redux Error", error);
  }
};

export const updateWarehousing = (formData) => async (dispatch) => {
  try {
    const { data } = await api.updateWarehousing(formData);
    if (data.success === true) {
      toast.success("updated order successfully!");
      dispatch({ type: UPDATE_INVENTORY, payload: true });
    } else {
      toast.error("updated error!");
      dispatch({ type: SET_ERRORS, payload: data });
    }
  } catch (error) {
    dispatch({ type: SET_ERRORS, payload: error.response.data });
  }
};
