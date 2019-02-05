import React, { Component } from "react";
import axios from "axios";
import TextInputField from "../common/TextFieldGroup";
import { connect } from "react-redux";

class ReserUser extends Component {
  state = {
    formError: false,
    formSuccess: false,
    email: "",
    errors: {}
  };
  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({
        errors: nextProps.errors
      });
    }
  }
  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  submitForm = event => {
    event.preventDefault();
    const dataToSubmit = {
      email: this.state.email
    };
    axios.post("/api/v1/resetpassword", dataToSubmit).then(response => {
      if (response.data.success) {
        this.setState({
          formSuccess: true
        });
        console.log(response);
      }
    });
  };

  render() {
    return (
      <div className="container">
        <h1>Reset passwords</h1>
        <form onSubmit={event => this.submitForm(event)}>
          <TextInputField
            name="email"
            type="text"
            placeholder="send your email"
            onChange={this.onChange}
            value={this.state.email}
          />

          {this.state.formSuccess ? (
            <div className="form_success">Done, check your email</div>
          ) : null}
          {this.state.formError ? (
            <div className="error_label">Please check your data</div>
          ) : null}
          <button onClick={event => this.submitForm(event)}>
            Send email to reset password
          </button>
        </form>
      </div>
    );
  }
}

const mapstate = state => ({
  errors: state.errors
});
export default connect(mapstate)(ReserUser);
