import { combineReducers } from "redux";
import AuthReducer from "./authReducer";
import ErrorReducer from "./errorReducer";
import ProductReducer from "./productReducer";

const rootReducer = combineReducers({
  user: AuthReducer,
  errors: ErrorReducer,
  products: ProductReducer
});

export default rootReducer;
