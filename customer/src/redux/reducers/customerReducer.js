import {
  ADD_CART,
  ADD_ORDER,
  ADD_USER,
  GET_CART_USER,
  LOGIN,
  LOGOUT,
  QUEN_MAT_KHAU,
  RESET_PASSWORD,
  CHANGE_PASSWORD,
} from "../actionTypes";

const initialState = {
  authData: JSON.parse(localStorage.getItem("auth")) || null,
  userAdded: false,
  orderAdded: false,
  cartItems: [],
  userCarts: [],
  quenmatkhau: false,
  resetpassword: false,
  changePassword: false,
};

const customerReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN:
      localStorage.setItem("user", JSON.stringify({ ...action?.data }));
      return { ...state, authData: action?.data };
    case ADD_USER:
      return {
        ...state,
        userAdded: action.payload,
      };
    case ADD_ORDER:
      console.log("payload: " + action.payload);
      return {
        ...state,
        orderAdded: action.payload,
      };

    case ADD_CART:
      return {
        ...state,
        cartItems: [...state.cartItems, action.payload],
      };
    case GET_CART_USER:
      return {
        ...state,
        userCarts: action.payload,
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
    case LOGOUT:
      localStorage.removeItem("auth");
      return { ...state, authData: action?.data };
    default:
      return state;
  }
};

export default customerReducer;
