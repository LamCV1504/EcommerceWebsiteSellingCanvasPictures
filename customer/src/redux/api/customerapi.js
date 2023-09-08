import axiosCustom from "../config/axiosCustom";
import { APIPUBLIC, APIV1 } from "../config/config";

export const userLogin = (formData) => APIPUBLIC.post("auth/login", formData);
export const addUser = (user) => APIPUBLIC.post("/users", user);
export const updateUser = (userId, updateUser) =>
  APIV1.patch(`/users/${userId}`, updateUser);
export const quenMatKhau = (email) =>
  APIV1.post("/users/forgot-password/" + email);

export const Resetpassword = (dataBody) =>
  APIV1.patch("/users/forgot-password", dataBody);

export const changePassword = (userId, dataBody) =>
  APIV1.patch(`/users/${userId}/change-password`, dataBody);

export const addOrder = (order) => APIV1.post("/orders", order);

export const addCart = (cart) => APIV1.post("/cart", cart);
export const getCartUser = (userId) => APIV1.get(`/cart/user/${userId}`);
export const updateCartQuantity = (CartItemId, data) => {
  const response = APIV1.patch(`/cart/${CartItemId}`, data);
  return response ?? {};
};
export const deleteCart = (CartItemId) => APIV1.delete(`/cart/${CartItemId}`);

export const Canceled = (orderId, data) => {
  const respone = APIV1.put(`/orders/${orderId}`, data);
  return respone ?? {};
};

export const login = async (formData) => {
  const response = await axiosCustom({
    method: "POST",
    uri: "/auth/login",
    data: formData,
  });
  return {
    success: response.status,
    data: response.data,
  };
};
