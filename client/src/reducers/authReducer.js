import {
  LOGIN_USER,
  REGISTER_USER,
  AUTH_USER,
  LOGOUT_USER,
  ADD_TO_CART_USER,
  GET_CART_ITEMS_USER,
  REMOVE_CART_ITEM_USER,
  ON_SUCCESS_BUY_USER
} from "../actions/types";

import { createReducer } from "./reducerbolarplate";

// export default function(state = {}, action) {
//   switch (action.type) {
//     case REGISTER_USER:
//       return { ...state, register: action.payload };
//     case LOGIN_USER:
//       return { ...state, loginuser: action.payload };
//     case AUTH_USER:
//       return { ...state, userData: action.payload };
//     case LOGOUT_USER:
//       return { ...state };
//     case ADD_TO_CART_USER:
//       return {
//         ...state,
//         userData: {
//           ...state.userData,
//           cart: action.payload
//         }
//       };
//     case GET_CART_ITEMS_USER:
//       return {
//         ...state,
//         cartDetail: action.payload
//       };
//     case REMOVE_CART_ITEM_USER:
//       return {
//         ...state,
//         cartDetail: action.payload.user,
//         userData: {
//           ...state.userData,
//           cart: action.payload.cart
//         }
//       };
//     case ON_SUCCESS_BUY_USER:
//       return {
//         ...state,
//         successBuy: action.payload.success,
//         userData: {
//           ...state.userData,
//           cart: action.payload.cart
//         },
//         cartDetail: action.payload.cartDetail
//       };
//     default:
//       return state;
//   }
// }
const initalState = {};

export const registeruser = (state, payload) => {
  return { ...state, register: payload };
};
export const loginuser = (state, payload) => {
  return { ...state, loginuser: payload };
};
export const logoutuser = (state, payload) => {
  return { ...state };
};

export const authuser = (state, payload) => {
  return { ...state, userData: payload };
};
export const addcart = (state, payload) => {
  return {
    ...state,
    userData: {
      ...state.userData,
      cart: payload
    }
  };
};
export const getcart = (state, payload) => {
  return {
    ...state,
    cartDetail: payload
  };
};
export const removeitem = (state, payload) => {
  return {
    ...state,
    cartDetail: payload.user,
    userData: {
      ...state.userData,
      cart: payload.cart
    }
  };
};
export const onsuccess = (state, payload) => {
  return {
    ...state,
    successBuy: payload.success,
    userData: {
      ...state.userData,
      cart: payload.cart
    },
    cartDetail: payload.cartDetail
  };
};
export default createReducer(initalState, {
  [LOGIN_USER]: loginuser,
  [REGISTER_USER]: registeruser,
  [AUTH_USER]: authuser,
  [LOGOUT_USER]: logoutuser,
  [ADD_TO_CART_USER]: addcart,
  [GET_CART_ITEMS_USER]: getcart,
  [REMOVE_CART_ITEM_USER]: removeitem,
  [ON_SUCCESS_BUY_USER]: onsuccess
});
