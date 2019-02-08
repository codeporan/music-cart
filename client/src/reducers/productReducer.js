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
  CLEAR_PRODUCT_DETAIL
} from "../actions/types";

import { createReducer } from "./reducerbolarplate";
const initialState = {};
export const getProductbySell = (state, payload) => {
  return { ...state, bySell: payload };
};
export const getProductbyArriable = (state, payload) => {
  return { ...state, byArrival: payload };
};
export const getBrands = (state, payload) => {
  return { ...state, brands: payload };
};
export const getWoods = (state, payload) => {
  return { ...state, woods: payload };
};
export const addBrands = (state, payload) => {
  return {
    ...state,
    addBrand: payload.success,
    brands: payload.brands
  };
};
export const addWoods = (state, payload) => {
  return { ...state, addWood: payload.success, woods: payload.brands };
};
export const getproductshop = (state, payload) => {
  return { ...state, toShop: payload.articles, toShopSize: payload.size };
};

export const addProducts = (state, payload) => {
  return {
    ...state,
    addProduct: payload
  };
};
export const clearProduct = (state, payload) => {
  return { ...state, addProduct: payload };
};
export const getProductdetails = (state, payload) => {
  return { ...state, prodDetail: payload };
};
export const clearProductDetail = (state, payload) => {
  return { ...state, prodDetail: payload };
};
export default createReducer(initialState, {
  [GET_PRODUCTS_BY_SELL]: getProductbySell,
  [GET_PRODUCTS_BY_ARRIVAL]: getProductbyArriable,
  [GET_BRANDS]: getBrands,
  [GET_WOODS]: getWoods,
  [ADD_BRAND]: addBrands,
  [ADD_WOOD]: addWoods,
  [GET_PRODUCTS_TO_SHOP]: getproductshop,
  [ADD_PRODUCT]: addProducts,
  [CLEAR_PRODUCT]: clearProduct,
  [GET_PRODUCT_DETAIL]: getProductdetails,
  [CLEAR_PRODUCT_DETAIL]: clearProductDetail
});
