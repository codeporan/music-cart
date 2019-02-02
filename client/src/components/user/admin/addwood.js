import React, { Component } from "react";

import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { addwood, getwood } from "../../../../actions/woodactions";

class Addwood extends Component {
  state = {
    name: ""
  };

  submitForm = e => {
    e.preventDefault();
    const woodData = {
      name: this.state.name
    };
    const existingwoods = this.props.woods.woods;
    this.props.addwood(woodData, existingwoods);
    this.setState({ name: "" });
  };

  HandleonChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };
  componentDidMount() {
    this.props.getwood();
  }
  showCategoryItems = () =>
    this.props.woods.woods
      ? this.props.woods.woods.map((item, i) => (
          <div className="category_item" key={item._id}>
            {item.name}
          </div>
        ))
      : null;
  render() {
    const { woods, loading } = this.props.woods;
    let woodContent;

    if (woods === null || loading) {
      woodContent = <div>sdfs</div>;
    } else {
      woodContent = (
        <div className="brands_container">{this.showCategoryItems()}</div>
      );
    }
    return (
      <div className="admin_category_wrapper">
        <h1>Brands</h1>
        <div className="admin_two_column">
          <div className="left">{woodContent} </div>
          <div className="right">
            <form onSubmit={this.submitForm}>
              <div className="block">
                <input
                  name="name"
                  type="name"
                  id={"name"}
                  value={this.state.name}
                  onChange={this.HandleonChange}
                  placeholder="Brand items "
                />
              </div>
              <button onClick={event => this.submitForm(event)}>
                Add brand
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

const mapstate = state => ({
  woods: state.woods
});
const actions = {
  addwood,
  getwood
};
export default connect(
  mapstate,
  actions
)(withRouter(Addwood));
