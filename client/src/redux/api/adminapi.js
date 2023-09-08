// 1.
import { APIPUBLIC, APIV1 } from "../config/config";
import axiosCustom from "../config/axiosCustom";

// export const userLogin = (formData) => APIPUBLIC.post("auth/login", formData);
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

// category
export const getCategories = () => APIV1.get("/categories");
export const addCategory = (category) => APIV1.post("/categories", category);
export const updateCategory = (updateCategory, categoryId) =>
  APIV1.patch(`/categories/${categoryId}`, updateCategory);
export const deleteCategory = (data) => APIV1.delete("/categories/" + data);

// pricelist

export const getPromotions = () => APIV1.get("/promotions");
export const addPromotion = (promotion) => APIV1.post("/promotions", promotion);
export const updatePromotion = (promotionId, updatepromotion) =>
  APIV1.patch(`/promotions/${promotionId}`, updatepromotion);
export const deletePromotion = (data) => APIV1.delete("/promotions/" + data);

// product
export const getProducts = () => APIV1.get("/products/all");
export const getProduct = () => APIV1.get("/products/");
export const addProduct = (product) => APIV1.post("/products", product);
export const updateProduct = (updateProduct, productId) =>
  APIV1.patch(`/products/${productId}`, updateProduct);
export const deleteProduct = (data) => APIV1.delete("/products/" + data);

// productprice
export const getProductPrices = () => APIV1.get("/productprice");
export const addProductPrice = (product) =>
  APIV1.post("/productprice", product);
export const updateProductPrice = (updateProductPrice) =>
  APIV1.patch("/productprice", updateProductPrice);
export const deleteProductPrice = (data) =>
  APIV1.delete("productprice", { data });

// users
export const getCurrentUser = () => APIV1.get("/users/");
export const getUsers = () => APIV1.get("/users");
export const updateUser = (userId, updateUser) =>
  APIV1.patch(`/users/${userId}`, updateUser);
export const quenMatKhau = (email) =>
  APIV1.post("/users/forgot-password/" + email);

export const Resetpassword = (dataBody) =>
  APIV1.patch("/users/forgot-password", dataBody);

export const changePassword = (userId, dataBody) =>
  APIV1.patch(`/users/${userId}/change-password`, dataBody);

//orders
export const getOrders = () => APIV1.get("/orders");
export const updateOrderStatus = ({ orderId, orderStatus, employeeId }) =>
  APIV1.put("/orders/" + orderId, { orderStatus, employeeId });
//inventory
export const getWarehousing = () => APIV1.get("/warehousing");
export const updateWarehousing = (updateWarehousing) =>
  APIV1.patch("/warehousing", updateWarehousing);
