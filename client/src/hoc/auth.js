import React, { Component } from "react";
import { connect } from "react-redux";
import { AuthUser } from "../actions/authactions";
import CircularProgress from "@material-ui/core/CircularProgress";

export default function(ComposedClass, reload, adminRoute = null) {
  class AuthenticationCheck extends Component {
    //intital state is loading because You didn't get
    // data instantly .
    state = {
      loading: true
    };

    componentDidMount() {
      this.props.dispatch(AuthUser()).then(response => {
        //get user data from Reducer
        let user = this.props.user.userData;
        // let isAuth = this.props.user.isAuth;
        console.log(user);
        // if User doesn't login
        // if isAuth doesn't true it would be reload
        if (!user.isAuth) {
          //reload is false
          if (reload) {
            this.props.history.push("/login");
          }
        } else {
          // if AdminRoute is null ===  isAdmin doesn't true
          // go to user dashboard
          if (adminRoute && !user.isAdmin) {
            this.props.history.push("/user/dashboard");
          } else {
            // reload === false is true go to user dashboard
            if (reload === false) {
              this.props.history.push("/user/dashboard");
            }
          }
        }
        // after everything is finished , setState will be
        // re-render with newState false because we don't
        // show data
        this.setState({ loading: false });
      });
    }

    render() {
      if (this.state.loading) {
        return (
          <div className="main_loader">
            <CircularProgress style={{ color: "#2196F3" }} thickness={7} />
          </div>
        );
      }
      // Inside ComposeClass ,we passed our auth
      return <ComposedClass {...this.props} user={this.props.user} />;
    }
  }

  function mapStateToProps(state) {
    return {
      user: state.user
    };
  }

  return connect(mapStateToProps)(AuthenticationCheck);
}
