import axios from "axios";
import {
  GET_ERRORS,
  LOGIN_USER,
  REGISTER_USER,
  AUTH_USER,
  LOGOUT_USER,
  ADD_TO_CART_USER,
  GET_CART_ITEMS_USER,
  REMOVE_CART_ITEM_USER,
  ON_SUCCESS_BUY_USER,
  UPDATE_DATA_USER,
  CLEAR_UPDATE_USER_DATA
} from "./types";

// SERVER ROUTES
export const USER_SERVER = "/api/users";
export const PRODUCT_SERVER = "/api/product";
export const register_user = (userdata, history) => dispatch => {
  axios
    .post(`${USER_SERVER}/register`, userdata)
    .then(response =>
      dispatch({
        type: REGISTER_USER,
        payload: response.data
      })
    )
    .then(() => {
      history.push("/");
    })
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

export const login_user = (userdata, history) => dispatch => {
  axios
    .post(`${USER_SERVER}/login`, userdata)
    .then(res =>
      dispatch({
        type: LOGIN_USER,
        payload: res.data
      })
    )
    .then(res => {
      history.push("/user/dashboard");
    })
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

export function logoutUser() {
  const request = axios.get(`${USER_SERVER}/logout`).then(res => res.data);
  return {
    type: LOGOUT_USER,
    payload: request
  };
}

export function AuthUser() {
  const request = axios.get(`${USER_SERVER}`).then(res => res.data);
  return {
    type: AUTH_USER,
    payload: request
  };
}

export function addtoCart(id) {
  const request = axios
    .post(`${USER_SERVER}/addToCart?productId=${id}`)
    .then(res => res.data);
  return {
    type: ADD_TO_CART_USER,
    payload: request
  };
}

export function getCartItems(cartItems, userCart) {
  const request = axios
    .get(`${PRODUCT_SERVER}/articles_by_id?id=${cartItems}&type=array`)
    .then(respose => {
      // get items from cart
      userCart.forEach(item => {
        //get cart items id from user
        respose.data.forEach((k, i) => {
          //compare user items and cart items
          if (item.id === k._id) {
            // add quantity with product details
            respose.data[i].quantity = item.quantity;
          }
        });
      });
      return respose.data;
    });
  return {
    type: GET_CART_ITEMS_USER,
    payload: request
  };
}

export function removeCartItems(id) {
  const request = axios
    .get(`${USER_SERVER}/removeFromCart?productId=${id}`)
    .then(response => {
      // get id from cart items
      response.data.cart.forEach(item => {
        //get id from user details
        response.data.user.forEach((k, i) => {
          //compare user details and cart
          if (item.id === k._id) {
            // remove quanity with product details
            response.data.user[i].quantity = item.quantity;
          }
        });
      });
      return response.data;
    });
  return {
    type: REMOVE_CART_ITEM_USER,
    payload: request
  };
}

export function onSuccessBuy(data) {
  const request = axios
    .post(`${USER_SERVER}/successbuy`, data)
    .then(response => response.data);

  return {
    type: ON_SUCCESS_BUY_USER,
    payload: request
  };
}

export function UpdateUserData(data) {
  const request = axios
    .post(`${USER_SERVER}/updateprofile`, data)
    .then(res => res.data);
  return {
    type: UPDATE_DATA_USER,
    payload: request
  };
}

export function clearUpdateUser() {
  return {
    type: CLEAR_UPDATE_USER_DATA,
    payload: ""
  };
}
