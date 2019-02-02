import React from "react";
import { Switch, Route } from "react-router-dom";
import Auth from "./hoc/auth";
import RegisterLogin from "./components/auth/index";
import Register from "./components/auth/Register";
import UserDashboard from "./components/user/index";
import Header from "./components/Header_footer/header/Header";
import Footer from "./components/Header_footer/footer/Footer";
import Home from "./components/Home/Home";
import Shop from "./components/Shop/Shop";
import MangeCategory from "./components/admin/mangecategorty";
import AddProduct from "./components/admin/addproduct";
import ProductDetails from "./components/product/productdetail";
import UserCart from "./components/user/admin/cart";

const Routes = () => {
  return (
    <div>
      <Header />
      <div className="page_container">
        <Switch>
          <Route
            path="/user/dashboard"
            exact
            component={Auth(UserDashboard, true)}
          />
          <Route path="/shop" exact component={Auth(Shop, null)} />
          <Route path="/register" exact component={Auth(Register, false)} />
          <Route path="/login" exact component={Auth(RegisterLogin, false)} />
          <Route path="/" exact component={Auth(Home, null)} />
          <Route
            path="/admin/product"
            exact
            component={Auth(AddProduct, true)}
          />
          <Route
            path="/product/:id"
            exact
            component={Auth(ProductDetails, null)}
          />
          <Route path="/user/cart" exact component={Auth(UserCart, true)} />
          <Route
            path="/admin/category"
            exact
            component={Auth(MangeCategory, null)}
          />
        </Switch>
      </div>
      <Footer />
    </div>
  );
};

export default Routes;
