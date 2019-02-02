import axios from "axios";
import {
  GET_PRODUCTS_BY_SELL,
  GET_PRODUCTS_BY_ARRIVAL,
  GET_BRANDS,
  ADD_BRAND,
  GET_WOODS,
  ADD_WOOD,
  GET_PRODUCTS_TO_SHOP,
  ADD_PRODUCT,
  CLEAR_PRODUCT,
  GET_PRODUCT_DETAIL,
  CLEAR_PRODUCT_DETAIL,
  GET_ERRORS
} from "./types";

// SERVER ROUTES
export const PRODUCT_SERVER = "/api/product";

export function getproductDetails(id) {
  const request = axios
    .get(`${PRODUCT_SERVER}/articles_by_id?id=${id}&type=single`)
    .then(response => response.data[0]);
  return {
    type: GET_PRODUCT_DETAIL,
    payload: request
  };
}
export function clearProductDetail() {
  return {
    type: CLEAR_PRODUCT_DETAIL,
    payload: ""
  };
}
export function getProductBysell() {
  const request = axios
    .get(`${PRODUCT_SERVER}/articles?sortBy=sold&order=desc&limit=4`)
    .then(response => response.data);
  return {
    type: GET_PRODUCTS_BY_SELL,
    payload: request
  };
}

export function getProductsByArrival() {
  const request = axios
    .get(`${PRODUCT_SERVER}/articles?sortBy=createdAt&order=desc&limit=4`)
    .then(response => response.data);

  return {
    type: GET_PRODUCTS_BY_ARRIVAL,
    payload: request
  };
}

export const addProduct = data => dispatch => {
  axios
    .post(`${PRODUCT_SERVER}/addproduct`, data)
    .then(response => dispatch({ type: ADD_PRODUCT, payload: response.data }))
    .catch(err => dispatch({ type: GET_ERRORS, payload: err.response.data }));
};

export function clearProduct() {
  return {
    type: CLEAR_PRODUCT,
    payload: ""
  };
}

export function getProductsToShop(
  skip,
  limit,
  filters = [],
  previousState = []
) {
  //these data is defined for getting articles initial page
  const data = {
    limit,
    skip,
    filters
  };
  const request = axios.post(`${PRODUCT_SERVER}/shop`, data).then(res => {
    // getting previous products with new articels
    const newState = [...previousState, ...res.data.articles];
    // size of articles .. How many articles is existed?
    // newstate give the articles when filter out
    return {
      size: res.data.size,
      articles: newState
    };
  });
  return {
    type: GET_PRODUCTS_TO_SHOP,
    payload: request
  };
}
//category
export function getBrands() {
  const request = axios
    .get(`${PRODUCT_SERVER}/brands`)
    .then(response => response.data);
  return {
    type: GET_BRANDS,
    payload: request
  };
}

export const addBrand = (dataToSubmit, existingBrands, history) => dispatch => {
  axios
    .post(`${PRODUCT_SERVER}/brand`, dataToSubmit)
    .then(response => {
      let brands = [...existingBrands, response.data.brand];
      dispatch({
        type: ADD_BRAND,
        payload: brands
      });
    })
    .then(res => history.push("/category"))
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

export const addWood = (data, existingWoods, history) => dispatch => {
  axios
    .post(`${PRODUCT_SERVER}/wood`, data)
    .then(response => {
      let woods = [...existingWoods, response.data.wood];
      dispatch({
        type: ADD_WOOD,
        payload: woods
      });
    })
    .then(res => history.push("/category"))
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

export function getWoods() {
  const request = axios
    .get(`${PRODUCT_SERVER}/woods`)
    .then(response => response.data);

  return {
    type: GET_WOODS,
    payload: request
  };
}
