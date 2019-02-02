import React, { Component } from "react";
// import { reduxForm, Field } from "redux-form";

import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { register_user } from "../../actions/authactions";
import TextFieldGroup from "../common/TextFieldGroup";

class Register extends Component {
  state = {
    name: "",
    lastname: "",
    email: "",
    password: "",
    password2: "",
    success: false,
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

  submitForm = e => {
    e.preventDefault();
    const user = {
      name: this.state.name,
      lastname: this.state.lastname,
      email: this.state.email,
      password: this.state.password,
      password2: this.state.password2
    };
    this.props.register_user(user, this.props.history);
  };

  render() {
    const { errors } = this.state;
    return (
      <div className="page_wrapper">
        <div className="container">
          <div className="register_login_container">
            <div className="left">
              <form onSubmit={this.submitForm}>
                <h2>Personal information</h2>
                <div className="form_block_two">
                  <TextFieldGroup
                    placeholder="name"
                    id={"name"}
                    name="name"
                    value={this.state.name}
                    onChange={this.onChange}
                    error={errors.name}
                  />
                  <TextFieldGroup
                    placeholder="lastname"
                    name="lastname"
                    value={this.state.lastname}
                    onChange={this.onChange}
                    error={errors.lastname}
                  />
                </div>
                <div>
                  <TextFieldGroup
                    placeholder="Email"
                    name="email"
                    type="email"
                    value={this.state.email}
                    onChange={this.onChange}
                    error={errors.email}
                  />
                </div>
                <h2>Verify password</h2>
                <div className="form_block_two">
                  <TextFieldGroup
                    placeholder="Password"
                    name="password"
                    type="password"
                    value={this.state.password}
                    onChange={this.onChange}
                    error={errors.password}
                  />
                  <TextFieldGroup
                    placeholder="confirm password"
                    name="password2"
                    type="password"
                    value={this.state.password2}
                    onChange={this.onChange}
                    error={errors.password2}
                  />
                </div>
                <div>
                  <button onClick={event => this.submitForm(event)}>
                    Create an account
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
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
  { register_user }
)(withRouter(Register));

// export default connect(
//   mapStateToProps,
//   { register_user }
// )(reduxForm({ form: "loginForm" })(Register));
