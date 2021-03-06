import React from "react";
import UserCart from "./cart";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import UserHistoryBlock from "./userhistoryblock";
const links = [
  {
    name: "My account",
    linkTo: "/user/dashboard"
  },
  {
    name: "User information",
    linkTo: "/user/profile"
  },
  {
    name: "My Cart",
    linkTo: "/user/cart"
  }
];

const admin = [
  {
    name: "Site info",
    linkTo: "/admin/siteinfo"
  },
  {
    name: "Add products",
    linkTo: "/admin/product"
  },
  {
    name: "Manage categories",
    linkTo: "/admin/category"
  }
];

const UserDashboard = ({ user }) => {
  const generateLinks = links =>
    links.map((item, i) => (
      <Link to={item.linkTo} key={i}>
        {item.name}
      </Link>
    ));

  return (
    <div className="container">
      <div className="user_container">
        <div className="user_left_nav">
          <h2>My account</h2>
          <div className="links">{generateLinks(links)}</div>
          {user.userData.isAdmin ? (
            <div>
              <h2>Admin</h2>
              <div className="links">{generateLinks(admin)}</div>
            </div>
          ) : null}
        </div>
        <div className="user_right">
          <UserCart />
          {user.userData.history ? (
            <div className="user_nfo_panel">
              <h1>History Purchase</h1>
              <div>
                <UserHistoryBlock products={user.userData.history} />
              </div>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
};

const mapstate = state => ({
  user: state.user
});

export default connect(mapstate)(UserDashboard);
