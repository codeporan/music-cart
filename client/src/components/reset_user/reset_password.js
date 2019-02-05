import React, { Component } from "react";
import axios from "axios";
import Dialog from "@material-ui/core/Dialog";
import TextInputField from "../common/TextFieldGroup";
import { connect } from "react-redux";
class ResetPass extends Component {
  state = {
    resetToken: "",
    formError: false,
    formErrorMessage: "",
    formSuccess: "",
    password: "",
    confirmPassword: ""
  };

  submitForm = event => {
    event.preventDefault();
    const dataToSubmit = {
      password: this.state.password,
      confirmPassword: this.state.confirmPassword
    };

    axios
      .post("/api/v1/confirmpassword", {
        dataToSubmit,
        resetToken: this.state.resetToken
      })
      .then(response => {
        if (!response.data.success) {
          this.setState({
            formError: true,
            formErrorMessage: response.data.message
          });
        } else {
          this.setState({ formError: false, formSuccess: true });
          setTimeout(() => {
            this.props.history.push("/login");
          }, 3000);
        }
      });
  };

  componentDidMount() {
    const resetToken = this.props.match.params.token;
    this.setState({ resetToken });
  }

  render() {
    return (
      <div className="container">
        <form onSubmit={event => this.submitForm(event)}>
          <h2>Reset password</h2>

          <div className="form_block_two">
            <div className="block">
              <TextInputField
                value={this.state.password}
                onChange={this.onChange}
                type="password"
                name="password_input"
                placeholder="enter your password"
              />
            </div>
            <div className="block">
              <TextInputField
                value={this.state.confirmPassword}
                onChange={this.onChange}
                type="password"
                name="confirm_password_input"
                placeholder="Confirm your password"
              />
            </div>
          </div>

          <div>
            {this.state.formError ? (
              <div className="error_label">{this.state.formErrorMessage}</div>
            ) : (
              ""
            )}
            <button onClick={event => this.submitForm(event)}>
              Reset password
            </button>
          </div>
        </form>

        <Dialog open={this.state.formSuccess}>
          <div className="dialog_alert">
            <div>Alright !!</div>
            <div>Your password was reseted...you will be redirected</div>
          </div>
        </Dialog>
      </div>
    );
  }
}

const mapstate = state => ({
  errors: state.errors
});
export default connect(mapstate)(ResetPass);
