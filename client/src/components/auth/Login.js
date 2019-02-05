import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { login_user } from "../../actions/authactions";
import TextFieldGroup from "../common/TextFieldGroup";
import { Link } from "react-router-dom";
class Login extends Component {
  state = {
    email: "",
    password: "",
    errors: {}
  };

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  }
  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onSubmit = e => {
    e.preventDefault();
    const user = {
      email: this.state.email,
      password: this.state.password
    };
    this.props.login_user(user, this.props.history);
  };

  render() {
    console.log(this.state);
    const { errors } = this.state;
    return (
      <div className="signin_wrapper">
        <form onSubmit={this.onSubmit}>
          <TextFieldGroup
            placeholder="Email"
            name="email"
            type="email"
            value={this.state.email}
            onChange={this.onChange}
            error={errors.email}
          />
          <TextFieldGroup
            placeholder="Password"
            name="password"
            type="password"
            value={this.state.password}
            onChange={this.onChange}
            error={errors.password}
          />

          <button onClick={event => this.onSubmit(event)}>Log in</button>
          <Link to="/confirmpassword">forget password</Link>
        </form>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});
export default connect(
  mapStateToProps,
  { login_user }
)(withRouter(Login));
