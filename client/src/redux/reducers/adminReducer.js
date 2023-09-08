import {
  ADD_CATEGORY,
  ADD_PROMOTION,
  ADD_PRODUCT,
  ADD_PRODUCT_PRICE,
  GET_ALL_CATEGOIES,
  GET_ALL_PROMOTION,
  GET_ALL_PRODUCT,
  GET_ALL_PRODUCT_PRICE,
  GET_CURRENT_USER,
  GET_INVENTORY,
  GET_ORDERS,
  GET_USERS,
  LOGIN,
  UPDATE_CATEGORY,
  UPDATE_INVENTORY,
  UPDATE_ORDER_STATUS,
  UPDATE_PROMOTION,
  UPDATE_PRODUCT,
  UPDATE_PRODUCT_PRICE,
  UPDATE_USER,
  QUEN_MAT_KHAU,
  DELETE_PROMOTION,
  RESET_PASSWORD,
  DELETE_CATEGORY,
  DELETE_PRODUCT,
  CHANGE_PASSWORD,
} from "../actionTypes";

const initialState = {
  authData: JSON.parse(localStorage.getItem("user")) || null,
  categoryAdded: false,
  productAdded: false,
  promotionAdded: false,
  updatedCategory: false,
  updatedUser: false,
  productpriceAdded: false,
  updatedProduct: false,
  updatedPromotion: false,
  updatedProductPrice: false,
  updatedOrder: false,
  updatedInventory: false,
  // delete
  productDeleted: false,
  changePassword: false,
  allCategory: [],
  allPromotion: [],
  allProduct: [],
  allProductPrice: [],
  usercurrent: [],
  allUsers: [],
  allOrder: [],
  allInventory: [],
  quenmatkhau: false,
  resetpassword: false,
};

const adminReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN:
      localStorage.setItem("user", JSON.stringify({ ...action?.data }));
      return { ...state, authData: action?.data };
    case ADD_CATEGORY:
      return {
        ...state,
        categoryAdded: action.payload,
      };
    case ADD_PROMOTION:
      return {
        ...state,
        promotionAdded: action.payload,
      };

    case ADD_PRODUCT:
      return {
        ...state,
        productAdded: action.payload,
      };
    case ADD_PRODUCT_PRICE:
      return {
        ...state,
        productpriceAdded: action.payload,
      };
    case GET_ALL_CATEGOIES:
      return {
        ...state,
        allCategory: action.payload,
      };
    case DELETE_CATEGORY:
      return {
        // ...state,
        ...state,
        allCategory: state.allCategory.filter(
          (category) => category.categoryId !== action.payload
        ),
      };
    case DELETE_PRODUCT:
      return {
        // ...state,
        ...state,
        productDeleted: action.payload,
      };
    case GET_ALL_PROMOTION:
      return {
        ...state,
        allPromotion: action.payload,
      };
    case GET_ALL_PRODUCT:
      return {
        ...state,
        allProduct: action.payload,
      };
    case GET_ALL_PRODUCT_PRICE:
      return {
        ...state,
        allProductPrice: action.payload,
      };
    case UPDATE_CATEGORY:
      return {
        ...state,
        updatedCategory: action.payload,
      };
    case UPDATE_ORDER_STATUS:
      return {
        ...state,
        updatedOrder: action.payload,
      };
    case UPDATE_USER:
      return {
        ...state,
        updatedUser: action.payload,
      };
    case UPDATE_PRODUCT_PRICE:
      return {
        ...state,
        updatedProductPrice: action.payload,
      };
    case UPDATE_PRODUCT:
      return {
        ...state,
        updatedProduct: action.payload,
      };
    case UPDATE_PROMOTION:
      return {
        ...state,
        updatedPromotion: action.payload,
      };
    case GET_CURRENT_USER:
      return {
        ...state,
        usercurrent: action.payload,
      };
    case GET_USERS:
      return {
        ...state,
        allUsers: action.payload,
      };
    case GET_ORDERS:
      return {
        ...state,
        allOrder: action.payload,
      };
    case GET_INVENTORY:
      return {
        ...state,
        allInventory: action.payload,
      };
    case UPDATE_INVENTORY:
      return {
        ...state,
        updatedInventory: action.payload,
      };
    case QUEN_MAT_KHAU:
      return {
        ...state,
        quenmatkhau: action.payload,
      };
    case RESET_PASSWORD:
      return {
        ...state,
        resetpassword: action.payload,
      };
    case CHANGE_PASSWORD:
      return {
        ...state,
        changePassword: action.payload,
      };
    case DELETE_PROMOTION:
      return {
        ...state,
        allPromotion: state.allPromotion.filter(
          (promotion) => promotion.promotionId !== action.payload
        ),
      };
    default:
      return state;
  }
};

export default adminReducer;
